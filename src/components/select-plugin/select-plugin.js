const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ? placeholder : 'Выберите...';

  const items = data.map((item) => {
    let cls = '';
    if (item.id === selectedId) {
      text = item.value;
      cls = 'selected'
    }
    return `
      <li class="select__list-item ${cls}" data-type="item" data-value="${item.id}">${
      item.value
    }</li>
      `;
  });

  return `
  <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
      <span class="text" data-type="text">${text}</span>
      <div class="icon" >
        <?xml version="1.0" encoding="iso-8859-1"?>
        <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 490.688 490.688"
          style="enable-background:new 0 0 490.688 490.688;"
          xml:space="preserve"
        >
          <path
            style="fill:#FFC107;"
            d="M472.328,120.529L245.213,347.665L18.098,120.529c-4.237-4.093-10.99-3.975-15.083,0.262
                            c-3.992,4.134-3.992,10.687,0,14.82l234.667,234.667c4.165,4.164,10.917,4.164,15.083,0l234.667-234.667
                            c4.237-4.093,4.354-10.845,0.262-15.083c-4.093-4.237-10.845-4.354-15.083-0.262c-0.089,0.086-0.176,0.173-0.262,0.262
                            L472.328,120.529z"
          />
          <path
            d="M245.213,373.415c-2.831,0.005-5.548-1.115-7.552-3.115L2.994,135.633c-4.093-4.237-3.975-10.99,0.262-15.083
                            c4.134-3.992,10.687-3.992,14.82,0l227.136,227.115l227.115-227.136c4.093-4.237,10.845-4.354,15.083-0.262
                            c4.237,4.093,4.354,10.845,0.262,15.083c-0.086,0.089-0.173,0.176-0.262,0.262L252.744,370.279
                            C250.748,372.281,248.039,373.408,245.213,373.415z"
          />
        </svg>
      </div>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items.join('')}
      </ul>
    </div>
  `;
};

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;

    this.#render();
    this.#setup();
  }

  #render() {
    const { placeholder, data } = this.options;
    this.$el.classList.add('select');
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
    this.$text = this.$el.querySelector('[data-type="text"]');
  }

  clickHandler(event) {
    const { type } = event.target.dataset;
    if (type === 'input') {
      this.toggle();
    } else 
      if (type === 'item') {
        const id = event.target.dataset.value;
        this.select(id);
      } else if (type === 'backdrop'){
          this.close()
      }
    
  }

  get isOpen() {
    return this.$el.classList.contains('open');
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  get current() {
    return this.options.data.find((item) => item.id === this.selectedId);
  }
  select(id) {
    this.selectedId = +id;
    this.$text.textContent = this.current.value;

    this.$el.querySelectorAll('[data-type="item"]').forEach((el) => {
      el.classList.remove('selected');
    });

    this.$el
      .querySelector(`[data-value="${this.selectedId}"]`)
      .classList.add('selected');

    this.options.onSelect ? this.options.onSelect(this.current) : null

    this.close();
  }
  open() {
    this.$el.classList.add('open');
  }

  close() {
    this.$el.classList.remove('open');
  }

  destroy() {
    this.$el.removeEvenlistener('click', this.clickHandler);
    this.$el.innerHTML = ''
  }
}

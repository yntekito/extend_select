class ExtendSelect {
  constructor(selectElement, options = {}) {
    this.originalSelect = selectElement;
    this.options = {
      searchable: true,
      multiple: false,
      placeholder: 'Select an option...',
      searchPlaceholder: 'Search options...',
      ...options
    };
    
    this.selectedValues = [];
    this.filteredOptions = [];
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    this.createWrapper();
    this.createCustomSelect();
    this.bindEvents();
    this.updateFilteredOptions();
    
    // Hide original select
    this.originalSelect.style.display = 'none';
  }
  
  createWrapper() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'extend-select-wrapper';
    this.originalSelect.parentNode.insertBefore(this.wrapper, this.originalSelect);
    this.wrapper.appendChild(this.originalSelect);
  }
  
  createCustomSelect() {
    this.customSelect = document.createElement('div');
    this.customSelect.className = 'extend-select';
    
    // Create display area
    this.display = document.createElement('div');
    this.display.className = 'extend-select-display';
    this.display.textContent = this.options.placeholder;
    
    // Create dropdown
    this.dropdown = document.createElement('div');
    this.dropdown.className = 'extend-select-dropdown';
    
    // Create search input if searchable
    if (this.options.searchable) {
      this.searchInput = document.createElement('input');
      this.searchInput.type = 'text';
      this.searchInput.className = 'extend-select-search';
      this.searchInput.placeholder = this.options.searchPlaceholder;
      this.dropdown.appendChild(this.searchInput);
    }
    
    // Create options container
    this.optionsContainer = document.createElement('div');
    this.optionsContainer.className = 'extend-select-options';
    this.dropdown.appendChild(this.optionsContainer);
    
    this.customSelect.appendChild(this.display);
    this.customSelect.appendChild(this.dropdown);
    this.wrapper.appendChild(this.customSelect);
  }
  
  updateFilteredOptions() {
    const searchTerm = this.searchInput ? this.searchInput.value.toLowerCase() : '';
    this.filteredOptions = Array.from(this.originalSelect.options).filter(option => 
      option.text.toLowerCase().includes(searchTerm)
    );
    this.renderOptions();
  }
  
  renderOptions() {
    this.optionsContainer.innerHTML = '';
    
    this.filteredOptions.forEach(option => {
      const optionElement = document.createElement('div');
      optionElement.className = 'extend-select-option';
      optionElement.textContent = option.text;
      optionElement.dataset.value = option.value;
      
      if (this.selectedValues.includes(option.value)) {
        optionElement.classList.add('selected');
      }
      
      optionElement.addEventListener('click', () => this.selectOption(option.value));
      this.optionsContainer.appendChild(optionElement);
    });
  }
  
  selectOption(value) {
    if (this.options.multiple) {
      const index = this.selectedValues.indexOf(value);
      if (index > -1) {
        this.selectedValues.splice(index, 1);
      } else {
        this.selectedValues.push(value);
      }
    } else {
      this.selectedValues = [value];
      this.close();
    }
    
    this.updateOriginalSelect();
    this.updateDisplay();
    this.renderOptions();
  }
  
  updateOriginalSelect() {
    Array.from(this.originalSelect.options).forEach(option => {
      option.selected = this.selectedValues.includes(option.value);
    });
    
    // Trigger change event
    const changeEvent = new Event('change', { bubbles: true });
    this.originalSelect.dispatchEvent(changeEvent);
  }
  
  updateDisplay() {
    if (this.selectedValues.length === 0) {
      this.display.innerHTML = `<span class="placeholder-text">${this.options.placeholder}</span>`;
      this.display.classList.remove('has-value');
      this.display.classList.remove('multiple');
    } else if (this.options.multiple) {
      this.display.innerHTML = '';
      this.display.classList.add('has-value');
      this.display.classList.add('multiple');
      
      this.selectedValues.forEach(value => {
        const option = Array.from(this.originalSelect.options).find(opt => opt.value === value);
        if (option) {
          const tag = document.createElement('span');
          tag.className = 'extend-select-tag';
          tag.innerHTML = `
            ${option.text}
            <button type="button" class="extend-select-tag-remove" data-value="${value}"></button>
          `;
          this.display.appendChild(tag);
        }
      });
      
      // プレースホルダーテキストを追加（選択がない場合や追加選択を促すため）
      if (this.selectedValues.length === 0) {
        const placeholder = document.createElement('span');
        placeholder.className = 'placeholder-text';
        placeholder.textContent = this.options.placeholder;
        this.display.appendChild(placeholder);
      }
    } else {
      const option = Array.from(this.originalSelect.options).find(opt => opt.value === this.selectedValues[0]);
      this.display.innerHTML = `<span>${option ? option.text : ''}</span>`;
      this.display.classList.add('has-value');
      this.display.classList.remove('multiple');
    }
  }
  
  bindEvents() {
    this.display.addEventListener('click', (e) => {
      // タグの削除ボタンがクリックされた場合
      if (e.target.classList.contains('extend-select-tag-remove')) {
        e.stopPropagation();
        const value = e.target.dataset.value;
        this.removeValue(value);
        return;
      }
      this.toggle();
    });
    
    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => this.updateFilteredOptions());
      this.searchInput.addEventListener('click', (e) => e.stopPropagation());
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.wrapper.contains(e.target)) {
        this.close();
      }
    });
    
    // Handle keyboard navigation
    this.customSelect.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }
  
  handleKeyboard(e) {
    switch (e.key) {
      case 'Escape':
        this.close();
        break;
      case 'Enter':
      case ' ':
        if (!this.isOpen) {
          this.open();
        }
        e.preventDefault();
        break;
    }
  }
  
  open() {
    this.isOpen = true;
    this.dropdown.style.display = 'block';
    this.customSelect.classList.add('open');
    
    if (this.searchInput) {
      this.searchInput.focus();
    }
  }
  
  close() {
    this.isOpen = false;
    this.dropdown.style.display = 'none';
    this.customSelect.classList.remove('open');
    
    if (this.searchInput) {
      this.searchInput.value = '';
      this.updateFilteredOptions();
    }
  }
  
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  
  // Public methods
  setValue(value) {
    if (Array.isArray(value)) {
      this.selectedValues = [...value];
    } else {
      this.selectedValues = value ? [value] : [];
    }
    this.updateOriginalSelect();
    this.updateDisplay();
    this.renderOptions();
  }
  
  getValue() {
    return this.options.multiple ? this.selectedValues : this.selectedValues[0] || null;
  }
  
  removeValue(value) {
    const index = this.selectedValues.indexOf(value);
    if (index > -1) {
      this.selectedValues.splice(index, 1);
      this.updateOriginalSelect();
      this.updateDisplay();
      this.renderOptions();
    }
  }
  
  destroy() {
    this.originalSelect.style.display = '';
    this.wrapper.parentNode.insertBefore(this.originalSelect, this.wrapper);
    this.wrapper.remove();
  }
}
const cform = (function(document) {
    'use strict';

    const CLASSES = {
        get ELEMENT() { return 'cform-element'; },
        get FIELD() { return 'cform-field'; }
    };

    const DEFAULTS = {
        calculations: [],
        formatInput: function(value, element) { return value; },
        formatOutput: function(value, element) { return value; }
    };

    const CALCULTATE_DEFAULTS = {
        calculate: function() {},
        input: [],
        output: null
    };

    class Cform {
        constructor(element, { calculations, formatInput, formatOutput }) {
            this.element = element;
            this.formatInput = formatInput;
            this.formatOutput = formatOutput;
            this.calculations = calculations.map(this._initCalculation, this);
            this._initStore();
            this._initialCalculation();
        }

        _initCalculation(entry) {
            const clone = Object.assign({}, CALCULTATE_DEFAULTS, entry);
            clone.calculate = clone.calculate.bind(this);
            return clone;
        }

        _initStore() {
            const fields = this.element.querySelectorAll('.' + CLASSES.FIELD);
            this.store = {};
            fields.forEach(element => {
                const value = this._getFieldValue(element);
                this._setStoreFromField(element, element.value);
            });
        }

        _getFieldValue(element) {
            if (element instanceof HTMLInputElement) {
                return element.value;
            } else {
                return undefined;
            }
        }

        _setStoreFromField(element, value) {
            this.store[element.name] = this.formatInput(value, element);
        }

        _initialCalculation() {
            const fields = Object.keys(this.store);
            fields.forEach(f => this._runDependingCalculations(f));
        }

        processChange(event) {
            this.update(event.target);
        }

        update(element) {
            if (!element.closest('.' + CLASSES.ELEMENT) || !this.element.contains(element)) {
              return;
            }

            this._setStoreFromField(element, element.value);
            this._runDependingCalculations(element.name);
        }

        _setFieldValue(fieldName, value) {
            const selector = '.' + CLASSES.ELEMENT + ' input[name=\"' + fieldName + '\"]';
            const element = document.querySelector(selector);
            element.value = this.formatOutput(value, element);
        }

        _runDependingCalculations(field) {
            const calculations = this.calculations.filter(c => c.input.includes(field));
            calculations.forEach(c => this._execCalculate(c));
        }

        _execCalculate(entry) {
            const value = Number(entry.calculate());
            if (isNaN(value)) {
                return;
            }
            this.store[entry.output] = value;
            this._setFieldValue(entry.output, value);
            this._runDependingCalculations(entry.output);
        }

        getValue(field) {
            return this.store[field];
        }

        mathPlus(left, right) {
            const leftNum = Number(left);
            const rightNum = Number(right);
            const factor = this._getCalculationFaktor(leftNum, rightNum);
            return (Math.round(leftNum * factor) + Math.round(rightNum * factor)) / factor;
        }

        mathMinus(left, right) {
            const leftNum = Number(left);
            const rightNum = Number(right);
            const factor = this._getCalculationFaktor(leftNum, rightNum);
            return (Math.round(leftNum * factor) - Math.round(rightNum * factor)) / factor;
        }

        mathMulti(left, right) {
            const leftNum = Number(left);
            const rightNum = Number(right);
            const factor = this._getCalculationFaktor(leftNum, rightNum);
            return Math.round(leftNum * factor) * Math.round(rightNum * factor) / (factor * factor);
        }

        mathDiv(left, right) {
            const leftNum = Number(left);
            const rightNum = Number(right);
            const factor = this._getCalculationFaktor(leftNum, rightNum);
            return Math.round(leftNum * factor) / Math.round(rightNum * factor);
        }

        _getCalculationFaktor() {
            return Array.prototype.reduce.call(arguments, (prev, next) => {
                return Math.max(prev, this._shiftCalculationFaktor(next));
            }, 1);
        }

        _shiftCalculationFaktor(x) {
            const parts = x.toString().split('.');
            return (parts.length < 2) ? 1 : Math.pow(10, parts[1].length);
        }
    }

    function initiate(element, settings) {
        const elements = (element instanceof Element) ? [element] : Array.prototype.slice.call(element);
        const cforms = elements.map(e => {
            const cform = new Cform(e, Object.assign({}, DEFAULTS, settings));
            instances.push(cform);
            return cform;
        });
        const update = (element) => {
            cforms.forEach(c => c.update(element));
        }
        return { update };
    }

    const instances = [];
    document.addEventListener("change", e => instances.forEach(i => i.processChange(e)));

    return {
        init: initiate
    };
})(document);

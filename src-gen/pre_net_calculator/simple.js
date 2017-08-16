var cform_pre_net_calculator = [
    {
        calculate: function() {
            return this.getValue('net_pay')
        },
        input: ['net_pay'],
        output: {
            field: 'pre_tax',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathMulti(this.getValue('net_pay'), 0.14372)
        },
        input: ['net_pay'],
        output: {
            field: 'wage_tax',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathMulti(this.getValue('wage_tax'), 0.09)
        },
        input: ['wage_tax'],
        output: {
            field: 'church_tax',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathMulti(this.getValue('wage_tax'), 0.055)
        },
        input: ['wage_tax'],
        output: {
            field: 'solidarity_tax',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathPlus(this.mathPlus(this.getValue('wage_tax'), this.getValue('church_tax')), this.getValue('solidarity_tax'))
        },
        input: ['wage_tax','solidarity_tax','church_tax'],
        output: {
            field: 'tax',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathMulti(this.getValue('net_pay'), 0.0935)
        },
        input: ['net_pay'],
        output: {
            field: 'pension_insurance',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathMulti(this.getValue('net_pay'), 0.015)
        },
        input: ['net_pay'],
        output: {
            field: 'jobless_insurance',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathMulti(this.getValue('net_pay'), this.mathPlus(0.073, this.mathDiv(this.getValue('health_additional'), 100)))
        },
        input: ['net_pay','health_additional'],
        output: {
            field: 'health_insurance',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathMulti(this.getValue('net_pay'), this.mathPlus(0.01275, 0.0025))
        },
        input: ['net_pay'],
        output: {
            field: 'nursing_care_insurance',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathPlus(this.mathPlus(this.mathPlus(this.getValue('pension_insurance'), this.getValue('jobless_insurance')), this.getValue('health_insurance')), this.getValue('nursing_care_insurance'))
        },
        input: ['health_insurance','pension_insurance','nursing_care_insurance','jobless_insurance'],
        output: {
            field: 'social_charges',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathMinus(this.mathMinus(this.getValue('pre_tax'), this.getValue('tax')), this.getValue('social_charges'))
        },
        input: ['pre_tax','tax','social_charges'],
        output: {
            field: 'net',
            variable: null
        }
    }
];

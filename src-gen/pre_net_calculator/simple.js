var cform_pre_net_calculator = [
    {
        calculate: function() {
            return this.resolveFieldValue('net_pay')
        },
        input: {
            fields: ['net_pay'],
            variables: [],
        },
        output: {
            field: null,
            variable: 'np'
        }
    },
    {
        calculate: function() {
            return this.resolveVariableValue('np')
        },
        input: {
            fields: [],
            variables: ['np'],
        },
        output: {
            field: 'pre_tax',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathMulti(this.resolveVariableValue('np'), 0.14372)
        },
        input: {
            fields: [],
            variables: ['np'],
        },
        output: {
            field: 'wage_tax',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathMulti(this.resolveFieldValue('wage_tax'), 0.09)
        },
        input: {
            fields: ['wage_tax'],
            variables: [],
        },
        output: {
            field: 'church_tax',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathMulti(this.resolveFieldValue('wage_tax'), 0.055)
        },
        input: {
            fields: ['wage_tax'],
            variables: [],
        },
        output: {
            field: 'solidarity_tax',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathPlus(this.mathPlus(this.resolveFieldValue('wage_tax'), this.resolveFieldValue('church_tax')), this.resolveFieldValue('solidarity_tax'))
        },
        input: {
            fields: ['wage_tax','solidarity_tax','church_tax'],
            variables: [],
        },
        output: {
            field: 'tax',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathMulti(this.resolveVariableValue('np'), 0.0935)
        },
        input: {
            fields: [],
            variables: ['np'],
        },
        output: {
            field: 'pension_insurance',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathMulti(this.resolveVariableValue('np'), 0.015)
        },
        input: {
            fields: [],
            variables: ['np'],
        },
        output: {
            field: 'jobless_insurance',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathMulti(this.resolveVariableValue('np'), this.mathPlus(0.073, this.mathDiv(this.resolveFieldValue('health_additional'), 100)))
        },
        input: {
            fields: ['health_additional'],
            variables: ['np'],
        },
        output: {
            field: 'health_insurance',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathMulti(this.resolveVariableValue('np'), this.mathPlus(0.01275, 0.0025))
        },
        input: {
            fields: [],
            variables: ['np'],
        },
        output: {
            field: 'nursing_care_insurance',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathPlus(this.mathPlus(this.mathPlus(this.resolveFieldValue('pension_insurance'), this.resolveFieldValue('jobless_insurance')), this.resolveFieldValue('health_insurance')), this.resolveFieldValue('nursing_care_insurance'))
        },
        input: {
            fields: ['health_insurance','pension_insurance','nursing_care_insurance','jobless_insurance'],
            variables: [],
        },
        output: {
            field: 'social_charges',
            variable: null
        }
    },
    {
        calculate: function() {
            return this.mathMinus(this.mathMinus(this.resolveFieldValue('pre_tax'), this.resolveFieldValue('tax')), this.resolveFieldValue('social_charges'))
        },
        input: {
            fields: ['pre_tax','tax','social_charges'],
            variables: [],
        },
        output: {
            field: 'net',
            variable: null
        }
    }
];

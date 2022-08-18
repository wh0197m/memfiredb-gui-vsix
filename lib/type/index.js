const checker = {
    string: value => typeof value == 'string',
    truestring: value => typeof value == 'string',
    number: value => typeof value == 'number' && !isNaN(value),
    boolean: value => typeof value == 'boolean',
    symbol: value => typeof value == 'symbol',
    bigint: value => typeof value == 'bigint',
    int: value => checker.number(value) && value % 1 == 0,
    nil: value => value === undefined || value === null,
    function: value => value instanceof Function
}

const NilField = Symbol('nil')
const UnvalidatedField = Symbol('unvalidated')

class WrongDetail {
    is(Class) {
        return this instanceof Class
    }
}
class NilWrongDetail extends WrongDetail {
    toString() {
        return 'target is nil'
    }
}
class FieldWrongDetail extends WrongDetail {
    constructor(name, type) {
        super()
        this.name = name
        this.type = type
    }
    toString() {
        return `error on field ${this.name}, type: ${this.type.toString()}`
    }
}

class FieldDesc {
    constructor(options) {
        if (checker.nil(options))
            throw Error('error on constructing FieldDesc: options cant be undefined')
        if (options instanceof FieldDesc) // 导致不能使用 class 关键字
            throw Error('cant constructing a FieldDesc from a FieldDesc')

        if (!checker.string(options.name))
            throw Error('name is a string but it\'s setting to ' + options.name)
        this.name = options.name

        if (checker.nil(options.notNull))
            this.notNull = false
        else if (checker.boolean(options.notNull))
            this.notNull = options.notNull
        else
            throw Error('notNull is a boolean but it\'s setting to ' + options.notNull)

        if (checker.string(options.validate) && checker[options.validate])
            this.__validate = checker[options.validate]
        else if (typeof options.validate == 'function') // 普通函数、箭头函数，不包括 async 函数
            this.__validate = options.validate
        else
            throw Error('validate is a string(one of [string, truestring, number, boolean, symbol, bigint, '
                + 'int, nil, function]) or function but it\'s setting to ' + options.validate)
    }
    validate(target) {
        // target nil-validated in Type
        const value = target[this.name]
        if (checker.nil(value)) {
            if (this.notNull)
                return NilField
            else
                return
        } else {
            if (this.notNull && this.__validate == checker.truestring && value === '')
                return NilField
            else if (this.__validate(value))
                return
            else
                return UnvalidatedField
        }
    }
}

class Type {
    constructor(fields) {
        if (!(fields instanceof Array))
            throw Error('fields should be an Array')
        this.fields = fields.map(field => new FieldDesc(field))
    }
    validate(object) {
        if (!object)
            return new NilWrongDetail()
        for (let desc of this.fields) {
            const wrongField = desc.validate(object)
            if (wrongField)
                return new FieldWrongDetail(desc.name, wrongField)
        }
    }
}

module.exports = {
    checker,
    NilField, UnvalidatedField,
    WrongDetail, NilWrongDetail, FieldWrongDetail,
    FieldDesc, Type
}
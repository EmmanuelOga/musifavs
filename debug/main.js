(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],2:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],3:[function(require,module,exports){
/**
 * Used by `_.defaults` to customize its `_.assign` use.
 *
 * @private
 * @param {*} objectValue The destination object property value.
 * @param {*} sourceValue The source object property value.
 * @returns {*} Returns the value to assign to the destination object.
 */
function assignDefaults(objectValue, sourceValue) {
  return typeof objectValue == 'undefined' ? sourceValue : objectValue;
}

module.exports = assignDefaults;

},{}],4:[function(require,module,exports){
var baseCopy = require('./baseCopy'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `this` binding `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize assigning values.
 * @returns {Object} Returns the destination object.
 */
function baseAssign(object, source, customizer) {
  var props = keys(source);
  if (!customizer) {
    return baseCopy(source, object, props);
  }
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index],
        value = object[key],
        result = customizer(value, source[key], key, object, source);

    if ((result === result ? result !== value : value === value) ||
        (typeof value == 'undefined' && !(key in object))) {
      object[key] = result;
    }
  }
  return object;
}

module.exports = baseAssign;

},{"../object/keys":31,"./baseCopy":5}],5:[function(require,module,exports){
/**
 * Copies the properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Array} props The property names to copy.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, object, props) {
  if (!props) {
    props = object;
    object = {};
  }
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],6:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iterator functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
function baseFor(object, iteratee, keysFunc) {
  var index = -1,
      iterable = toObject(object),
      props = keysFunc(object),
      length = props.length;

  while (++index < length) {
    var key = props[index];
    if (iteratee(iterable[key], key, iterable) === false) {
      break;
    }
  }
  return object;
}

module.exports = baseFor;

},{"./toObject":21}],7:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keysIn = require('../object/keysIn');

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

module.exports = baseForIn;

},{"../object/keysIn":32,"./baseFor":6}],8:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"../object/keys":31,"./baseFor":6}],9:[function(require,module,exports){
var arrayEach = require('./arrayEach'),
    baseForOwn = require('./baseForOwn'),
    baseMergeDeep = require('./baseMergeDeep'),
    isArray = require('../lang/isArray'),
    isLength = require('./isLength'),
    isObject = require('../lang/isObject'),
    isObjectLike = require('./isObjectLike'),
    isTypedArray = require('../lang/isTypedArray');

/**
 * The base implementation of `_.merge` without support for argument juggling,
 * multiple sources, and `this` binding `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize merging properties.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {Object} Returns the destination object.
 */
function baseMerge(object, source, customizer, stackA, stackB) {
  if (!isObject(object)) {
    return object;
  }
  var isSrcArr = isLength(source.length) && (isArray(source) || isTypedArray(source));
  (isSrcArr ? arrayEach : baseForOwn)(source, function(srcValue, key, source) {
    if (isObjectLike(srcValue)) {
      stackA || (stackA = []);
      stackB || (stackB = []);
      return baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
    }
    var value = object[key],
        result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
        isCommon = typeof result == 'undefined';

    if (isCommon) {
      result = srcValue;
    }
    if ((isSrcArr || typeof result != 'undefined') &&
        (isCommon || (result === result ? result !== value : value === value))) {
      object[key] = result;
    }
  });
  return object;
}

module.exports = baseMerge;

},{"../lang/isArray":23,"../lang/isObject":25,"../lang/isTypedArray":27,"./arrayEach":2,"./baseForOwn":8,"./baseMergeDeep":10,"./isLength":17,"./isObjectLike":18}],10:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isLength = require('./isLength'),
    isPlainObject = require('../lang/isPlainObject'),
    isTypedArray = require('../lang/isTypedArray'),
    toPlainObject = require('../lang/toPlainObject');

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize merging properties.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
  var length = stackA.length,
      srcValue = source[key];

  while (length--) {
    if (stackA[length] == srcValue) {
      object[key] = stackB[length];
      return;
    }
  }
  var value = object[key],
      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
      isCommon = typeof result == 'undefined';

  if (isCommon) {
    result = srcValue;
    if (isLength(srcValue.length) && (isArray(srcValue) || isTypedArray(srcValue))) {
      result = isArray(value)
        ? value
        : (value ? arrayCopy(value) : []);
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      result = isArguments(value)
        ? toPlainObject(value)
        : (isPlainObject(value) ? value : {});
    }
    else {
      isCommon = false;
    }
  }
  // Add the source value to the stack of traversed objects and associate
  // it with its merged value.
  stackA.push(srcValue);
  stackB.push(result);

  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
  } else if (result === result ? result !== value : value === value) {
    object[key] = result;
  }
}

module.exports = baseMergeDeep;

},{"../lang/isArguments":22,"../lang/isArray":23,"../lang/isPlainObject":26,"../lang/isTypedArray":27,"../lang/toPlainObject":28,"./arrayCopy":1,"./isLength":17}],11:[function(require,module,exports){
/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],12:[function(require,module,exports){
/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * returned by `keysFunc`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  var index = -1,
      length = props.length,
      result = Array(length);

  while (++index < length) {
    result[index] = object[props[index]];
  }
  return result;
}

module.exports = baseValues;

},{}],13:[function(require,module,exports){
var identity = require('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (typeof thisArg == 'undefined') {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":37}],14:[function(require,module,exports){
var bindCallback = require('./bindCallback'),
    isIterateeCall = require('./isIterateeCall');

/**
 * Creates a function that assigns properties of source object(s) to a given
 * destination object.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return function() {
    var length = arguments.length,
        object = arguments[0];

    if (length < 2 || object == null) {
      return object;
    }
    if (length > 3 && isIterateeCall(arguments[1], arguments[2], arguments[3])) {
      length = 2;
    }
    // Juggle arguments.
    if (length > 3 && typeof arguments[length - 2] == 'function') {
      var customizer = bindCallback(arguments[--length - 1], arguments[length--], 5);
    } else if (length > 2 && typeof arguments[length - 1] == 'function') {
      customizer = arguments[--length];
    }
    var index = 0;
    while (++index < length) {
      var source = arguments[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  };
}

module.exports = createAssigner;

},{"./bindCallback":13,"./isIterateeCall":16}],15:[function(require,module,exports){
/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = +value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],16:[function(require,module,exports){
var isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    isObject = require('../lang/isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number') {
    var length = object.length,
        prereq = isLength(length) && isIndex(index, length);
  } else {
    prereq = type == 'string' && index in object;
  }
  if (prereq) {
    var other = object[index];
    return value === value ? value === other : other !== other;
  }
  return false;
}

module.exports = isIterateeCall;

},{"../lang/isObject":25,"./isIndex":15,"./isLength":17}],17:[function(require,module,exports){
/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on ES `ToLength`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],18:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return (value && typeof value == 'object') || false;
}

module.exports = isObjectLike;

},{}],19:[function(require,module,exports){
var baseForIn = require('./baseForIn'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * A fallback implementation of `_.isPlainObject` which checks if `value`
 * is an object created by the `Object` constructor or has a `[[Prototype]]`
 * of `null`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 */
function shimIsPlainObject(value) {
  var Ctor;

  // Exit early for non `Object` objects.
  if (!(isObjectLike(value) && objToString.call(value) == objectTag) ||
      (!hasOwnProperty.call(value, 'constructor') &&
        (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
    return false;
  }
  // IE < 9 iterates inherited properties before own properties. If the first
  // iterated property is an object's own property then there are no inherited
  // enumerable properties.
  var result;
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  baseForIn(value, function(subValue, key) {
    result = key;
  });
  return typeof result == 'undefined' || hasOwnProperty.call(value, result);
}

module.exports = shimIsPlainObject;

},{"./baseForIn":7,"./isObjectLike":18}],20:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    keysIn = require('../object/keysIn'),
    support = require('../support');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object)));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":22,"../lang/isArray":23,"../object/keysIn":32,"../support":36,"./isIndex":15,"./isLength":17}],21:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Converts `value` to an object if it is not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":25}],22:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  var length = isObjectLike(value) ? value.length : undefined;
  return (isLength(length) && objToString.call(value) == argsTag) || false;
}

module.exports = isArguments;

},{"../internal/isLength":17,"../internal/isObjectLike":18}],23:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('./isNative'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return (isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag) || false;
};

module.exports = isArray;

},{"../internal/isLength":17,"../internal/isObjectLike":18,"./isNative":24}],24:[function(require,module,exports){
var escapeRegExp = require('../string/escapeRegExp'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return (isObjectLike(value) && reHostCtor.test(value)) || false;
}

module.exports = isNative;

},{"../internal/isObjectLike":18,"../string/escapeRegExp":35}],25:[function(require,module,exports){
/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (value && type == 'object') || false;
}

module.exports = isObject;

},{}],26:[function(require,module,exports){
var isNative = require('./isNative'),
    shimIsPlainObject = require('../internal/shimIsPlainObject');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Native method references. */
var getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf;

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * **Note:** This method assumes objects created by the `Object` constructor
 * have no inherited enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
  if (!(value && objToString.call(value) == objectTag)) {
    return false;
  }
  var valueOf = value.valueOf,
      objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

  return objProto
    ? (value == objProto || getPrototypeOf(value) == objProto)
    : shimIsPlainObject(value);
};

module.exports = isPlainObject;

},{"../internal/shimIsPlainObject":19,"./isNative":24}],27:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return (isObjectLike(value) && isLength(value.length) && typedArrayTags[objToString.call(value)]) || false;
}

module.exports = isTypedArray;

},{"../internal/isLength":17,"../internal/isObjectLike":18}],28:[function(require,module,exports){
var baseCopy = require('../internal/baseCopy'),
    keysIn = require('../object/keysIn');

/**
 * Converts `value` to a plain object flattening inherited enumerable
 * properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return baseCopy(value, keysIn(value));
}

module.exports = toPlainObject;

},{"../internal/baseCopy":5,"../object/keysIn":32}],29:[function(require,module,exports){
var baseAssign = require('../internal/baseAssign'),
    createAssigner = require('../internal/createAssigner');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources overwrite property assignments of previous sources.
 * If `customizer` is provided it is invoked to produce the assigned values.
 * The `customizer` is bound to `thisArg` and invoked with five arguments;
 * (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
 * // => { 'user': 'fred', 'age': 40 }
 *
 * // using a customizer callback
 * var defaults = _.partialRight(_.assign, function(value, other) {
 *   return typeof value == 'undefined' ? other : value;
 * });
 *
 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var assign = createAssigner(baseAssign);

module.exports = assign;

},{"../internal/baseAssign":4,"../internal/createAssigner":14}],30:[function(require,module,exports){
var arrayCopy = require('../internal/arrayCopy'),
    assign = require('./assign'),
    assignDefaults = require('../internal/assignDefaults');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object for all destination properties that resolve to `undefined`. Once a
 * property is set, additional defaults of the same property are ignored.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
function defaults(object) {
  if (object == null) {
    return object;
  }
  var args = arrayCopy(arguments);
  args.push(assignDefaults);
  return assign.apply(undefined, args);
}

module.exports = defaults;

},{"../internal/arrayCopy":1,"../internal/assignDefaults":3,"./assign":29}],31:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('../lang/isNative'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  if (object) {
    var Ctor = object.constructor,
        length = object.length;
  }
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
     (typeof object != 'function' && (length && isLength(length)))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/isLength":17,"../internal/shimKeys":20,"../lang/isNative":24,"../lang/isObject":25}],32:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject'),
    support = require('../support');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":15,"../internal/isLength":17,"../lang/isArguments":22,"../lang/isArray":23,"../lang/isObject":25,"../support":36}],33:[function(require,module,exports){
var baseMerge = require('../internal/baseMerge'),
    createAssigner = require('../internal/createAssigner');

/**
 * Recursively merges own enumerable properties of the source object(s), that
 * don't resolve to `undefined` into the destination object. Subsequent sources
 * overwrite property assignments of previous sources. If `customizer` is
 * provided it is invoked to produce the merged values of the destination and
 * source properties. If `customizer` returns `undefined` merging is handled
 * by the method instead. The `customizer` is bound to `thisArg` and invoked
 * with five arguments; (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize merging properties.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var users = {
 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
 * };
 *
 * var ages = {
 *   'data': [{ 'age': 36 }, { 'age': 40 }]
 * };
 *
 * _.merge(users, ages);
 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
 *
 * // using a customizer callback
 * var object = {
 *   'fruits': ['apple'],
 *   'vegetables': ['beet']
 * };
 *
 * var other = {
 *   'fruits': ['banana'],
 *   'vegetables': ['carrot']
 * };
 *
 * _.merge(object, other, function(a, b) {
 *   if (_.isArray(a)) {
 *     return a.concat(b);
 *   }
 * });
 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
 */
var merge = createAssigner(baseMerge);

module.exports = merge;

},{"../internal/baseMerge":9,"../internal/createAssigner":14}],34:[function(require,module,exports){
var baseValues = require('../internal/baseValues'),
    keys = require('./keys');

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return baseValues(object, keys(object));
}

module.exports = values;

},{"../internal/baseValues":12,"./keys":31}],35:[function(require,module,exports){
var baseToString = require('../internal/baseToString');

/**
 * Used to match `RegExp` special characters.
 * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
 * for more details.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
 * "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = escapeRegExp;

},{"../internal/baseToString":11}],36:[function(require,module,exports){
(function (global){
var isNative = require('./lang/isNative');

/** Used to detect functions containing a `this` reference. */
var reThis = /\bthis\b/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to detect DOM support. */
var document = (document = global.window) && document.document;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

(function(x) {

  /**
   * Detect if functions can be decompiled by `Function#toString`
   * (all but Firefox OS certified apps, older Opera mobile browsers, and
   * the PlayStation 3; forced `false` for Windows 8 apps).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcDecomp = !isNative(global.WinRTError) && reThis.test(function() { return this; });

  /**
   * Detect if `Function#name` is supported (all but IE).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcNames = typeof Function.name == 'string';

  /**
   * Detect if the DOM is supported.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.dom = document.createDocumentFragment().nodeType === 11;
  } catch(e) {
    support.dom = false;
  }

  /**
   * Detect if `arguments` object indexes are non-enumerable.
   *
   * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
   * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
   * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
   * checks for indexes that exceed their function's formal parameters with
   * associated values of `0`.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
  } catch(e) {
    support.nonEnumArgs = true;
  }
}(0, 0));

module.exports = support;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./lang/isNative":24}],37:[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],38:[function(require,module,exports){
  /* globals require, module */

  'use strict';

  /**
   * Module dependencies.
   */

  var pathtoRegexp = require('path-to-regexp');

  /**
   * Module exports.
   */

  module.exports = page;

  /**
   * To work properly with the URL
   * history.location generated polyfill in https://github.com/devote/HTML5-History-API
   */

  var location = ('undefined' !== typeof window) && (window.history.location || window.location);

  /**
   * Perform initial dispatch.
   */

  var dispatch = true;

  /**
   * Decode URL components (query string, pathname, hash).
   * Accommodates both regular percent encoding and x-www-form-urlencoded format.
   */
  var decodeURLComponents = true;

  /**
   * Base path.
   */

  var base = '';

  /**
   * Running flag.
   */

  var running;

  /**
   * HashBang option
   */

  var hashbang = false;

  /**
   * Previous context, for capturing
   * page exit events.
   */

  var prevContext;

  /**
   * Register `path` with callback `fn()`,
   * or route `path`, or redirection,
   * or `page.start()`.
   *
   *   page(fn);
   *   page('*', fn);
   *   page('/user/:id', load, user);
   *   page('/user/' + user.id, { some: 'thing' });
   *   page('/user/' + user.id);
   *   page('/from', '/to')
   *   page();
   *
   * @param {String|Function} path
   * @param {Function} fn...
   * @api public
   */

  function page(path, fn) {
    // <callback>
    if ('function' === typeof path) {
      return page('*', path);
    }

    // route <path> to <callback ...>
    if ('function' === typeof fn) {
      var route = new Route(path);
      for (var i = 1; i < arguments.length; ++i) {
        page.callbacks.push(route.middleware(arguments[i]));
      }
      // show <path> with [state]
    } else if ('string' === typeof path) {
      page['string' === typeof fn ? 'redirect' : 'show'](path, fn);
      // start [options]
    } else {
      page.start(path);
    }
  }

  /**
   * Callback functions.
   */

  page.callbacks = [];
  page.exits = [];

  /**
   * Current path being processed
   * @type {String}
   */
  page.current = '';

  /**
   * Number of pages navigated to.
   * @type {number}
   *
   *     page.len == 0;
   *     page('/login');
   *     page.len == 1;
   */

  page.len = 0;

  /**
   * Get or set basepath to `path`.
   *
   * @param {String} path
   * @api public
   */

  page.base = function(path) {
    if (0 === arguments.length) return base;
    base = path;
  };

  /**
   * Bind with the given `options`.
   *
   * Options:
   *
   *    - `click` bind to click events [true]
   *    - `popstate` bind to popstate [true]
   *    - `dispatch` perform initial dispatch [true]
   *
   * @param {Object} options
   * @api public
   */

  page.start = function(options) {
    options = options || {};
    if (running) return;
    running = true;
    if (false === options.dispatch) dispatch = false;
    if (false === options.decodeURLComponents) decodeURLComponents = false;
    if (false !== options.popstate) window.addEventListener('popstate', onpopstate, false);
    if (false !== options.click) window.addEventListener('click', onclick, false);
    if (true === options.hashbang) hashbang = true;
    if (!dispatch) return;
    var url = (hashbang && ~location.hash.indexOf('#!')) ? location.hash.substr(2) + location.search : location.pathname + location.search + location.hash;
    page.replace(url, null, true, dispatch);
  };

  /**
   * Unbind click and popstate event handlers.
   *
   * @api public
   */

  page.stop = function() {
    if (!running) return;
    page.current = '';
    page.len = 0;
    running = false;
    window.removeEventListener('click', onclick, false);
    window.removeEventListener('popstate', onpopstate, false);
  };

  /**
   * Show `path` with optional `state` object.
   *
   * @param {String} path
   * @param {Object} state
   * @param {Boolean} dispatch
   * @return {Context}
   * @api public
   */

  page.show = function(path, state, dispatch, push) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    if (false !== dispatch) page.dispatch(ctx);
    if (false !== ctx.handled && false !== push) ctx.pushState();
    return ctx;
  };

  /**
   * Goes back in the history
   * Back should always let the current route push state and then go back.
   *
   * @param {String} path - fallback path to go back if no more history exists, if undefined defaults to page.base
   * @param {Object} [state]
   * @api public
   */

  page.back = function(path, state) {
    if (page.len > 0) {
      // this may need more testing to see if all browsers
      // wait for the next tick to go back in history
      history.back();
      page.len--;
    } else if (path) {
      setTimeout(function() {
        page.show(path, state);
      });
    }else{
      setTimeout(function() {
        page.show(base, state);
      });
    }
  };


  /**
   * Register route to redirect from one path to other
   * or just redirect to another route
   *
   * @param {String} from - if param 'to' is undefined redirects to 'from'
   * @param {String} [to]
   * @api public
   */
  page.redirect = function(from, to) {
    // Define route from a path to another
    if ('string' === typeof from && 'string' === typeof to) {
      page(from, function(e) {
        setTimeout(function() {
          page.replace(to);
        }, 0);
      });
    }

    // Wait for the push state and replace it with another
    if ('string' === typeof from && 'undefined' === typeof to) {
      setTimeout(function() {
        page.replace(from);
      }, 0);
    }
  };

  /**
   * Replace `path` with optional `state` object.
   *
   * @param {String} path
   * @param {Object} state
   * @return {Context}
   * @api public
   */


  page.replace = function(path, state, init, dispatch) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    ctx.init = init;
    ctx.save(); // save before dispatching, which may redirect
    if (false !== dispatch) page.dispatch(ctx);
    return ctx;
  };

  /**
   * Dispatch the given `ctx`.
   *
   * @param {Object} ctx
   * @api private
   */

  page.dispatch = function(ctx) {
    var prev = prevContext,
      i = 0,
      j = 0;

    prevContext = ctx;

    function nextExit() {
      var fn = page.exits[j++];
      if (!fn) return nextEnter();
      fn(prev, nextExit);
    }

    function nextEnter() {
      var fn = page.callbacks[i++];

      if (ctx.path !== page.current) {
        ctx.handled = false;
        return;
      }
      if (!fn) return unhandled(ctx);
      fn(ctx, nextEnter);
    }

    if (prev) {
      nextExit();
    } else {
      nextEnter();
    }
  };

  /**
   * Unhandled `ctx`. When it's not the initial
   * popstate then redirect. If you wish to handle
   * 404s on your own use `page('*', callback)`.
   *
   * @param {Context} ctx
   * @api private
   */

  function unhandled(ctx) {
    if (ctx.handled) return;
    var current;

    if (hashbang) {
      current = base + location.hash.replace('#!', '');
    } else {
      current = location.pathname + location.search;
    }

    if (current === ctx.canonicalPath) return;
    page.stop();
    ctx.handled = false;
    location.href = ctx.canonicalPath;
  }

  /**
   * Register an exit route on `path` with
   * callback `fn()`, which will be called
   * on the previous context when a new
   * page is visited.
   */
  page.exit = function(path, fn) {
    if (typeof path === 'function') {
      return page.exit('*', path);
    }

    var route = new Route(path);
    for (var i = 1; i < arguments.length; ++i) {
      page.exits.push(route.middleware(arguments[i]));
    }
  };

  /**
   * Remove URL encoding from the given `str`.
   * Accommodates whitespace in both x-www-form-urlencoded
   * and regular percent-encoded form.
   *
   * @param {str} URL component to decode
   */
  function decodeURLEncodedURIComponent(val) {
    if (typeof val !== 'string') { return val; }
    return decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
  }

  /**
   * Initialize a new "request" `Context`
   * with the given `path` and optional initial `state`.
   *
   * @param {String} path
   * @param {Object} state
   * @api public
   */

  function Context(path, state) {
    if ('/' === path[0] && 0 !== path.indexOf(base)) path = base + (hashbang ? '#!' : '') + path;
    var i = path.indexOf('?');

    this.canonicalPath = path;
    this.path = path.replace(base, '') || '/';
    if (hashbang) this.path = this.path.replace('#!', '') || '/';

    this.title = document.title;
    this.state = state || {};
    this.state.path = path;
    this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
    this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
    this.params = {};

    // fragment
    this.hash = '';
    if (!hashbang) {
      if (!~this.path.indexOf('#')) return;
      var parts = this.path.split('#');
      this.path = parts[0];
      this.hash = decodeURLEncodedURIComponent(parts[1]) || '';
      this.querystring = this.querystring.split('#')[0];
    }
  }

  /**
   * Expose `Context`.
   */

  page.Context = Context;

  /**
   * Push state.
   *
   * @api private
   */

  Context.prototype.pushState = function() {
    page.len++;
    history.pushState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Save the context state.
   *
   * @api public
   */

  Context.prototype.save = function() {
    history.replaceState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Initialize `Route` with the given HTTP `path`,
   * and an array of `callbacks` and `options`.
   *
   * Options:
   *
   *   - `sensitive`    enable case-sensitive routes
   *   - `strict`       enable strict matching for trailing slashes
   *
   * @param {String} path
   * @param {Object} options.
   * @api private
   */

  function Route(path, options) {
    options = options || {};
    this.path = (path === '*') ? '(.*)' : path;
    this.method = 'GET';
    this.regexp = pathtoRegexp(this.path,
      this.keys = [],
      options.sensitive,
      options.strict);
  }

  /**
   * Expose `Route`.
   */

  page.Route = Route;

  /**
   * Return route middleware with
   * the given callback `fn()`.
   *
   * @param {Function} fn
   * @return {Function}
   * @api public
   */

  Route.prototype.middleware = function(fn) {
    var self = this;
    return function(ctx, next) {
      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);
      next();
    };
  };

  /**
   * Check if this route matches `path`, if so
   * populate `params`.
   *
   * @param {String} path
   * @param {Object} params
   * @return {Boolean}
   * @api private
   */

  Route.prototype.match = function(path, params) {
    var keys = this.keys,
      qsIndex = path.indexOf('?'),
      pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
      m = this.regexp.exec(decodeURIComponent(pathname));

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = keys[i - 1];
      var val = decodeURLEncodedURIComponent(m[i]);
      if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
        params[key.name] = val;
      }
    }

    return true;
  };

  /**
   * Handle "populate" events.
   */

  function onpopstate(e) {
    if (e.state) {
      var path = e.state.path;
      page.replace(path, e.state);
    } else {
      page.show(location.pathname + location.hash, undefined, undefined, false);
    }
  }

  /**
   * Handle "click" events.
   */

  function onclick(e) {

    if (1 !== which(e)) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;



    // ensure link
    var el = e.target;
    while (el && 'A' !== el.nodeName) el = el.parentNode;
    if (!el || 'A' !== el.nodeName) return;



    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (el.getAttribute('download') || el.getAttribute('rel') === 'external') return;

    // ensure non-hash for the same path
    var link = el.getAttribute('href');
    if (!hashbang && el.pathname === location.pathname && (el.hash || '#' === link)) return;



    // Check for mailto: in the href
    if (link && link.indexOf('mailto:') > -1) return;

    // check target
    if (el.target) return;

    // x-origin
    if (!sameOrigin(el.href)) return;



    // rebuild path
    var path = el.pathname + el.search + (el.hash || '');

    // same page
    var orig = path;

    path = path.replace(base, '');
    if (hashbang) path = path.replace('#!', '');



    if (base && orig === path) return;

    e.preventDefault();
    page.show(orig);
  }

  /**
   * Event button.
   */

  function which(e) {
    e = e || window.event;
    return null === e.which ? e.button : e.which;
  }

  /**
   * Check if `href` is the same origin.
   */

  function sameOrigin(href) {
    var origin = location.protocol + '//' + location.hostname;
    if (location.port) origin += ':' + location.port;
    return (href && (0 === href.indexOf(origin)));
  }

  page.sameOrigin = sameOrigin;

},{"path-to-regexp":39}],39:[function(require,module,exports){
var isArray = require('isarray');

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]
  // "/route(\\d+)" => [undefined, undefined, undefined, "\d+", undefined]
  '([\\/.])?(?:\\:(\\w+)(?:\\(((?:\\\\.|[^)])*)\\))?|\\(((?:\\\\.|[^)])*)\\))([+*?])?',
  // Match regexp special characters that are always escaped.
  '([.+*?=^!:${}()[\\]|\\/])'
].join('|'), 'g');

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re;
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
function flags (options) {
  return options.sensitive ? '' : 'i';
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name:      i,
        delimiter: null,
        optional:  false,
        repeat:    false
      });
    }
  }

  return attachKeys(path, keys);
}

/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));
  return attachKeys(regexp, keys);
}

/**
 * Replace the specific tags with regexp strings.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @return {String}
 */
function replacePath (path, keys) {
  var index = 0;

  function replace (_, escaped, prefix, key, capture, group, suffix, escape) {
    if (escaped) {
      return escaped;
    }

    if (escape) {
      return '\\' + escape;
    }

    var repeat   = suffix === '+' || suffix === '*';
    var optional = suffix === '?' || suffix === '*';

    keys.push({
      name:      key || index++,
      delimiter: prefix || '/',
      optional:  optional,
      repeat:    repeat
    });

    prefix = prefix ? ('\\' + prefix) : '';
    capture = escapeGroup(capture || group || '[^' + (prefix || '\\/') + ']+?');

    if (repeat) {
      capture = capture + '(?:' + prefix + capture + ')*';
    }

    if (optional) {
      return '(?:' + prefix + '(' + capture + '))?';
    }

    // Basic parameter support.
    return prefix + '(' + capture + ')';
  }

  return path.replace(PATH_REGEXP, replace);
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
function pathToRegexp (path, keys, options) {
  keys = keys || [];

  if (!isArray(keys)) {
    options = keys;
    keys = [];
  } else if (!options) {
    options = {};
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys, options);
  }

  if (isArray(path)) {
    return arrayToRegexp(path, keys, options);
  }

  var strict = options.strict;
  var end = options.end !== false;
  var route = replacePath(path, keys);
  var endsWithSlash = path.charAt(path.length - 1) === '/';

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}

},{"isarray":40}],40:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],41:[function(require,module,exports){
/* Riot v2.0.11, @license MIT, (c) 2015 Muut Inc. + contributors */

;(function() {

  var riot = { version: 'v2.0.11', settings: {} }

  'use strict'

riot.observable = function(el) {

  el = el || {}

  var callbacks = {},
      _id = 0

  el.on = function(events, fn) {
    if (typeof fn == 'function') {
      fn._id = typeof fn._id == 'undefined' ? _id++ : fn._id

      events.replace(/\S+/g, function(name, pos) {
        (callbacks[name] = callbacks[name] || []).push(fn)
        fn.typed = pos > 0
      })
    }
    return el
  }

  el.off = function(events, fn) {
    if (events == '*') callbacks = {}
    else {
      events.replace(/\S+/g, function(name) {
        if (fn) {
          var arr = callbacks[name]
          for (var i = 0, cb; (cb = arr && arr[i]); ++i) {
            if (cb._id == fn._id) { arr.splice(i, 1); i-- }
          }
        } else {
          callbacks[name] = []
        }
      })
    }
    return el
  }

  // only single event supported
  el.one = function(name, fn) {
    if (fn) fn.one = 1
    return el.on(name, fn)
  }

  el.trigger = function(name) {
    var args = [].slice.call(arguments, 1),
        fns = callbacks[name] || []

    for (var i = 0, fn; (fn = fns[i]); ++i) {
      if (!fn.busy) {
        fn.busy = 1
        fn.apply(el, fn.typed ? [name].concat(args) : args)
        if (fn.one) { fns.splice(i, 1); i-- }
         else if (fns[i] !== fn) { i-- } // Makes self-removal possible during iteration
        fn.busy = 0
      }
    }

    return el
  }

  return el

}
;(function(riot, evt) {

  // browsers only
  if (!this.top) return

  var loc = location,
      fns = riot.observable(),
      win = window,
      current

  function hash() {
    return loc.hash.slice(1)
  }

  function parser(path) {
    return path.split('/')
  }

  function emit(path) {
    if (path.type) path = hash()

    if (path != current) {
      fns.trigger.apply(null, ['H'].concat(parser(path)))
      current = path
    }
  }

  var r = riot.route = function(arg) {
    // string
    if (arg[0]) {
      loc.hash = arg
      emit(arg)

    // function
    } else {
      fns.on('H', arg)
    }
  }

  r.exec = function(fn) {
    fn.apply(null, parser(hash()))
  }

  r.parser = function(fn) {
    parser = fn
  }

  win.addEventListener ? win.addEventListener(evt, emit, false) : win.attachEvent('on' + evt, emit)

})(riot, 'hashchange')
/*

//// How it works?


Three ways:

1. Expressions: tmpl('{ value }', data).
   Returns the result of evaluated expression as a raw object.

2. Templates: tmpl('Hi { name } { surname }', data).
   Returns a string with evaluated expressions.

3. Filters: tmpl('{ show: !done, highlight: active }', data).
   Returns a space separated list of trueish keys (mainly
   used for setting html classes), e.g. "show highlight".


// Template examples

tmpl('{ title || "Untitled" }', data)
tmpl('Results are { results ? "ready" : "loading" }', data)
tmpl('Today is { new Date() }', data)
tmpl('{ message.length > 140 && "Message is too long" }', data)
tmpl('This item got { Math.round(rating) } stars', data)
tmpl('<h1>{ title }</h1>{ body }', data)


// Falsy expressions in templates

In templates (as opposed to single expressions) all falsy values
except zero (undefined/null/false) will default to empty string:

tmpl('{ undefined } - { false } - { null } - { 0 }', {})
// will return: " - - - 0"

*/


var brackets = (function(orig, s, b) {
  return function(x) {

    // make sure we use the current setting
    s = riot.settings.brackets || orig
    if (b != s) b = s.split(' ')

    // if regexp given, rewrite it with current brackets (only if differ from default)
    // else, get brackets
    return x && x.test
      ? s == orig
        ? x : RegExp(x.source
                      .replace(/\{/g, b[0].replace(/(?=.)/g, '\\'))
                      .replace(/\}/g, b[1].replace(/(?=.)/g, '\\')),
                    x.global ? 'g' : '')
      : b[x]

  }
})('{ }')


var tmpl = (function() {

  var cache = {},
      re_expr = /({[\s\S]*?})/,
      re_vars = /(['"\/]).*?[^\\]\1|\.\w*|\w*:|\b(?:(?:new|typeof|in|instanceof) |(?:this|true|false|null|undefined)\b|function *\()|([a-z_]\w*)/gi
              // [ 1               ][ 2  ][ 3 ][ 4                                                                                  ][ 5       ]
              // find variable names:
              // 1. skip quoted strings and regexps: "a b", 'a b', 'a \'b\'', /a b/
              // 2. skip object properties: .name
              // 3. skip object literals: name:
              // 4. skip javascript keywords
              // 5. match var name

  // build a template (or get it from cache), render with data
  return function(str, data) {
    return str && (cache[str] = cache[str] || tmpl(str))(data)
  }


  // create a template instance

  function tmpl(s, p) {

    // default template string to {}
    p = (s || (brackets(0) + brackets(1)))

      // temporarily convert \{ and \} to a non-character
      .replace(brackets(/\\{/), '\uFFF0')
      .replace(brackets(/\\}/), '\uFFF1')

      // split string to expression and non-expresion parts
      .split(brackets(re_expr))

    return new Function('d', 'return ' + (

      // is it a single expression or a template? i.e. {x} or <b>{x}</b>
      !p[0] && !p[2] && !p[3]

        // if expression, evaluate it
        ? expr(p[1])

        // if template, evaluate all expressions in it
        : '[' + p.map(function(s, i) {

            // is it an expression or a string (every second part is an expression)
          return i % 2

              // evaluate the expressions
              ? expr(s, 1)

              // process string parts of the template:
              : '"' + s

                  // preserve new lines
                  .replace(/\n/g, '\\n')

                  // escape quotes
                  .replace(/"/g, '\\"')

                + '"'

        }).join(',') + '].join("")'
      )

      // bring escaped { and } back
      .replace(/\uFFF0/g, brackets(0))
      .replace(/\uFFF1/g, brackets(1))

    + ';')

  }


  // parse { ... } expression

  function expr(s, n) {
    s = s

      // convert new lines to spaces
      .replace(/\n/g, ' ')

      // trim whitespace, curly brackets, strip comments
      .replace(brackets(/^[{ ]+|[ }]+$|\/\*.+?\*\//g), '')

    // is it an object literal? i.e. { key : value }
    return /^\s*[\w- "']+ *:/.test(s)

      // if object literal, return trueish keys
      // e.g.: { show: isOpen(), done: item.done } -> "show done"
      ? '[' + s.replace(/\W*([\w- ]+)\W*:([^,]+)/g, function(_, k, v) {

        return v.replace(/[^&|=!><]+/g, wrap) + '?"' + k.trim() + '":"",'

      }) + '].join(" ")'

      // if js expression, evaluate as javascript
      : wrap(s, n)

  }


  // execute js w/o breaking on errors or undefined vars

  function wrap(s, nonull) {
    s = s.trim()
    return !s ? '' : '(function(v){try{v='

        // prefix vars (name => data.name)
        + (s.replace(re_vars, function(s, _, v) { return v ? '(d.'+v+'===undefined?window.'+v+':d.'+v+')' : s })

          // break the expression if its empty (resulting in undefined value)
          || 'x')

      + '}finally{return '

        // default to empty string for falsy values except zero
        + (nonull ? '!v&&v!==0?"":v' : 'v')

      + '}}).call(d)'
  }

})()
// { key, i in items} -> { key, i, items }
function loopKeys(expr) {
  var ret = { val: expr },
      els = expr.split(/\s+in\s+/)

  if (els[1]) {
    ret.val = brackets(0) + els[1]
    els = els[0].slice(brackets(0).length).trim().split(/,\s*/)
    ret.key = els[0]
    ret.pos = els[1]
  }

  return ret
}

function mkitem(expr, key, val) {
  var item = {}
  item[expr.key] = key
  if (expr.pos) item[expr.pos] = val
  return item
}


/* Beware: heavy stuff */
function _each(dom, parent, expr) {

  remAttr(dom, 'each')

  var template = dom.outerHTML,
      prev = dom.previousSibling,
      root = dom.parentNode,
      rendered = [],
      tags = [],
      checksum

  expr = loopKeys(expr)

  function add(pos, item, tag) {
    rendered.splice(pos, 0, item)
    tags.splice(pos, 0, tag)
  }


  // clean template code after update (and let walk finish it's parse)
  parent.one('update', function() {
    root.removeChild(dom)

  }).one('premount', function() {
    if (root.stub) root = parent.root

  }).on('update', function() {

    var items = tmpl(expr.val, parent)
    if (!items) return

    // object loop. any changes cause full redraw
    if (!Array.isArray(items)) {
      var testsum = JSON.stringify(items)
      if (testsum == checksum) return
      checksum = testsum

      // clear old items
      each(tags, function(tag) { tag.unmount() })
      rendered = []
      tags = []

      items = Object.keys(items).map(function(key) {
        return mkitem(expr, key, items[key])
      })

    }

    // unmount redundant
    each(arrDiff(rendered, items), function(item) {
      var pos = rendered.indexOf(item),
          tag = tags[pos]

      if (tag) {
        tag.unmount()
        rendered.splice(pos, 1)
        tags.splice(pos, 1)
      }

    })

    // mount new / reorder
    var nodes = root.childNodes,
        prev_index = [].indexOf.call(nodes, prev)

    each(items, function(item, i) {

      // start index search from position based on the current i
      var pos = items.indexOf(item, i),
          oldPos = rendered.indexOf(item, i)

      // if not found, search backwards from current i position
      pos < 0 && (pos = items.lastIndexOf(item, i))
      oldPos < 0 && (oldPos = rendered.lastIndexOf(item, i))

      // mount new
      if (oldPos < 0) {
        if (!checksum && expr.key) item = mkitem(expr, item, pos)

        var tag = new Tag({ tmpl: template }, {
          before: nodes[prev_index + 1 + pos],
          parent: parent,
          root: root,
          loop: true,
          item: item
        })

        return add(pos, item, tag)
      }

      // change pos value
      if (expr.pos && tags[oldPos][expr.pos] != pos) {
        tags[oldPos].one('update', function(item) {
          item[expr.pos] = pos
        })
        tags[oldPos].update()
      }

      // reorder
      if (pos != oldPos) {
        root.insertBefore(nodes[prev_index + oldPos + 1], nodes[prev_index + pos + 1])
        return add(pos, rendered.splice(oldPos, 1)[0], tags.splice(oldPos, 1)[0])
      }

    })

    rendered = items.slice()

  })

}

function parseNamedElements(root, tag, expressions) {
  walk(root, function(dom) {
    if (dom.nodeType == 1) {
      each(dom.attributes, function(attr) {
        if (/^(name|id)$/.test(attr.name)) tag[attr.value] = dom
      })
    }
  })
}

function parseLayout(root, tag, expressions) {

  function addExpr(dom, val, extra) {
    if (val.indexOf(brackets(0)) >= 0) {
      var expr = { dom: dom, expr: val }
      expressions.push(extend(expr, extra))
    }
  }

  walk(root, function(dom) {
    var type = dom.nodeType

    // text node
    if (type == 3 && dom.parentNode.tagName != 'STYLE') addExpr(dom, dom.nodeValue)
    if (type != 1) return

    /* element */

    // loop
    var attr = dom.getAttribute('each')
    if (attr) { _each(dom, tag, attr); return false }

    // attribute expressions
    each(dom.attributes, function(attr) {
      var name = attr.name,
          bool = name.split('__')[1]

      addExpr(dom, attr.value, { attr: bool || name, bool: bool })
      if (bool) { remAttr(dom, name); return false }

    })

    // custom child tag
    var impl = tag_impl[dom.tagName.toLowerCase()]

    if (impl) {
      impl = new Tag(impl, { root: dom, parent: tag })
      return false
    }

  })
}

function Tag(impl, conf) {

  var self = riot.observable(this),
      opts = inherit(conf.opts) || {},
      dom = mkdom(impl.tmpl),
      parent = conf.parent,
      is_loop = conf.loop,
      expressions = [],
      root = conf.root,
      item = conf.item,
      attr = {},
      loop_dom

  extend(this, { parent: parent, root: root, opts: opts }, item)

  // grab attributes
  each(root.attributes, function(el) {
    attr[el.name] = el.value
  })

  // options
  function updateOpts(rem_attr) {
    each(Object.keys(attr), function(name) {
      opts[name] = tmpl(attr[name], parent || self)
    })
  }

  this.update = function(data, init) {
    extend(self, data, item)
    updateOpts()
    self.trigger('update', item)
    update(expressions, self, item)
    self.trigger('updated')
  }

  this.unmount = function() {
    var el = is_loop ? loop_dom : root,
        p = el.parentNode

    if (p) {
      if (parent) p.removeChild(el)
      else while (root.firstChild) root.removeChild(root.firstChild)
      self.trigger('unmount')
      parent && parent.off('update', self.update).off('unmount', self.unmount)
      self.off('*')
    }

  }

  function mount() {

    // internal use only, fixes #403
    self.trigger('premount')

    if (is_loop) {
      loop_dom = dom.firstChild
      root.insertBefore(loop_dom, conf.before || null) // null needed for IE8

    } else {
      while (dom.firstChild) root.appendChild(dom.firstChild)
    }

    if (root.stub) self.root = root = parent.root

    // one way data flow: propagate updates and unmounts downwards from parent to children
    parent && parent.on('update', self.update).one('unmount', self.unmount)

    self.trigger('mount')
  }

  updateOpts()

  // named elements available for fn
  parseNamedElements(dom, this)

  // fn (initialiation)
  if (impl.fn) impl.fn.call(this, opts)

  // parse layout after init. fn may calculate args for nested custom tags
  parseLayout(dom, this, expressions)

  this.update()
  mount()

}

function setEventHandler(name, handler, dom, tag, item) {

  dom[name] = function(e) {

    // cross browser event fix
    e = e || window.event
    e.which = e.which || e.charCode || e.keyCode
    e.target = e.target || e.srcElement
    e.currentTarget = dom
    e.item = item

    // prevent default behaviour (by default)
    if (handler.call(tag, e) !== true) {
      e.preventDefault && e.preventDefault()
      e.returnValue = false
    }

    var el = item ? tag.parent : tag
    el.update()

  }

}

// used by if- attribute
function insertTo(root, node, before) {
  if (root) {
    root.insertBefore(before, node)
    root.removeChild(node)
  }
}

// item = currently looped item
function update(expressions, tag, item) {

  each(expressions, function(expr) {

    var dom = expr.dom,
        attr_name = expr.attr,
        value = tmpl(expr.expr, tag)

    if (value == null) value = ''

    // no change
    if (expr.value === value) return
    expr.value = value

    // text node
    if (!attr_name) return dom.nodeValue = value

    // remove original attribute
    remAttr(dom, attr_name)

    // event handler
    if (typeof value == 'function') {
      setEventHandler(attr_name, value, dom, tag, item)

    // if- conditional
    } else if (attr_name == 'if') {
      var stub = expr.stub

      // add to DOM
      if (value) {
        stub && insertTo(stub.parentNode, stub, dom)

      // remove from DOM
      } else {
        stub = expr.stub = stub || document.createTextNode('')
        insertTo(dom.parentNode, dom, stub)
      }

    // show / hide
    } else if (/^(show|hide)$/.test(attr_name)) {
      if (attr_name == 'hide') value = !value
      dom.style.display = value ? '' : 'none'

    // field value
    } else if (attr_name == 'value') {
      dom.value = value

    // <img src="{ expr }">
    } else if (attr_name.slice(0, 4) == 'riot') {
      attr_name = attr_name.slice(5)
      value ? dom.setAttribute(attr_name, value) : remAttr(dom, attr_name)

    } else {
      if (expr.bool) {
        dom[attr_name] = value
        if (!value) return
        value = attr_name
      }

      if (typeof value != 'object') dom.setAttribute(attr_name, value)

    }

  })

}
function each(els, fn) {
  for (var i = 0, len = (els || []).length, el; i < len; i++) {
    el = els[i]
    // return false -> reomve current item during loop
    if (el != null && fn(el, i) === false) i--
  }
  return els
}

function remAttr(dom, name) {
  dom.removeAttribute(name)
}

// max 2 from objects allowed
function extend(obj, from, from2) {
  from && each(Object.keys(from), function(key) {
    obj[key] = from[key]
  })
  return from2 ? extend(obj, from2) : obj
}

function mkdom(template) {
  var tag_name = template.trim().slice(1, 3).toLowerCase(),
      root_tag = /td|th/.test(tag_name) ? 'tr' : tag_name == 'tr' ? 'tbody' : 'div',
      el = document.createElement(root_tag)

  el.stub = true
  el.innerHTML = template
  return el
}

function walk(dom, fn) {
  if (dom) {
    if (fn(dom) === false) walk(dom.nextSibling, fn)
    else {
      dom = dom.firstChild

      while (dom) {
        walk(dom, fn)
        dom = dom.nextSibling
      }
    }
  }
}

function arrDiff(arr1, arr2) {
  return arr1.filter(function(el) {
    return arr2.indexOf(el) < 0
  })
}

function inherit(parent) {
  function Child() {}
  Child.prototype = parent
  return new Child()
}


/*
 Virtual dom is an array of custom tags on the document.
 Updates and unmounts propagate downwards from parent to children.
*/

var virtual_dom = [],
    tag_impl = {}

function injectStyle(css) {
  var node = document.createElement('style')
  node.innerHTML = css
  document.head.appendChild(node)
}

function mountTo(root, tagName, opts) {
  var tag = tag_impl[tagName]

  if (tag && root) {
    tag = new Tag(tag, { root: root, opts: opts })
    virtual_dom.push(tag)
    return tag.on('unmount', function() {
      virtual_dom.splice(virtual_dom.indexOf(tag), 1)
    })
  }
}

riot.tag = function(name, html, css, fn) {
  if (typeof css == 'function') fn = css
  else if (css) injectStyle(css)
  tag_impl[name] = { name: name, tmpl: html, fn: fn }
}

riot.mount = function(selector, tagName, opts) {
  if (selector == '*') selector = Object.keys(tag_impl).join(', ')
  if (typeof tagName == 'object') { opts = tagName; tagName = 0 }

  var tags = []

  function push(root) {
    var name = tagName || root.tagName.toLowerCase(),
        tag = mountTo(root, name, opts)

    if (tag) tags.push(tag)
  }

  // DOM node
  if (selector.tagName) {
    push(selector)
    return tags[0]

  // selector
  } else {
    each(document.querySelectorAll(selector), push)
    return tags
  }

}

// update everything
riot.update = function() {
  return each(virtual_dom, function(tag) {
    tag.update()
  })
}

// @depreciated
riot.mountTo = riot.mount


  
  // share methods for other riot parts, e.g. compiler
  riot.util = { brackets: brackets, tmpl: tmpl }

  // support CommonJS
  if (typeof exports === 'object')
    module.exports = riot

  // support AMD
  else if (typeof define === 'function' && define.amd)
    define(function() { return riot })

  // support browser
  else
    this.riot = riot

})();

},{}],42:[function(require,module,exports){
var riot = require('riot');

/*
 * Inspired by https://github.com/jimsparkman/RiotControl
 * Events triggered by the dispatcher or any registered store are fanned out to
 * all listeners
 */
function Dispatcher() {
  riot.observable(this);

  var triggers = []

  function callTriggers() {
    var args = [].slice.call(arguments);
    console.log('\u2022 triggering ' + args.join(', '))
    triggers.forEach(function(t){
      t.trigger.apply(null, args)
    });
  };

  this.addStore = function(store) {
    triggers.push({trigger: store.trigger, name: store.constructor.name});
    store.trigger = callTriggers;
  }

  this.addStore(this);
};

module.exports = new Dispatcher();

},{"riot":41}],43:[function(require,module,exports){
/*
 * Simple wrapper around post objects.
 */
function Post(opts) {
  var defaults = require('lodash/object/defaults')

  defaults(this, opts, {
    date: new Date(),
    title: '',
    desc: '',
    embed: {},
    favorited: false,
    isPersisted: false
  })
}

Post.demo = function() {
  return new Post({
    title: 'Oh my god!',
    desc: 'Jonathan Joestar Adventures',
    embed: {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=P9J5tYShNY8',
      videoId: 'P9J5tYShNY8'
    },
    isPersisted: true
  });
}

Post.prototype.update = function(opts) {
  var merge = require('lodash/object/merge')

  merge(this, opts)

  // try to update the embed type, if valid.
  if (opts.embed && opts.embed.url) {
    var youtubeMatch = (/youtube.com.+\?v=([a-zA-z0-9]+)/i).exec(opts.embed.url)

    if (youtubeMatch.length) {
      this.embed.type = 'youtube'
      this.embed.videoId = youtubeMatch[1]
    } else {
      this.embed.type = undefined
    }
  }

  return this
}

Post.prototype.save = function(callback) {
  this.isPersisted = true
  if (callback) callback(this)
}

Post.prototype.validationResult = function() {
  var r = { errors: [], isValid: true }

  if (!this.date instanceof Date) {
    r.errors.date = 'date is invalid'
    r.isValid = false
  }

  if (!this.title || this.title.length == 0) {
    r.errors.title = 'title can\'t be blank'
    r.isValid = false
  }

  if (!this.embed || !this.embed.type) {
    r.errors.url = 'the embed url is invalid'
    r.isValid = false
  }

  return r;
}

module.exports = Post

},{"lodash/object/defaults":30,"lodash/object/merge":33}],44:[function(require,module,exports){
var riot = require('riot')
var Post = require('./post')

/*
 * An observable Posts store.
 * Interaction with the rest of the app will be done through
 * the Dispatcher (RiotController)
 */
function Posts() {
  riot.observable(this)

  var self = this

  this.on('posts:user:load', function(){
    self.trigger('posts:user:available', [Post.demo()])
  })
}

module.exports = Posts

},{"./post":43,"riot":41}],45:[function(require,module,exports){
/*
 * Simple wrapper around user objects.
 */
function User(opts) {
}

module.exports = User

},{}],46:[function(require,module,exports){
var riot = require('riot')
var User = require('./user')

/*
 * An observable Users store.
 * Interaction with the rest of the app will be done through
 * the Dispatcher (RiotController)
 */
function Users() {
  riot.observable(this)

  var currentUser
}

module.exports = Users

},{"./user":45,"riot":41}],47:[function(require,module,exports){
require('./modules/app-front.html')
require('./modules/app-message.html')
require('./modules/app-user.html')
require('./modules/app-post.html')

/*
 * Setup Data Stores
 */

var Posts = require('./app/posts')
var Users = require('./app/users')

var Dispatcher = require('./app/dispatcher')

Dispatcher.addStore(new Posts())
Dispatcher.addStore(new Users())

/*
 * Mount riot tags.
 */

var tags = require('riot').mount('*')

var tagsByName = tags.reduce(function(acc, val) {
  acc[val.root.tagName.toLowerCase().replace('app-', '')] = val
  return acc
}, {})

function displayModule(target) {
  var p, action, nodes = { 'front' : tagsByName['front'].root, 'user' : tagsByName['user'].root }

  for (var p in nodes) {
    action = (target == p) ? 'remove' : 'add'
    nodes[p].classList[action]('app-hidden')
  }
}

/*
 * Setup routes.
 */

function ensureUser(ctx, next) {
  console.log('before handling a post route, make sure there\'s a logged user')
  next()
}

var page = require('page')

page('/posts/favorites', ensureUser, function postsFavorites() {
  displayModule('user')
  Dispatcher.trigger('user:favorites')
})

page('/posts/new', ensureUser, function postsNew() {
  displayModule('user')
  Dispatcher.trigger('user:posts')
  Dispatcher.trigger('user:newpost')
})

page('/posts/', ensureUser, function posts() {
  displayModule('user')
  Dispatcher.trigger('user:posts')
})

page('/:user', function user(ctx, next) {
  displayModule('user')
  Dispatcher.trigger('user:posts', ctx.params.user)
})

page('/', function root() {
  displayModule('front')
  Dispatcher.trigger('front')
})

page('*', function notfound() {
  displayModule('front')
  Dispatcher.trigger('front:notfound')
  Dispatcher.trigger('message', 'Sorry, we couldn\'t find the page you are looking.')
})

page()

},{"./app/dispatcher":42,"./app/posts":44,"./app/users":46,"./modules/app-front.html":48,"./modules/app-message.html":49,"./modules/app-post.html":50,"./modules/app-user.html":51,"page":38,"riot":41}],48:[function(require,module,exports){
var riot = require('riot');
riot.tag('app-front', '<div class="flex-content-wrapper"> <main class="main" role="main"> <img class="responsive-width" src="/assets/music.jpg"> <div class="front-copy"> <h1>A micro Blog for your favorite Music!</h1> <p> Showcase your favorite music to the world. With MusiFavs you can embed content from different services (YouTube, Bandacamp, Soundcloud, and more!) in a single place. </p> <h2>Latest Posts</h2> <ul> <li><a href="/someuser" class="route">CarlitoX</a> posted \'Gone with the wind\' (12 hours ago)</li> <li>Tony Motola posted \'SuperViolent\' (3 hours ago)</li> <li>Kurt Covain posted \'This this and that\' (4 days ago)</li> </ul> <h2>Latest Favorited</h2> <ul> <li>Mingo Cachalafusa favorited \'Gone with the wind\' (12 hours ago)</li> <li>Sorete favorited \'SuperViolent\' (3 hours ago)</li> <li>Mongo Longo favorited \'This this and that\' (4 days ago)</li> </ul> </div> </main> </div>', function(opts) {
    var Dispatcher = require('../app/dispatcher');
  
});

},{"../app/dispatcher":42,"riot":41}],49:[function(require,module,exports){
var riot = require('riot');
riot.tag('app-message', '<div class="app-message"> {message} <div class="app-message-dismiss"> <a href="javascript:void(0)" onclick="{dismiss}">Dismiss</a> </div> </div>', function(opts) {
    var Dispatcher = require('../app/dispatcher')

    this.dismiss = function(ev) {
      this.message = ''
      this.root.classList.add('app-hidden')
    }.bind(this);

    Dispatcher.on('message', function(text) {
      this.message = text
      this.root.classList.remove('app-hidden')
      this.update()
    }.bind(this))
  
});

},{"../app/dispatcher":42,"riot":41}],50:[function(require,module,exports){
var riot = require('riot');
riot.tag('app-post', '{opts.debug} <app-post-form if="{editing}"></app-post-form> <app-post-show if="{!editing}"></app-post-show>', function(opts) {
    var Post = require('../app/post')

    this.post = new Post(opts.post)
    this.editing = !this.post.isPersisted

    this.show = function(data) {
      var p = (data ? new Post(data) : this.post);
      this.update({editing: false, post: p})
    }.bind(this);

    this.edit = function() {
      this.update({editing: true})
    }.bind(this);
  
});

riot.tag('app-post-show', '<h2><i class="fa fa-play"></i>&nbsp;{post.title}</h2> <div class="post-show-embed"> <iframe if="{post.embed.type == \'youtube\'}" type="text/html" width="640" height="260" riot-src="http://www.youtube.com/embed/{post.embed.videoId}" frameborder="0"></iframe> </div> <p class="post-show-description"> <i class="fa fa-child fa-2x"></i>&nbsp;{post.desc} </p> <div class="post-actions"> <a title="Favorite" href="#" onclick="{toggleFav}" class="{post-favorited: post.favorited}"><i class="fa fa-heart"></i>&nbsp;Favorite</a> <a title="Edit" href="#" onclick="{edit}"><i class="fa fa-edit"></i>&nbsp;Edit</a> <a title="Remove" href="#"><i class="fa fa-trash"></i>&nbsp;Remove</a> </div>', function(opts) {
    this.post = this.parent.post

    this.parent.on('update mount', function(){
      this.update({post: this.parent.post})
    }.bind(this))

    this.edit = function(ev) {
      this.parent.edit()
    }.bind(this);

    this.toggleFav = function(ev) {
      this.post.favorited = !this.post.favorited
    }.bind(this);
  
});

riot.tag('app-post-form', '<form name="postForm"> <h2>Editing Post</h2> <p> Provide the resource url to share, a title and a description. </p> <div class="post-form-embed"> <label>Embed Url (e.g. YouTube Url)</label> <input name="embedUrl" type="url" value="{post.embed.url}" class="{invalid: urlInvalid}" placeholder="https://www.youtube.com/watch?v=P9J5tYShNY8"> </div> <div class="post-form-data"> <input name="postTitle" type="text" value="{post.title}" class="{invalid: titleInvalid}" title="Post Title" placeholder="Title"> <textarea name="postDescription" value="{post.desc}" title="Post Description" placeholder="Description"></textarea></textarea> </div> <div class="post-actions"> <a title="Undo" onclick="{undo}" href="#"><i class="fa fa-times-circle"></i>&nbsp;Cancel</a> <a title="Save and Publish" onclick="{publish}" href="#"><i class="fa fa-save"></i>&nbsp;Save</a> <span class="post-edit-message" name="msg">{editMessage}</span> </div> </form>', function(opts) {
    var values = require('lodash/object/values')
    var Post = require('../app/post')
    var Dispatcher = require('../app/dispatcher')

    this.post = this.parent.post

    this.parent.on('update mount', function(){
      this.update({post: this.parent.post})
    }.bind(this))

    this.on('update mount', function(){

      if (!this.post.isPersisted) {
        this.postTitle.value = ''
        this.postDescription.value = ''
        this.embedUrl.value = ''
      }
    })

    this.message = function(msg) {
      this.msg.innerText = msg
    }.bind(this);

    this.undo = function(ev) {
      if (this.post.isPersisted) {

        this.postTitle.value = this.post.title
        this.postDescription.value = this.post.desc
        this.embedUrl.value = this.post.embed.url
        this.parent.show()
      } else {
        Dispatcher.trigger('user:cancelcreatepost')
      }
    }.bind(this);

    this.publish = function(ev) {
      var newPost = new Post(this.post).update({
        title: this.postTitle.value,
        desc: this.postDescription.value,
        embed: {url: this.embedUrl.value}
      })

      var result = newPost.validationResult()

      if (result.isValid) {
        newPost.save() // We could wait to trigger until is saved but we'll assume it will succeed.

        if (this.post.isPersisted) {
          this.parent.show(newPost)
        } else {
          Dispatcher.trigger('user:createpost', newPost)
        }
      } else {
        var msg = values(result.errors).join(', ')
        this.urlInvalid = !!result.errors.url
        this.titleInvalid = !!result.errors.title
        this.message('Sorry, the post can\'t be saved: ' + msg + '.')
      }
    }.bind(this);
  
});

},{"../app/dispatcher":42,"../app/post":43,"lodash/object/values":34,"riot":41}],51:[function(require,module,exports){
var riot = require('riot');
riot.tag('app-user', '<div class="flex-content-wrapper"> <aside class="profile"> <div class="profile-info"> Profile </div> </aside> <main class="main" role="main"> <div if="{noposts}" class="post-placeholder"> <h1>Hey!&nbsp;<i class="fa fa-child"></i>&nbsp;<i class="fa fa-play"></i></h1> <p> This user has not posted anything yet. Please check back later! </p> </div> <app-post if="{newPost}" post="{newPost}" editor="{true}"></app-post> <app-post each="{posts}" post="{this}"></app-post> </main> </div>', function(opts) {
    var Dispatcher = require('../app/dispatcher')
    var Post = require('../app/post')

    this.noposts = false
    this.posts = []

    Dispatcher.on('user:posts', function(user) {
      Dispatcher.trigger('posts:user:load', user)
    })

    Dispatcher.on('user:newpost', function(user) {
      this.update({newPost: new Post()})
    }.bind(this))

    Dispatcher.on('user:cancelcreatepost', function(fresh) {
      this.update({newPost: null})
    }.bind(this))

    Dispatcher.on('user:createpost', function(fresh) {
      this.update({newPost: null, posts: [fresh].concat(this.posts)})
    }.bind(this))

    Dispatcher.on('posts:user:available', function(posts){
      this.update({ posts: posts })
    }.bind(this))
  
});

},{"../app/dispatcher":42,"../app/post":43,"riot":41}]},{},[47])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2FycmF5Q29weS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlFYWNoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9hc3NpZ25EZWZhdWx0cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUNvcHkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VGb3IuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VGb3JJbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZvck93bi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZU1lcmdlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlTWVyZ2VEZWVwLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlVG9TdHJpbmcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VWYWx1ZXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2JpbmRDYWxsYmFjay5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvY3JlYXRlQXNzaWduZXIuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2lzSW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2lzSXRlcmF0ZWVDYWxsLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9pc0xlbmd0aC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvaXNPYmplY3RMaWtlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9zaGltSXNQbGFpbk9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvc2hpbUtleXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL3RvT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9sYW5nL2lzQXJndW1lbnRzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9sYW5nL2lzQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2xhbmcvaXNOYXRpdmUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2xhbmcvaXNPYmplY3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2xhbmcvaXNQbGFpbk9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9pc1R5cGVkQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2xhbmcvdG9QbGFpbk9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvb2JqZWN0L2RlZmF1bHRzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3Qva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvb2JqZWN0L2tleXNJbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvb2JqZWN0L21lcmdlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvdmFsdWVzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9zdHJpbmcvZXNjYXBlUmVnRXhwLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9zdXBwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC91dGlsaXR5L2lkZW50aXR5LmpzIiwibm9kZV9tb2R1bGVzL3BhZ2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcGFnZS9ub2RlX21vZHVsZXMvcGF0aC10by1yZWdleHAvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcGFnZS9ub2RlX21vZHVsZXMvcGF0aC10by1yZWdleHAvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmlvdC9yaW90LmpzIiwic3JjL2FwcC9kaXNwYXRjaGVyLmpzIiwic3JjL2FwcC9wb3N0LmpzIiwic3JjL2FwcC9wb3N0cy5qcyIsInNyYy9hcHAvdXNlci5qcyIsInNyYy9hcHAvdXNlcnMuanMiLCJzcmMvbWFpbi5qcyIsInNyYy9tb2R1bGVzL2FwcC1mcm9udC5odG1sIiwic3JjL21vZHVsZXMvYXBwLW1lc3NhZ2UuaHRtbCIsInNyYy9tb2R1bGVzL2FwcC1wb3N0Lmh0bWwiLCJzcmMvbW9kdWxlcy9hcHAtdXNlci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxTUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGBzb3VyY2VgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheT1bXV0gVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIHRvLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5Q29weShzb3VyY2UsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcblxuICBhcnJheSB8fCAoYXJyYXkgPSBBcnJheShsZW5ndGgpKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUNvcHk7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5mb3JFYWNoYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgb3IgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUVhY2g7XG4iLCIvKipcbiAqIFVzZWQgYnkgYF8uZGVmYXVsdHNgIHRvIGN1c3RvbWl6ZSBpdHMgYF8uYXNzaWduYCB1c2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gb2JqZWN0VmFsdWUgVGhlIGRlc3RpbmF0aW9uIG9iamVjdCBwcm9wZXJ0eSB2YWx1ZS5cbiAqIEBwYXJhbSB7Kn0gc291cmNlVmFsdWUgVGhlIHNvdXJjZSBvYmplY3QgcHJvcGVydHkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgdmFsdWUgdG8gYXNzaWduIHRvIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGFzc2lnbkRlZmF1bHRzKG9iamVjdFZhbHVlLCBzb3VyY2VWYWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdFZhbHVlID09ICd1bmRlZmluZWQnID8gc291cmNlVmFsdWUgOiBvYmplY3RWYWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ25EZWZhdWx0cztcbiIsInZhciBiYXNlQ29weSA9IHJlcXVpcmUoJy4vYmFzZUNvcHknKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXMnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5hc3NpZ25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXJndW1lbnQganVnZ2xpbmcsXG4gKiBtdWx0aXBsZSBzb3VyY2VzLCBhbmQgYHRoaXNgIGJpbmRpbmcgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmluZyB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ24ob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIHByb3BzID0ga2V5cyhzb3VyY2UpO1xuICBpZiAoIWN1c3RvbWl6ZXIpIHtcbiAgICByZXR1cm4gYmFzZUNvcHkoc291cmNlLCBvYmplY3QsIHByb3BzKTtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF0sXG4gICAgICAgIHZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIodmFsdWUsIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKTtcblxuICAgIGlmICgocmVzdWx0ID09PSByZXN1bHQgPyByZXN1bHQgIT09IHZhbHVlIDogdmFsdWUgPT09IHZhbHVlKSB8fFxuICAgICAgICAodHlwZW9mIHZhbHVlID09ICd1bmRlZmluZWQnICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgICBvYmplY3Rba2V5XSA9IHJlc3VsdDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQXNzaWduO1xuIiwiLyoqXG4gKiBDb3BpZXMgdGhlIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBuYW1lcyB0byBjb3B5LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUNvcHkoc291cmNlLCBvYmplY3QsIHByb3BzKSB7XG4gIGlmICghcHJvcHMpIHtcbiAgICBwcm9wcyA9IG9iamVjdDtcbiAgICBvYmplY3QgPSB7fTtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgb2JqZWN0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDb3B5O1xuIiwidmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi90b09iamVjdCcpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBiYXNlRm9ySW5gIGFuZCBgYmFzZUZvck93bmAgd2hpY2ggaXRlcmF0ZXNcbiAqIG92ZXIgYG9iamVjdGAgcHJvcGVydGllcyByZXR1cm5lZCBieSBga2V5c0Z1bmNgIGludm9raW5nIGBpdGVyYXRlZWAgZm9yXG4gKiBlYWNoIHByb3BlcnR5LiBJdGVyYXRvciBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHlcbiAqIHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNGdW5jKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaXRlcmFibGUgPSB0b09iamVjdChvYmplY3QpLFxuICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVba2V5XSwga2V5LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRm9yO1xuIiwidmFyIGJhc2VGb3IgPSByZXF1aXJlKCcuL2Jhc2VGb3InKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5c0luJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9ySW5gIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3JJbihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXNJbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvckluO1xuIiwidmFyIGJhc2VGb3IgPSByZXF1aXJlKCcuL2Jhc2VGb3InKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXMnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JPd25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgYW5kIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3JPd24ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRm9yT3duO1xuIiwidmFyIGFycmF5RWFjaCA9IHJlcXVpcmUoJy4vYXJyYXlFYWNoJyksXG4gICAgYmFzZUZvck93biA9IHJlcXVpcmUoJy4vYmFzZUZvck93bicpLFxuICAgIGJhc2VNZXJnZURlZXAgPSByZXF1aXJlKCcuL2Jhc2VNZXJnZURlZXAnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0JyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzVHlwZWRBcnJheScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1lcmdlYCB3aXRob3V0IHN1cHBvcnQgZm9yIGFyZ3VtZW50IGp1Z2dsaW5nLFxuICogbXVsdGlwbGUgc291cmNlcywgYW5kIGB0aGlzYCBiaW5kaW5nIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnaW5nIHByb3BlcnRpZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gQXNzb2NpYXRlcyB2YWx1ZXMgd2l0aCBzb3VyY2UgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgdmFyIGlzU3JjQXJyID0gaXNMZW5ndGgoc291cmNlLmxlbmd0aCkgJiYgKGlzQXJyYXkoc291cmNlKSB8fCBpc1R5cGVkQXJyYXkoc291cmNlKSk7XG4gIChpc1NyY0FyciA/IGFycmF5RWFjaCA6IGJhc2VGb3JPd24pKHNvdXJjZSwgZnVuY3Rpb24oc3JjVmFsdWUsIGtleSwgc291cmNlKSB7XG4gICAgaWYgKGlzT2JqZWN0TGlrZShzcmNWYWx1ZSkpIHtcbiAgICAgIHN0YWNrQSB8fCAoc3RhY2tBID0gW10pO1xuICAgICAgc3RhY2tCIHx8IChzdGFja0IgPSBbXSk7XG4gICAgICByZXR1cm4gYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBiYXNlTWVyZ2UsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICB9XG4gICAgdmFyIHZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkgOiB1bmRlZmluZWQsXG4gICAgICAgIGlzQ29tbW9uID0gdHlwZW9mIHJlc3VsdCA9PSAndW5kZWZpbmVkJztcblxuICAgIGlmIChpc0NvbW1vbikge1xuICAgICAgcmVzdWx0ID0gc3JjVmFsdWU7XG4gICAgfVxuICAgIGlmICgoaXNTcmNBcnIgfHwgdHlwZW9mIHJlc3VsdCAhPSAndW5kZWZpbmVkJykgJiZcbiAgICAgICAgKGlzQ29tbW9uIHx8IChyZXN1bHQgPT09IHJlc3VsdCA/IHJlc3VsdCAhPT0gdmFsdWUgOiB2YWx1ZSA9PT0gdmFsdWUpKSkge1xuICAgICAgb2JqZWN0W2tleV0gPSByZXN1bHQ7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWVyZ2U7XG4iLCJ2YXIgYXJyYXlDb3B5ID0gcmVxdWlyZSgnLi9hcnJheUNvcHknKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNQbGFpbk9iamVjdCcpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNUeXBlZEFycmF5JyksXG4gICAgdG9QbGFpbk9iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvdG9QbGFpbk9iamVjdCcpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZU1lcmdlYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIG1lcmdlcyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBtZXJnZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIG1lcmdlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWVyZ2VGdW5jIFRoZSBmdW5jdGlvbiB0byBtZXJnZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnaW5nIHByb3BlcnRpZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gQXNzb2NpYXRlcyB2YWx1ZXMgd2l0aCBzb3VyY2UgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgbWVyZ2VGdW5jLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgbGVuZ3RoID0gc3RhY2tBLmxlbmd0aCxcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV07XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKHN0YWNrQVtsZW5ndGhdID09IHNyY1ZhbHVlKSB7XG4gICAgICBvYmplY3Rba2V5XSA9IHN0YWNrQltsZW5ndGhdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkgOiB1bmRlZmluZWQsXG4gICAgICBpc0NvbW1vbiA9IHR5cGVvZiByZXN1bHQgPT0gJ3VuZGVmaW5lZCc7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgcmVzdWx0ID0gc3JjVmFsdWU7XG4gICAgaWYgKGlzTGVuZ3RoKHNyY1ZhbHVlLmxlbmd0aCkgJiYgKGlzQXJyYXkoc3JjVmFsdWUpIHx8IGlzVHlwZWRBcnJheShzcmNWYWx1ZSkpKSB7XG4gICAgICByZXN1bHQgPSBpc0FycmF5KHZhbHVlKVxuICAgICAgICA/IHZhbHVlXG4gICAgICAgIDogKHZhbHVlID8gYXJyYXlDb3B5KHZhbHVlKSA6IFtdKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChzcmNWYWx1ZSkgfHwgaXNBcmd1bWVudHMoc3JjVmFsdWUpKSB7XG4gICAgICByZXN1bHQgPSBpc0FyZ3VtZW50cyh2YWx1ZSlcbiAgICAgICAgPyB0b1BsYWluT2JqZWN0KHZhbHVlKVxuICAgICAgICA6IChpc1BsYWluT2JqZWN0KHZhbHVlKSA/IHZhbHVlIDoge30pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIEFkZCB0aGUgc291cmNlIHZhbHVlIHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cyBhbmQgYXNzb2NpYXRlXG4gIC8vIGl0IHdpdGggaXRzIG1lcmdlZCB2YWx1ZS5cbiAgc3RhY2tBLnB1c2goc3JjVmFsdWUpO1xuICBzdGFja0IucHVzaChyZXN1bHQpO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IG1lcmdlIG9iamVjdHMgYW5kIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIG9iamVjdFtrZXldID0gbWVyZ2VGdW5jKHJlc3VsdCwgc3JjVmFsdWUsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKTtcbiAgfSBlbHNlIGlmIChyZXN1bHQgPT09IHJlc3VsdCA/IHJlc3VsdCAhPT0gdmFsdWUgOiB2YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICBvYmplY3Rba2V5XSA9IHJlc3VsdDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VNZXJnZURlZXA7XG4iLCIvKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgaWYgaXQgaXMgbm90IG9uZS4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkXG4gKiBmb3IgYG51bGxgIG9yIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6ICh2YWx1ZSArICcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVG9TdHJpbmc7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnZhbHVlc2AgYW5kIGBfLnZhbHVlc0luYCB3aGljaCBjcmVhdGVzIGFuXG4gKiBhcnJheSBvZiBgb2JqZWN0YCBwcm9wZXJ0eSB2YWx1ZXMgY29ycmVzcG9uZGluZyB0byB0aGUgcHJvcGVydHkgbmFtZXNcbiAqIHJldHVybmVkIGJ5IGBrZXlzRnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBuYW1lcyB0byBnZXQgdmFsdWVzIGZvci5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gYmFzZVZhbHVlcyhvYmplY3QsIHByb3BzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBvYmplY3RbcHJvcHNbaW5kZXhdXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VWYWx1ZXM7XG4iLCJ2YXIgaWRlbnRpdHkgPSByZXF1aXJlKCcuLi91dGlsaXR5L2lkZW50aXR5Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlQ2FsbGJhY2tgIHdoaWNoIG9ubHkgc3VwcG9ydHMgYHRoaXNgIGJpbmRpbmdcbiAqIGFuZCBzcGVjaWZ5aW5nIHRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBiaW5kLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyZ0NvdW50XSBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FsbGJhY2suXG4gKi9cbmZ1bmN0aW9uIGJpbmRDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudCkge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodHlwZW9mIHRoaXNBcmcgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZnVuYztcbiAgfVxuICBzd2l0Y2ggKGFyZ0NvdW50KSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA1OiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kQ2FsbGJhY2s7XG4iLCJ2YXIgYmluZENhbGxiYWNrID0gcmVxdWlyZSgnLi9iaW5kQ2FsbGJhY2snKSxcbiAgICBpc0l0ZXJhdGVlQ2FsbCA9IHJlcXVpcmUoJy4vaXNJdGVyYXRlZUNhbGwnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBhc3NpZ25zIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdChzKSB0byBhIGdpdmVuXG4gKiBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFzc2lnbmVyIFRoZSBmdW5jdGlvbiB0byBhc3NpZ24gdmFsdWVzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYXNzaWduZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFzc2lnbmVyKGFzc2lnbmVyKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICAgICAgb2JqZWN0ID0gYXJndW1lbnRzWzBdO1xuXG4gICAgaWYgKGxlbmd0aCA8IDIgfHwgb2JqZWN0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuICAgIGlmIChsZW5ndGggPiAzICYmIGlzSXRlcmF0ZWVDYWxsKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10pKSB7XG4gICAgICBsZW5ndGggPSAyO1xuICAgIH1cbiAgICAvLyBKdWdnbGUgYXJndW1lbnRzLlxuICAgIGlmIChsZW5ndGggPiAzICYmIHR5cGVvZiBhcmd1bWVudHNbbGVuZ3RoIC0gMl0gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIGN1c3RvbWl6ZXIgPSBiaW5kQ2FsbGJhY2soYXJndW1lbnRzWy0tbGVuZ3RoIC0gMV0sIGFyZ3VtZW50c1tsZW5ndGgtLV0sIDUpO1xuICAgIH0gZWxzZSBpZiAobGVuZ3RoID4gMiAmJiB0eXBlb2YgYXJndW1lbnRzW2xlbmd0aCAtIDFdID09ICdmdW5jdGlvbicpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBhcmd1bWVudHNbLS1sZW5ndGhdO1xuICAgIH1cbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFzc2lnbmVyO1xuIiwiLyoqXG4gKiBVc2VkIGFzIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YWx1ZSA9ICt2YWx1ZTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0luZGV4O1xuIiwidmFyIGlzSW5kZXggPSByZXF1aXJlKCcuL2lzSW5kZXgnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHByb3ZpZGVkIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcicpIHtcbiAgICB2YXIgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aCxcbiAgICAgICAgcHJlcmVxID0gaXNMZW5ndGgobGVuZ3RoKSAmJiBpc0luZGV4KGluZGV4LCBsZW5ndGgpO1xuICB9IGVsc2Uge1xuICAgIHByZXJlcSA9IHR5cGUgPT0gJ3N0cmluZycgJiYgaW5kZXggaW4gb2JqZWN0O1xuICB9XG4gIGlmIChwcmVyZXEpIHtcbiAgICB2YXIgb3RoZXIgPSBvYmplY3RbaW5kZXhdO1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyB2YWx1ZSA9PT0gb3RoZXIgOiBvdGhlciAhPT0gb3RoZXI7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSXRlcmF0ZWVDYWxsO1xuIiwiLyoqXG4gKiBVc2VkIGFzIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gRVMgYFRvTGVuZ3RoYC4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNMZW5ndGg7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JykgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIiwidmFyIGJhc2VGb3JJbiA9IHJlcXVpcmUoJy4vYmFzZUZvckluJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBBIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzUGxhaW5PYmplY3RgIHdoaWNoIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGUgYE9iamVjdGAgY29uc3RydWN0b3Igb3IgaGFzIGEgYFtbUHJvdG90eXBlXV1gXG4gKiBvZiBgbnVsbGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2hpbUlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgdmFyIEN0b3I7XG5cbiAgLy8gRXhpdCBlYXJseSBmb3Igbm9uIGBPYmplY3RgIG9iamVjdHMuXG4gIGlmICghKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gb2JqZWN0VGFnKSB8fFxuICAgICAgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY29uc3RydWN0b3InKSAmJlxuICAgICAgICAoQ3RvciA9IHZhbHVlLmNvbnN0cnVjdG9yLCB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmICEoQ3RvciBpbnN0YW5jZW9mIEN0b3IpKSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gSUUgPCA5IGl0ZXJhdGVzIGluaGVyaXRlZCBwcm9wZXJ0aWVzIGJlZm9yZSBvd24gcHJvcGVydGllcy4gSWYgdGhlIGZpcnN0XG4gIC8vIGl0ZXJhdGVkIHByb3BlcnR5IGlzIGFuIG9iamVjdCdzIG93biBwcm9wZXJ0eSB0aGVuIHRoZXJlIGFyZSBubyBpbmhlcml0ZWRcbiAgLy8gZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICB2YXIgcmVzdWx0O1xuICAvLyBJbiBtb3N0IGVudmlyb25tZW50cyBhbiBvYmplY3QncyBvd24gcHJvcGVydGllcyBhcmUgaXRlcmF0ZWQgYmVmb3JlXG4gIC8vIGl0cyBpbmhlcml0ZWQgcHJvcGVydGllcy4gSWYgdGhlIGxhc3QgaXRlcmF0ZWQgcHJvcGVydHkgaXMgYW4gb2JqZWN0J3NcbiAgLy8gb3duIHByb3BlcnR5IHRoZW4gdGhlcmUgYXJlIG5vIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gIGJhc2VGb3JJbih2YWx1ZSwgZnVuY3Rpb24oc3ViVmFsdWUsIGtleSkge1xuICAgIHJlc3VsdCA9IGtleTtcbiAgfSk7XG4gIHJldHVybiB0eXBlb2YgcmVzdWx0ID09ICd1bmRlZmluZWQnIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHJlc3VsdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hpbUlzUGxhaW5PYmplY3Q7XG4iLCJ2YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuL2lzSW5kZXgnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5c0luJyksXG4gICAgc3VwcG9ydCA9IHJlcXVpcmUoJy4uL3N1cHBvcnQnKTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQSBmYWxsYmFjayBpbXBsZW1lbnRhdGlvbiBvZiBgT2JqZWN0LmtleXNgIHdoaWNoIGNyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlXG4gKiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBzaGltS2V5cyhvYmplY3QpIHtcbiAgdmFyIHByb3BzID0ga2V5c0luKG9iamVjdCksXG4gICAgICBwcm9wc0xlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgIGxlbmd0aCA9IHByb3BzTGVuZ3RoICYmIG9iamVjdC5sZW5ndGg7XG5cbiAgdmFyIGFsbG93SW5kZXhlcyA9IGxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCAoc3VwcG9ydC5ub25FbnVtQXJncyAmJiBpc0FyZ3VtZW50cyhvYmplY3QpKSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoKytpbmRleCA8IHByb3BzTGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBpZiAoKGFsbG93SW5kZXhlcyAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSkgfHwgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hpbUtleXM7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhbiBvYmplY3QgaWYgaXQgaXMgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gdG9PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKSA/IHZhbHVlIDogT2JqZWN0KHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b09iamVjdDtcbiIsInZhciBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIHZhciBsZW5ndGggPSBpc09iamVjdExpa2UodmFsdWUpID8gdmFsdWUubGVuZ3RoIDogdW5kZWZpbmVkO1xuICByZXR1cm4gKGlzTGVuZ3RoKGxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZykgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcmd1bWVudHM7XG4iLCJ2YXIgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGlzTmF0aXZlID0gcmVxdWlyZSgnLi9pc05hdGl2ZScpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0FycmF5ID0gaXNOYXRpdmUobmF0aXZlSXNBcnJheSA9IEFycmF5LmlzQXJyYXkpICYmIG5hdGl2ZUlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFycmF5VGFnKSB8fCBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcbiIsInZhciBlc2NhcGVSZWdFeHAgPSByZXF1aXJlKCcuLi9zdHJpbmcvZXNjYXBlUmVnRXhwJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkgPiA1KS4gKi9cbnZhciByZUhvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChvYmpUb1N0cmluZylcbiAgLnJlcGxhY2UoL3RvU3RyaW5nfChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWcpIHtcbiAgICByZXR1cm4gcmVOYXRpdmUudGVzdChmblRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVIb3N0Q3Rvci50ZXN0KHZhbHVlKSkgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNOYXRpdmU7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBsYW5ndWFnZSB0eXBlIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogKipOb3RlOioqIFNlZSB0aGUgW0VTNSBzcGVjXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKHZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwidmFyIGlzTmF0aXZlID0gcmVxdWlyZSgnLi9pc05hdGl2ZScpLFxuICAgIHNoaW1Jc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvc2hpbUlzUGxhaW5PYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRQcm90b3R5cGVPZiA9IGlzTmF0aXZlKGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKSAmJiBnZXRQcm90b3R5cGVPZjtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGFzc3VtZXMgb2JqZWN0cyBjcmVhdGVkIGJ5IHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3RvclxuICogaGF2ZSBubyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG52YXIgaXNQbGFpbk9iamVjdCA9ICFnZXRQcm90b3R5cGVPZiA/IHNoaW1Jc1BsYWluT2JqZWN0IDogZnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKCEodmFsdWUgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gb2JqZWN0VGFnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdmFsdWVPZiA9IHZhbHVlLnZhbHVlT2YsXG4gICAgICBvYmpQcm90byA9IGlzTmF0aXZlKHZhbHVlT2YpICYmIChvYmpQcm90byA9IGdldFByb3RvdHlwZU9mKHZhbHVlT2YpKSAmJiBnZXRQcm90b3R5cGVPZihvYmpQcm90byk7XG5cbiAgcmV0dXJuIG9ialByb3RvXG4gICAgPyAodmFsdWUgPT0gb2JqUHJvdG8gfHwgZ2V0UHJvdG90eXBlT2YodmFsdWUpID09IG9ialByb3RvKVxuICAgIDogc2hpbUlzUGxhaW5PYmplY3QodmFsdWUpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc1BsYWluT2JqZWN0O1xuIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPSB0eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPSB0eXBlZEFycmF5VGFnc1ttYXBUYWddID1cbnR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID1cbnR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzZXRUYWddID1cbnR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPSB0eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgdHlwZWRBcnJheVRhZ3Nbb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSldKSB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG4iLCJ2YXIgYmFzZUNvcHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlQ29weScpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzSW4nKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgcGxhaW4gb2JqZWN0IGZsYXR0ZW5pbmcgaW5oZXJpdGVkIGVudW1lcmFibGVcbiAqIHByb3BlcnRpZXMgb2YgYHZhbHVlYCB0byBvd24gcHJvcGVydGllcyBvZiB0aGUgcGxhaW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBwbGFpbiBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIG5ldyBGb28pO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiB9XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgXy50b1BsYWluT2JqZWN0KG5ldyBGb28pKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMyB9XG4gKi9cbmZ1bmN0aW9uIHRvUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGJhc2VDb3B5KHZhbHVlLCBrZXlzSW4odmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1BsYWluT2JqZWN0O1xuIiwidmFyIGJhc2VBc3NpZ24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlQXNzaWduJyksXG4gICAgY3JlYXRlQXNzaWduZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9jcmVhdGVBc3NpZ25lcicpO1xuXG4vKipcbiAqIEFzc2lnbnMgb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0KHMpIHRvIHRoZSBkZXN0aW5hdGlvblxuICogb2JqZWN0LiBTdWJzZXF1ZW50IHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKiBJZiBgY3VzdG9taXplcmAgaXMgcHJvdmlkZWQgaXQgaXMgaW52b2tlZCB0byBwcm9kdWNlIHRoZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBUaGUgYGN1c3RvbWl6ZXJgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIGZpdmUgYXJndW1lbnRzO1xuICogKG9iamVjdFZhbHVlLCBzb3VyY2VWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyBleHRlbmRcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY3VzdG9taXplcmAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmFzc2lnbih7ICd1c2VyJzogJ2Jhcm5leScgfSwgeyAnYWdlJzogNDAgfSwgeyAndXNlcic6ICdmcmVkJyB9KTtcbiAqIC8vID0+IHsgJ3VzZXInOiAnZnJlZCcsICdhZ2UnOiA0MCB9XG4gKlxuICogLy8gdXNpbmcgYSBjdXN0b21pemVyIGNhbGxiYWNrXG4gKiB2YXIgZGVmYXVsdHMgPSBfLnBhcnRpYWxSaWdodChfLmFzc2lnbiwgZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gKiAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCcgPyBvdGhlciA6IHZhbHVlO1xuICogfSk7XG4gKlxuICogZGVmYXVsdHMoeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ2FnZSc6IDM2IH0sIHsgJ3VzZXInOiAnZnJlZCcgfSk7XG4gKiAvLyA9PiB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9XG4gKi9cbnZhciBhc3NpZ24gPSBjcmVhdGVBc3NpZ25lcihiYXNlQXNzaWduKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ247XG4iLCJ2YXIgYXJyYXlDb3B5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYXJyYXlDb3B5JyksXG4gICAgYXNzaWduID0gcmVxdWlyZSgnLi9hc3NpZ24nKSxcbiAgICBhc3NpZ25EZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Fzc2lnbkRlZmF1bHRzJyk7XG5cbi8qKlxuICogQXNzaWducyBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3QocykgdG8gdGhlIGRlc3RpbmF0aW9uXG4gKiBvYmplY3QgZm9yIGFsbCBkZXN0aW5hdGlvbiBwcm9wZXJ0aWVzIHRoYXQgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYC4gT25jZSBhXG4gKiBwcm9wZXJ0eSBpcyBzZXQsIGFkZGl0aW9uYWwgZGVmYXVsdHMgb2YgdGhlIHNhbWUgcHJvcGVydHkgYXJlIGlnbm9yZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZhdWx0cyh7ICd1c2VyJzogJ2Jhcm5leScgfSwgeyAnYWdlJzogMzYgfSwgeyAndXNlcic6ICdmcmVkJyB9KTtcbiAqIC8vID0+IHsgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM2IH1cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdHMob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgdmFyIGFyZ3MgPSBhcnJheUNvcHkoYXJndW1lbnRzKTtcbiAgYXJncy5wdXNoKGFzc2lnbkRlZmF1bHRzKTtcbiAgcmV0dXJuIGFzc2lnbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc05hdGl2ZSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNOYXRpdmUnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKSxcbiAgICBzaGltS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3NoaW1LZXlzJyk7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IGlzTmF0aXZlKG5hdGl2ZUtleXMgPSBPYmplY3Qua2V5cykgJiYgbmF0aXZlS2V5cztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xudmFyIGtleXMgPSAhbmF0aXZlS2V5cyA/IHNoaW1LZXlzIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIGlmIChvYmplY3QpIHtcbiAgICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDtcbiAgfVxuICBpZiAoKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCkgfHxcbiAgICAgKHR5cGVvZiBvYmplY3QgIT0gJ2Z1bmN0aW9uJyAmJiAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkpKSkge1xuICAgIHJldHVybiBzaGltS2V5cyhvYmplY3QpO1xuICB9XG4gIHJldHVybiBpc09iamVjdChvYmplY3QpID8gbmF0aXZlS2V5cyhvYmplY3QpIDogW107XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG4iLCJ2YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpLFxuICAgIHN1cHBvcnQgPSByZXF1aXJlKCcuLi9zdXBwb3J0Jyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gIGxlbmd0aCA9IChsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgKHN1cHBvcnQubm9uRW51bUFyZ3MgJiYgaXNBcmd1bWVudHMob2JqZWN0KSkpICYmIGxlbmd0aCkgfHwgMDtcblxuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBpc1Byb3RvID0gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0LFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgIHNraXBJbmRleGVzID0gbGVuZ3RoID4gMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSAoaW5kZXggKyAnJyk7XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKHNraXBJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSAmJlxuICAgICAgICAhKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNJbjtcbiIsInZhciBiYXNlTWVyZ2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlTWVyZ2UnKSxcbiAgICBjcmVhdGVBc3NpZ25lciA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NyZWF0ZUFzc2lnbmVyJyk7XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgbWVyZ2VzIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgdGhlIHNvdXJjZSBvYmplY3QocyksIHRoYXRcbiAqIGRvbid0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAgaW50byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LiBTdWJzZXF1ZW50IHNvdXJjZXNcbiAqIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLiBJZiBgY3VzdG9taXplcmAgaXNcbiAqIHByb3ZpZGVkIGl0IGlzIGludm9rZWQgdG8gcHJvZHVjZSB0aGUgbWVyZ2VkIHZhbHVlcyBvZiB0aGUgZGVzdGluYXRpb24gYW5kXG4gKiBzb3VyY2UgcHJvcGVydGllcy4gSWYgYGN1c3RvbWl6ZXJgIHJldHVybnMgYHVuZGVmaW5lZGAgbWVyZ2luZyBpcyBoYW5kbGVkXG4gKiBieSB0aGUgbWV0aG9kIGluc3RlYWQuIFRoZSBgY3VzdG9taXplcmAgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkXG4gKiB3aXRoIGZpdmUgYXJndW1lbnRzOyAob2JqZWN0VmFsdWUsIHNvdXJjZVZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnaW5nIHByb3BlcnRpZXMuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGN1c3RvbWl6ZXJgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHVzZXJzID0ge1xuICogICAnZGF0YSc6IFt7ICd1c2VyJzogJ2Jhcm5leScgfSwgeyAndXNlcic6ICdmcmVkJyB9XVxuICogfTtcbiAqXG4gKiB2YXIgYWdlcyA9IHtcbiAqICAgJ2RhdGEnOiBbeyAnYWdlJzogMzYgfSwgeyAnYWdlJzogNDAgfV1cbiAqIH07XG4gKlxuICogXy5tZXJnZSh1c2VycywgYWdlcyk7XG4gKiAvLyA9PiB7ICdkYXRhJzogW3sgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM2IH0sIHsgJ3VzZXInOiAnZnJlZCcsICdhZ2UnOiA0MCB9XSB9XG4gKlxuICogLy8gdXNpbmcgYSBjdXN0b21pemVyIGNhbGxiYWNrXG4gKiB2YXIgb2JqZWN0ID0ge1xuICogICAnZnJ1aXRzJzogWydhcHBsZSddLFxuICogICAndmVnZXRhYmxlcyc6IFsnYmVldCddXG4gKiB9O1xuICpcbiAqIHZhciBvdGhlciA9IHtcbiAqICAgJ2ZydWl0cyc6IFsnYmFuYW5hJ10sXG4gKiAgICd2ZWdldGFibGVzJzogWydjYXJyb3QnXVxuICogfTtcbiAqXG4gKiBfLm1lcmdlKG9iamVjdCwgb3RoZXIsIGZ1bmN0aW9uKGEsIGIpIHtcbiAqICAgaWYgKF8uaXNBcnJheShhKSkge1xuICogICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAqICAgfVxuICogfSk7XG4gKiAvLyA9PiB7ICdmcnVpdHMnOiBbJ2FwcGxlJywgJ2JhbmFuYSddLCAndmVnZXRhYmxlcyc6IFsnYmVldCcsICdjYXJyb3QnXSB9XG4gKi9cbnZhciBtZXJnZSA9IGNyZWF0ZUFzc2lnbmVyKGJhc2VNZXJnZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbWVyZ2U7XG4iLCJ2YXIgYmFzZVZhbHVlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VWYWx1ZXMnKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgdmFsdWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy52YWx1ZXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbMSwgMl0gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLnZhbHVlcygnaGknKTtcbiAqIC8vID0+IFsnaCcsICdpJ11cbiAqL1xuZnVuY3Rpb24gdmFsdWVzKG9iamVjdCkge1xuICByZXR1cm4gYmFzZVZhbHVlcyhvYmplY3QsIGtleXMob2JqZWN0KSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmFsdWVzO1xuIiwidmFyIGJhc2VUb1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VUb1N0cmluZycpO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzLlxuICogU2VlIHRoaXMgW2FydGljbGUgb24gYFJlZ0V4cGAgY2hhcmFjdGVyc10oaHR0cDovL3d3dy5yZWd1bGFyLWV4cHJlc3Npb25zLmluZm8vY2hhcmFjdGVycy5odG1sI3NwZWNpYWwpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgcmVSZWdFeHBDaGFycyA9IC9bLiorP14ke30oKXxbXFxdXFwvXFxcXF0vZyxcbiAgICByZUhhc1JlZ0V4cENoYXJzID0gUmVnRXhwKHJlUmVnRXhwQ2hhcnMuc291cmNlKTtcblxuLyoqXG4gKiBFc2NhcGVzIHRoZSBgUmVnRXhwYCBzcGVjaWFsIGNoYXJhY3RlcnMgXCJcXFwiLCBcIl5cIiwgXCIkXCIsIFwiLlwiLCBcInxcIiwgXCI/XCIsIFwiKlwiLFxuICogXCIrXCIsIFwiKFwiLCBcIilcIiwgXCJbXCIsIFwiXVwiLCBcIntcIiBhbmQgXCJ9XCIgaW4gYHN0cmluZ2AuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZVJlZ0V4cCgnW2xvZGFzaF0oaHR0cHM6Ly9sb2Rhc2guY29tLyknKTtcbiAqIC8vID0+ICdcXFtsb2Rhc2hcXF1cXChodHRwczovL2xvZGFzaFxcLmNvbS9cXCknXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgc3RyaW5nID0gYmFzZVRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzUmVnRXhwQ2hhcnMudGVzdChzdHJpbmcpKVxuICAgID8gc3RyaW5nLnJlcGxhY2UocmVSZWdFeHBDaGFycywgJ1xcXFwkJicpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXNjYXBlUmVnRXhwO1xuIiwidmFyIGlzTmF0aXZlID0gcmVxdWlyZSgnLi9sYW5nL2lzTmF0aXZlJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBmdW5jdGlvbnMgY29udGFpbmluZyBhIGB0aGlzYCByZWZlcmVuY2UuICovXG52YXIgcmVUaGlzID0gL1xcYnRoaXNcXGIvO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IERPTSBzdXBwb3J0LiAqL1xudmFyIGRvY3VtZW50ID0gKGRvY3VtZW50ID0gZ2xvYmFsLndpbmRvdykgJiYgZG9jdW1lbnQuZG9jdW1lbnQ7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBBbiBvYmplY3QgZW52aXJvbm1lbnQgZmVhdHVyZSBmbGFncy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHR5cGUgT2JqZWN0XG4gKi9cbnZhciBzdXBwb3J0ID0ge307XG5cbihmdW5jdGlvbih4KSB7XG5cbiAgLyoqXG4gICAqIERldGVjdCBpZiBmdW5jdGlvbnMgY2FuIGJlIGRlY29tcGlsZWQgYnkgYEZ1bmN0aW9uI3RvU3RyaW5nYFxuICAgKiAoYWxsIGJ1dCBGaXJlZm94IE9TIGNlcnRpZmllZCBhcHBzLCBvbGRlciBPcGVyYSBtb2JpbGUgYnJvd3NlcnMsIGFuZFxuICAgKiB0aGUgUGxheVN0YXRpb24gMzsgZm9yY2VkIGBmYWxzZWAgZm9yIFdpbmRvd3MgOCBhcHBzKS5cbiAgICpcbiAgICogQG1lbWJlck9mIF8uc3VwcG9ydFxuICAgKiBAdHlwZSBib29sZWFuXG4gICAqL1xuICBzdXBwb3J0LmZ1bmNEZWNvbXAgPSAhaXNOYXRpdmUoZ2xvYmFsLldpblJURXJyb3IpICYmIHJlVGhpcy50ZXN0KGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSk7XG5cbiAgLyoqXG4gICAqIERldGVjdCBpZiBgRnVuY3Rpb24jbmFtZWAgaXMgc3VwcG9ydGVkIChhbGwgYnV0IElFKS5cbiAgICpcbiAgICogQG1lbWJlck9mIF8uc3VwcG9ydFxuICAgKiBAdHlwZSBib29sZWFuXG4gICAqL1xuICBzdXBwb3J0LmZ1bmNOYW1lcyA9IHR5cGVvZiBGdW5jdGlvbi5uYW1lID09ICdzdHJpbmcnO1xuXG4gIC8qKlxuICAgKiBEZXRlY3QgaWYgdGhlIERPTSBpcyBzdXBwb3J0ZWQuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnN1cHBvcnRcbiAgICogQHR5cGUgYm9vbGVhblxuICAgKi9cbiAgdHJ5IHtcbiAgICBzdXBwb3J0LmRvbSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKS5ub2RlVHlwZSA9PT0gMTE7XG4gIH0gY2F0Y2goZSkge1xuICAgIHN1cHBvcnQuZG9tID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZWN0IGlmIGBhcmd1bWVudHNgIG9iamVjdCBpbmRleGVzIGFyZSBub24tZW51bWVyYWJsZS5cbiAgICpcbiAgICogSW4gRmlyZWZveCA8IDQsIElFIDwgOSwgUGhhbnRvbUpTLCBhbmQgU2FmYXJpIDwgNS4xIGBhcmd1bWVudHNgIG9iamVjdFxuICAgKiBpbmRleGVzIGFyZSBub24tZW51bWVyYWJsZS4gQ2hyb21lIDwgMjUgYW5kIE5vZGUuanMgPCAwLjExLjAgdHJlYXRcbiAgICogYGFyZ3VtZW50c2Agb2JqZWN0IGluZGV4ZXMgYXMgbm9uLWVudW1lcmFibGUgYW5kIGZhaWwgYGhhc093blByb3BlcnR5YFxuICAgKiBjaGVja3MgZm9yIGluZGV4ZXMgdGhhdCBleGNlZWQgdGhlaXIgZnVuY3Rpb24ncyBmb3JtYWwgcGFyYW1ldGVycyB3aXRoXG4gICAqIGFzc29jaWF0ZWQgdmFsdWVzIG9mIGAwYC5cbiAgICpcbiAgICogQG1lbWJlck9mIF8uc3VwcG9ydFxuICAgKiBAdHlwZSBib29sZWFuXG4gICAqL1xuICB0cnkge1xuICAgIHN1cHBvcnQubm9uRW51bUFyZ3MgPSAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChhcmd1bWVudHMsIDEpO1xuICB9IGNhdGNoKGUpIHtcbiAgICBzdXBwb3J0Lm5vbkVudW1BcmdzID0gdHJ1ZTtcbiAgfVxufSgwLCAwKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3VwcG9ydDtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgcHJvdmlkZWQgdG8gaXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsaXR5XG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKlxuICogXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTtcbiIsIiAgLyogZ2xvYmFscyByZXF1aXJlLCBtb2R1bGUgKi9cblxuICAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gICAqL1xuXG4gIHZhciBwYXRodG9SZWdleHAgPSByZXF1aXJlKCdwYXRoLXRvLXJlZ2V4cCcpO1xuXG4gIC8qKlxuICAgKiBNb2R1bGUgZXhwb3J0cy5cbiAgICovXG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBwYWdlO1xuXG4gIC8qKlxuICAgKiBUbyB3b3JrIHByb3Blcmx5IHdpdGggdGhlIFVSTFxuICAgKiBoaXN0b3J5LmxvY2F0aW9uIGdlbmVyYXRlZCBwb2x5ZmlsbCBpbiBodHRwczovL2dpdGh1Yi5jb20vZGV2b3RlL0hUTUw1LUhpc3RvcnktQVBJXG4gICAqL1xuXG4gIHZhciBsb2NhdGlvbiA9ICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIHdpbmRvdykgJiYgKHdpbmRvdy5oaXN0b3J5LmxvY2F0aW9uIHx8IHdpbmRvdy5sb2NhdGlvbik7XG5cbiAgLyoqXG4gICAqIFBlcmZvcm0gaW5pdGlhbCBkaXNwYXRjaC5cbiAgICovXG5cbiAgdmFyIGRpc3BhdGNoID0gdHJ1ZTtcblxuICAvKipcbiAgICogRGVjb2RlIFVSTCBjb21wb25lbnRzIChxdWVyeSBzdHJpbmcsIHBhdGhuYW1lLCBoYXNoKS5cbiAgICogQWNjb21tb2RhdGVzIGJvdGggcmVndWxhciBwZXJjZW50IGVuY29kaW5nIGFuZCB4LXd3dy1mb3JtLXVybGVuY29kZWQgZm9ybWF0LlxuICAgKi9cbiAgdmFyIGRlY29kZVVSTENvbXBvbmVudHMgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBCYXNlIHBhdGguXG4gICAqL1xuXG4gIHZhciBiYXNlID0gJyc7XG5cbiAgLyoqXG4gICAqIFJ1bm5pbmcgZmxhZy5cbiAgICovXG5cbiAgdmFyIHJ1bm5pbmc7XG5cbiAgLyoqXG4gICAqIEhhc2hCYW5nIG9wdGlvblxuICAgKi9cblxuICB2YXIgaGFzaGJhbmcgPSBmYWxzZTtcblxuICAvKipcbiAgICogUHJldmlvdXMgY29udGV4dCwgZm9yIGNhcHR1cmluZ1xuICAgKiBwYWdlIGV4aXQgZXZlbnRzLlxuICAgKi9cblxuICB2YXIgcHJldkNvbnRleHQ7XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGBwYXRoYCB3aXRoIGNhbGxiYWNrIGBmbigpYCxcbiAgICogb3Igcm91dGUgYHBhdGhgLCBvciByZWRpcmVjdGlvbixcbiAgICogb3IgYHBhZ2Uuc3RhcnQoKWAuXG4gICAqXG4gICAqICAgcGFnZShmbik7XG4gICAqICAgcGFnZSgnKicsIGZuKTtcbiAgICogICBwYWdlKCcvdXNlci86aWQnLCBsb2FkLCB1c2VyKTtcbiAgICogICBwYWdlKCcvdXNlci8nICsgdXNlci5pZCwgeyBzb21lOiAndGhpbmcnIH0pO1xuICAgKiAgIHBhZ2UoJy91c2VyLycgKyB1c2VyLmlkKTtcbiAgICogICBwYWdlKCcvZnJvbScsICcvdG8nKVxuICAgKiAgIHBhZ2UoKTtcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8RnVuY3Rpb259IHBhdGhcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4uLi5cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gcGFnZShwYXRoLCBmbikge1xuICAgIC8vIDxjYWxsYmFjaz5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIHBhdGgpIHtcbiAgICAgIHJldHVybiBwYWdlKCcqJywgcGF0aCk7XG4gICAgfVxuXG4gICAgLy8gcm91dGUgPHBhdGg+IHRvIDxjYWxsYmFjayAuLi4+XG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmbikge1xuICAgICAgdmFyIHJvdXRlID0gbmV3IFJvdXRlKHBhdGgpO1xuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgcGFnZS5jYWxsYmFja3MucHVzaChyb3V0ZS5taWRkbGV3YXJlKGFyZ3VtZW50c1tpXSkpO1xuICAgICAgfVxuICAgICAgLy8gc2hvdyA8cGF0aD4gd2l0aCBbc3RhdGVdXG4gICAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHBhdGgpIHtcbiAgICAgIHBhZ2VbJ3N0cmluZycgPT09IHR5cGVvZiBmbiA/ICdyZWRpcmVjdCcgOiAnc2hvdyddKHBhdGgsIGZuKTtcbiAgICAgIC8vIHN0YXJ0IFtvcHRpb25zXVxuICAgIH0gZWxzZSB7XG4gICAgICBwYWdlLnN0YXJ0KHBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmdW5jdGlvbnMuXG4gICAqL1xuXG4gIHBhZ2UuY2FsbGJhY2tzID0gW107XG4gIHBhZ2UuZXhpdHMgPSBbXTtcblxuICAvKipcbiAgICogQ3VycmVudCBwYXRoIGJlaW5nIHByb2Nlc3NlZFxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgcGFnZS5jdXJyZW50ID0gJyc7XG5cbiAgLyoqXG4gICAqIE51bWJlciBvZiBwYWdlcyBuYXZpZ2F0ZWQgdG8uXG4gICAqIEB0eXBlIHtudW1iZXJ9XG4gICAqXG4gICAqICAgICBwYWdlLmxlbiA9PSAwO1xuICAgKiAgICAgcGFnZSgnL2xvZ2luJyk7XG4gICAqICAgICBwYWdlLmxlbiA9PSAxO1xuICAgKi9cblxuICBwYWdlLmxlbiA9IDA7XG5cbiAgLyoqXG4gICAqIEdldCBvciBzZXQgYmFzZXBhdGggdG8gYHBhdGhgLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBwYWdlLmJhc2UgPSBmdW5jdGlvbihwYXRoKSB7XG4gICAgaWYgKDAgPT09IGFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBiYXNlO1xuICAgIGJhc2UgPSBwYXRoO1xuICB9O1xuXG4gIC8qKlxuICAgKiBCaW5kIHdpdGggdGhlIGdpdmVuIGBvcHRpb25zYC5cbiAgICpcbiAgICogT3B0aW9uczpcbiAgICpcbiAgICogICAgLSBgY2xpY2tgIGJpbmQgdG8gY2xpY2sgZXZlbnRzIFt0cnVlXVxuICAgKiAgICAtIGBwb3BzdGF0ZWAgYmluZCB0byBwb3BzdGF0ZSBbdHJ1ZV1cbiAgICogICAgLSBgZGlzcGF0Y2hgIHBlcmZvcm0gaW5pdGlhbCBkaXNwYXRjaCBbdHJ1ZV1cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgcGFnZS5zdGFydCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAocnVubmluZykgcmV0dXJuO1xuICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgIGlmIChmYWxzZSA9PT0gb3B0aW9ucy5kaXNwYXRjaCkgZGlzcGF0Y2ggPSBmYWxzZTtcbiAgICBpZiAoZmFsc2UgPT09IG9wdGlvbnMuZGVjb2RlVVJMQ29tcG9uZW50cykgZGVjb2RlVVJMQ29tcG9uZW50cyA9IGZhbHNlO1xuICAgIGlmIChmYWxzZSAhPT0gb3B0aW9ucy5wb3BzdGF0ZSkgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgb25wb3BzdGF0ZSwgZmFsc2UpO1xuICAgIGlmIChmYWxzZSAhPT0gb3B0aW9ucy5jbGljaykgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25jbGljaywgZmFsc2UpO1xuICAgIGlmICh0cnVlID09PSBvcHRpb25zLmhhc2hiYW5nKSBoYXNoYmFuZyA9IHRydWU7XG4gICAgaWYgKCFkaXNwYXRjaCkgcmV0dXJuO1xuICAgIHZhciB1cmwgPSAoaGFzaGJhbmcgJiYgfmxvY2F0aW9uLmhhc2guaW5kZXhPZignIyEnKSkgPyBsb2NhdGlvbi5oYXNoLnN1YnN0cigyKSArIGxvY2F0aW9uLnNlYXJjaCA6IGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoICsgbG9jYXRpb24uaGFzaDtcbiAgICBwYWdlLnJlcGxhY2UodXJsLCBudWxsLCB0cnVlLCBkaXNwYXRjaCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVuYmluZCBjbGljayBhbmQgcG9wc3RhdGUgZXZlbnQgaGFuZGxlcnMuXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHBhZ2Uuc3RvcCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghcnVubmluZykgcmV0dXJuO1xuICAgIHBhZ2UuY3VycmVudCA9ICcnO1xuICAgIHBhZ2UubGVuID0gMDtcbiAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25jbGljaywgZmFsc2UpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIG9ucG9wc3RhdGUsIGZhbHNlKTtcbiAgfTtcblxuICAvKipcbiAgICogU2hvdyBgcGF0aGAgd2l0aCBvcHRpb25hbCBgc3RhdGVgIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gZGlzcGF0Y2hcbiAgICogQHJldHVybiB7Q29udGV4dH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgcGFnZS5zaG93ID0gZnVuY3Rpb24ocGF0aCwgc3RhdGUsIGRpc3BhdGNoLCBwdXNoKSB7XG4gICAgdmFyIGN0eCA9IG5ldyBDb250ZXh0KHBhdGgsIHN0YXRlKTtcbiAgICBwYWdlLmN1cnJlbnQgPSBjdHgucGF0aDtcbiAgICBpZiAoZmFsc2UgIT09IGRpc3BhdGNoKSBwYWdlLmRpc3BhdGNoKGN0eCk7XG4gICAgaWYgKGZhbHNlICE9PSBjdHguaGFuZGxlZCAmJiBmYWxzZSAhPT0gcHVzaCkgY3R4LnB1c2hTdGF0ZSgpO1xuICAgIHJldHVybiBjdHg7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdvZXMgYmFjayBpbiB0aGUgaGlzdG9yeVxuICAgKiBCYWNrIHNob3VsZCBhbHdheXMgbGV0IHRoZSBjdXJyZW50IHJvdXRlIHB1c2ggc3RhdGUgYW5kIHRoZW4gZ28gYmFjay5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggLSBmYWxsYmFjayBwYXRoIHRvIGdvIGJhY2sgaWYgbm8gbW9yZSBoaXN0b3J5IGV4aXN0cywgaWYgdW5kZWZpbmVkIGRlZmF1bHRzIHRvIHBhZ2UuYmFzZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW3N0YXRlXVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBwYWdlLmJhY2sgPSBmdW5jdGlvbihwYXRoLCBzdGF0ZSkge1xuICAgIGlmIChwYWdlLmxlbiA+IDApIHtcbiAgICAgIC8vIHRoaXMgbWF5IG5lZWQgbW9yZSB0ZXN0aW5nIHRvIHNlZSBpZiBhbGwgYnJvd3NlcnNcbiAgICAgIC8vIHdhaXQgZm9yIHRoZSBuZXh0IHRpY2sgdG8gZ28gYmFjayBpbiBoaXN0b3J5XG4gICAgICBoaXN0b3J5LmJhY2soKTtcbiAgICAgIHBhZ2UubGVuLS07XG4gICAgfSBlbHNlIGlmIChwYXRoKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwYWdlLnNob3cocGF0aCwgc3RhdGUpO1xuICAgICAgfSk7XG4gICAgfWVsc2V7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwYWdlLnNob3coYmFzZSwgc3RhdGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIHJvdXRlIHRvIHJlZGlyZWN0IGZyb20gb25lIHBhdGggdG8gb3RoZXJcbiAgICogb3IganVzdCByZWRpcmVjdCB0byBhbm90aGVyIHJvdXRlXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBmcm9tIC0gaWYgcGFyYW0gJ3RvJyBpcyB1bmRlZmluZWQgcmVkaXJlY3RzIHRvICdmcm9tJ1xuICAgKiBAcGFyYW0ge1N0cmluZ30gW3RvXVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cbiAgcGFnZS5yZWRpcmVjdCA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG4gICAgLy8gRGVmaW5lIHJvdXRlIGZyb20gYSBwYXRoIHRvIGFub3RoZXJcbiAgICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBmcm9tICYmICdzdHJpbmcnID09PSB0eXBlb2YgdG8pIHtcbiAgICAgIHBhZ2UoZnJvbSwgZnVuY3Rpb24oZSkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHBhZ2UucmVwbGFjZSh0byk7XG4gICAgICAgIH0sIDApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gV2FpdCBmb3IgdGhlIHB1c2ggc3RhdGUgYW5kIHJlcGxhY2UgaXQgd2l0aCBhbm90aGVyXG4gICAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgZnJvbSAmJiAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIHRvKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwYWdlLnJlcGxhY2UoZnJvbSk7XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgYHBhdGhgIHdpdGggb3B0aW9uYWwgYHN0YXRlYCBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICAgKiBAcmV0dXJuIHtDb250ZXh0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuXG4gIHBhZ2UucmVwbGFjZSA9IGZ1bmN0aW9uKHBhdGgsIHN0YXRlLCBpbml0LCBkaXNwYXRjaCkge1xuICAgIHZhciBjdHggPSBuZXcgQ29udGV4dChwYXRoLCBzdGF0ZSk7XG4gICAgcGFnZS5jdXJyZW50ID0gY3R4LnBhdGg7XG4gICAgY3R4LmluaXQgPSBpbml0O1xuICAgIGN0eC5zYXZlKCk7IC8vIHNhdmUgYmVmb3JlIGRpc3BhdGNoaW5nLCB3aGljaCBtYXkgcmVkaXJlY3RcbiAgICBpZiAoZmFsc2UgIT09IGRpc3BhdGNoKSBwYWdlLmRpc3BhdGNoKGN0eCk7XG4gICAgcmV0dXJuIGN0eDtcbiAgfTtcblxuICAvKipcbiAgICogRGlzcGF0Y2ggdGhlIGdpdmVuIGBjdHhgLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gY3R4XG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBwYWdlLmRpc3BhdGNoID0gZnVuY3Rpb24oY3R4KSB7XG4gICAgdmFyIHByZXYgPSBwcmV2Q29udGV4dCxcbiAgICAgIGkgPSAwLFxuICAgICAgaiA9IDA7XG5cbiAgICBwcmV2Q29udGV4dCA9IGN0eDtcblxuICAgIGZ1bmN0aW9uIG5leHRFeGl0KCkge1xuICAgICAgdmFyIGZuID0gcGFnZS5leGl0c1tqKytdO1xuICAgICAgaWYgKCFmbikgcmV0dXJuIG5leHRFbnRlcigpO1xuICAgICAgZm4ocHJldiwgbmV4dEV4aXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5leHRFbnRlcigpIHtcbiAgICAgIHZhciBmbiA9IHBhZ2UuY2FsbGJhY2tzW2krK107XG5cbiAgICAgIGlmIChjdHgucGF0aCAhPT0gcGFnZS5jdXJyZW50KSB7XG4gICAgICAgIGN0eC5oYW5kbGVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghZm4pIHJldHVybiB1bmhhbmRsZWQoY3R4KTtcbiAgICAgIGZuKGN0eCwgbmV4dEVudGVyKTtcbiAgICB9XG5cbiAgICBpZiAocHJldikge1xuICAgICAgbmV4dEV4aXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dEVudGVyKCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBVbmhhbmRsZWQgYGN0eGAuIFdoZW4gaXQncyBub3QgdGhlIGluaXRpYWxcbiAgICogcG9wc3RhdGUgdGhlbiByZWRpcmVjdC4gSWYgeW91IHdpc2ggdG8gaGFuZGxlXG4gICAqIDQwNHMgb24geW91ciBvd24gdXNlIGBwYWdlKCcqJywgY2FsbGJhY2spYC5cbiAgICpcbiAgICogQHBhcmFtIHtDb250ZXh0fSBjdHhcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHVuaGFuZGxlZChjdHgpIHtcbiAgICBpZiAoY3R4LmhhbmRsZWQpIHJldHVybjtcbiAgICB2YXIgY3VycmVudDtcblxuICAgIGlmIChoYXNoYmFuZykge1xuICAgICAgY3VycmVudCA9IGJhc2UgKyBsb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMhJywgJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50ID0gbG9jYXRpb24ucGF0aG5hbWUgKyBsb2NhdGlvbi5zZWFyY2g7XG4gICAgfVxuXG4gICAgaWYgKGN1cnJlbnQgPT09IGN0eC5jYW5vbmljYWxQYXRoKSByZXR1cm47XG4gICAgcGFnZS5zdG9wKCk7XG4gICAgY3R4LmhhbmRsZWQgPSBmYWxzZTtcbiAgICBsb2NhdGlvbi5ocmVmID0gY3R4LmNhbm9uaWNhbFBhdGg7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYW4gZXhpdCByb3V0ZSBvbiBgcGF0aGAgd2l0aFxuICAgKiBjYWxsYmFjayBgZm4oKWAsIHdoaWNoIHdpbGwgYmUgY2FsbGVkXG4gICAqIG9uIHRoZSBwcmV2aW91cyBjb250ZXh0IHdoZW4gYSBuZXdcbiAgICogcGFnZSBpcyB2aXNpdGVkLlxuICAgKi9cbiAgcGFnZS5leGl0ID0gZnVuY3Rpb24ocGF0aCwgZm4pIHtcbiAgICBpZiAodHlwZW9mIHBhdGggPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBwYWdlLmV4aXQoJyonLCBwYXRoKTtcbiAgICB9XG5cbiAgICB2YXIgcm91dGUgPSBuZXcgUm91dGUocGF0aCk7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHBhZ2UuZXhpdHMucHVzaChyb3V0ZS5taWRkbGV3YXJlKGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIFVSTCBlbmNvZGluZyBmcm9tIHRoZSBnaXZlbiBgc3RyYC5cbiAgICogQWNjb21tb2RhdGVzIHdoaXRlc3BhY2UgaW4gYm90aCB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAgICogYW5kIHJlZ3VsYXIgcGVyY2VudC1lbmNvZGVkIGZvcm0uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyfSBVUkwgY29tcG9uZW50IHRvIGRlY29kZVxuICAgKi9cbiAgZnVuY3Rpb24gZGVjb2RlVVJMRW5jb2RlZFVSSUNvbXBvbmVudCh2YWwpIHtcbiAgICBpZiAodHlwZW9mIHZhbCAhPT0gJ3N0cmluZycpIHsgcmV0dXJuIHZhbDsgfVxuICAgIHJldHVybiBkZWNvZGVVUkxDb21wb25lbnRzID8gZGVjb2RlVVJJQ29tcG9uZW50KHZhbC5yZXBsYWNlKC9cXCsvZywgJyAnKSkgOiB2YWw7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBhIG5ldyBcInJlcXVlc3RcIiBgQ29udGV4dGBcbiAgICogd2l0aCB0aGUgZ2l2ZW4gYHBhdGhgIGFuZCBvcHRpb25hbCBpbml0aWFsIGBzdGF0ZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBDb250ZXh0KHBhdGgsIHN0YXRlKSB7XG4gICAgaWYgKCcvJyA9PT0gcGF0aFswXSAmJiAwICE9PSBwYXRoLmluZGV4T2YoYmFzZSkpIHBhdGggPSBiYXNlICsgKGhhc2hiYW5nID8gJyMhJyA6ICcnKSArIHBhdGg7XG4gICAgdmFyIGkgPSBwYXRoLmluZGV4T2YoJz8nKTtcblxuICAgIHRoaXMuY2Fub25pY2FsUGF0aCA9IHBhdGg7XG4gICAgdGhpcy5wYXRoID0gcGF0aC5yZXBsYWNlKGJhc2UsICcnKSB8fCAnLyc7XG4gICAgaWYgKGhhc2hiYW5nKSB0aGlzLnBhdGggPSB0aGlzLnBhdGgucmVwbGFjZSgnIyEnLCAnJykgfHwgJy8nO1xuXG4gICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LnRpdGxlO1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZSB8fCB7fTtcbiAgICB0aGlzLnN0YXRlLnBhdGggPSBwYXRoO1xuICAgIHRoaXMucXVlcnlzdHJpbmcgPSB+aSA/IGRlY29kZVVSTEVuY29kZWRVUklDb21wb25lbnQocGF0aC5zbGljZShpICsgMSkpIDogJyc7XG4gICAgdGhpcy5wYXRobmFtZSA9IGRlY29kZVVSTEVuY29kZWRVUklDb21wb25lbnQofmkgPyBwYXRoLnNsaWNlKDAsIGkpIDogcGF0aCk7XG4gICAgdGhpcy5wYXJhbXMgPSB7fTtcblxuICAgIC8vIGZyYWdtZW50XG4gICAgdGhpcy5oYXNoID0gJyc7XG4gICAgaWYgKCFoYXNoYmFuZykge1xuICAgICAgaWYgKCF+dGhpcy5wYXRoLmluZGV4T2YoJyMnKSkgcmV0dXJuO1xuICAgICAgdmFyIHBhcnRzID0gdGhpcy5wYXRoLnNwbGl0KCcjJyk7XG4gICAgICB0aGlzLnBhdGggPSBwYXJ0c1swXTtcbiAgICAgIHRoaXMuaGFzaCA9IGRlY29kZVVSTEVuY29kZWRVUklDb21wb25lbnQocGFydHNbMV0pIHx8ICcnO1xuICAgICAgdGhpcy5xdWVyeXN0cmluZyA9IHRoaXMucXVlcnlzdHJpbmcuc3BsaXQoJyMnKVswXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRXhwb3NlIGBDb250ZXh0YC5cbiAgICovXG5cbiAgcGFnZS5Db250ZXh0ID0gQ29udGV4dDtcblxuICAvKipcbiAgICogUHVzaCBzdGF0ZS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIENvbnRleHQucHJvdG90eXBlLnB1c2hTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHBhZ2UubGVuKys7XG4gICAgaGlzdG9yeS5wdXNoU3RhdGUodGhpcy5zdGF0ZSwgdGhpcy50aXRsZSwgaGFzaGJhbmcgJiYgdGhpcy5wYXRoICE9PSAnLycgPyAnIyEnICsgdGhpcy5wYXRoIDogdGhpcy5jYW5vbmljYWxQYXRoKTtcbiAgfTtcblxuICAvKipcbiAgICogU2F2ZSB0aGUgY29udGV4dCBzdGF0ZS5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQ29udGV4dC5wcm90b3R5cGUuc2F2ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKHRoaXMuc3RhdGUsIHRoaXMudGl0bGUsIGhhc2hiYW5nICYmIHRoaXMucGF0aCAhPT0gJy8nID8gJyMhJyArIHRoaXMucGF0aCA6IHRoaXMuY2Fub25pY2FsUGF0aCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgYFJvdXRlYCB3aXRoIHRoZSBnaXZlbiBIVFRQIGBwYXRoYCxcbiAgICogYW5kIGFuIGFycmF5IG9mIGBjYWxsYmFja3NgIGFuZCBgb3B0aW9uc2AuXG4gICAqXG4gICAqIE9wdGlvbnM6XG4gICAqXG4gICAqICAgLSBgc2Vuc2l0aXZlYCAgICBlbmFibGUgY2FzZS1zZW5zaXRpdmUgcm91dGVzXG4gICAqICAgLSBgc3RyaWN0YCAgICAgICBlbmFibGUgc3RyaWN0IG1hdGNoaW5nIGZvciB0cmFpbGluZyBzbGFzaGVzXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgZnVuY3Rpb24gUm91dGUocGF0aCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMucGF0aCA9IChwYXRoID09PSAnKicpID8gJyguKiknIDogcGF0aDtcbiAgICB0aGlzLm1ldGhvZCA9ICdHRVQnO1xuICAgIHRoaXMucmVnZXhwID0gcGF0aHRvUmVnZXhwKHRoaXMucGF0aCxcbiAgICAgIHRoaXMua2V5cyA9IFtdLFxuICAgICAgb3B0aW9ucy5zZW5zaXRpdmUsXG4gICAgICBvcHRpb25zLnN0cmljdCk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3NlIGBSb3V0ZWAuXG4gICAqL1xuXG4gIHBhZ2UuUm91dGUgPSBSb3V0ZTtcblxuICAvKipcbiAgICogUmV0dXJuIHJvdXRlIG1pZGRsZXdhcmUgd2l0aFxuICAgKiB0aGUgZ2l2ZW4gY2FsbGJhY2sgYGZuKClgLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgUm91dGUucHJvdG90eXBlLm1pZGRsZXdhcmUgPSBmdW5jdGlvbihmbikge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gZnVuY3Rpb24oY3R4LCBuZXh0KSB7XG4gICAgICBpZiAoc2VsZi5tYXRjaChjdHgucGF0aCwgY3R4LnBhcmFtcykpIHJldHVybiBmbihjdHgsIG5leHQpO1xuICAgICAgbmV4dCgpO1xuICAgIH07XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoaXMgcm91dGUgbWF0Y2hlcyBgcGF0aGAsIGlmIHNvXG4gICAqIHBvcHVsYXRlIGBwYXJhbXNgLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBSb3V0ZS5wcm90b3R5cGUubWF0Y2ggPSBmdW5jdGlvbihwYXRoLCBwYXJhbXMpIHtcbiAgICB2YXIga2V5cyA9IHRoaXMua2V5cyxcbiAgICAgIHFzSW5kZXggPSBwYXRoLmluZGV4T2YoJz8nKSxcbiAgICAgIHBhdGhuYW1lID0gfnFzSW5kZXggPyBwYXRoLnNsaWNlKDAsIHFzSW5kZXgpIDogcGF0aCxcbiAgICAgIG0gPSB0aGlzLnJlZ2V4cC5leGVjKGRlY29kZVVSSUNvbXBvbmVudChwYXRobmFtZSkpO1xuXG4gICAgaWYgKCFtKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKHZhciBpID0gMSwgbGVuID0gbS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaSAtIDFdO1xuICAgICAgdmFyIHZhbCA9IGRlY29kZVVSTEVuY29kZWRVUklDb21wb25lbnQobVtpXSk7XG4gICAgICBpZiAodmFsICE9PSB1bmRlZmluZWQgfHwgIShoYXNPd25Qcm9wZXJ0eS5jYWxsKHBhcmFtcywga2V5Lm5hbWUpKSkge1xuICAgICAgICBwYXJhbXNba2V5Lm5hbWVdID0gdmFsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGUgXCJwb3B1bGF0ZVwiIGV2ZW50cy5cbiAgICovXG5cbiAgZnVuY3Rpb24gb25wb3BzdGF0ZShlKSB7XG4gICAgaWYgKGUuc3RhdGUpIHtcbiAgICAgIHZhciBwYXRoID0gZS5zdGF0ZS5wYXRoO1xuICAgICAgcGFnZS5yZXBsYWNlKHBhdGgsIGUuc3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYWdlLnNob3cobG9jYXRpb24ucGF0aG5hbWUgKyBsb2NhdGlvbi5oYXNoLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgXCJjbGlja1wiIGV2ZW50cy5cbiAgICovXG5cbiAgZnVuY3Rpb24gb25jbGljayhlKSB7XG5cbiAgICBpZiAoMSAhPT0gd2hpY2goZSkpIHJldHVybjtcblxuICAgIGlmIChlLm1ldGFLZXkgfHwgZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXkpIHJldHVybjtcbiAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkKSByZXR1cm47XG5cblxuXG4gICAgLy8gZW5zdXJlIGxpbmtcbiAgICB2YXIgZWwgPSBlLnRhcmdldDtcbiAgICB3aGlsZSAoZWwgJiYgJ0EnICE9PSBlbC5ub2RlTmFtZSkgZWwgPSBlbC5wYXJlbnROb2RlO1xuICAgIGlmICghZWwgfHwgJ0EnICE9PSBlbC5ub2RlTmFtZSkgcmV0dXJuO1xuXG5cblxuICAgIC8vIElnbm9yZSBpZiB0YWcgaGFzXG4gICAgLy8gMS4gXCJkb3dubG9hZFwiIGF0dHJpYnV0ZVxuICAgIC8vIDIuIHJlbD1cImV4dGVybmFsXCIgYXR0cmlidXRlXG4gICAgaWYgKGVsLmdldEF0dHJpYnV0ZSgnZG93bmxvYWQnKSB8fCBlbC5nZXRBdHRyaWJ1dGUoJ3JlbCcpID09PSAnZXh0ZXJuYWwnKSByZXR1cm47XG5cbiAgICAvLyBlbnN1cmUgbm9uLWhhc2ggZm9yIHRoZSBzYW1lIHBhdGhcbiAgICB2YXIgbGluayA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIGlmICghaGFzaGJhbmcgJiYgZWwucGF0aG5hbWUgPT09IGxvY2F0aW9uLnBhdGhuYW1lICYmIChlbC5oYXNoIHx8ICcjJyA9PT0gbGluaykpIHJldHVybjtcblxuXG5cbiAgICAvLyBDaGVjayBmb3IgbWFpbHRvOiBpbiB0aGUgaHJlZlxuICAgIGlmIChsaW5rICYmIGxpbmsuaW5kZXhPZignbWFpbHRvOicpID4gLTEpIHJldHVybjtcblxuICAgIC8vIGNoZWNrIHRhcmdldFxuICAgIGlmIChlbC50YXJnZXQpIHJldHVybjtcblxuICAgIC8vIHgtb3JpZ2luXG4gICAgaWYgKCFzYW1lT3JpZ2luKGVsLmhyZWYpKSByZXR1cm47XG5cblxuXG4gICAgLy8gcmVidWlsZCBwYXRoXG4gICAgdmFyIHBhdGggPSBlbC5wYXRobmFtZSArIGVsLnNlYXJjaCArIChlbC5oYXNoIHx8ICcnKTtcblxuICAgIC8vIHNhbWUgcGFnZVxuICAgIHZhciBvcmlnID0gcGF0aDtcblxuICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoYmFzZSwgJycpO1xuICAgIGlmIChoYXNoYmFuZykgcGF0aCA9IHBhdGgucmVwbGFjZSgnIyEnLCAnJyk7XG5cblxuXG4gICAgaWYgKGJhc2UgJiYgb3JpZyA9PT0gcGF0aCkgcmV0dXJuO1xuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHBhZ2Uuc2hvdyhvcmlnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBidXR0b24uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHdoaWNoKGUpIHtcbiAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgcmV0dXJuIG51bGwgPT09IGUud2hpY2ggPyBlLmJ1dHRvbiA6IGUud2hpY2g7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYGhyZWZgIGlzIHRoZSBzYW1lIG9yaWdpbi5cbiAgICovXG5cbiAgZnVuY3Rpb24gc2FtZU9yaWdpbihocmVmKSB7XG4gICAgdmFyIG9yaWdpbiA9IGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3RuYW1lO1xuICAgIGlmIChsb2NhdGlvbi5wb3J0KSBvcmlnaW4gKz0gJzonICsgbG9jYXRpb24ucG9ydDtcbiAgICByZXR1cm4gKGhyZWYgJiYgKDAgPT09IGhyZWYuaW5kZXhPZihvcmlnaW4pKSk7XG4gIH1cblxuICBwYWdlLnNhbWVPcmlnaW4gPSBzYW1lT3JpZ2luO1xuIiwidmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5Jyk7XG5cbi8qKlxuICogRXhwb3NlIGBwYXRoVG9SZWdleHBgLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGhUb1JlZ2V4cDtcblxuLyoqXG4gKiBUaGUgbWFpbiBwYXRoIG1hdGNoaW5nIHJlZ2V4cCB1dGlsaXR5LlxuICpcbiAqIEB0eXBlIHtSZWdFeHB9XG4gKi9cbnZhciBQQVRIX1JFR0VYUCA9IG5ldyBSZWdFeHAoW1xuICAvLyBNYXRjaCBlc2NhcGVkIGNoYXJhY3RlcnMgdGhhdCB3b3VsZCBvdGhlcndpc2UgYXBwZWFyIGluIGZ1dHVyZSBtYXRjaGVzLlxuICAvLyBUaGlzIGFsbG93cyB0aGUgdXNlciB0byBlc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIHRoYXQgd29uJ3QgdHJhbnNmb3JtLlxuICAnKFxcXFxcXFxcLiknLFxuICAvLyBNYXRjaCBFeHByZXNzLXN0eWxlIHBhcmFtZXRlcnMgYW5kIHVuLW5hbWVkIHBhcmFtZXRlcnMgd2l0aCBhIHByZWZpeFxuICAvLyBhbmQgb3B0aW9uYWwgc3VmZml4ZXMuIE1hdGNoZXMgYXBwZWFyIGFzOlxuICAvL1xuICAvLyBcIi86dGVzdChcXFxcZCspP1wiID0+IFtcIi9cIiwgXCJ0ZXN0XCIsIFwiXFxkK1wiLCB1bmRlZmluZWQsIFwiP1wiXVxuICAvLyBcIi9yb3V0ZShcXFxcZCspXCIgPT4gW3VuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiXFxkK1wiLCB1bmRlZmluZWRdXG4gICcoW1xcXFwvLl0pPyg/OlxcXFw6KFxcXFx3KykoPzpcXFxcKCgoPzpcXFxcXFxcXC58W14pXSkqKVxcXFwpKT98XFxcXCgoKD86XFxcXFxcXFwufFteKV0pKilcXFxcKSkoWysqP10pPycsXG4gIC8vIE1hdGNoIHJlZ2V4cCBzcGVjaWFsIGNoYXJhY3RlcnMgdGhhdCBhcmUgYWx3YXlzIGVzY2FwZWQuXG4gICcoWy4rKj89XiE6JHt9KClbXFxcXF18XFxcXC9dKSdcbl0uam9pbignfCcpLCAnZycpO1xuXG4vKipcbiAqIEVzY2FwZSB0aGUgY2FwdHVyaW5nIGdyb3VwIGJ5IGVzY2FwaW5nIHNwZWNpYWwgY2hhcmFjdGVycyBhbmQgbWVhbmluZy5cbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGdyb3VwXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVzY2FwZUdyb3VwIChncm91cCkge1xuICByZXR1cm4gZ3JvdXAucmVwbGFjZSgvKFs9ITokXFwvKCldKS9nLCAnXFxcXCQxJyk7XG59XG5cbi8qKlxuICogQXR0YWNoIHRoZSBrZXlzIGFzIGEgcHJvcGVydHkgb2YgdGhlIHJlZ2V4cC5cbiAqXG4gKiBAcGFyYW0gIHtSZWdFeHB9IHJlXG4gKiBAcGFyYW0gIHtBcnJheX0gIGtleXNcbiAqIEByZXR1cm4ge1JlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gYXR0YWNoS2V5cyAocmUsIGtleXMpIHtcbiAgcmUua2V5cyA9IGtleXM7XG4gIHJldHVybiByZTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIGZsYWdzIGZvciBhIHJlZ2V4cCBmcm9tIHRoZSBvcHRpb25zLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBmbGFncyAob3B0aW9ucykge1xuICByZXR1cm4gb3B0aW9ucy5zZW5zaXRpdmUgPyAnJyA6ICdpJztcbn1cblxuLyoqXG4gKiBQdWxsIG91dCBrZXlzIGZyb20gYSByZWdleHAuXG4gKlxuICogQHBhcmFtICB7UmVnRXhwfSBwYXRoXG4gKiBAcGFyYW0gIHtBcnJheX0gIGtleXNcbiAqIEByZXR1cm4ge1JlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gcmVnZXhwVG9SZWdleHAgKHBhdGgsIGtleXMpIHtcbiAgLy8gVXNlIGEgbmVnYXRpdmUgbG9va2FoZWFkIHRvIG1hdGNoIG9ubHkgY2FwdHVyaW5nIGdyb3Vwcy5cbiAgdmFyIGdyb3VwcyA9IHBhdGguc291cmNlLm1hdGNoKC9cXCgoPyFcXD8pL2cpO1xuXG4gIGlmIChncm91cHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAga2V5cy5wdXNoKHtcbiAgICAgICAgbmFtZTogICAgICBpLFxuICAgICAgICBkZWxpbWl0ZXI6IG51bGwsXG4gICAgICAgIG9wdGlvbmFsOiAgZmFsc2UsXG4gICAgICAgIHJlcGVhdDogICAgZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBhdHRhY2hLZXlzKHBhdGgsIGtleXMpO1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybSBhbiBhcnJheSBpbnRvIGEgcmVnZXhwLlxuICpcbiAqIEBwYXJhbSAge0FycmF5fSAgcGF0aFxuICogQHBhcmFtICB7QXJyYXl9ICBrZXlzXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge1JlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gYXJyYXlUb1JlZ2V4cCAocGF0aCwga2V5cywgb3B0aW9ucykge1xuICB2YXIgcGFydHMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICBwYXJ0cy5wdXNoKHBhdGhUb1JlZ2V4cChwYXRoW2ldLCBrZXlzLCBvcHRpb25zKS5zb3VyY2UpO1xuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAoJyg/OicgKyBwYXJ0cy5qb2luKCd8JykgKyAnKScsIGZsYWdzKG9wdGlvbnMpKTtcbiAgcmV0dXJuIGF0dGFjaEtleXMocmVnZXhwLCBrZXlzKTtcbn1cblxuLyoqXG4gKiBSZXBsYWNlIHRoZSBzcGVjaWZpYyB0YWdzIHdpdGggcmVnZXhwIHN0cmluZ3MuXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0gIHtBcnJheX0gIGtleXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcmVwbGFjZVBhdGggKHBhdGgsIGtleXMpIHtcbiAgdmFyIGluZGV4ID0gMDtcblxuICBmdW5jdGlvbiByZXBsYWNlIChfLCBlc2NhcGVkLCBwcmVmaXgsIGtleSwgY2FwdHVyZSwgZ3JvdXAsIHN1ZmZpeCwgZXNjYXBlKSB7XG4gICAgaWYgKGVzY2FwZWQpIHtcbiAgICAgIHJldHVybiBlc2NhcGVkO1xuICAgIH1cblxuICAgIGlmIChlc2NhcGUpIHtcbiAgICAgIHJldHVybiAnXFxcXCcgKyBlc2NhcGU7XG4gICAgfVxuXG4gICAgdmFyIHJlcGVhdCAgID0gc3VmZml4ID09PSAnKycgfHwgc3VmZml4ID09PSAnKic7XG4gICAgdmFyIG9wdGlvbmFsID0gc3VmZml4ID09PSAnPycgfHwgc3VmZml4ID09PSAnKic7XG5cbiAgICBrZXlzLnB1c2goe1xuICAgICAgbmFtZTogICAgICBrZXkgfHwgaW5kZXgrKyxcbiAgICAgIGRlbGltaXRlcjogcHJlZml4IHx8ICcvJyxcbiAgICAgIG9wdGlvbmFsOiAgb3B0aW9uYWwsXG4gICAgICByZXBlYXQ6ICAgIHJlcGVhdFxuICAgIH0pO1xuXG4gICAgcHJlZml4ID0gcHJlZml4ID8gKCdcXFxcJyArIHByZWZpeCkgOiAnJztcbiAgICBjYXB0dXJlID0gZXNjYXBlR3JvdXAoY2FwdHVyZSB8fCBncm91cCB8fCAnW14nICsgKHByZWZpeCB8fCAnXFxcXC8nKSArICddKz8nKTtcblxuICAgIGlmIChyZXBlYXQpIHtcbiAgICAgIGNhcHR1cmUgPSBjYXB0dXJlICsgJyg/OicgKyBwcmVmaXggKyBjYXB0dXJlICsgJykqJztcbiAgICB9XG5cbiAgICBpZiAob3B0aW9uYWwpIHtcbiAgICAgIHJldHVybiAnKD86JyArIHByZWZpeCArICcoJyArIGNhcHR1cmUgKyAnKSk/JztcbiAgICB9XG5cbiAgICAvLyBCYXNpYyBwYXJhbWV0ZXIgc3VwcG9ydC5cbiAgICByZXR1cm4gcHJlZml4ICsgJygnICsgY2FwdHVyZSArICcpJztcbiAgfVxuXG4gIHJldHVybiBwYXRoLnJlcGxhY2UoUEFUSF9SRUdFWFAsIHJlcGxhY2UpO1xufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSB0aGUgZ2l2ZW4gcGF0aCBzdHJpbmcsIHJldHVybmluZyBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAqXG4gKiBBbiBlbXB0eSBhcnJheSBjYW4gYmUgcGFzc2VkIGluIGZvciB0aGUga2V5cywgd2hpY2ggd2lsbCBob2xkIHRoZVxuICogcGxhY2Vob2xkZXIga2V5IGRlc2NyaXB0aW9ucy4gRm9yIGV4YW1wbGUsIHVzaW5nIGAvdXNlci86aWRgLCBga2V5c2Agd2lsbFxuICogY29udGFpbiBgW3sgbmFtZTogJ2lkJywgZGVsaW1pdGVyOiAnLycsIG9wdGlvbmFsOiBmYWxzZSwgcmVwZWF0OiBmYWxzZSB9XWAuXG4gKlxuICogQHBhcmFtICB7KFN0cmluZ3xSZWdFeHB8QXJyYXkpfSBwYXRoXG4gKiBAcGFyYW0gIHtBcnJheX0gICAgICAgICAgICAgICAgIFtrZXlzXVxuICogQHBhcmFtICB7T2JqZWN0fSAgICAgICAgICAgICAgICBbb3B0aW9uc11cbiAqIEByZXR1cm4ge1JlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gcGF0aFRvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gIGtleXMgPSBrZXlzIHx8IFtdO1xuXG4gIGlmICghaXNBcnJheShrZXlzKSkge1xuICAgIG9wdGlvbnMgPSBrZXlzO1xuICAgIGtleXMgPSBbXTtcbiAgfSBlbHNlIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmIChwYXRoIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuIHJlZ2V4cFRvUmVnZXhwKHBhdGgsIGtleXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkocGF0aCkpIHtcbiAgICByZXR1cm4gYXJyYXlUb1JlZ2V4cChwYXRoLCBrZXlzLCBvcHRpb25zKTtcbiAgfVxuXG4gIHZhciBzdHJpY3QgPSBvcHRpb25zLnN0cmljdDtcbiAgdmFyIGVuZCA9IG9wdGlvbnMuZW5kICE9PSBmYWxzZTtcbiAgdmFyIHJvdXRlID0gcmVwbGFjZVBhdGgocGF0aCwga2V5cyk7XG4gIHZhciBlbmRzV2l0aFNsYXNoID0gcGF0aC5jaGFyQXQocGF0aC5sZW5ndGggLSAxKSA9PT0gJy8nO1xuXG4gIC8vIEluIG5vbi1zdHJpY3QgbW9kZSB3ZSBhbGxvdyBhIHNsYXNoIGF0IHRoZSBlbmQgb2YgbWF0Y2guIElmIHRoZSBwYXRoIHRvXG4gIC8vIG1hdGNoIGFscmVhZHkgZW5kcyB3aXRoIGEgc2xhc2gsIHdlIHJlbW92ZSBpdCBmb3IgY29uc2lzdGVuY3kuIFRoZSBzbGFzaFxuICAvLyBpcyB2YWxpZCBhdCB0aGUgZW5kIG9mIGEgcGF0aCBtYXRjaCwgbm90IGluIHRoZSBtaWRkbGUuIFRoaXMgaXMgaW1wb3J0YW50XG4gIC8vIGluIG5vbi1lbmRpbmcgbW9kZSwgd2hlcmUgXCIvdGVzdC9cIiBzaG91bGRuJ3QgbWF0Y2ggXCIvdGVzdC8vcm91dGVcIi5cbiAgaWYgKCFzdHJpY3QpIHtcbiAgICByb3V0ZSA9IChlbmRzV2l0aFNsYXNoID8gcm91dGUuc2xpY2UoMCwgLTIpIDogcm91dGUpICsgJyg/OlxcXFwvKD89JCkpPyc7XG4gIH1cblxuICBpZiAoZW5kKSB7XG4gICAgcm91dGUgKz0gJyQnO1xuICB9IGVsc2Uge1xuICAgIC8vIEluIG5vbi1lbmRpbmcgbW9kZSwgd2UgbmVlZCB0aGUgY2FwdHVyaW5nIGdyb3VwcyB0byBtYXRjaCBhcyBtdWNoIGFzXG4gICAgLy8gcG9zc2libGUgYnkgdXNpbmcgYSBwb3NpdGl2ZSBsb29rYWhlYWQgdG8gdGhlIGVuZCBvciBuZXh0IHBhdGggc2VnbWVudC5cbiAgICByb3V0ZSArPSBzdHJpY3QgJiYgZW5kc1dpdGhTbGFzaCA/ICcnIDogJyg/PVxcXFwvfCQpJztcbiAgfVxuXG4gIHJldHVybiBhdHRhY2hLZXlzKG5ldyBSZWdFeHAoJ14nICsgcm91dGUsIGZsYWdzKG9wdGlvbnMpKSwga2V5cyk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvKiBSaW90IHYyLjAuMTEsIEBsaWNlbnNlIE1JVCwgKGMpIDIwMTUgTXV1dCBJbmMuICsgY29udHJpYnV0b3JzICovXG5cbjsoZnVuY3Rpb24oKSB7XG5cbiAgdmFyIHJpb3QgPSB7IHZlcnNpb246ICd2Mi4wLjExJywgc2V0dGluZ3M6IHt9IH1cblxuICAndXNlIHN0cmljdCdcblxucmlvdC5vYnNlcnZhYmxlID0gZnVuY3Rpb24oZWwpIHtcblxuICBlbCA9IGVsIHx8IHt9XG5cbiAgdmFyIGNhbGxiYWNrcyA9IHt9LFxuICAgICAgX2lkID0gMFxuXG4gIGVsLm9uID0gZnVuY3Rpb24oZXZlbnRzLCBmbikge1xuICAgIGlmICh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZm4uX2lkID0gdHlwZW9mIGZuLl9pZCA9PSAndW5kZWZpbmVkJyA/IF9pZCsrIDogZm4uX2lkXG5cbiAgICAgIGV2ZW50cy5yZXBsYWNlKC9cXFMrL2csIGZ1bmN0aW9uKG5hbWUsIHBvcykge1xuICAgICAgICAoY2FsbGJhY2tzW25hbWVdID0gY2FsbGJhY2tzW25hbWVdIHx8IFtdKS5wdXNoKGZuKVxuICAgICAgICBmbi50eXBlZCA9IHBvcyA+IDBcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgZWwub2ZmID0gZnVuY3Rpb24oZXZlbnRzLCBmbikge1xuICAgIGlmIChldmVudHMgPT0gJyonKSBjYWxsYmFja3MgPSB7fVxuICAgIGVsc2Uge1xuICAgICAgZXZlbnRzLnJlcGxhY2UoL1xcUysvZywgZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICB2YXIgYXJyID0gY2FsbGJhY2tzW25hbWVdXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGNiOyAoY2IgPSBhcnIgJiYgYXJyW2ldKTsgKytpKSB7XG4gICAgICAgICAgICBpZiAoY2IuX2lkID09IGZuLl9pZCkgeyBhcnIuc3BsaWNlKGksIDEpOyBpLS0gfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFja3NbbmFtZV0gPSBbXVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIC8vIG9ubHkgc2luZ2xlIGV2ZW50IHN1cHBvcnRlZFxuICBlbC5vbmUgPSBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgIGlmIChmbikgZm4ub25lID0gMVxuICAgIHJldHVybiBlbC5vbihuYW1lLCBmbilcbiAgfVxuXG4gIGVsLnRyaWdnZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgIGZucyA9IGNhbGxiYWNrc1tuYW1lXSB8fCBbXVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGZuOyAoZm4gPSBmbnNbaV0pOyArK2kpIHtcbiAgICAgIGlmICghZm4uYnVzeSkge1xuICAgICAgICBmbi5idXN5ID0gMVxuICAgICAgICBmbi5hcHBseShlbCwgZm4udHlwZWQgPyBbbmFtZV0uY29uY2F0KGFyZ3MpIDogYXJncylcbiAgICAgICAgaWYgKGZuLm9uZSkgeyBmbnMuc3BsaWNlKGksIDEpOyBpLS0gfVxuICAgICAgICAgZWxzZSBpZiAoZm5zW2ldICE9PSBmbikgeyBpLS0gfSAvLyBNYWtlcyBzZWxmLXJlbW92YWwgcG9zc2libGUgZHVyaW5nIGl0ZXJhdGlvblxuICAgICAgICBmbi5idXN5ID0gMFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgcmV0dXJuIGVsXG5cbn1cbjsoZnVuY3Rpb24ocmlvdCwgZXZ0KSB7XG5cbiAgLy8gYnJvd3NlcnMgb25seVxuICBpZiAoIXRoaXMudG9wKSByZXR1cm5cblxuICB2YXIgbG9jID0gbG9jYXRpb24sXG4gICAgICBmbnMgPSByaW90Lm9ic2VydmFibGUoKSxcbiAgICAgIHdpbiA9IHdpbmRvdyxcbiAgICAgIGN1cnJlbnRcblxuICBmdW5jdGlvbiBoYXNoKCkge1xuICAgIHJldHVybiBsb2MuaGFzaC5zbGljZSgxKVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VyKHBhdGgpIHtcbiAgICByZXR1cm4gcGF0aC5zcGxpdCgnLycpXG4gIH1cblxuICBmdW5jdGlvbiBlbWl0KHBhdGgpIHtcbiAgICBpZiAocGF0aC50eXBlKSBwYXRoID0gaGFzaCgpXG5cbiAgICBpZiAocGF0aCAhPSBjdXJyZW50KSB7XG4gICAgICBmbnMudHJpZ2dlci5hcHBseShudWxsLCBbJ0gnXS5jb25jYXQocGFyc2VyKHBhdGgpKSlcbiAgICAgIGN1cnJlbnQgPSBwYXRoXG4gICAgfVxuICB9XG5cbiAgdmFyIHIgPSByaW90LnJvdXRlID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgLy8gc3RyaW5nXG4gICAgaWYgKGFyZ1swXSkge1xuICAgICAgbG9jLmhhc2ggPSBhcmdcbiAgICAgIGVtaXQoYXJnKVxuXG4gICAgLy8gZnVuY3Rpb25cbiAgICB9IGVsc2Uge1xuICAgICAgZm5zLm9uKCdIJywgYXJnKVxuICAgIH1cbiAgfVxuXG4gIHIuZXhlYyA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgZm4uYXBwbHkobnVsbCwgcGFyc2VyKGhhc2goKSkpXG4gIH1cblxuICByLnBhcnNlciA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgcGFyc2VyID0gZm5cbiAgfVxuXG4gIHdpbi5hZGRFdmVudExpc3RlbmVyID8gd2luLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBlbWl0LCBmYWxzZSkgOiB3aW4uYXR0YWNoRXZlbnQoJ29uJyArIGV2dCwgZW1pdClcblxufSkocmlvdCwgJ2hhc2hjaGFuZ2UnKVxuLypcblxuLy8vLyBIb3cgaXQgd29ya3M/XG5cblxuVGhyZWUgd2F5czpcblxuMS4gRXhwcmVzc2lvbnM6IHRtcGwoJ3sgdmFsdWUgfScsIGRhdGEpLlxuICAgUmV0dXJucyB0aGUgcmVzdWx0IG9mIGV2YWx1YXRlZCBleHByZXNzaW9uIGFzIGEgcmF3IG9iamVjdC5cblxuMi4gVGVtcGxhdGVzOiB0bXBsKCdIaSB7IG5hbWUgfSB7IHN1cm5hbWUgfScsIGRhdGEpLlxuICAgUmV0dXJucyBhIHN0cmluZyB3aXRoIGV2YWx1YXRlZCBleHByZXNzaW9ucy5cblxuMy4gRmlsdGVyczogdG1wbCgneyBzaG93OiAhZG9uZSwgaGlnaGxpZ2h0OiBhY3RpdmUgfScsIGRhdGEpLlxuICAgUmV0dXJucyBhIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIHRydWVpc2gga2V5cyAobWFpbmx5XG4gICB1c2VkIGZvciBzZXR0aW5nIGh0bWwgY2xhc3NlcyksIGUuZy4gXCJzaG93IGhpZ2hsaWdodFwiLlxuXG5cbi8vIFRlbXBsYXRlIGV4YW1wbGVzXG5cbnRtcGwoJ3sgdGl0bGUgfHwgXCJVbnRpdGxlZFwiIH0nLCBkYXRhKVxudG1wbCgnUmVzdWx0cyBhcmUgeyByZXN1bHRzID8gXCJyZWFkeVwiIDogXCJsb2FkaW5nXCIgfScsIGRhdGEpXG50bXBsKCdUb2RheSBpcyB7IG5ldyBEYXRlKCkgfScsIGRhdGEpXG50bXBsKCd7IG1lc3NhZ2UubGVuZ3RoID4gMTQwICYmIFwiTWVzc2FnZSBpcyB0b28gbG9uZ1wiIH0nLCBkYXRhKVxudG1wbCgnVGhpcyBpdGVtIGdvdCB7IE1hdGgucm91bmQocmF0aW5nKSB9IHN0YXJzJywgZGF0YSlcbnRtcGwoJzxoMT57IHRpdGxlIH08L2gxPnsgYm9keSB9JywgZGF0YSlcblxuXG4vLyBGYWxzeSBleHByZXNzaW9ucyBpbiB0ZW1wbGF0ZXNcblxuSW4gdGVtcGxhdGVzIChhcyBvcHBvc2VkIHRvIHNpbmdsZSBleHByZXNzaW9ucykgYWxsIGZhbHN5IHZhbHVlc1xuZXhjZXB0IHplcm8gKHVuZGVmaW5lZC9udWxsL2ZhbHNlKSB3aWxsIGRlZmF1bHQgdG8gZW1wdHkgc3RyaW5nOlxuXG50bXBsKCd7IHVuZGVmaW5lZCB9IC0geyBmYWxzZSB9IC0geyBudWxsIH0gLSB7IDAgfScsIHt9KVxuLy8gd2lsbCByZXR1cm46IFwiIC0gLSAtIDBcIlxuXG4qL1xuXG5cbnZhciBicmFja2V0cyA9IChmdW5jdGlvbihvcmlnLCBzLCBiKSB7XG4gIHJldHVybiBmdW5jdGlvbih4KSB7XG5cbiAgICAvLyBtYWtlIHN1cmUgd2UgdXNlIHRoZSBjdXJyZW50IHNldHRpbmdcbiAgICBzID0gcmlvdC5zZXR0aW5ncy5icmFja2V0cyB8fCBvcmlnXG4gICAgaWYgKGIgIT0gcykgYiA9IHMuc3BsaXQoJyAnKVxuXG4gICAgLy8gaWYgcmVnZXhwIGdpdmVuLCByZXdyaXRlIGl0IHdpdGggY3VycmVudCBicmFja2V0cyAob25seSBpZiBkaWZmZXIgZnJvbSBkZWZhdWx0KVxuICAgIC8vIGVsc2UsIGdldCBicmFja2V0c1xuICAgIHJldHVybiB4ICYmIHgudGVzdFxuICAgICAgPyBzID09IG9yaWdcbiAgICAgICAgPyB4IDogUmVnRXhwKHguc291cmNlXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcey9nLCBiWzBdLnJlcGxhY2UoLyg/PS4pL2csICdcXFxcJykpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcfS9nLCBiWzFdLnJlcGxhY2UoLyg/PS4pL2csICdcXFxcJykpLFxuICAgICAgICAgICAgICAgICAgICB4Lmdsb2JhbCA/ICdnJyA6ICcnKVxuICAgICAgOiBiW3hdXG5cbiAgfVxufSkoJ3sgfScpXG5cblxudmFyIHRtcGwgPSAoZnVuY3Rpb24oKSB7XG5cbiAgdmFyIGNhY2hlID0ge30sXG4gICAgICByZV9leHByID0gLyh7W1xcc1xcU10qP30pLyxcbiAgICAgIHJlX3ZhcnMgPSAvKFsnXCJcXC9dKS4qP1teXFxcXF1cXDF8XFwuXFx3KnxcXHcqOnxcXGIoPzooPzpuZXd8dHlwZW9mfGlufGluc3RhbmNlb2YpIHwoPzp0aGlzfHRydWV8ZmFsc2V8bnVsbHx1bmRlZmluZWQpXFxifGZ1bmN0aW9uICpcXCgpfChbYS16X11cXHcqKS9naVxuICAgICAgICAgICAgICAvLyBbIDEgICAgICAgICAgICAgICBdWyAyICBdWyAzIF1bIDQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVsgNSAgICAgICBdXG4gICAgICAgICAgICAgIC8vIGZpbmQgdmFyaWFibGUgbmFtZXM6XG4gICAgICAgICAgICAgIC8vIDEuIHNraXAgcXVvdGVkIHN0cmluZ3MgYW5kIHJlZ2V4cHM6IFwiYSBiXCIsICdhIGInLCAnYSBcXCdiXFwnJywgL2EgYi9cbiAgICAgICAgICAgICAgLy8gMi4gc2tpcCBvYmplY3QgcHJvcGVydGllczogLm5hbWVcbiAgICAgICAgICAgICAgLy8gMy4gc2tpcCBvYmplY3QgbGl0ZXJhbHM6IG5hbWU6XG4gICAgICAgICAgICAgIC8vIDQuIHNraXAgamF2YXNjcmlwdCBrZXl3b3Jkc1xuICAgICAgICAgICAgICAvLyA1LiBtYXRjaCB2YXIgbmFtZVxuXG4gIC8vIGJ1aWxkIGEgdGVtcGxhdGUgKG9yIGdldCBpdCBmcm9tIGNhY2hlKSwgcmVuZGVyIHdpdGggZGF0YVxuICByZXR1cm4gZnVuY3Rpb24oc3RyLCBkYXRhKSB7XG4gICAgcmV0dXJuIHN0ciAmJiAoY2FjaGVbc3RyXSA9IGNhY2hlW3N0cl0gfHwgdG1wbChzdHIpKShkYXRhKVxuICB9XG5cblxuICAvLyBjcmVhdGUgYSB0ZW1wbGF0ZSBpbnN0YW5jZVxuXG4gIGZ1bmN0aW9uIHRtcGwocywgcCkge1xuXG4gICAgLy8gZGVmYXVsdCB0ZW1wbGF0ZSBzdHJpbmcgdG8ge31cbiAgICBwID0gKHMgfHwgKGJyYWNrZXRzKDApICsgYnJhY2tldHMoMSkpKVxuXG4gICAgICAvLyB0ZW1wb3JhcmlseSBjb252ZXJ0IFxceyBhbmQgXFx9IHRvIGEgbm9uLWNoYXJhY3RlclxuICAgICAgLnJlcGxhY2UoYnJhY2tldHMoL1xcXFx7LyksICdcXHVGRkYwJylcbiAgICAgIC5yZXBsYWNlKGJyYWNrZXRzKC9cXFxcfS8pLCAnXFx1RkZGMScpXG5cbiAgICAgIC8vIHNwbGl0IHN0cmluZyB0byBleHByZXNzaW9uIGFuZCBub24tZXhwcmVzaW9uIHBhcnRzXG4gICAgICAuc3BsaXQoYnJhY2tldHMocmVfZXhwcikpXG5cbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdkJywgJ3JldHVybiAnICsgKFxuXG4gICAgICAvLyBpcyBpdCBhIHNpbmdsZSBleHByZXNzaW9uIG9yIGEgdGVtcGxhdGU/IGkuZS4ge3h9IG9yIDxiPnt4fTwvYj5cbiAgICAgICFwWzBdICYmICFwWzJdICYmICFwWzNdXG5cbiAgICAgICAgLy8gaWYgZXhwcmVzc2lvbiwgZXZhbHVhdGUgaXRcbiAgICAgICAgPyBleHByKHBbMV0pXG5cbiAgICAgICAgLy8gaWYgdGVtcGxhdGUsIGV2YWx1YXRlIGFsbCBleHByZXNzaW9ucyBpbiBpdFxuICAgICAgICA6ICdbJyArIHAubWFwKGZ1bmN0aW9uKHMsIGkpIHtcblxuICAgICAgICAgICAgLy8gaXMgaXQgYW4gZXhwcmVzc2lvbiBvciBhIHN0cmluZyAoZXZlcnkgc2Vjb25kIHBhcnQgaXMgYW4gZXhwcmVzc2lvbilcbiAgICAgICAgICByZXR1cm4gaSAlIDJcblxuICAgICAgICAgICAgICAvLyBldmFsdWF0ZSB0aGUgZXhwcmVzc2lvbnNcbiAgICAgICAgICAgICAgPyBleHByKHMsIDEpXG5cbiAgICAgICAgICAgICAgLy8gcHJvY2VzcyBzdHJpbmcgcGFydHMgb2YgdGhlIHRlbXBsYXRlOlxuICAgICAgICAgICAgICA6ICdcIicgKyBzXG5cbiAgICAgICAgICAgICAgICAgIC8vIHByZXNlcnZlIG5ldyBsaW5lc1xuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKVxuXG4gICAgICAgICAgICAgICAgICAvLyBlc2NhcGUgcXVvdGVzXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpXG5cbiAgICAgICAgICAgICAgICArICdcIidcblxuICAgICAgICB9KS5qb2luKCcsJykgKyAnXS5qb2luKFwiXCIpJ1xuICAgICAgKVxuXG4gICAgICAvLyBicmluZyBlc2NhcGVkIHsgYW5kIH0gYmFja1xuICAgICAgLnJlcGxhY2UoL1xcdUZGRjAvZywgYnJhY2tldHMoMCkpXG4gICAgICAucmVwbGFjZSgvXFx1RkZGMS9nLCBicmFja2V0cygxKSlcblxuICAgICsgJzsnKVxuXG4gIH1cblxuXG4gIC8vIHBhcnNlIHsgLi4uIH0gZXhwcmVzc2lvblxuXG4gIGZ1bmN0aW9uIGV4cHIocywgbikge1xuICAgIHMgPSBzXG5cbiAgICAgIC8vIGNvbnZlcnQgbmV3IGxpbmVzIHRvIHNwYWNlc1xuICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnICcpXG5cbiAgICAgIC8vIHRyaW0gd2hpdGVzcGFjZSwgY3VybHkgYnJhY2tldHMsIHN0cmlwIGNvbW1lbnRzXG4gICAgICAucmVwbGFjZShicmFja2V0cygvXlt7IF0rfFsgfV0rJHxcXC9cXCouKz9cXCpcXC8vZyksICcnKVxuXG4gICAgLy8gaXMgaXQgYW4gb2JqZWN0IGxpdGVyYWw/IGkuZS4geyBrZXkgOiB2YWx1ZSB9XG4gICAgcmV0dXJuIC9eXFxzKltcXHctIFwiJ10rICo6Ly50ZXN0KHMpXG5cbiAgICAgIC8vIGlmIG9iamVjdCBsaXRlcmFsLCByZXR1cm4gdHJ1ZWlzaCBrZXlzXG4gICAgICAvLyBlLmcuOiB7IHNob3c6IGlzT3BlbigpLCBkb25lOiBpdGVtLmRvbmUgfSAtPiBcInNob3cgZG9uZVwiXG4gICAgICA/ICdbJyArIHMucmVwbGFjZSgvXFxXKihbXFx3LSBdKylcXFcqOihbXixdKykvZywgZnVuY3Rpb24oXywgaywgdikge1xuXG4gICAgICAgIHJldHVybiB2LnJlcGxhY2UoL1teJnw9IT48XSsvZywgd3JhcCkgKyAnP1wiJyArIGsudHJpbSgpICsgJ1wiOlwiXCIsJ1xuXG4gICAgICB9KSArICddLmpvaW4oXCIgXCIpJ1xuXG4gICAgICAvLyBpZiBqcyBleHByZXNzaW9uLCBldmFsdWF0ZSBhcyBqYXZhc2NyaXB0XG4gICAgICA6IHdyYXAocywgbilcblxuICB9XG5cblxuICAvLyBleGVjdXRlIGpzIHcvbyBicmVha2luZyBvbiBlcnJvcnMgb3IgdW5kZWZpbmVkIHZhcnNcblxuICBmdW5jdGlvbiB3cmFwKHMsIG5vbnVsbCkge1xuICAgIHMgPSBzLnRyaW0oKVxuICAgIHJldHVybiAhcyA/ICcnIDogJyhmdW5jdGlvbih2KXt0cnl7dj0nXG5cbiAgICAgICAgLy8gcHJlZml4IHZhcnMgKG5hbWUgPT4gZGF0YS5uYW1lKVxuICAgICAgICArIChzLnJlcGxhY2UocmVfdmFycywgZnVuY3Rpb24ocywgXywgdikgeyByZXR1cm4gdiA/ICcoZC4nK3YrJz09PXVuZGVmaW5lZD93aW5kb3cuJyt2Kyc6ZC4nK3YrJyknIDogcyB9KVxuXG4gICAgICAgICAgLy8gYnJlYWsgdGhlIGV4cHJlc3Npb24gaWYgaXRzIGVtcHR5IChyZXN1bHRpbmcgaW4gdW5kZWZpbmVkIHZhbHVlKVxuICAgICAgICAgIHx8ICd4JylcblxuICAgICAgKyAnfWZpbmFsbHl7cmV0dXJuICdcblxuICAgICAgICAvLyBkZWZhdWx0IHRvIGVtcHR5IHN0cmluZyBmb3IgZmFsc3kgdmFsdWVzIGV4Y2VwdCB6ZXJvXG4gICAgICAgICsgKG5vbnVsbCA/ICchdiYmdiE9PTA/XCJcIjp2JyA6ICd2JylcblxuICAgICAgKyAnfX0pLmNhbGwoZCknXG4gIH1cblxufSkoKVxuLy8geyBrZXksIGkgaW4gaXRlbXN9IC0+IHsga2V5LCBpLCBpdGVtcyB9XG5mdW5jdGlvbiBsb29wS2V5cyhleHByKSB7XG4gIHZhciByZXQgPSB7IHZhbDogZXhwciB9LFxuICAgICAgZWxzID0gZXhwci5zcGxpdCgvXFxzK2luXFxzKy8pXG5cbiAgaWYgKGVsc1sxXSkge1xuICAgIHJldC52YWwgPSBicmFja2V0cygwKSArIGVsc1sxXVxuICAgIGVscyA9IGVsc1swXS5zbGljZShicmFja2V0cygwKS5sZW5ndGgpLnRyaW0oKS5zcGxpdCgvLFxccyovKVxuICAgIHJldC5rZXkgPSBlbHNbMF1cbiAgICByZXQucG9zID0gZWxzWzFdXG4gIH1cblxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIG1raXRlbShleHByLCBrZXksIHZhbCkge1xuICB2YXIgaXRlbSA9IHt9XG4gIGl0ZW1bZXhwci5rZXldID0ga2V5XG4gIGlmIChleHByLnBvcykgaXRlbVtleHByLnBvc10gPSB2YWxcbiAgcmV0dXJuIGl0ZW1cbn1cblxuXG4vKiBCZXdhcmU6IGhlYXZ5IHN0dWZmICovXG5mdW5jdGlvbiBfZWFjaChkb20sIHBhcmVudCwgZXhwcikge1xuXG4gIHJlbUF0dHIoZG9tLCAnZWFjaCcpXG5cbiAgdmFyIHRlbXBsYXRlID0gZG9tLm91dGVySFRNTCxcbiAgICAgIHByZXYgPSBkb20ucHJldmlvdXNTaWJsaW5nLFxuICAgICAgcm9vdCA9IGRvbS5wYXJlbnROb2RlLFxuICAgICAgcmVuZGVyZWQgPSBbXSxcbiAgICAgIHRhZ3MgPSBbXSxcbiAgICAgIGNoZWNrc3VtXG5cbiAgZXhwciA9IGxvb3BLZXlzKGV4cHIpXG5cbiAgZnVuY3Rpb24gYWRkKHBvcywgaXRlbSwgdGFnKSB7XG4gICAgcmVuZGVyZWQuc3BsaWNlKHBvcywgMCwgaXRlbSlcbiAgICB0YWdzLnNwbGljZShwb3MsIDAsIHRhZylcbiAgfVxuXG5cbiAgLy8gY2xlYW4gdGVtcGxhdGUgY29kZSBhZnRlciB1cGRhdGUgKGFuZCBsZXQgd2FsayBmaW5pc2ggaXQncyBwYXJzZSlcbiAgcGFyZW50Lm9uZSgndXBkYXRlJywgZnVuY3Rpb24oKSB7XG4gICAgcm9vdC5yZW1vdmVDaGlsZChkb20pXG5cbiAgfSkub25lKCdwcmVtb3VudCcsIGZ1bmN0aW9uKCkge1xuICAgIGlmIChyb290LnN0dWIpIHJvb3QgPSBwYXJlbnQucm9vdFxuXG4gIH0pLm9uKCd1cGRhdGUnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBpdGVtcyA9IHRtcGwoZXhwci52YWwsIHBhcmVudClcbiAgICBpZiAoIWl0ZW1zKSByZXR1cm5cblxuICAgIC8vIG9iamVjdCBsb29wLiBhbnkgY2hhbmdlcyBjYXVzZSBmdWxsIHJlZHJhd1xuICAgIGlmICghQXJyYXkuaXNBcnJheShpdGVtcykpIHtcbiAgICAgIHZhciB0ZXN0c3VtID0gSlNPTi5zdHJpbmdpZnkoaXRlbXMpXG4gICAgICBpZiAodGVzdHN1bSA9PSBjaGVja3N1bSkgcmV0dXJuXG4gICAgICBjaGVja3N1bSA9IHRlc3RzdW1cblxuICAgICAgLy8gY2xlYXIgb2xkIGl0ZW1zXG4gICAgICBlYWNoKHRhZ3MsIGZ1bmN0aW9uKHRhZykgeyB0YWcudW5tb3VudCgpIH0pXG4gICAgICByZW5kZXJlZCA9IFtdXG4gICAgICB0YWdzID0gW11cblxuICAgICAgaXRlbXMgPSBPYmplY3Qua2V5cyhpdGVtcykubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICByZXR1cm4gbWtpdGVtKGV4cHIsIGtleSwgaXRlbXNba2V5XSlcbiAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvLyB1bm1vdW50IHJlZHVuZGFudFxuICAgIGVhY2goYXJyRGlmZihyZW5kZXJlZCwgaXRlbXMpLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICB2YXIgcG9zID0gcmVuZGVyZWQuaW5kZXhPZihpdGVtKSxcbiAgICAgICAgICB0YWcgPSB0YWdzW3Bvc11cblxuICAgICAgaWYgKHRhZykge1xuICAgICAgICB0YWcudW5tb3VudCgpXG4gICAgICAgIHJlbmRlcmVkLnNwbGljZShwb3MsIDEpXG4gICAgICAgIHRhZ3Muc3BsaWNlKHBvcywgMSlcbiAgICAgIH1cblxuICAgIH0pXG5cbiAgICAvLyBtb3VudCBuZXcgLyByZW9yZGVyXG4gICAgdmFyIG5vZGVzID0gcm9vdC5jaGlsZE5vZGVzLFxuICAgICAgICBwcmV2X2luZGV4ID0gW10uaW5kZXhPZi5jYWxsKG5vZGVzLCBwcmV2KVxuXG4gICAgZWFjaChpdGVtcywgZnVuY3Rpb24oaXRlbSwgaSkge1xuXG4gICAgICAvLyBzdGFydCBpbmRleCBzZWFyY2ggZnJvbSBwb3NpdGlvbiBiYXNlZCBvbiB0aGUgY3VycmVudCBpXG4gICAgICB2YXIgcG9zID0gaXRlbXMuaW5kZXhPZihpdGVtLCBpKSxcbiAgICAgICAgICBvbGRQb3MgPSByZW5kZXJlZC5pbmRleE9mKGl0ZW0sIGkpXG5cbiAgICAgIC8vIGlmIG5vdCBmb3VuZCwgc2VhcmNoIGJhY2t3YXJkcyBmcm9tIGN1cnJlbnQgaSBwb3NpdGlvblxuICAgICAgcG9zIDwgMCAmJiAocG9zID0gaXRlbXMubGFzdEluZGV4T2YoaXRlbSwgaSkpXG4gICAgICBvbGRQb3MgPCAwICYmIChvbGRQb3MgPSByZW5kZXJlZC5sYXN0SW5kZXhPZihpdGVtLCBpKSlcblxuICAgICAgLy8gbW91bnQgbmV3XG4gICAgICBpZiAob2xkUG9zIDwgMCkge1xuICAgICAgICBpZiAoIWNoZWNrc3VtICYmIGV4cHIua2V5KSBpdGVtID0gbWtpdGVtKGV4cHIsIGl0ZW0sIHBvcylcblxuICAgICAgICB2YXIgdGFnID0gbmV3IFRhZyh7IHRtcGw6IHRlbXBsYXRlIH0sIHtcbiAgICAgICAgICBiZWZvcmU6IG5vZGVzW3ByZXZfaW5kZXggKyAxICsgcG9zXSxcbiAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgICByb290OiByb290LFxuICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBhZGQocG9zLCBpdGVtLCB0YWcpXG4gICAgICB9XG5cbiAgICAgIC8vIGNoYW5nZSBwb3MgdmFsdWVcbiAgICAgIGlmIChleHByLnBvcyAmJiB0YWdzW29sZFBvc11bZXhwci5wb3NdICE9IHBvcykge1xuICAgICAgICB0YWdzW29sZFBvc10ub25lKCd1cGRhdGUnLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgaXRlbVtleHByLnBvc10gPSBwb3NcbiAgICAgICAgfSlcbiAgICAgICAgdGFnc1tvbGRQb3NdLnVwZGF0ZSgpXG4gICAgICB9XG5cbiAgICAgIC8vIHJlb3JkZXJcbiAgICAgIGlmIChwb3MgIT0gb2xkUG9zKSB7XG4gICAgICAgIHJvb3QuaW5zZXJ0QmVmb3JlKG5vZGVzW3ByZXZfaW5kZXggKyBvbGRQb3MgKyAxXSwgbm9kZXNbcHJldl9pbmRleCArIHBvcyArIDFdKVxuICAgICAgICByZXR1cm4gYWRkKHBvcywgcmVuZGVyZWQuc3BsaWNlKG9sZFBvcywgMSlbMF0sIHRhZ3Muc3BsaWNlKG9sZFBvcywgMSlbMF0pXG4gICAgICB9XG5cbiAgICB9KVxuXG4gICAgcmVuZGVyZWQgPSBpdGVtcy5zbGljZSgpXG5cbiAgfSlcblxufVxuXG5mdW5jdGlvbiBwYXJzZU5hbWVkRWxlbWVudHMocm9vdCwgdGFnLCBleHByZXNzaW9ucykge1xuICB3YWxrKHJvb3QsIGZ1bmN0aW9uKGRvbSkge1xuICAgIGlmIChkb20ubm9kZVR5cGUgPT0gMSkge1xuICAgICAgZWFjaChkb20uYXR0cmlidXRlcywgZnVuY3Rpb24oYXR0cikge1xuICAgICAgICBpZiAoL14obmFtZXxpZCkkLy50ZXN0KGF0dHIubmFtZSkpIHRhZ1thdHRyLnZhbHVlXSA9IGRvbVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIHBhcnNlTGF5b3V0KHJvb3QsIHRhZywgZXhwcmVzc2lvbnMpIHtcblxuICBmdW5jdGlvbiBhZGRFeHByKGRvbSwgdmFsLCBleHRyYSkge1xuICAgIGlmICh2YWwuaW5kZXhPZihicmFja2V0cygwKSkgPj0gMCkge1xuICAgICAgdmFyIGV4cHIgPSB7IGRvbTogZG9tLCBleHByOiB2YWwgfVxuICAgICAgZXhwcmVzc2lvbnMucHVzaChleHRlbmQoZXhwciwgZXh0cmEpKVxuICAgIH1cbiAgfVxuXG4gIHdhbGsocm9vdCwgZnVuY3Rpb24oZG9tKSB7XG4gICAgdmFyIHR5cGUgPSBkb20ubm9kZVR5cGVcblxuICAgIC8vIHRleHQgbm9kZVxuICAgIGlmICh0eXBlID09IDMgJiYgZG9tLnBhcmVudE5vZGUudGFnTmFtZSAhPSAnU1RZTEUnKSBhZGRFeHByKGRvbSwgZG9tLm5vZGVWYWx1ZSlcbiAgICBpZiAodHlwZSAhPSAxKSByZXR1cm5cblxuICAgIC8qIGVsZW1lbnQgKi9cblxuICAgIC8vIGxvb3BcbiAgICB2YXIgYXR0ciA9IGRvbS5nZXRBdHRyaWJ1dGUoJ2VhY2gnKVxuICAgIGlmIChhdHRyKSB7IF9lYWNoKGRvbSwgdGFnLCBhdHRyKTsgcmV0dXJuIGZhbHNlIH1cblxuICAgIC8vIGF0dHJpYnV0ZSBleHByZXNzaW9uc1xuICAgIGVhY2goZG9tLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGF0dHIpIHtcbiAgICAgIHZhciBuYW1lID0gYXR0ci5uYW1lLFxuICAgICAgICAgIGJvb2wgPSBuYW1lLnNwbGl0KCdfXycpWzFdXG5cbiAgICAgIGFkZEV4cHIoZG9tLCBhdHRyLnZhbHVlLCB7IGF0dHI6IGJvb2wgfHwgbmFtZSwgYm9vbDogYm9vbCB9KVxuICAgICAgaWYgKGJvb2wpIHsgcmVtQXR0cihkb20sIG5hbWUpOyByZXR1cm4gZmFsc2UgfVxuXG4gICAgfSlcblxuICAgIC8vIGN1c3RvbSBjaGlsZCB0YWdcbiAgICB2YXIgaW1wbCA9IHRhZ19pbXBsW2RvbS50YWdOYW1lLnRvTG93ZXJDYXNlKCldXG5cbiAgICBpZiAoaW1wbCkge1xuICAgICAgaW1wbCA9IG5ldyBUYWcoaW1wbCwgeyByb290OiBkb20sIHBhcmVudDogdGFnIH0pXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgfSlcbn1cblxuZnVuY3Rpb24gVGFnKGltcGwsIGNvbmYpIHtcblxuICB2YXIgc2VsZiA9IHJpb3Qub2JzZXJ2YWJsZSh0aGlzKSxcbiAgICAgIG9wdHMgPSBpbmhlcml0KGNvbmYub3B0cykgfHwge30sXG4gICAgICBkb20gPSBta2RvbShpbXBsLnRtcGwpLFxuICAgICAgcGFyZW50ID0gY29uZi5wYXJlbnQsXG4gICAgICBpc19sb29wID0gY29uZi5sb29wLFxuICAgICAgZXhwcmVzc2lvbnMgPSBbXSxcbiAgICAgIHJvb3QgPSBjb25mLnJvb3QsXG4gICAgICBpdGVtID0gY29uZi5pdGVtLFxuICAgICAgYXR0ciA9IHt9LFxuICAgICAgbG9vcF9kb21cblxuICBleHRlbmQodGhpcywgeyBwYXJlbnQ6IHBhcmVudCwgcm9vdDogcm9vdCwgb3B0czogb3B0cyB9LCBpdGVtKVxuXG4gIC8vIGdyYWIgYXR0cmlidXRlc1xuICBlYWNoKHJvb3QuYXR0cmlidXRlcywgZnVuY3Rpb24oZWwpIHtcbiAgICBhdHRyW2VsLm5hbWVdID0gZWwudmFsdWVcbiAgfSlcblxuICAvLyBvcHRpb25zXG4gIGZ1bmN0aW9uIHVwZGF0ZU9wdHMocmVtX2F0dHIpIHtcbiAgICBlYWNoKE9iamVjdC5rZXlzKGF0dHIpLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBvcHRzW25hbWVdID0gdG1wbChhdHRyW25hbWVdLCBwYXJlbnQgfHwgc2VsZilcbiAgICB9KVxuICB9XG5cbiAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbihkYXRhLCBpbml0KSB7XG4gICAgZXh0ZW5kKHNlbGYsIGRhdGEsIGl0ZW0pXG4gICAgdXBkYXRlT3B0cygpXG4gICAgc2VsZi50cmlnZ2VyKCd1cGRhdGUnLCBpdGVtKVxuICAgIHVwZGF0ZShleHByZXNzaW9ucywgc2VsZiwgaXRlbSlcbiAgICBzZWxmLnRyaWdnZXIoJ3VwZGF0ZWQnKVxuICB9XG5cbiAgdGhpcy51bm1vdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gaXNfbG9vcCA/IGxvb3BfZG9tIDogcm9vdCxcbiAgICAgICAgcCA9IGVsLnBhcmVudE5vZGVcblxuICAgIGlmIChwKSB7XG4gICAgICBpZiAocGFyZW50KSBwLnJlbW92ZUNoaWxkKGVsKVxuICAgICAgZWxzZSB3aGlsZSAocm9vdC5maXJzdENoaWxkKSByb290LnJlbW92ZUNoaWxkKHJvb3QuZmlyc3RDaGlsZClcbiAgICAgIHNlbGYudHJpZ2dlcigndW5tb3VudCcpXG4gICAgICBwYXJlbnQgJiYgcGFyZW50Lm9mZigndXBkYXRlJywgc2VsZi51cGRhdGUpLm9mZigndW5tb3VudCcsIHNlbGYudW5tb3VudClcbiAgICAgIHNlbGYub2ZmKCcqJylcbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuXG4gICAgLy8gaW50ZXJuYWwgdXNlIG9ubHksIGZpeGVzICM0MDNcbiAgICBzZWxmLnRyaWdnZXIoJ3ByZW1vdW50JylcblxuICAgIGlmIChpc19sb29wKSB7XG4gICAgICBsb29wX2RvbSA9IGRvbS5maXJzdENoaWxkXG4gICAgICByb290Lmluc2VydEJlZm9yZShsb29wX2RvbSwgY29uZi5iZWZvcmUgfHwgbnVsbCkgLy8gbnVsbCBuZWVkZWQgZm9yIElFOFxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlIChkb20uZmlyc3RDaGlsZCkgcm9vdC5hcHBlbmRDaGlsZChkb20uZmlyc3RDaGlsZClcbiAgICB9XG5cbiAgICBpZiAocm9vdC5zdHViKSBzZWxmLnJvb3QgPSByb290ID0gcGFyZW50LnJvb3RcblxuICAgIC8vIG9uZSB3YXkgZGF0YSBmbG93OiBwcm9wYWdhdGUgdXBkYXRlcyBhbmQgdW5tb3VudHMgZG93bndhcmRzIGZyb20gcGFyZW50IHRvIGNoaWxkcmVuXG4gICAgcGFyZW50ICYmIHBhcmVudC5vbigndXBkYXRlJywgc2VsZi51cGRhdGUpLm9uZSgndW5tb3VudCcsIHNlbGYudW5tb3VudClcblxuICAgIHNlbGYudHJpZ2dlcignbW91bnQnKVxuICB9XG5cbiAgdXBkYXRlT3B0cygpXG5cbiAgLy8gbmFtZWQgZWxlbWVudHMgYXZhaWxhYmxlIGZvciBmblxuICBwYXJzZU5hbWVkRWxlbWVudHMoZG9tLCB0aGlzKVxuXG4gIC8vIGZuIChpbml0aWFsaWF0aW9uKVxuICBpZiAoaW1wbC5mbikgaW1wbC5mbi5jYWxsKHRoaXMsIG9wdHMpXG5cbiAgLy8gcGFyc2UgbGF5b3V0IGFmdGVyIGluaXQuIGZuIG1heSBjYWxjdWxhdGUgYXJncyBmb3IgbmVzdGVkIGN1c3RvbSB0YWdzXG4gIHBhcnNlTGF5b3V0KGRvbSwgdGhpcywgZXhwcmVzc2lvbnMpXG5cbiAgdGhpcy51cGRhdGUoKVxuICBtb3VudCgpXG5cbn1cblxuZnVuY3Rpb24gc2V0RXZlbnRIYW5kbGVyKG5hbWUsIGhhbmRsZXIsIGRvbSwgdGFnLCBpdGVtKSB7XG5cbiAgZG9tW25hbWVdID0gZnVuY3Rpb24oZSkge1xuXG4gICAgLy8gY3Jvc3MgYnJvd3NlciBldmVudCBmaXhcbiAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnRcbiAgICBlLndoaWNoID0gZS53aGljaCB8fCBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZVxuICAgIGUudGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50XG4gICAgZS5jdXJyZW50VGFyZ2V0ID0gZG9tXG4gICAgZS5pdGVtID0gaXRlbVxuXG4gICAgLy8gcHJldmVudCBkZWZhdWx0IGJlaGF2aW91ciAoYnkgZGVmYXVsdClcbiAgICBpZiAoaGFuZGxlci5jYWxsKHRhZywgZSkgIT09IHRydWUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQgJiYgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBlLnJldHVyblZhbHVlID0gZmFsc2VcbiAgICB9XG5cbiAgICB2YXIgZWwgPSBpdGVtID8gdGFnLnBhcmVudCA6IHRhZ1xuICAgIGVsLnVwZGF0ZSgpXG5cbiAgfVxuXG59XG5cbi8vIHVzZWQgYnkgaWYtIGF0dHJpYnV0ZVxuZnVuY3Rpb24gaW5zZXJ0VG8ocm9vdCwgbm9kZSwgYmVmb3JlKSB7XG4gIGlmIChyb290KSB7XG4gICAgcm9vdC5pbnNlcnRCZWZvcmUoYmVmb3JlLCBub2RlKVxuICAgIHJvb3QucmVtb3ZlQ2hpbGQobm9kZSlcbiAgfVxufVxuXG4vLyBpdGVtID0gY3VycmVudGx5IGxvb3BlZCBpdGVtXG5mdW5jdGlvbiB1cGRhdGUoZXhwcmVzc2lvbnMsIHRhZywgaXRlbSkge1xuXG4gIGVhY2goZXhwcmVzc2lvbnMsIGZ1bmN0aW9uKGV4cHIpIHtcblxuICAgIHZhciBkb20gPSBleHByLmRvbSxcbiAgICAgICAgYXR0cl9uYW1lID0gZXhwci5hdHRyLFxuICAgICAgICB2YWx1ZSA9IHRtcGwoZXhwci5leHByLCB0YWcpXG5cbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAnJ1xuXG4gICAgLy8gbm8gY2hhbmdlXG4gICAgaWYgKGV4cHIudmFsdWUgPT09IHZhbHVlKSByZXR1cm5cbiAgICBleHByLnZhbHVlID0gdmFsdWVcblxuICAgIC8vIHRleHQgbm9kZVxuICAgIGlmICghYXR0cl9uYW1lKSByZXR1cm4gZG9tLm5vZGVWYWx1ZSA9IHZhbHVlXG5cbiAgICAvLyByZW1vdmUgb3JpZ2luYWwgYXR0cmlidXRlXG4gICAgcmVtQXR0cihkb20sIGF0dHJfbmFtZSlcblxuICAgIC8vIGV2ZW50IGhhbmRsZXJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcbiAgICAgIHNldEV2ZW50SGFuZGxlcihhdHRyX25hbWUsIHZhbHVlLCBkb20sIHRhZywgaXRlbSlcblxuICAgIC8vIGlmLSBjb25kaXRpb25hbFxuICAgIH0gZWxzZSBpZiAoYXR0cl9uYW1lID09ICdpZicpIHtcbiAgICAgIHZhciBzdHViID0gZXhwci5zdHViXG5cbiAgICAgIC8vIGFkZCB0byBET01cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBzdHViICYmIGluc2VydFRvKHN0dWIucGFyZW50Tm9kZSwgc3R1YiwgZG9tKVxuXG4gICAgICAvLyByZW1vdmUgZnJvbSBET01cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0dWIgPSBleHByLnN0dWIgPSBzdHViIHx8IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKVxuICAgICAgICBpbnNlcnRUbyhkb20ucGFyZW50Tm9kZSwgZG9tLCBzdHViKVxuICAgICAgfVxuXG4gICAgLy8gc2hvdyAvIGhpZGVcbiAgICB9IGVsc2UgaWYgKC9eKHNob3d8aGlkZSkkLy50ZXN0KGF0dHJfbmFtZSkpIHtcbiAgICAgIGlmIChhdHRyX25hbWUgPT0gJ2hpZGUnKSB2YWx1ZSA9ICF2YWx1ZVxuICAgICAgZG9tLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICcnIDogJ25vbmUnXG5cbiAgICAvLyBmaWVsZCB2YWx1ZVxuICAgIH0gZWxzZSBpZiAoYXR0cl9uYW1lID09ICd2YWx1ZScpIHtcbiAgICAgIGRvbS52YWx1ZSA9IHZhbHVlXG5cbiAgICAvLyA8aW1nIHNyYz1cInsgZXhwciB9XCI+XG4gICAgfSBlbHNlIGlmIChhdHRyX25hbWUuc2xpY2UoMCwgNCkgPT0gJ3Jpb3QnKSB7XG4gICAgICBhdHRyX25hbWUgPSBhdHRyX25hbWUuc2xpY2UoNSlcbiAgICAgIHZhbHVlID8gZG9tLnNldEF0dHJpYnV0ZShhdHRyX25hbWUsIHZhbHVlKSA6IHJlbUF0dHIoZG9tLCBhdHRyX25hbWUpXG5cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGV4cHIuYm9vbCkge1xuICAgICAgICBkb21bYXR0cl9uYW1lXSA9IHZhbHVlXG4gICAgICAgIGlmICghdmFsdWUpIHJldHVyblxuICAgICAgICB2YWx1ZSA9IGF0dHJfbmFtZVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9ICdvYmplY3QnKSBkb20uc2V0QXR0cmlidXRlKGF0dHJfbmFtZSwgdmFsdWUpXG5cbiAgICB9XG5cbiAgfSlcblxufVxuZnVuY3Rpb24gZWFjaChlbHMsIGZuKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSAoZWxzIHx8IFtdKS5sZW5ndGgsIGVsOyBpIDwgbGVuOyBpKyspIHtcbiAgICBlbCA9IGVsc1tpXVxuICAgIC8vIHJldHVybiBmYWxzZSAtPiByZW9tdmUgY3VycmVudCBpdGVtIGR1cmluZyBsb29wXG4gICAgaWYgKGVsICE9IG51bGwgJiYgZm4oZWwsIGkpID09PSBmYWxzZSkgaS0tXG4gIH1cbiAgcmV0dXJuIGVsc1xufVxuXG5mdW5jdGlvbiByZW1BdHRyKGRvbSwgbmFtZSkge1xuICBkb20ucmVtb3ZlQXR0cmlidXRlKG5hbWUpXG59XG5cbi8vIG1heCAyIGZyb20gb2JqZWN0cyBhbGxvd2VkXG5mdW5jdGlvbiBleHRlbmQob2JqLCBmcm9tLCBmcm9tMikge1xuICBmcm9tICYmIGVhY2goT2JqZWN0LmtleXMoZnJvbSksIGZ1bmN0aW9uKGtleSkge1xuICAgIG9ialtrZXldID0gZnJvbVtrZXldXG4gIH0pXG4gIHJldHVybiBmcm9tMiA/IGV4dGVuZChvYmosIGZyb20yKSA6IG9ialxufVxuXG5mdW5jdGlvbiBta2RvbSh0ZW1wbGF0ZSkge1xuICB2YXIgdGFnX25hbWUgPSB0ZW1wbGF0ZS50cmltKCkuc2xpY2UoMSwgMykudG9Mb3dlckNhc2UoKSxcbiAgICAgIHJvb3RfdGFnID0gL3RkfHRoLy50ZXN0KHRhZ19uYW1lKSA/ICd0cicgOiB0YWdfbmFtZSA9PSAndHInID8gJ3Rib2R5JyA6ICdkaXYnLFxuICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHJvb3RfdGFnKVxuXG4gIGVsLnN0dWIgPSB0cnVlXG4gIGVsLmlubmVySFRNTCA9IHRlbXBsYXRlXG4gIHJldHVybiBlbFxufVxuXG5mdW5jdGlvbiB3YWxrKGRvbSwgZm4pIHtcbiAgaWYgKGRvbSkge1xuICAgIGlmIChmbihkb20pID09PSBmYWxzZSkgd2Fsayhkb20ubmV4dFNpYmxpbmcsIGZuKVxuICAgIGVsc2Uge1xuICAgICAgZG9tID0gZG9tLmZpcnN0Q2hpbGRcblxuICAgICAgd2hpbGUgKGRvbSkge1xuICAgICAgICB3YWxrKGRvbSwgZm4pXG4gICAgICAgIGRvbSA9IGRvbS5uZXh0U2libGluZ1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcnJEaWZmKGFycjEsIGFycjIpIHtcbiAgcmV0dXJuIGFycjEuZmlsdGVyKGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIGFycjIuaW5kZXhPZihlbCkgPCAwXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGluaGVyaXQocGFyZW50KSB7XG4gIGZ1bmN0aW9uIENoaWxkKCkge31cbiAgQ2hpbGQucHJvdG90eXBlID0gcGFyZW50XG4gIHJldHVybiBuZXcgQ2hpbGQoKVxufVxuXG5cbi8qXG4gVmlydHVhbCBkb20gaXMgYW4gYXJyYXkgb2YgY3VzdG9tIHRhZ3Mgb24gdGhlIGRvY3VtZW50LlxuIFVwZGF0ZXMgYW5kIHVubW91bnRzIHByb3BhZ2F0ZSBkb3dud2FyZHMgZnJvbSBwYXJlbnQgdG8gY2hpbGRyZW4uXG4qL1xuXG52YXIgdmlydHVhbF9kb20gPSBbXSxcbiAgICB0YWdfaW1wbCA9IHt9XG5cbmZ1bmN0aW9uIGluamVjdFN0eWxlKGNzcykge1xuICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgbm9kZS5pbm5lckhUTUwgPSBjc3NcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChub2RlKVxufVxuXG5mdW5jdGlvbiBtb3VudFRvKHJvb3QsIHRhZ05hbWUsIG9wdHMpIHtcbiAgdmFyIHRhZyA9IHRhZ19pbXBsW3RhZ05hbWVdXG5cbiAgaWYgKHRhZyAmJiByb290KSB7XG4gICAgdGFnID0gbmV3IFRhZyh0YWcsIHsgcm9vdDogcm9vdCwgb3B0czogb3B0cyB9KVxuICAgIHZpcnR1YWxfZG9tLnB1c2godGFnKVxuICAgIHJldHVybiB0YWcub24oJ3VubW91bnQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZpcnR1YWxfZG9tLnNwbGljZSh2aXJ0dWFsX2RvbS5pbmRleE9mKHRhZyksIDEpXG4gICAgfSlcbiAgfVxufVxuXG5yaW90LnRhZyA9IGZ1bmN0aW9uKG5hbWUsIGh0bWwsIGNzcywgZm4pIHtcbiAgaWYgKHR5cGVvZiBjc3MgPT0gJ2Z1bmN0aW9uJykgZm4gPSBjc3NcbiAgZWxzZSBpZiAoY3NzKSBpbmplY3RTdHlsZShjc3MpXG4gIHRhZ19pbXBsW25hbWVdID0geyBuYW1lOiBuYW1lLCB0bXBsOiBodG1sLCBmbjogZm4gfVxufVxuXG5yaW90Lm1vdW50ID0gZnVuY3Rpb24oc2VsZWN0b3IsIHRhZ05hbWUsIG9wdHMpIHtcbiAgaWYgKHNlbGVjdG9yID09ICcqJykgc2VsZWN0b3IgPSBPYmplY3Qua2V5cyh0YWdfaW1wbCkuam9pbignLCAnKVxuICBpZiAodHlwZW9mIHRhZ05hbWUgPT0gJ29iamVjdCcpIHsgb3B0cyA9IHRhZ05hbWU7IHRhZ05hbWUgPSAwIH1cblxuICB2YXIgdGFncyA9IFtdXG5cbiAgZnVuY3Rpb24gcHVzaChyb290KSB7XG4gICAgdmFyIG5hbWUgPSB0YWdOYW1lIHx8IHJvb3QudGFnTmFtZS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICB0YWcgPSBtb3VudFRvKHJvb3QsIG5hbWUsIG9wdHMpXG5cbiAgICBpZiAodGFnKSB0YWdzLnB1c2godGFnKVxuICB9XG5cbiAgLy8gRE9NIG5vZGVcbiAgaWYgKHNlbGVjdG9yLnRhZ05hbWUpIHtcbiAgICBwdXNoKHNlbGVjdG9yKVxuICAgIHJldHVybiB0YWdzWzBdXG5cbiAgLy8gc2VsZWN0b3JcbiAgfSBlbHNlIHtcbiAgICBlYWNoKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCBwdXNoKVxuICAgIHJldHVybiB0YWdzXG4gIH1cblxufVxuXG4vLyB1cGRhdGUgZXZlcnl0aGluZ1xucmlvdC51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGVhY2godmlydHVhbF9kb20sIGZ1bmN0aW9uKHRhZykge1xuICAgIHRhZy51cGRhdGUoKVxuICB9KVxufVxuXG4vLyBAZGVwcmVjaWF0ZWRcbnJpb3QubW91bnRUbyA9IHJpb3QubW91bnRcblxuXG4gIFxuICAvLyBzaGFyZSBtZXRob2RzIGZvciBvdGhlciByaW90IHBhcnRzLCBlLmcuIGNvbXBpbGVyXG4gIHJpb3QudXRpbCA9IHsgYnJhY2tldHM6IGJyYWNrZXRzLCB0bXBsOiB0bXBsIH1cblxuICAvLyBzdXBwb3J0IENvbW1vbkpTXG4gIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG4gICAgbW9kdWxlLmV4cG9ydHMgPSByaW90XG5cbiAgLy8gc3VwcG9ydCBBTURcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuICAgIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIHJpb3QgfSlcblxuICAvLyBzdXBwb3J0IGJyb3dzZXJcbiAgZWxzZVxuICAgIHRoaXMucmlvdCA9IHJpb3RcblxufSkoKTtcbiIsInZhciByaW90ID0gcmVxdWlyZSgncmlvdCcpO1xuXG4vKlxuICogSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2ppbXNwYXJrbWFuL1Jpb3RDb250cm9sXG4gKiBFdmVudHMgdHJpZ2dlcmVkIGJ5IHRoZSBkaXNwYXRjaGVyIG9yIGFueSByZWdpc3RlcmVkIHN0b3JlIGFyZSBmYW5uZWQgb3V0IHRvXG4gKiBhbGwgbGlzdGVuZXJzXG4gKi9cbmZ1bmN0aW9uIERpc3BhdGNoZXIoKSB7XG4gIHJpb3Qub2JzZXJ2YWJsZSh0aGlzKTtcblxuICB2YXIgdHJpZ2dlcnMgPSBbXVxuXG4gIGZ1bmN0aW9uIGNhbGxUcmlnZ2VycygpIHtcbiAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICBjb25zb2xlLmxvZygnXFx1MjAyMiB0cmlnZ2VyaW5nICcgKyBhcmdzLmpvaW4oJywgJykpXG4gICAgdHJpZ2dlcnMuZm9yRWFjaChmdW5jdGlvbih0KXtcbiAgICAgIHQudHJpZ2dlci5hcHBseShudWxsLCBhcmdzKVxuICAgIH0pO1xuICB9O1xuXG4gIHRoaXMuYWRkU3RvcmUgPSBmdW5jdGlvbihzdG9yZSkge1xuICAgIHRyaWdnZXJzLnB1c2goe3RyaWdnZXI6IHN0b3JlLnRyaWdnZXIsIG5hbWU6IHN0b3JlLmNvbnN0cnVjdG9yLm5hbWV9KTtcbiAgICBzdG9yZS50cmlnZ2VyID0gY2FsbFRyaWdnZXJzO1xuICB9XG5cbiAgdGhpcy5hZGRTdG9yZSh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IERpc3BhdGNoZXIoKTtcbiIsIi8qXG4gKiBTaW1wbGUgd3JhcHBlciBhcm91bmQgcG9zdCBvYmplY3RzLlxuICovXG5mdW5jdGlvbiBQb3N0KG9wdHMpIHtcbiAgdmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnbG9kYXNoL29iamVjdC9kZWZhdWx0cycpXG5cbiAgZGVmYXVsdHModGhpcywgb3B0cywge1xuICAgIGRhdGU6IG5ldyBEYXRlKCksXG4gICAgdGl0bGU6ICcnLFxuICAgIGRlc2M6ICcnLFxuICAgIGVtYmVkOiB7fSxcbiAgICBmYXZvcml0ZWQ6IGZhbHNlLFxuICAgIGlzUGVyc2lzdGVkOiBmYWxzZVxuICB9KVxufVxuXG5Qb3N0LmRlbW8gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBQb3N0KHtcbiAgICB0aXRsZTogJ09oIG15IGdvZCEnLFxuICAgIGRlc2M6ICdKb25hdGhhbiBKb2VzdGFyIEFkdmVudHVyZXMnLFxuICAgIGVtYmVkOiB7XG4gICAgICB0eXBlOiAneW91dHViZScsXG4gICAgICB1cmw6ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PVA5SjV0WVNoTlk4JyxcbiAgICAgIHZpZGVvSWQ6ICdQOUo1dFlTaE5ZOCdcbiAgICB9LFxuICAgIGlzUGVyc2lzdGVkOiB0cnVlXG4gIH0pO1xufVxuXG5Qb3N0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihvcHRzKSB7XG4gIHZhciBtZXJnZSA9IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvbWVyZ2UnKVxuXG4gIG1lcmdlKHRoaXMsIG9wdHMpXG5cbiAgLy8gdHJ5IHRvIHVwZGF0ZSB0aGUgZW1iZWQgdHlwZSwgaWYgdmFsaWQuXG4gIGlmIChvcHRzLmVtYmVkICYmIG9wdHMuZW1iZWQudXJsKSB7XG4gICAgdmFyIHlvdXR1YmVNYXRjaCA9ICgveW91dHViZS5jb20uK1xcP3Y9KFthLXpBLXowLTldKykvaSkuZXhlYyhvcHRzLmVtYmVkLnVybClcblxuICAgIGlmICh5b3V0dWJlTWF0Y2gubGVuZ3RoKSB7XG4gICAgICB0aGlzLmVtYmVkLnR5cGUgPSAneW91dHViZSdcbiAgICAgIHRoaXMuZW1iZWQudmlkZW9JZCA9IHlvdXR1YmVNYXRjaFsxXVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtYmVkLnR5cGUgPSB1bmRlZmluZWRcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG5Qb3N0LnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdGhpcy5pc1BlcnNpc3RlZCA9IHRydWVcbiAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayh0aGlzKVxufVxuXG5Qb3N0LnByb3RvdHlwZS52YWxpZGF0aW9uUmVzdWx0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciByID0geyBlcnJvcnM6IFtdLCBpc1ZhbGlkOiB0cnVlIH1cblxuICBpZiAoIXRoaXMuZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICByLmVycm9ycy5kYXRlID0gJ2RhdGUgaXMgaW52YWxpZCdcbiAgICByLmlzVmFsaWQgPSBmYWxzZVxuICB9XG5cbiAgaWYgKCF0aGlzLnRpdGxlIHx8IHRoaXMudGl0bGUubGVuZ3RoID09IDApIHtcbiAgICByLmVycm9ycy50aXRsZSA9ICd0aXRsZSBjYW5cXCd0IGJlIGJsYW5rJ1xuICAgIHIuaXNWYWxpZCA9IGZhbHNlXG4gIH1cblxuICBpZiAoIXRoaXMuZW1iZWQgfHwgIXRoaXMuZW1iZWQudHlwZSkge1xuICAgIHIuZXJyb3JzLnVybCA9ICd0aGUgZW1iZWQgdXJsIGlzIGludmFsaWQnXG4gICAgci5pc1ZhbGlkID0gZmFsc2VcbiAgfVxuXG4gIHJldHVybiByO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RcbiIsInZhciByaW90ID0gcmVxdWlyZSgncmlvdCcpXG52YXIgUG9zdCA9IHJlcXVpcmUoJy4vcG9zdCcpXG5cbi8qXG4gKiBBbiBvYnNlcnZhYmxlIFBvc3RzIHN0b3JlLlxuICogSW50ZXJhY3Rpb24gd2l0aCB0aGUgcmVzdCBvZiB0aGUgYXBwIHdpbGwgYmUgZG9uZSB0aHJvdWdoXG4gKiB0aGUgRGlzcGF0Y2hlciAoUmlvdENvbnRyb2xsZXIpXG4gKi9cbmZ1bmN0aW9uIFBvc3RzKCkge1xuICByaW90Lm9ic2VydmFibGUodGhpcylcblxuICB2YXIgc2VsZiA9IHRoaXNcblxuICB0aGlzLm9uKCdwb3N0czp1c2VyOmxvYWQnLCBmdW5jdGlvbigpe1xuICAgIHNlbGYudHJpZ2dlcigncG9zdHM6dXNlcjphdmFpbGFibGUnLCBbUG9zdC5kZW1vKCldKVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RzXG4iLCIvKlxuICogU2ltcGxlIHdyYXBwZXIgYXJvdW5kIHVzZXIgb2JqZWN0cy5cbiAqL1xuZnVuY3Rpb24gVXNlcihvcHRzKSB7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVXNlclxuIiwidmFyIHJpb3QgPSByZXF1aXJlKCdyaW90JylcbnZhciBVc2VyID0gcmVxdWlyZSgnLi91c2VyJylcblxuLypcbiAqIEFuIG9ic2VydmFibGUgVXNlcnMgc3RvcmUuXG4gKiBJbnRlcmFjdGlvbiB3aXRoIHRoZSByZXN0IG9mIHRoZSBhcHAgd2lsbCBiZSBkb25lIHRocm91Z2hcbiAqIHRoZSBEaXNwYXRjaGVyIChSaW90Q29udHJvbGxlcilcbiAqL1xuZnVuY3Rpb24gVXNlcnMoKSB7XG4gIHJpb3Qub2JzZXJ2YWJsZSh0aGlzKVxuXG4gIHZhciBjdXJyZW50VXNlclxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJzXG4iLCJyZXF1aXJlKCcuL21vZHVsZXMvYXBwLWZyb250Lmh0bWwnKVxucmVxdWlyZSgnLi9tb2R1bGVzL2FwcC1tZXNzYWdlLmh0bWwnKVxucmVxdWlyZSgnLi9tb2R1bGVzL2FwcC11c2VyLmh0bWwnKVxucmVxdWlyZSgnLi9tb2R1bGVzL2FwcC1wb3N0Lmh0bWwnKVxuXG4vKlxuICogU2V0dXAgRGF0YSBTdG9yZXNcbiAqL1xuXG52YXIgUG9zdHMgPSByZXF1aXJlKCcuL2FwcC9wb3N0cycpXG52YXIgVXNlcnMgPSByZXF1aXJlKCcuL2FwcC91c2VycycpXG5cbnZhciBEaXNwYXRjaGVyID0gcmVxdWlyZSgnLi9hcHAvZGlzcGF0Y2hlcicpXG5cbkRpc3BhdGNoZXIuYWRkU3RvcmUobmV3IFBvc3RzKCkpXG5EaXNwYXRjaGVyLmFkZFN0b3JlKG5ldyBVc2VycygpKVxuXG4vKlxuICogTW91bnQgcmlvdCB0YWdzLlxuICovXG5cbnZhciB0YWdzID0gcmVxdWlyZSgncmlvdCcpLm1vdW50KCcqJylcblxudmFyIHRhZ3NCeU5hbWUgPSB0YWdzLnJlZHVjZShmdW5jdGlvbihhY2MsIHZhbCkge1xuICBhY2NbdmFsLnJvb3QudGFnTmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJ2FwcC0nLCAnJyldID0gdmFsXG4gIHJldHVybiBhY2Ncbn0sIHt9KVxuXG5mdW5jdGlvbiBkaXNwbGF5TW9kdWxlKHRhcmdldCkge1xuICB2YXIgcCwgYWN0aW9uLCBub2RlcyA9IHsgJ2Zyb250JyA6IHRhZ3NCeU5hbWVbJ2Zyb250J10ucm9vdCwgJ3VzZXInIDogdGFnc0J5TmFtZVsndXNlciddLnJvb3QgfVxuXG4gIGZvciAodmFyIHAgaW4gbm9kZXMpIHtcbiAgICBhY3Rpb24gPSAodGFyZ2V0ID09IHApID8gJ3JlbW92ZScgOiAnYWRkJ1xuICAgIG5vZGVzW3BdLmNsYXNzTGlzdFthY3Rpb25dKCdhcHAtaGlkZGVuJylcbiAgfVxufVxuXG4vKlxuICogU2V0dXAgcm91dGVzLlxuICovXG5cbmZ1bmN0aW9uIGVuc3VyZVVzZXIoY3R4LCBuZXh0KSB7XG4gIGNvbnNvbGUubG9nKCdiZWZvcmUgaGFuZGxpbmcgYSBwb3N0IHJvdXRlLCBtYWtlIHN1cmUgdGhlcmVcXCdzIGEgbG9nZ2VkIHVzZXInKVxuICBuZXh0KClcbn1cblxudmFyIHBhZ2UgPSByZXF1aXJlKCdwYWdlJylcblxucGFnZSgnL3Bvc3RzL2Zhdm9yaXRlcycsIGVuc3VyZVVzZXIsIGZ1bmN0aW9uIHBvc3RzRmF2b3JpdGVzKCkge1xuICBkaXNwbGF5TW9kdWxlKCd1c2VyJylcbiAgRGlzcGF0Y2hlci50cmlnZ2VyKCd1c2VyOmZhdm9yaXRlcycpXG59KVxuXG5wYWdlKCcvcG9zdHMvbmV3JywgZW5zdXJlVXNlciwgZnVuY3Rpb24gcG9zdHNOZXcoKSB7XG4gIGRpc3BsYXlNb2R1bGUoJ3VzZXInKVxuICBEaXNwYXRjaGVyLnRyaWdnZXIoJ3VzZXI6cG9zdHMnKVxuICBEaXNwYXRjaGVyLnRyaWdnZXIoJ3VzZXI6bmV3cG9zdCcpXG59KVxuXG5wYWdlKCcvcG9zdHMvJywgZW5zdXJlVXNlciwgZnVuY3Rpb24gcG9zdHMoKSB7XG4gIGRpc3BsYXlNb2R1bGUoJ3VzZXInKVxuICBEaXNwYXRjaGVyLnRyaWdnZXIoJ3VzZXI6cG9zdHMnKVxufSlcblxucGFnZSgnLzp1c2VyJywgZnVuY3Rpb24gdXNlcihjdHgsIG5leHQpIHtcbiAgZGlzcGxheU1vZHVsZSgndXNlcicpXG4gIERpc3BhdGNoZXIudHJpZ2dlcigndXNlcjpwb3N0cycsIGN0eC5wYXJhbXMudXNlcilcbn0pXG5cbnBhZ2UoJy8nLCBmdW5jdGlvbiByb290KCkge1xuICBkaXNwbGF5TW9kdWxlKCdmcm9udCcpXG4gIERpc3BhdGNoZXIudHJpZ2dlcignZnJvbnQnKVxufSlcblxucGFnZSgnKicsIGZ1bmN0aW9uIG5vdGZvdW5kKCkge1xuICBkaXNwbGF5TW9kdWxlKCdmcm9udCcpXG4gIERpc3BhdGNoZXIudHJpZ2dlcignZnJvbnQ6bm90Zm91bmQnKVxuICBEaXNwYXRjaGVyLnRyaWdnZXIoJ21lc3NhZ2UnLCAnU29ycnksIHdlIGNvdWxkblxcJ3QgZmluZCB0aGUgcGFnZSB5b3UgYXJlIGxvb2tpbmcuJylcbn0pXG5cbnBhZ2UoKVxuIiwidmFyIHJpb3QgPSByZXF1aXJlKCdyaW90Jyk7XG5yaW90LnRhZygnYXBwLWZyb250JywgJzxkaXYgY2xhc3M9XCJmbGV4LWNvbnRlbnQtd3JhcHBlclwiPiA8bWFpbiBjbGFzcz1cIm1haW5cIiByb2xlPVwibWFpblwiPiA8aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS13aWR0aFwiIHNyYz1cIi9hc3NldHMvbXVzaWMuanBnXCI+IDxkaXYgY2xhc3M9XCJmcm9udC1jb3B5XCI+IDxoMT5BIG1pY3JvIEJsb2cgZm9yIHlvdXIgZmF2b3JpdGUgTXVzaWMhPC9oMT4gPHA+IFNob3djYXNlIHlvdXIgZmF2b3JpdGUgbXVzaWMgdG8gdGhlIHdvcmxkLiBXaXRoIE11c2lGYXZzIHlvdSBjYW4gZW1iZWQgY29udGVudCBmcm9tIGRpZmZlcmVudCBzZXJ2aWNlcyAoWW91VHViZSwgQmFuZGFjYW1wLCBTb3VuZGNsb3VkLCBhbmQgbW9yZSEpIGluIGEgc2luZ2xlIHBsYWNlLiA8L3A+IDxoMj5MYXRlc3QgUG9zdHM8L2gyPiA8dWw+IDxsaT48YSBocmVmPVwiL3NvbWV1c2VyXCIgY2xhc3M9XCJyb3V0ZVwiPkNhcmxpdG9YPC9hPiBwb3N0ZWQgXFwnR29uZSB3aXRoIHRoZSB3aW5kXFwnICgxMiBob3VycyBhZ28pPC9saT4gPGxpPlRvbnkgTW90b2xhIHBvc3RlZCBcXCdTdXBlclZpb2xlbnRcXCcgKDMgaG91cnMgYWdvKTwvbGk+IDxsaT5LdXJ0IENvdmFpbiBwb3N0ZWQgXFwnVGhpcyB0aGlzIGFuZCB0aGF0XFwnICg0IGRheXMgYWdvKTwvbGk+IDwvdWw+IDxoMj5MYXRlc3QgRmF2b3JpdGVkPC9oMj4gPHVsPiA8bGk+TWluZ28gQ2FjaGFsYWZ1c2EgZmF2b3JpdGVkIFxcJ0dvbmUgd2l0aCB0aGUgd2luZFxcJyAoMTIgaG91cnMgYWdvKTwvbGk+IDxsaT5Tb3JldGUgZmF2b3JpdGVkIFxcJ1N1cGVyVmlvbGVudFxcJyAoMyBob3VycyBhZ28pPC9saT4gPGxpPk1vbmdvIExvbmdvIGZhdm9yaXRlZCBcXCdUaGlzIHRoaXMgYW5kIHRoYXRcXCcgKDQgZGF5cyBhZ28pPC9saT4gPC91bD4gPC9kaXY+IDwvbWFpbj4gPC9kaXY+JywgZnVuY3Rpb24ob3B0cykge1xuICAgIHZhciBEaXNwYXRjaGVyID0gcmVxdWlyZSgnLi4vYXBwL2Rpc3BhdGNoZXInKTtcbiAgXG59KTtcbiIsInZhciByaW90ID0gcmVxdWlyZSgncmlvdCcpO1xucmlvdC50YWcoJ2FwcC1tZXNzYWdlJywgJzxkaXYgY2xhc3M9XCJhcHAtbWVzc2FnZVwiPiB7bWVzc2FnZX0gPGRpdiBjbGFzcz1cImFwcC1tZXNzYWdlLWRpc21pc3NcIj4gPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG9uY2xpY2s9XCJ7ZGlzbWlzc31cIj5EaXNtaXNzPC9hPiA8L2Rpdj4gPC9kaXY+JywgZnVuY3Rpb24ob3B0cykge1xuICAgIHZhciBEaXNwYXRjaGVyID0gcmVxdWlyZSgnLi4vYXBwL2Rpc3BhdGNoZXInKVxuXG4gICAgdGhpcy5kaXNtaXNzID0gZnVuY3Rpb24oZXYpIHtcbiAgICAgIHRoaXMubWVzc2FnZSA9ICcnXG4gICAgICB0aGlzLnJvb3QuY2xhc3NMaXN0LmFkZCgnYXBwLWhpZGRlbicpXG4gICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgRGlzcGF0Y2hlci5vbignbWVzc2FnZScsIGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgIHRoaXMubWVzc2FnZSA9IHRleHRcbiAgICAgIHRoaXMucm9vdC5jbGFzc0xpc3QucmVtb3ZlKCdhcHAtaGlkZGVuJylcbiAgICAgIHRoaXMudXBkYXRlKClcbiAgICB9LmJpbmQodGhpcykpXG4gIFxufSk7XG4iLCJ2YXIgcmlvdCA9IHJlcXVpcmUoJ3Jpb3QnKTtcbnJpb3QudGFnKCdhcHAtcG9zdCcsICd7b3B0cy5kZWJ1Z30gPGFwcC1wb3N0LWZvcm0gaWY9XCJ7ZWRpdGluZ31cIj48L2FwcC1wb3N0LWZvcm0+IDxhcHAtcG9zdC1zaG93IGlmPVwieyFlZGl0aW5nfVwiPjwvYXBwLXBvc3Qtc2hvdz4nLCBmdW5jdGlvbihvcHRzKSB7XG4gICAgdmFyIFBvc3QgPSByZXF1aXJlKCcuLi9hcHAvcG9zdCcpXG5cbiAgICB0aGlzLnBvc3QgPSBuZXcgUG9zdChvcHRzLnBvc3QpXG4gICAgdGhpcy5lZGl0aW5nID0gIXRoaXMucG9zdC5pc1BlcnNpc3RlZFxuXG4gICAgdGhpcy5zaG93ID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdmFyIHAgPSAoZGF0YSA/IG5ldyBQb3N0KGRhdGEpIDogdGhpcy5wb3N0KTtcbiAgICAgIHRoaXMudXBkYXRlKHtlZGl0aW5nOiBmYWxzZSwgcG9zdDogcH0pXG4gICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5lZGl0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnVwZGF0ZSh7ZWRpdGluZzogdHJ1ZX0pXG4gICAgfS5iaW5kKHRoaXMpO1xuICBcbn0pO1xuXG5yaW90LnRhZygnYXBwLXBvc3Qtc2hvdycsICc8aDI+PGkgY2xhc3M9XCJmYSBmYS1wbGF5XCI+PC9pPiZuYnNwO3twb3N0LnRpdGxlfTwvaDI+IDxkaXYgY2xhc3M9XCJwb3N0LXNob3ctZW1iZWRcIj4gPGlmcmFtZSBpZj1cIntwb3N0LmVtYmVkLnR5cGUgPT0gXFwneW91dHViZVxcJ31cIiB0eXBlPVwidGV4dC9odG1sXCIgd2lkdGg9XCI2NDBcIiBoZWlnaHQ9XCIyNjBcIiByaW90LXNyYz1cImh0dHA6Ly93d3cueW91dHViZS5jb20vZW1iZWQve3Bvc3QuZW1iZWQudmlkZW9JZH1cIiBmcmFtZWJvcmRlcj1cIjBcIj48L2lmcmFtZT4gPC9kaXY+IDxwIGNsYXNzPVwicG9zdC1zaG93LWRlc2NyaXB0aW9uXCI+IDxpIGNsYXNzPVwiZmEgZmEtY2hpbGQgZmEtMnhcIj48L2k+Jm5ic3A7e3Bvc3QuZGVzY30gPC9wPiA8ZGl2IGNsYXNzPVwicG9zdC1hY3Rpb25zXCI+IDxhIHRpdGxlPVwiRmF2b3JpdGVcIiBocmVmPVwiI1wiIG9uY2xpY2s9XCJ7dG9nZ2xlRmF2fVwiIGNsYXNzPVwie3Bvc3QtZmF2b3JpdGVkOiBwb3N0LmZhdm9yaXRlZH1cIj48aSBjbGFzcz1cImZhIGZhLWhlYXJ0XCI+PC9pPiZuYnNwO0Zhdm9yaXRlPC9hPiA8YSB0aXRsZT1cIkVkaXRcIiBocmVmPVwiI1wiIG9uY2xpY2s9XCJ7ZWRpdH1cIj48aSBjbGFzcz1cImZhIGZhLWVkaXRcIj48L2k+Jm5ic3A7RWRpdDwvYT4gPGEgdGl0bGU9XCJSZW1vdmVcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmEgZmEtdHJhc2hcIj48L2k+Jm5ic3A7UmVtb3ZlPC9hPiA8L2Rpdj4nLCBmdW5jdGlvbihvcHRzKSB7XG4gICAgdGhpcy5wb3N0ID0gdGhpcy5wYXJlbnQucG9zdFxuXG4gICAgdGhpcy5wYXJlbnQub24oJ3VwZGF0ZSBtb3VudCcsIGZ1bmN0aW9uKCl7XG4gICAgICB0aGlzLnVwZGF0ZSh7cG9zdDogdGhpcy5wYXJlbnQucG9zdH0pXG4gICAgfS5iaW5kKHRoaXMpKVxuXG4gICAgdGhpcy5lZGl0ID0gZnVuY3Rpb24oZXYpIHtcbiAgICAgIHRoaXMucGFyZW50LmVkaXQoKVxuICAgIH0uYmluZCh0aGlzKTtcblxuICAgIHRoaXMudG9nZ2xlRmF2ID0gZnVuY3Rpb24oZXYpIHtcbiAgICAgIHRoaXMucG9zdC5mYXZvcml0ZWQgPSAhdGhpcy5wb3N0LmZhdm9yaXRlZFxuICAgIH0uYmluZCh0aGlzKTtcbiAgXG59KTtcblxucmlvdC50YWcoJ2FwcC1wb3N0LWZvcm0nLCAnPGZvcm0gbmFtZT1cInBvc3RGb3JtXCI+IDxoMj5FZGl0aW5nIFBvc3Q8L2gyPiA8cD4gUHJvdmlkZSB0aGUgcmVzb3VyY2UgdXJsIHRvIHNoYXJlLCBhIHRpdGxlIGFuZCBhIGRlc2NyaXB0aW9uLiA8L3A+IDxkaXYgY2xhc3M9XCJwb3N0LWZvcm0tZW1iZWRcIj4gPGxhYmVsPkVtYmVkIFVybCAoZS5nLiBZb3VUdWJlIFVybCk8L2xhYmVsPiA8aW5wdXQgbmFtZT1cImVtYmVkVXJsXCIgdHlwZT1cInVybFwiIHZhbHVlPVwie3Bvc3QuZW1iZWQudXJsfVwiIGNsYXNzPVwie2ludmFsaWQ6IHVybEludmFsaWR9XCIgcGxhY2Vob2xkZXI9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PVA5SjV0WVNoTlk4XCI+IDwvZGl2PiA8ZGl2IGNsYXNzPVwicG9zdC1mb3JtLWRhdGFcIj4gPGlucHV0IG5hbWU9XCJwb3N0VGl0bGVcIiB0eXBlPVwidGV4dFwiIHZhbHVlPVwie3Bvc3QudGl0bGV9XCIgY2xhc3M9XCJ7aW52YWxpZDogdGl0bGVJbnZhbGlkfVwiIHRpdGxlPVwiUG9zdCBUaXRsZVwiIHBsYWNlaG9sZGVyPVwiVGl0bGVcIj4gPHRleHRhcmVhIG5hbWU9XCJwb3N0RGVzY3JpcHRpb25cIiB2YWx1ZT1cIntwb3N0LmRlc2N9XCIgdGl0bGU9XCJQb3N0IERlc2NyaXB0aW9uXCIgcGxhY2Vob2xkZXI9XCJEZXNjcmlwdGlvblwiPjwvdGV4dGFyZWE+PC90ZXh0YXJlYT4gPC9kaXY+IDxkaXYgY2xhc3M9XCJwb3N0LWFjdGlvbnNcIj4gPGEgdGl0bGU9XCJVbmRvXCIgb25jbGljaz1cInt1bmRvfVwiIGhyZWY9XCIjXCI+PGkgY2xhc3M9XCJmYSBmYS10aW1lcy1jaXJjbGVcIj48L2k+Jm5ic3A7Q2FuY2VsPC9hPiA8YSB0aXRsZT1cIlNhdmUgYW5kIFB1Ymxpc2hcIiBvbmNsaWNrPVwie3B1Ymxpc2h9XCIgaHJlZj1cIiNcIj48aSBjbGFzcz1cImZhIGZhLXNhdmVcIj48L2k+Jm5ic3A7U2F2ZTwvYT4gPHNwYW4gY2xhc3M9XCJwb3N0LWVkaXQtbWVzc2FnZVwiIG5hbWU9XCJtc2dcIj57ZWRpdE1lc3NhZ2V9PC9zcGFuPiA8L2Rpdj4gPC9mb3JtPicsIGZ1bmN0aW9uKG9wdHMpIHtcbiAgICB2YXIgdmFsdWVzID0gcmVxdWlyZSgnbG9kYXNoL29iamVjdC92YWx1ZXMnKVxuICAgIHZhciBQb3N0ID0gcmVxdWlyZSgnLi4vYXBwL3Bvc3QnKVxuICAgIHZhciBEaXNwYXRjaGVyID0gcmVxdWlyZSgnLi4vYXBwL2Rpc3BhdGNoZXInKVxuXG4gICAgdGhpcy5wb3N0ID0gdGhpcy5wYXJlbnQucG9zdFxuXG4gICAgdGhpcy5wYXJlbnQub24oJ3VwZGF0ZSBtb3VudCcsIGZ1bmN0aW9uKCl7XG4gICAgICB0aGlzLnVwZGF0ZSh7cG9zdDogdGhpcy5wYXJlbnQucG9zdH0pXG4gICAgfS5iaW5kKHRoaXMpKVxuXG4gICAgdGhpcy5vbigndXBkYXRlIG1vdW50JywgZnVuY3Rpb24oKXtcblxuICAgICAgaWYgKCF0aGlzLnBvc3QuaXNQZXJzaXN0ZWQpIHtcbiAgICAgICAgdGhpcy5wb3N0VGl0bGUudmFsdWUgPSAnJ1xuICAgICAgICB0aGlzLnBvc3REZXNjcmlwdGlvbi52YWx1ZSA9ICcnXG4gICAgICAgIHRoaXMuZW1iZWRVcmwudmFsdWUgPSAnJ1xuICAgICAgfVxuICAgIH0pXG5cbiAgICB0aGlzLm1lc3NhZ2UgPSBmdW5jdGlvbihtc2cpIHtcbiAgICAgIHRoaXMubXNnLmlubmVyVGV4dCA9IG1zZ1xuICAgIH0uYmluZCh0aGlzKTtcblxuICAgIHRoaXMudW5kbyA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICBpZiAodGhpcy5wb3N0LmlzUGVyc2lzdGVkKSB7XG5cbiAgICAgICAgdGhpcy5wb3N0VGl0bGUudmFsdWUgPSB0aGlzLnBvc3QudGl0bGVcbiAgICAgICAgdGhpcy5wb3N0RGVzY3JpcHRpb24udmFsdWUgPSB0aGlzLnBvc3QuZGVzY1xuICAgICAgICB0aGlzLmVtYmVkVXJsLnZhbHVlID0gdGhpcy5wb3N0LmVtYmVkLnVybFxuICAgICAgICB0aGlzLnBhcmVudC5zaG93KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIERpc3BhdGNoZXIudHJpZ2dlcigndXNlcjpjYW5jZWxjcmVhdGVwb3N0JylcbiAgICAgIH1cbiAgICB9LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnB1Ymxpc2ggPSBmdW5jdGlvbihldikge1xuICAgICAgdmFyIG5ld1Bvc3QgPSBuZXcgUG9zdCh0aGlzLnBvc3QpLnVwZGF0ZSh7XG4gICAgICAgIHRpdGxlOiB0aGlzLnBvc3RUaXRsZS52YWx1ZSxcbiAgICAgICAgZGVzYzogdGhpcy5wb3N0RGVzY3JpcHRpb24udmFsdWUsXG4gICAgICAgIGVtYmVkOiB7dXJsOiB0aGlzLmVtYmVkVXJsLnZhbHVlfVxuICAgICAgfSlcblxuICAgICAgdmFyIHJlc3VsdCA9IG5ld1Bvc3QudmFsaWRhdGlvblJlc3VsdCgpXG5cbiAgICAgIGlmIChyZXN1bHQuaXNWYWxpZCkge1xuICAgICAgICBuZXdQb3N0LnNhdmUoKSAvLyBXZSBjb3VsZCB3YWl0IHRvIHRyaWdnZXIgdW50aWwgaXMgc2F2ZWQgYnV0IHdlJ2xsIGFzc3VtZSBpdCB3aWxsIHN1Y2NlZWQuXG5cbiAgICAgICAgaWYgKHRoaXMucG9zdC5pc1BlcnNpc3RlZCkge1xuICAgICAgICAgIHRoaXMucGFyZW50LnNob3cobmV3UG9zdClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBEaXNwYXRjaGVyLnRyaWdnZXIoJ3VzZXI6Y3JlYXRlcG9zdCcsIG5ld1Bvc3QpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBtc2cgPSB2YWx1ZXMocmVzdWx0LmVycm9ycykuam9pbignLCAnKVxuICAgICAgICB0aGlzLnVybEludmFsaWQgPSAhIXJlc3VsdC5lcnJvcnMudXJsXG4gICAgICAgIHRoaXMudGl0bGVJbnZhbGlkID0gISFyZXN1bHQuZXJyb3JzLnRpdGxlXG4gICAgICAgIHRoaXMubWVzc2FnZSgnU29ycnksIHRoZSBwb3N0IGNhblxcJ3QgYmUgc2F2ZWQ6ICcgKyBtc2cgKyAnLicpXG4gICAgICB9XG4gICAgfS5iaW5kKHRoaXMpO1xuICBcbn0pO1xuIiwidmFyIHJpb3QgPSByZXF1aXJlKCdyaW90Jyk7XG5yaW90LnRhZygnYXBwLXVzZXInLCAnPGRpdiBjbGFzcz1cImZsZXgtY29udGVudC13cmFwcGVyXCI+IDxhc2lkZSBjbGFzcz1cInByb2ZpbGVcIj4gPGRpdiBjbGFzcz1cInByb2ZpbGUtaW5mb1wiPiBQcm9maWxlIDwvZGl2PiA8L2FzaWRlPiA8bWFpbiBjbGFzcz1cIm1haW5cIiByb2xlPVwibWFpblwiPiA8ZGl2IGlmPVwie25vcG9zdHN9XCIgY2xhc3M9XCJwb3N0LXBsYWNlaG9sZGVyXCI+IDxoMT5IZXkhJm5ic3A7PGkgY2xhc3M9XCJmYSBmYS1jaGlsZFwiPjwvaT4mbmJzcDs8aSBjbGFzcz1cImZhIGZhLXBsYXlcIj48L2k+PC9oMT4gPHA+IFRoaXMgdXNlciBoYXMgbm90IHBvc3RlZCBhbnl0aGluZyB5ZXQuIFBsZWFzZSBjaGVjayBiYWNrIGxhdGVyISA8L3A+IDwvZGl2PiA8YXBwLXBvc3QgaWY9XCJ7bmV3UG9zdH1cIiBwb3N0PVwie25ld1Bvc3R9XCIgZWRpdG9yPVwie3RydWV9XCI+PC9hcHAtcG9zdD4gPGFwcC1wb3N0IGVhY2g9XCJ7cG9zdHN9XCIgcG9zdD1cInt0aGlzfVwiPjwvYXBwLXBvc3Q+IDwvbWFpbj4gPC9kaXY+JywgZnVuY3Rpb24ob3B0cykge1xuICAgIHZhciBEaXNwYXRjaGVyID0gcmVxdWlyZSgnLi4vYXBwL2Rpc3BhdGNoZXInKVxuICAgIHZhciBQb3N0ID0gcmVxdWlyZSgnLi4vYXBwL3Bvc3QnKVxuXG4gICAgdGhpcy5ub3Bvc3RzID0gZmFsc2VcbiAgICB0aGlzLnBvc3RzID0gW11cblxuICAgIERpc3BhdGNoZXIub24oJ3VzZXI6cG9zdHMnLCBmdW5jdGlvbih1c2VyKSB7XG4gICAgICBEaXNwYXRjaGVyLnRyaWdnZXIoJ3Bvc3RzOnVzZXI6bG9hZCcsIHVzZXIpXG4gICAgfSlcblxuICAgIERpc3BhdGNoZXIub24oJ3VzZXI6bmV3cG9zdCcsIGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgIHRoaXMudXBkYXRlKHtuZXdQb3N0OiBuZXcgUG9zdCgpfSlcbiAgICB9LmJpbmQodGhpcykpXG5cbiAgICBEaXNwYXRjaGVyLm9uKCd1c2VyOmNhbmNlbGNyZWF0ZXBvc3QnLCBmdW5jdGlvbihmcmVzaCkge1xuICAgICAgdGhpcy51cGRhdGUoe25ld1Bvc3Q6IG51bGx9KVxuICAgIH0uYmluZCh0aGlzKSlcblxuICAgIERpc3BhdGNoZXIub24oJ3VzZXI6Y3JlYXRlcG9zdCcsIGZ1bmN0aW9uKGZyZXNoKSB7XG4gICAgICB0aGlzLnVwZGF0ZSh7bmV3UG9zdDogbnVsbCwgcG9zdHM6IFtmcmVzaF0uY29uY2F0KHRoaXMucG9zdHMpfSlcbiAgICB9LmJpbmQodGhpcykpXG5cbiAgICBEaXNwYXRjaGVyLm9uKCdwb3N0czp1c2VyOmF2YWlsYWJsZScsIGZ1bmN0aW9uKHBvc3RzKXtcbiAgICAgIHRoaXMudXBkYXRlKHsgcG9zdHM6IHBvc3RzIH0pXG4gICAgfS5iaW5kKHRoaXMpKVxuICBcbn0pO1xuIl19

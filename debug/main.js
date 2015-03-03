(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseToString = require('lodash._basetostring');

/** Used to match HTML entities and HTML characters. */
var reUnescapedHtml = /[&<>"'`]/g,
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

/** Used to map characters to HTML entities. */
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;'
};

/**
 * Used by `_.escape` to convert characters to HTML entities.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
function escapeHtmlChar(chr) {
  return htmlEscapes[chr];
}

/**
 * Converts the characters "&", "<", ">", '"', "'", and '`', in `string` to
 * their corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional characters
 * use a third-party library like [_he_](https://mths.be/he).
 *
 * Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't require escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value.
 * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * Backticks are escaped because in Internet Explorer < 9, they can break out
 * of attribute values or HTML comments. See [#102](https://html5sec.org/#102),
 * [#108](https://html5sec.org/#108), and [#133](https://html5sec.org/#133) of
 * the [HTML5 Security Cheatsheet](https://html5sec.org/) for more details.
 *
 * When working with HTML you should always quote attribute values to reduce
 * XSS vectors. See [Ryan Grove's article](http://wonko.com/post/html-escaping)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escape('fred, barney, & pebbles');
 * // => 'fred, barney, &amp; pebbles'
 */
function escape(string) {
  // Reset `lastIndex` because in IE < 9 `String#replace` does not.
  string = baseToString(string);
  return (string && reHasUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, escapeHtmlChar)
    : string;
}

module.exports = escape;

},{"lodash._basetostring":2}],2:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{"../object/keys":38,"./baseCopy":7}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.flatten` with added support for restricting
 * flattening and specifying the start index.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {boolean} [isDeep] Specify a deep flatten.
 * @param {boolean} [isStrict] Restrict flattening to arrays and `arguments` objects.
 * @param {number} [fromIndex=0] The index to start from.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, isDeep, isStrict, fromIndex) {
  var index = (fromIndex || 0) - 1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (isObjectLike(value) && isLength(value.length) && (isArray(value) || isArguments(value))) {
      if (isDeep) {
        // Recursively flatten arrays (susceptible to call stack limits).
        value = baseFlatten(value, isDeep, isStrict);
      }
      var valIndex = -1,
          valLength = value.length;

      result.length += valLength;
      while (++valIndex < valLength) {
        result[++resIndex] = value[valIndex];
      }
    } else if (!isStrict) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"../lang/isArguments":28,"../lang/isArray":29,"./isLength":21,"./isObjectLike":22}],9:[function(require,module,exports){
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

},{"./toObject":27}],10:[function(require,module,exports){
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

},{"../object/keysIn":39,"./baseFor":9}],11:[function(require,module,exports){
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

},{"../object/keys":38,"./baseFor":9}],12:[function(require,module,exports){
/**
 * The base implementation of `_.isFunction` without support for environments
 * with incorrect `typeof` results.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 */
function baseIsFunction(value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == 'function' || false;
}

module.exports = baseIsFunction;

},{}],13:[function(require,module,exports){
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

},{"../lang/isArray":29,"../lang/isObject":32,"../lang/isTypedArray":34,"./arrayEach":4,"./baseForOwn":11,"./baseMergeDeep":14,"./isLength":21,"./isObjectLike":22}],14:[function(require,module,exports){
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

},{"../lang/isArguments":28,"../lang/isArray":29,"../lang/isPlainObject":33,"../lang/isTypedArray":34,"../lang/toPlainObject":35,"./arrayCopy":3,"./isLength":21}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"../utility/identity":45}],18:[function(require,module,exports){
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

},{"./bindCallback":17,"./isIterateeCall":20}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{"../lang/isObject":32,"./isIndex":19,"./isLength":21}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * A specialized version of `_.pick` that picks `object` properties specified
 * by the `props` array.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property names to pick.
 * @returns {Object} Returns the new object.
 */
function pickByArray(object, props) {
  object = toObject(object);

  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index];
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}

module.exports = pickByArray;

},{"./toObject":27}],24:[function(require,module,exports){
var baseForIn = require('./baseForIn');

/**
 * A specialized version of `_.pick` that picks `object` properties `predicate`
 * returns truthy for.
 *
 * @private
 * @param {Object} object The source object.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Object} Returns the new object.
 */
function pickByCallback(object, predicate) {
  var result = {};
  baseForIn(object, function(value, key, object) {
    if (predicate(value, key, object)) {
      result[key] = value;
    }
  });
  return result;
}

module.exports = pickByCallback;

},{"./baseForIn":10}],25:[function(require,module,exports){
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

},{"./baseForIn":10,"./isObjectLike":22}],26:[function(require,module,exports){
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

},{"../lang/isArguments":28,"../lang/isArray":29,"../object/keysIn":39,"../support":44,"./isIndex":19,"./isLength":21}],27:[function(require,module,exports){
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

},{"../lang/isObject":32}],28:[function(require,module,exports){
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

},{"../internal/isLength":21,"../internal/isObjectLike":22}],29:[function(require,module,exports){
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

},{"../internal/isLength":21,"../internal/isObjectLike":22,"./isNative":31}],30:[function(require,module,exports){
(function (global){
var baseIsFunction = require('../internal/baseIsFunction'),
    isNative = require('./isNative');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Native method references. */
var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return objToString.call(value) == funcTag;
};

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../internal/baseIsFunction":12,"./isNative":31}],31:[function(require,module,exports){
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

},{"../internal/isObjectLike":22,"../string/escapeRegExp":43}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{"../internal/shimIsPlainObject":25,"./isNative":31}],34:[function(require,module,exports){
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

},{"../internal/isLength":21,"../internal/isObjectLike":22}],35:[function(require,module,exports){
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

},{"../internal/baseCopy":7,"../object/keysIn":39}],36:[function(require,module,exports){
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

},{"../internal/baseAssign":6,"../internal/createAssigner":18}],37:[function(require,module,exports){
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

},{"../internal/arrayCopy":3,"../internal/assignDefaults":5,"./assign":36}],38:[function(require,module,exports){
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

},{"../internal/isLength":21,"../internal/shimKeys":26,"../lang/isNative":31,"../lang/isObject":32}],39:[function(require,module,exports){
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

},{"../internal/isIndex":19,"../internal/isLength":21,"../lang/isArguments":28,"../lang/isArray":29,"../lang/isObject":32,"../support":44}],40:[function(require,module,exports){
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

},{"../internal/baseMerge":13,"../internal/createAssigner":18}],41:[function(require,module,exports){
var baseFlatten = require('../internal/baseFlatten'),
    bindCallback = require('../internal/bindCallback'),
    pickByArray = require('../internal/pickByArray'),
    pickByCallback = require('../internal/pickByCallback');

/**
 * Creates an object composed of the picked `object` properties. Property
 * names may be specified as individual arguments or as arrays of property
 * names. If `predicate` is provided it is invoked for each property of `object`
 * picking the properties `predicate` returns truthy for. The predicate is
 * bound to `thisArg` and invoked with three arguments; (value, key, object).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {Function|...(string|string[])} [predicate] The function invoked per
 *  iteration or property names to pick, specified as individual property
 *  names or arrays of property names.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'user': 'fred', 'age': 40 };
 *
 * _.pick(object, 'user');
 * // => { 'user': 'fred' }
 *
 * _.pick(object, _.isString);
 * // => { 'user': 'fred' }
 */
function pick(object, predicate, thisArg) {
  if (object == null) {
    return {};
  }
  return typeof predicate == 'function'
    ? pickByCallback(object, bindCallback(predicate, thisArg, 3))
    : pickByArray(object, baseFlatten(arguments, false, false, 1));
}

module.exports = pick;

},{"../internal/baseFlatten":8,"../internal/bindCallback":17,"../internal/pickByArray":23,"../internal/pickByCallback":24}],42:[function(require,module,exports){
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

},{"../internal/baseValues":16,"./keys":38}],43:[function(require,module,exports){
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

},{"../internal/baseToString":15}],44:[function(require,module,exports){
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

},{"./lang/isNative":31}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
/*
 * When first created a Post object is just a holder for Post attributes
 * with some convenience methods for updating attributes, validating, etc.
 *
 * EXAMPLE:
 *
 *     var Post = require('app/post')
 *
 *     var post = new Post({ title: 'Some title' })
 *
 *     if (post.validation().isValid()) { Post.persist(post) }
 *
 * Instead of using callbacks or promises, the Post function is observable:
 *
 *     Post.on('posts:did:persist', function(post) {
 *       console.log('post ' + post + ' was successfully created')
 *     })
 *
 */

var _ = {
  defaults : require('lodash/object/defaults'),
  merge    : require('lodash/object/merge'),
  pick     : require('lodash/object/pick')
}

var
  fbref = new Firebase('https://musifavs.firebaseio.com'),
  timeago = require('../lib/fromnow'),
  yt = require('../lib/youtube')

function Post(opts, key) {
  this.setattr(_.defaults({}, opts, {key: key}, Post.defaults))
}

Post.defaults = {
  date: undefined,
  desc: '',
  embed: {},
  favorited: false,
  key: null,
  stored: false,
  title: '',
  uid: undefined,
  userName: undefined
}

/*
 *******************************************************************************
 * Instance Methods
 *******************************************************************************
 */

Post.prototype.toggleFav = function() {
  this.favorited = !this.favorited
}

Post.prototype.equals = function(other) {
  return this.key === other.key
}

Post.prototype.toString = function() {
  return JSON.stringify(_.pick(this.getattr(), ['title', 'key']))
}

// Returns only Post *data* attributes
Post.prototype.getattr = function() {
  return _.pick(this, Object.keys(Post.defaults))
}

// Sets attributes and derived/computed attributes
Post.prototype.setattr = function(opts) {
  _.merge(this, opts)

  var p = this

  this.stored = (!!p.key) && (p.key != 'new')
  this.date = p.date ? new Date(p.date) : new Date()

  if (p.embed && (!p.embed.type || p.embed.type == 'unknown')) {
    // TODO: parse other services (soundcloud, bandcamp, etc.)
    this.embed = yt.extractEmbed(p.embed.url)
  }

  return this
}

// returns an object with validation results
Post.prototype.validation = function() {
  var p = this, r = { errors: [], isValid: true }

  if (!p.date instanceof Date) {
    r.errors.date = 'date is invalid'
    r.isValid = false
  }

  if (!p.title || p.title.length == 0) {
    r.errors.title = 'title can\'t be blank'
    r.isValid = false
  }

  if (!p.embed || !p.embed.type || p.embed.type == 'unknown') {
    r.errors.url = 'the embed url is invalid'
    r.isValid = false
  }

  return r
}

// Returns a String formatted date.
Post.prototype.timeago = function() {
  return timeago(this.date)
}

// Firebase root of all user posts
Post.prototype.fbrootref = function() {
  return fbref.child('user_posts/' + this.uid)
}

// Firebase root of the specific user post
Post.prototype.fbpostref = function() {
  return this.fbrootref().child('/' + this.key)
}

/*
 *******************************************************************************
 * "Static" Methods
 *******************************************************************************
 */

// Extend the Post Function (not the instances) with pub/sub properties.
require('riot').observable(Post)

Post.destroy = function(post) {
  post.fbpostref().remove(function(error){
    if (!error) {
      post.destroyed = true
      Post.trigger('store:posts:did:destroy', post)
    }
  })
}


var listeners = {}

// When called, store:posts:did:retrieve events will be triggered
// after firebase child_added events.
Post.retrieve = function retrieve(collection) {
  if (listeners[collection]) { return }

  var ref = fbref.child(collection).orderByPriority()

  listeners[collection] = ref.on('child_added', function(snapshot) {
    var post = new Post(snapshot.val(), snapshot.key())
    Post.trigger('store:posts:did:retrieve', collection, post)
  })
}

Post.stopRetrieve = function(collection) {
  if (!listeners[collection]) { return }

  fbref.off('child_added', listeners[collection])
  delete listeners[collection]
}

/*
 * Returns latest 10 items from one of these collections:
 * posts
 * favorited
 * user_favorites/uid
 * user_posts/uid
 */
Post.latest = function(collection) {
  var r = fbref.child(collection).orderByPriority().limitToFirst(10)

    console.log(collection)

  r.once('value', function(snapshot) {
    var data = snapshot.val()

    if (!data) { return } // nothing available?

    var latest = Object.keys(data).reduce(function(acc, key) {
      acc.push(new Post(data[key], key))
      return acc
    }, []).sort(function(post1, post2) {
      return post2.date - post1.date
    })

    Post.trigger('store:posts:did:latest', collection, latest)
  })
}

// Initial creation of a post. Use update instead if the post already exists.
Post.persist = function persist(post) {
  var date = new Date()
  var attrs = _.merge(post.getattr(), {date: date.valueOf(), uid: post.uid})

  var r = post.fbrootref().push(attrs, function(error) {
    if (error) {
      Post.trigger('store:posts:failed:persist', post, error)
    } else {
      post.setattr({ key: r.key(), date: date})
      Post.trigger('store:posts:did:persist', post)
      r.setPriority(date.valueOf())
    }
  })
}

Post.update = function update(post) {
  post.fbpostref().update(post.getattr(), function(error){
    if (error) {
      Post.trigger('store:posts:failed:update', post, error)
    } else {
      Post.trigger('store:posts:did:update', post)
    }
  })
}

// Keep a tally of latest posts and latest favorited / user-favorited.
function favsAndLastestUpdater(post) {
  var
    f = fbref,
    pst = 'posts/' + post.key,
    fav = 'favorited/' + post.key,
    usf = 'user_favorites/' + post.uid + '/' + post.key,
    atr = _.merge(post.getattr(), {date: post.date.valueOf()})

  if (post.destroyed) {
    f.child(fav).remove()
    f.child(pst).remove()
    f.child(usf).remove()
  } else {
    f.child(pst).set(atr)

    if (post.favorited) {
      f.child(fav).set(atr)
      f.child(usf).set(atr)
    } else {
      f.child(fav).remove()
      f.child(usf).remove()
    }
  }
}

Post.on('store:posts:did:persist', favsAndLastestUpdater)
Post.on('store:posts:did:update', favsAndLastestUpdater)
Post.on('store:posts:did:destroy', favsAndLastestUpdater)

module.exports = Post

},{"../lib/fromnow":50,"../lib/youtube":51,"lodash/object/defaults":37,"lodash/object/merge":40,"lodash/object/pick":41,"riot":46}],48:[function(require,module,exports){
/*
 * When first created a User object is just a holder for User attributes
 * with some convenience methods for updating attributes, validating, etc.
 *
 * The User function is also observable. Publishing and subscribing
 * to User is the only way to interact with the abstract 'users store'.
 *
 * User.current holds a reference to the current user, which may or may not be
 * authenticated.
 *
 * EXAMPLE:
 *
 * var User = require('app/user')
 *
 * var current = User.current
 *
 * NOTE:
 *
 * Ultimately the main Firebase path for posts is built like this:
 * users/uid : { ...user data... }
 */

var _ = {
  defaults : require('lodash/object/defaults'),
  pick     : require('lodash/object/pick')
}

var fbref = new Firebase('https://musifavs.firebaseio.com')

function User(opts, uid) {
  _.defaults(this, opts, User.defaults)

  // if current user was instantiated more than once.
  if (User.current && User.current.uid === uid) {
    _.defaults(this, User.current)
  }
}

User.defaults = {
  'avatarUrl'   : '/assets/profile.png',
  'description' : 'MusiFavs! user',
  'displayName' : 'user',
  'location'    : 'Universe',
  'logged'      : false,
  'url'         : 'https://musifavs.com'
}

/*
 *******************************************************************************
 * Instance Methods
 *******************************************************************************
 */

// Returns only *data* attributes
User.prototype.getattr = function() {
  return _.pick(this, User.attributes)
}

User.prototype.logout = function() {
  this.authData = null
  this.logged = false
  this.provider = 'unknown'
  this.uid = null
}

// update fb data
User.prototype.update = function() {
  if (!this.uid) { return }
  fbref.child('users').child(this.uid).set(user.getattr())
}

User.prototype.toString = function() {
  return JSON.stringify(_.pick(this.getattr(), ['displayName', 'logged']))
}

/*
 *******************************************************************************
 * "Static" Methods
 *******************************************************************************
 */

// Extend the User *function* (not the instances) with pub/sub attributes.
require('riot').observable(User)

// Updates a user with the provided auth data.
function updateAuth(authData) {
  if (!authData) { return }

  var u = User.current

  u.uid = authData.uid
  u.authData = authData
  u.provider = authData.provider
  u.logged = true

  if (authData.provider == 'twitter') {
    u.displayName = authData.twitter.displayName

    var p = authData.twitter.cachedUserProfile

    if (p) {
      u.avatarUrl = p.profile_image_url_https
      u.description = p.description
      u.location = p.location
      u.url = p.url
    }
  }

  _.defaults(this, u.defaults) // in case we picked up some nulls
}

User.login = function(provider) {
  fbref.authWithOAuthPopup(provider, function(error, authData) {
    if (error || !authData) {
      User.trigger('store:users:failed:login', error || {code: 'unknown'})
    } else {
      updateAuth(authData)
    }
  })
}

User.logout = function() {
  if (User.current && User.current.logged) {
    User.current.logout()
    fbref.unauth()
  }
}

User.lookup = function(uid) {
  fbref.child('users').child(uid).once('value', function(snapshot){
    var data = snapshot.val()
    if (data) {
      User.trigger('store:users:did:lookup', uid, new User(data, uid))
    } else {
      User.trigger('store:users:failed:lookup', uid)
    }
  })
}

// creates the User.current instance.
User.setupCurrent = function() {
  User.current = new User()

  fbref.onAuth(function(authData) {
    if (authData) {
      updateAuth(authData)
      User.trigger('store:users:did:login', User.current, authData)
    } else {
      User.current.logout()
      User.trigger('store:users:did:logout', User.current)
    }
  })
  // updateAuth(fbref.getAuth()) // NOTE: removed to avoid fb's sync. auth check
}

module.exports = User

},{"lodash/object/defaults":37,"lodash/object/pick":41,"riot":46}],49:[function(require,module,exports){
var _ = {
  isFunction : require('lodash/lang/isFunction')
}

/*
 * Defines a common API around DOM node handling. The API is inspired by
 * certain lib you may have heard about... :p
 */
function DomWrap(node, selector) {
  this[0] = this.node = node
  this.id = node.id

  if (selector) {
    this.node = node.querySelector(selector)
  }

  this.listeners = [] // save event listeners so we can unregister easily.
}

DomWrap.prototype.html = function(html) {
  this.node.innerHTML = html
  return this
}

DomWrap.prototype.prepend = function(node) {
  this.node.insertBefore(node, this.node.firstChild)
  return this
}

DomWrap.prototype.append = function(node) {
  this.node.appendChild(node)
  return this
}

DomWrap.prototype.remove = function(node) {
  this.node.removeChild(node)
  return this
}

DomWrap.prototype.text = function(text) {
  this.node.textContent = text
  return this
}

DomWrap.prototype.val = function() {
  if (arguments.length) { this.node.value = arguments[0] }
  return this.node.value
}

DomWrap.prototype.addClass = function(classname) {
  this.node.classList.add(classname)
  return this
}

DomWrap.prototype.removeClass = function(classname) {
  this.node.classList.remove(classname)
  return this
}

// Return first parent element matching selector
DomWrap.prototype.parent = function(selector) {
  var t = this.node.parentElement
  while (t) {
    if (t.matches(selector)) { return new DomWrap(t) }
    t = t.parentElement
  }
}

DomWrap.prototype.data = function(name) {
  return this.node.getAttribute('data-' + name)
}

/* This event handler prevents the event default action
 * and returns a wrapped event target instead in addition
 * to the original event.
 *
 * node.on('event', fun)
 * node.on('event', '.delegate-selector', fun)
 */
DomWrap.prototype.on = function(eventname, selector, callback) {
  var fn, n = this.node

  if (_.isFunction(selector)) {
    callback = selector
    fn = function(ev) {
      ev.preventDefault()
      callback(new DomWrap(ev.target), ev)
    }
  } else {
    fn = function(ev) {
      ev.preventDefault()

      var i, c, t = ev.target,
          candidates = n.querySelectorAll(selector),
          length = candidates.length

      while (t) {
        // Check if the target or one of their parents is equal
        // to any node matched with the delegate selector.
        for (i = 0; i < length; i++) {
          c = candidates[i]
          if (c.isEqualNode(t)) { return callback(new DomWrap(c), ev) }
        }

        // No need to check further than the node n (event listener)
        if (t.isEqualNode(n)) { return }

        t = t.parentElement
      }
    }
  }

  n.addEventListener(eventname, fn)

  this.listeners.push({eventname: eventname, fn: fn})

  return this
}

// call without parameters for removing all listeners.
DomWrap.prototype.off = function(eventname, callback) {
  if (arguments.length) {
      // don't worry about removing from this.listeners, removing twice is
      // harmless and this object should be short lived.
      this.node.removeEventListener(eventname, callback)
  } else {
    this.listeners.forEach(function(data) {
      this.node.removeEventListener(data.eventname, data.fn)
    }, this)
    this.listeners = []
  }

  return this
}

module.exports = function(node, selector) {
  return new DomWrap(node, selector)
}

},{"lodash/lang/isFunction":30}],50:[function(require,module,exports){
/*
 * Adapted from https://github.com/txchen/riot-hn/blob/gh-pages/src/filters.js
 */
module.exports = function(date) {
  var between = (Date.now() - date) / 1000

  if (between < 0) {
    return 'recently' // OMG it comes form the future! :-p

  } if (between < 3600) {
    return ~~(between / 60) + ' minutes ago'

  } else if (between < 86400) {
    return ~~(between / 3600) + ' hours ago'
  }

  return ~~(between / 86400) + ' days ago'
};

},{}],51:[function(require,module,exports){
var urlregex = /youtube.com.+\?v=([a-zA-z0-9\-_]+)/i

exports.extractEmbed = function(url) {
  var match = urlregex.exec(url)

  if (match && match.length) {
    return {type: 'youtube', url: url, videoId: match[1]}
  } else {
    return {type: 'unknown', url: url}
  }
}

},{}],52:[function(require,module,exports){
require('./app/user').setupCurrent() // Create instance of current user.

// Modules displayed all the time:
var
  Message = require('./modules/message/message'),
  Navigation = require('./modules/navigation/navigation'),
  Main = require('./modules/main/main')

var
  main = new Main(document.querySelector('#app-main')),
  msg = new Message(main, document.querySelector('#app-message')),
  nav = new Navigation(main, document.querySelector('#app-navigation'))

var riot = require('riot')

var router = main.router.bind(main) // riot misses the context otherwise.

riot.route(router) // Setup a router handler (hashchange event)
riot.route.exec(router) // Call the router w/o waiting for a hashchange (starts the app!)

},{"./app/user":48,"./modules/main/main":58,"./modules/message/message":60,"./modules/navigation/navigation":62,"riot":46}],53:[function(require,module,exports){
var _ = {escape: require("lodash.escape")};
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<main class="main app-front" role="main"><img class="responsive-width" src="/assets/music.jpg"><div class="front-copy"><h1>A micro Blog for your favorite Music!</h1><p>Share your favorite music and videos with your friends.<br>With MusiFavs you can embed content from YouTube, SoundCloud, and more, in a single place!</p><h2>Latest Posts</h2><ul class="post-list latest-posts"></ul><h2>Latest Favorited</h2><ul class="post-list latest-favs"></ul></div></main>';
}
return __p;
};

},{"lodash.escape":1}],54:[function(require,module,exports){
var
  $ = require('../../lib/domWrap'),
  Post = require('../../app/post'),
  itemstpl = require('./post-items.html'),
  template = require('./front.html')

function Front(parent, node, options) {
  node.innerHTML = template(options)

  this.parent = parent

  this.nodes = {
    root      : $(node),
    posts     : $(node, '.latest-posts'),
    favorited : $(node, '.latest-favs')
  }

  this.handlePosts = function(collection, posts) {
    this.nodes[collection].html(itemstpl({ posts: posts }))
  }.bind(this)

  Post.on('store:posts:did:latest', this.handlePosts)

  Post.latest('posts')
  Post.latest('favorited')
}

Front.prototype.unload = function() {
  this.nodes.root.html('')
  Post.off('store:posts:did:latest', this.handlePosts)
}

module.exports = Front

},{"../../app/post":47,"../../lib/domWrap":49,"./front.html":53,"./post-items.html":55}],55:[function(require,module,exports){
var _ = {escape: require("lodash.escape")};
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';
 posts.forEach(function(post) { 
__p+='<li><i class="fa fa-play"></i>&nbsp;'+
((__t=( post.title ))==null?'':__t)+
' posted by&nbsp; <a href="#'+
((__t=( post.uid ))==null?'':__t)+
'/posts">'+
((__t=( post.userName ))==null?'':__t)+
'&nbsp;<i class="fa fa-child"></i></a> &nbsp; <span class="timeago">('+
((__t=( post.timeago() ))==null?'':__t)+
')</span></li>';
 }) 
__p+='';
}
return __p;
};

},{"lodash.escape":1}],56:[function(require,module,exports){
var _ = {escape: require("lodash.escape")};
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<main class="main" role="main"><div class="front-copy"><h1>Log In</h1><p>In order to interact with MusiFavs! you\'ll need to log in first.</p><p>Please select one of the services below to log in:</p><ul class="login-links fa-ul fa-2x"><li><i class="fa-li fa fa-twitter-square"></i> <a href="#" id="twitter-login">Twitter</a></li><li><i class="fa-li fa fa-google-plus-square"></i> <a href="#" id="google-login">Google</a> <small>(Sorry, unavailable at the moment)</small></li><li><i class="fa-li fa fa-facebook-square"></i> <a href="#" id="facebook-login">Facebook</a> <small>(Sorry, unavailable at the moment)</small></li></ul></div></main>';
}
return __p;
};

},{"lodash.escape":1}],57:[function(require,module,exports){
var
  $ = require('../../lib/domWrap'),
  User = require('../../app/user'),
  template = require('./login.html')

function Login(parent, node, options) {
  node.innerHTML = template(options)

  this.parent = parent

  this.nodes = {
    root: $(node),
    list: $(node, '.login-links')
  }

  this.loginListener = function(target) {
    if (target.id == 'twitter-login') {
      User.login('twitter')
    } else {
      var p = this.parent
      p.message('Sorry, authenticating with this provider is not available yet.')
    }
  }.bind(this)

  this.nodes.list.on('click', this.loginListener)
}

Login.prototype.unload = function() {
  this.nodes.list.off('click', this.loginListener)
  this.nodes.root.html('')
}

module.exports = Login

},{"../../app/user":48,"../../lib/domWrap":49,"./login.html":56}],58:[function(require,module,exports){
var
  User = require('../../app/user'),
  riot = require('riot')

require('../front/front')
require('../login/login')
require('../user/user')

function Main(rootNode) {
  riot.observable(this) // main can listen to events.

  var m = this

  m.rootNode = rootNode

  m.on('module:user:failed:lookup', function(){
    window.location.hash = '' // "redirect" home.
    m.message('Sorry, we could not find that user.')
  })

  m.on('module:navigation:did:newpost', function(user){
    if (window.location.hash != '#me/posts') {
      window.location.hash = 'me/posts'
      m.showNewPost = true
    } else {
      m.lastmod.showNewPost()
    }
  })

  m.on('module:user:did:lookup', function(uid, user) {
    if (m.showNewPost) {
      m.lastmod.showNewPost()
      m.showNewPost = false
    }
  })

  User.on('store:users:did:login', function(user) {
    m.message('Thank you! You have been logged in.')
    user.update()
  })

  User.on('store:users:did:update', function(user) {
    m.router(user.uid, 'posts') // "redirect" to the user posts screen.
  })

  User.on('store:users:did:logout', function(){
    window.location.hash = '' // "redirect" home.
    m.message('You\'ve been logged out.')
  })
}

Main.prototype.message = function(text) {
  this.trigger('module:message:do:message', text)
}

Main.prototype.loadmod = function(name, options) {
  var m = this, Ctor = require('../' + name + '/' + name)
  if (m.lastmod) { m.lastmod.unload() }
  m.lastmod = new Ctor(m, m.rootNode, options)
}

/*
 * Parameters to this function come from the router (riot.route),
 * parsed from the location hash.
 */
Main.prototype.router = function(_uid, action, postid) {
  this.trigger('module:main:did:router')

  var m = this, user = User.current
  var uid = (_uid == 'me') ? user.uid : _uid

  switch(action) {
  case 'posts':
  case 'favorites':

    if (_uid == 'me' && !user.logged) {
      m.loadmod('login')
      m.message('Please login to access your posts.')

    } else {
      m.loadmod('user', {uid: uid, action: action})
    }

  break
  case 'logout':

    if (user.logged) {
      User.loggout()
    } else {
      window.location.hash = ''
    }

  break
  default:
    m.loadmod('front')
  }
}

module.exports = Main

},{"../../app/user":48,"../front/front":54,"../login/login":57,"../user/user":69,"riot":46}],59:[function(require,module,exports){
var _ = {escape: require("lodash.escape")};
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<span class="app-message-text"></span><div class="app-message-dismiss"><a href="#" class="app-message-dismiss">Dismiss</a></div>';
}
return __p;
};

},{"lodash.escape":1}],60:[function(require,module,exports){
var
  $ = require('../../lib/domWrap'),
  template = require('./message.html')

function Message(parent, node, options) {
  node.innerHTML = template(options)

  this.parent = parent

  this.nodes = {
    root : $(node),
    text : $(node, '.app-message-text'),
    dism : $(node, '.app-message-dismiss')
  }

  this.mainDoMessageListener = function(text){
    this.show(text)
  }.bind(this)

  this.parent.on('module:message:do:message', this.mainDoMessageListener)

  this.nodes.dism.on('click', function(target) {
    this.dismiss()
  }.bind(this))
}

Message.prototype.unload = function() {
  this.parent.off('module:main:do:message', this.mainDoMessageListener)
  this.nodes.dism.off()
  this.nodes.root.html('')
}

Message.prototype.show = function(message) {
  this.nodes.root.removeClass('app-hidden')
  this.nodes.text.text(message)
}

Message.prototype.dismiss = function() {
  this.nodes.root.addClass('app-hidden')
  this.nodes.text.text('')
}

module.exports = Message

},{"../../lib/domWrap":49,"./message.html":59}],61:[function(require,module,exports){
var _ = {escape: require("lodash.escape")};
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<nav class="navigation"><ul class="nav-actions" role="navigation"><li><a id="nav-newpost" href="#">New Post</a></li><li><a href="#me/posts">My Posts</a></li><li><a href="#me/favorites">My Favorites</a></li><li><a id="nav-logout" href="#me/logout">Log Out</a></li></ul></nav>';
}
return __p;
};

},{"lodash.escape":1}],62:[function(require,module,exports){
var
  $ = require('../../lib/domWrap'),
  User = require('../../app/user'),
  riot = require('riot'),
  template = require('./navigation.html')

function Navigation(parent, node, options) {
  node.innerHTML = template(options)

  var n = this

  n.parent = parent

  n.nodes = {
    root    : $(node),
    logout  : $(node, '#nav-logout'),
    newpost : $(node, '#nav-newpost')
  }

  n.updateLogout = function() {
    if (User.current.logged) { n.showLogout() } else { n.hideLogout() }
  }

  n.newpostListener = function(target) {
    n.parent.trigger('module:navigation:did:newpost')
  }

  n.parent.on('module:main:did:router', n.updateLogout)
  n.nodes.newpost.on('click', n.newpostListener)
}

Navigation.prototype.unload = function() {
  var n = this
  n.parent.off('module:main:did:router', n.updateLogout)
  n.nodes.newpost.on('click', n.newpostListener)
  n.nodes.root.html('')
}

Navigation.prototype.showLogout = function() {
  this.nodes.logout.removeClass('app-hidden')
}

Navigation.prototype.hideLogout = function() {
  this.nodes.logout.addClass('app-hidden')
}

module.exports = Navigation

},{"../../app/user":48,"../../lib/domWrap":49,"./navigation.html":61,"riot":46}],63:[function(require,module,exports){
var _ = {escape: require("lodash.escape")};
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<h2>'+
((__t=( stored ? 'Editing Post' : 'New Post' ))==null?'':__t)+
'</h2><p>Please provide the resource url to share, a title and a description.</p><div class="post-form-embed"><label>Embed Url (e.g. YouTube Url)</label><input name="url" type="url" placeholder="https://www.youtube.com/watch?v=P9J5tYShNY8"></div><div class="post-form-data"><input name="title" title="Post Title" type="text" placeholder="Title"><textarea title="Post Description" placeholder="Description"></textarea></div><div class="post-actions" data-post-key="'+
((__t=( postKey ))==null?'':__t)+
'"><a class="undo" title="Undo" href="#"><i class="fa fa-times-circle"></i>&nbsp;Cancel</a> <a class="save" title="Save and Publish" href="#"><i class="fa fa-save"></i>&nbsp;Save</a> <span class="post-edit-message"></span></div>';
}
return __p;
};

},{"lodash.escape":1}],64:[function(require,module,exports){
var _ = {
  merge  : require('lodash/object/merge'),
  values : require('lodash/object/values')
}

var
  $ = require('../../lib/domWrap'),
  Post = require('../../app/post'),
  template = require('./form.html')

function PostForm(parent, node, options) {
  this.parent = parent
  this.post = new Post(options.post)

  var r = $(node).html(template(_.merge({
    postKey: this.post.key || 'new'
  }, this.post)))

  this.nodes = {
    root: r,
    formMessage: $(node, '.post-edit-message'),
    inputTitle: $(node, 'input[name=title]'),
    inputUrl: $(node, 'input[name=url]'),
    inputDesc: $(node, 'textarea')
  }

  r.addClass('app-post-form')

  this.updateForm()
}

PostForm.prototype.unload = function() {
  this.nodes.root.removeClass('app-post-form').html('')
}

PostForm.prototype.updateForm = function() {
  var n = this.nodes, p = this.post
  n.inputTitle.val(p.title)
  n.inputUrl.val(p.embed.url || '')
  n.inputDesc.val(p.desc)
}

PostForm.prototype.updatePost = function() {
  var n = this.nodes
  this.post.setattr({
    title: n.inputTitle.val(),
    embed: {url: n.inputUrl.val() },
    desc: n.inputDesc.val()
  })
}

PostForm.prototype.isValid = function() {
  var result = this.post.validation(), n = this.nodes

  n.inputUrl.removeClass('invalid')
  n.inputTitle.removeClass('invalid')

  if (result.isValid) {
    return true
  } else {
    if (result.errors.url) { n.inputUrl.addClass('invalid') }
    if (result.errors.title) { n.inputTitle.addClass('invalid') }

    var msg = _.values(result.errors).join(', ')
    n.formMessage.text('Sorry, the post can\'t be saved: ' + msg + '.')

    return false
  }
}

module.exports = PostForm

},{"../../app/post":47,"../../lib/domWrap":49,"./form.html":63,"lodash/object/merge":40,"lodash/object/values":42}],65:[function(require,module,exports){
var _ = {escape: require("lodash.escape")};
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<p class="timeago">posted by&nbsp;'+
((__t=( userName ))==null?'':__t)+
'&nbsp;'+
((__t=( timeago ))==null?'':__t)+
'</p><h2><i class="fa fa-play"></i>&nbsp;'+
((__t=( title ))==null?'':__t)+
'</h2><div class="post-show-embed"><iframe type="text/html" width="640" height="260" src="http://www.youtube.com/embed/'+
((__t=( embed.videoId ))==null?'':__t)+
'" frameborder="0"></iframe></div><p class="post-show-description"><i class="fa fa-child fa-2x"></i>&nbsp;'+
((__t=( desc ))==null?'':__t)+
'</p><div class="post-actions" data-post-key="'+
((__t=( postKey ))==null?'':__t)+
'"><a class="fav" title="Favorite" href="#"><i class="fa fa-heart"></i>&nbsp;Favorite</a> <a class="edit" title="Edit" href="#"><i class="fa fa-edit"></i>&nbsp;Edit</a> <a class="remove" title="Remove" href="#"><i class="fa fa-trash"></i>&nbsp;Remove</a></div>';
}
return __p;
};

},{"lodash.escape":1}],66:[function(require,module,exports){
var
  $ = require('../../lib/domWrap'),
  template = require('./show.html')

var _ = {
  merge : require('lodash/object/merge')
}

function PostShow(parent, node, options) {
  this.parent = parent

  var p = this.post = options.post

  node.innerHTML = template(_.merge(p.getattr(), {
    postKey: p.key || 'new',
    timeago: p.timeago()
  }))

  this.nodes = {
    root: $(node).addClass('app-post-show'),
    fav: $(node, '.fav')
  }

  this.updateFav()
}

PostShow.prototype.updateFav = function() {
  var p = this.post, f = this.nodes.fav

  if (p.favorited) {
    f.addClass('post-favorited')
  } else {
    f.removeClass('post-favorited')
  }
}

PostShow.prototype.unload = function() {
  this.nodes.root.removeClass('app-post-show').html('')
}

module.exports = PostShow

},{"../../lib/domWrap":49,"./show.html":65,"lodash/object/merge":40}],67:[function(require,module,exports){
var _ = {escape: require("lodash.escape")};
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="profile-info"><ul class="fa-ul"><li class="profile-pic"><img src="'+
((__t=(user.avatarUrl))==null?'':__t)+
'"></li><li><i class="fa-li fa fa-link"></i> <a href="'+
((__t=(user.url))==null?'':__t)+
'">'+
((__t=(user.displayName))==null?'':__t)+
'</a><br></li><li><i class="fa-li fa fa-user"></i>'+
((__t=(user.description))==null?'':__t)+
'</li><li><i class="fa-li fa fa-map-marker"></i>'+
((__t=(user.location))==null?'':__t)+
'</li><li><i class="fa-li fa fa-twitter-square"></i> <a href="https://twitter.com/'+
((__t=(user.displayName))==null?'':__t)+
'">@'+
((__t=(user.displayName))==null?'':__t)+
'</a></li></ul></div>';
}
return __p;
};

},{"lodash.escape":1}],68:[function(require,module,exports){
var _ = {escape: require("lodash.escape")};
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<aside class="profile"></aside><main class="main" role="main"><div class="app-new-post"></div><div class="app-post-placeholder"><h1>Hey!&nbsp;<i class="fa fa-child"></i>&nbsp;<i class="fa fa-play"></i></h1><p>This user has not'+
((__t=( (action == 'posts') ? ' posted anything ' : ' favorited any post ' ))==null?'':__t)+
'yet. Please check back later!</p></div><div class="app-posts"></div></main>';
}
return __p;
};

},{"lodash.escape":1}],69:[function(require,module,exports){
var
  $ = require('../../lib/domWrap'),
  Post = require('../../app/post'),
  User = require('../../app/user'),
  PostForm = require('../post/form'),
  PostShow = require('../post/show'),
  proftpl = require('./profile.html'),
  template = require('./user.html')

function UserMod(parent, node, options) {
  this.parent = parent

  this.mods = {} // store PostShow and PostForm modules.

  this.action = options.action
  this.uid = options.uid
  this.firebasepath = 'user_' + this.action + '/' + this.uid

  node.innerHTML = template(this)

  var r = $(node)

  this.nodes = {
    root      : r,
    newpost   : $(node, '.app-new-post'),
    placehold : $(node, '.app-post-placeholder'),
    posts     : $(node, '.app-posts'),
    prof      : $(node, '.profile')
  }

  this.userDidLookup = function(uid, user) {
    this.user = user
    this.redrawProfile()
    Post.retrieve(this.firebasepath)
    this.parent.trigger('module:user:did:lookup', uid, user)
  }.bind(this)

  this.userFailedLookup = function (uid) {
    this.parent.trigger('module:user:failed:lookup', uid)
  }.bind(this)

  this.postsDidRetrieve = function(firebasepath, post){
    var u = this, m = this.mods[post.key]
    if (m) { u.showmod(m) } else { u.addPost(post) }
  }.bind(this)

  this.postsDidUpdate = function(post){
    var u = this, m = this.mods[post.key]
    if (m) { u.showmod(m) }
  }.bind(this)

  var actionMod = function(target) {
    var key = target.parent('.post-actions').data('post-key')
    return this.mods[key]
  }.bind(this)

  r.on('click', '.fav', function(target) {
    var mod = actionMod(target)
    mod.post.toggleFav()
    Post.update(mod.post)
  }.bind(this))

  r.on('click', '.edit', function(target) {
    var mod = actionMod(target)
    this.editPost(mod)
  }.bind(this))

  r.on('click', '.remove', function(target) {
    var mod = actionMod(target)
    this.removePost(mod)
  }.bind(this))

  r.on('click', '.undo', function(target) {
    var mod = actionMod(target)
    if (mod.post.stored) {
      this.showmod(mod)
    } else {
      this.hideNewPost()
    }
  }.bind(this))

  r.on('click', '.save', function(target) {
    var mod = actionMod(target)

    mod.updatePost()

    if (!mod.isValid()) {
      // do nothing, the form will show an error message.
    } else if (mod.post.stored) {
      Post.update(mod.post)
    } else {
      Post.persist(mod.post)
      this.hideNewPost()
    }
  }.bind(this))

  User.on('store:users:failed:lookup' , this.userFailedLookup)
  User.on('store:users:did:lookup'    , this.userDidLookup)
  Post.on('store:posts:did:retrieve'  , this.postsDidRetrieve)
  Post.on('store:posts:did:update'    , this.postsDidUpdate)

  User.lookup(this.uid)
}

UserMod.prototype.unload = function() {
  this.nodes.root.off().html('') // unregister all event handlers.

  User.off('store:users:failed:lookup' , this.userFailedLookup)
  User.off('store:users:did:lookup'    , this.userDidLookup)
  Post.off('store:posts:did:retrieve'  , this.postsDidRetrieve)
  Post.off('store:posts:did:update'    , this.postsDidUpdate)

  Post.stopRetrieve(this.firebasepath)
}

UserMod.prototype.updatePlaceholder = function() {
  var modkeys = Object.keys(this.mods), p = this.nodes.placehold

  if (modkeys.length == 0 || modkeys[0] == 'new') {
    p.removeClass('app-hidden')
  } else {
    p.addClass('app-hidden')
  }
}

UserMod.prototype.redrawProfile = function() {
  this.nodes.prof.html(proftpl(this))
}

UserMod.prototype.hideNewPost = function() {
  var m = this.mods.new, n = this.nodes.newpost
  if (m) {
    m.unload()
    n.html('')
    delete this.mods['new']
    this.updatePlaceholder()
  }
}

UserMod.prototype.showNewPost = function() {
  var m = this, el, p
  if (!m.mods.new) {
    el = document.createElement('div')
    p = new Post({uid : m.uid, userName : m.user.displayName})
    m.mods['new'] = new PostForm(m, el, {post : p})
    m.nodes.newpost.append(el)
    m.updatePlaceholder()
  }
}

UserMod.prototype.editPost = function(mod) {
  var el = mod.nodes.root[0]
  mod.unload()
  this.mods[mod.post.key] = new PostForm(this, el, {post : mod.post})
}

UserMod.prototype.addPost = function(post) {
  var m = this, el = document.createElement('div'),
    p = new PostShow(m, el, {post : post})
  m.mods[post.key] = p
  m.nodes.posts.prepend(p.nodes.root[0])
  m.updatePlaceholder()
}

// Show a post that was previously being edited, or update it if the data changed.
UserMod.prototype.showmod = function(mod) {
  if (mod instanceof PostForm) {
    mod.unload()
    var ps = new PostShow(this, mod.nodes.root[0], {post : mod.post})
    this.mods[mod.post.key] = ps
  } else {
    mod.updateFav() // update just fav flag for now.
  }
}

UserMod.prototype.removePost = function(mod) {
  Post.destroy(mod.post)
  mod.unload()
  this.nodes.posts.remove(mod.nodes.root[0])
  delete this.mods[mod.key]
  this.updatePlaceholder()
}

module.exports = UserMod

},{"../../app/post":47,"../../app/user":48,"../../lib/domWrap":49,"../post/form":64,"../post/show":66,"./profile.html":67,"./user.html":68}]},{},[52])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmVzY2FwZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZXNjYXBlL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2V0b3N0cmluZy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlDb3B5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9hcnJheUVhY2guanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Fzc2lnbkRlZmF1bHRzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlQXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlQ29weS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZsYXR0ZW4uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VGb3IuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VGb3JJbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZvck93bi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUlzRnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VNZXJnZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZU1lcmdlRGVlcC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZVRvU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlVmFsdWVzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iaW5kQ2FsbGJhY2suanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2NyZWF0ZUFzc2lnbmVyLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9pc0luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9pc0l0ZXJhdGVlQ2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvaXNMZW5ndGguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2lzT2JqZWN0TGlrZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvcGlja0J5QXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL3BpY2tCeUNhbGxiYWNrLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9zaGltSXNQbGFpbk9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvc2hpbUtleXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL3RvT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9sYW5nL2lzQXJndW1lbnRzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9sYW5nL2lzQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2xhbmcvaXNGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9pc05hdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9pc1BsYWluT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9sYW5nL2lzVHlwZWRBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy90b1BsYWluT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvZGVmYXVsdHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3Qva2V5c0luLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvbWVyZ2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL29iamVjdC9waWNrLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvdmFsdWVzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9zdHJpbmcvZXNjYXBlUmVnRXhwLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9zdXBwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC91dGlsaXR5L2lkZW50aXR5LmpzIiwibm9kZV9tb2R1bGVzL3Jpb3QvcmlvdC5qcyIsInNyYy9hcHAvcG9zdC5qcyIsInNyYy9hcHAvdXNlci5qcyIsInNyYy9saWIvZG9tV3JhcC5qcyIsInNyYy9saWIvZnJvbW5vdy5qcyIsInNyYy9saWIveW91dHViZS5qcyIsInNyYy9tYWluLmpzIiwic3JjL21vZHVsZXMvZnJvbnQvZnJvbnQuaHRtbCIsInNyYy9tb2R1bGVzL2Zyb250L2Zyb250LmpzIiwic3JjL21vZHVsZXMvZnJvbnQvcG9zdC1pdGVtcy5odG1sIiwic3JjL21vZHVsZXMvbG9naW4vbG9naW4uaHRtbCIsInNyYy9tb2R1bGVzL2xvZ2luL2xvZ2luLmpzIiwic3JjL21vZHVsZXMvbWFpbi9tYWluLmpzIiwic3JjL21vZHVsZXMvbWVzc2FnZS9tZXNzYWdlLmh0bWwiLCJzcmMvbW9kdWxlcy9tZXNzYWdlL21lc3NhZ2UuanMiLCJzcmMvbW9kdWxlcy9uYXZpZ2F0aW9uL25hdmlnYXRpb24uaHRtbCIsInNyYy9tb2R1bGVzL25hdmlnYXRpb24vbmF2aWdhdGlvbi5qcyIsInNyYy9tb2R1bGVzL3Bvc3QvZm9ybS5odG1sIiwic3JjL21vZHVsZXMvcG9zdC9mb3JtLmpzIiwic3JjL21vZHVsZXMvcG9zdC9zaG93Lmh0bWwiLCJzcmMvbW9kdWxlcy9wb3N0L3Nob3cuanMiLCJzcmMvbW9kdWxlcy91c2VyL3Byb2ZpbGUuaHRtbCIsInNyYy9tb2R1bGVzL3VzZXIvdXNlci5odG1sIiwic3JjL21vZHVsZXMvdXNlci91c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3B6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZVRvU3RyaW5nID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNldG9zdHJpbmcnKTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggSFRNTCBlbnRpdGllcyBhbmQgSFRNTCBjaGFyYWN0ZXJzLiAqL1xudmFyIHJlVW5lc2NhcGVkSHRtbCA9IC9bJjw+XCInYF0vZyxcbiAgICByZUhhc1VuZXNjYXBlZEh0bWwgPSBSZWdFeHAocmVVbmVzY2FwZWRIdG1sLnNvdXJjZSk7XG5cbi8qKiBVc2VkIHRvIG1hcCBjaGFyYWN0ZXJzIHRvIEhUTUwgZW50aXRpZXMuICovXG52YXIgaHRtbEVzY2FwZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmIzM5OycsXG4gICdgJzogJyYjOTY7J1xufTtcblxuLyoqXG4gKiBVc2VkIGJ5IGBfLmVzY2FwZWAgdG8gY29udmVydCBjaGFyYWN0ZXJzIHRvIEhUTUwgZW50aXRpZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaHIgVGhlIG1hdGNoZWQgY2hhcmFjdGVyIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgY2hhcmFjdGVyLlxuICovXG5mdW5jdGlvbiBlc2NhcGVIdG1sQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGh0bWxFc2NhcGVzW2Nocl07XG59XG5cbi8qKlxuICogQ29udmVydHMgdGhlIGNoYXJhY3RlcnMgXCImXCIsIFwiPFwiLCBcIj5cIiwgJ1wiJywgXCInXCIsIGFuZCAnYCcsIGluIGBzdHJpbmdgIHRvXG4gKiB0aGVpciBjb3JyZXNwb25kaW5nIEhUTUwgZW50aXRpZXMuXG4gKlxuICogKipOb3RlOioqIE5vIG90aGVyIGNoYXJhY3RlcnMgYXJlIGVzY2FwZWQuIFRvIGVzY2FwZSBhZGRpdGlvbmFsIGNoYXJhY3RlcnNcbiAqIHVzZSBhIHRoaXJkLXBhcnR5IGxpYnJhcnkgbGlrZSBbX2hlX10oaHR0cHM6Ly9tdGhzLmJlL2hlKS5cbiAqXG4gKiBUaG91Z2ggdGhlIFwiPlwiIGNoYXJhY3RlciBpcyBlc2NhcGVkIGZvciBzeW1tZXRyeSwgY2hhcmFjdGVycyBsaWtlXG4gKiBcIj5cIiBhbmQgXCIvXCIgZG9uJ3QgcmVxdWlyZSBlc2NhcGluZyBpbiBIVE1MIGFuZCBoYXZlIG5vIHNwZWNpYWwgbWVhbmluZ1xuICogdW5sZXNzIHRoZXkncmUgcGFydCBvZiBhIHRhZyBvciB1bnF1b3RlZCBhdHRyaWJ1dGUgdmFsdWUuXG4gKiBTZWUgW01hdGhpYXMgQnluZW5zJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2FtYmlndW91cy1hbXBlcnNhbmRzKVxuICogKHVuZGVyIFwic2VtaS1yZWxhdGVkIGZ1biBmYWN0XCIpIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQmFja3RpY2tzIGFyZSBlc2NhcGVkIGJlY2F1c2UgaW4gSW50ZXJuZXQgRXhwbG9yZXIgPCA5LCB0aGV5IGNhbiBicmVhayBvdXRcbiAqIG9mIGF0dHJpYnV0ZSB2YWx1ZXMgb3IgSFRNTCBjb21tZW50cy4gU2VlIFsjMTAyXShodHRwczovL2h0bWw1c2VjLm9yZy8jMTAyKSxcbiAqIFsjMTA4XShodHRwczovL2h0bWw1c2VjLm9yZy8jMTA4KSwgYW5kIFsjMTMzXShodHRwczovL2h0bWw1c2VjLm9yZy8jMTMzKSBvZlxuICogdGhlIFtIVE1MNSBTZWN1cml0eSBDaGVhdHNoZWV0XShodHRwczovL2h0bWw1c2VjLm9yZy8pIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogV2hlbiB3b3JraW5nIHdpdGggSFRNTCB5b3Ugc2hvdWxkIGFsd2F5cyBxdW90ZSBhdHRyaWJ1dGUgdmFsdWVzIHRvIHJlZHVjZVxuICogWFNTIHZlY3RvcnMuIFNlZSBbUnlhbiBHcm92ZSdzIGFydGljbGVdKGh0dHA6Ly93b25rby5jb20vcG9zdC9odG1sLWVzY2FwaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlKCdmcmVkLCBiYXJuZXksICYgcGViYmxlcycpO1xuICogLy8gPT4gJ2ZyZWQsIGJhcm5leSwgJmFtcDsgcGViYmxlcydcbiAqL1xuZnVuY3Rpb24gZXNjYXBlKHN0cmluZykge1xuICAvLyBSZXNldCBgbGFzdEluZGV4YCBiZWNhdXNlIGluIElFIDwgOSBgU3RyaW5nI3JlcGxhY2VgIGRvZXMgbm90LlxuICBzdHJpbmcgPSBiYXNlVG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNVbmVzY2FwZWRIdG1sLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlVW5lc2NhcGVkSHRtbCwgZXNjYXBlSHRtbENoYXIpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXNjYXBlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0IGlzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVRvU3RyaW5nO1xuIiwiLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBgc291cmNlYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUNvcHkoc291cmNlLCBhcnJheSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlDb3B5O1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIG9yIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUVhY2goYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlFYWNoO1xuIiwiLyoqXG4gKiBVc2VkIGJ5IGBfLmRlZmF1bHRzYCB0byBjdXN0b21pemUgaXRzIGBfLmFzc2lnbmAgdXNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IG9iamVjdFZhbHVlIFRoZSBkZXN0aW5hdGlvbiBvYmplY3QgcHJvcGVydHkgdmFsdWUuXG4gKiBAcGFyYW0geyp9IHNvdXJjZVZhbHVlIFRoZSBzb3VyY2Ugb2JqZWN0IHByb3BlcnR5IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHZhbHVlIHRvIGFzc2lnbiB0byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICovXG5mdW5jdGlvbiBhc3NpZ25EZWZhdWx0cyhvYmplY3RWYWx1ZSwgc291cmNlVmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3RWYWx1ZSA9PSAndW5kZWZpbmVkJyA/IHNvdXJjZVZhbHVlIDogb2JqZWN0VmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduRGVmYXVsdHM7XG4iLCJ2YXIgYmFzZUNvcHkgPSByZXF1aXJlKCcuL2Jhc2VDb3B5JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uYXNzaWduYCB3aXRob3V0IHN1cHBvcnQgZm9yIGFyZ3VtZW50IGp1Z2dsaW5nLFxuICogbXVsdGlwbGUgc291cmNlcywgYW5kIGB0aGlzYCBiaW5kaW5nIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25pbmcgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlQXNzaWduKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyKSB7XG4gIHZhciBwcm9wcyA9IGtleXMoc291cmNlKTtcbiAgaWYgKCFjdXN0b21pemVyKSB7XG4gICAgcmV0dXJuIGJhc2VDb3B5KHNvdXJjZSwgb2JqZWN0LCBwcm9wcyk7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdLFxuICAgICAgICB2YWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICByZXN1bHQgPSBjdXN0b21pemVyKHZhbHVlLCBzb3VyY2Vba2V5XSwga2V5LCBvYmplY3QsIHNvdXJjZSk7XG5cbiAgICBpZiAoKHJlc3VsdCA9PT0gcmVzdWx0ID8gcmVzdWx0ICE9PSB2YWx1ZSA6IHZhbHVlID09PSB2YWx1ZSkgfHxcbiAgICAgICAgKHR5cGVvZiB2YWx1ZSA9PSAndW5kZWZpbmVkJyAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgICAgb2JqZWN0W2tleV0gPSByZXN1bHQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUFzc2lnbjtcbiIsIi8qKlxuICogQ29waWVzIHRoZSBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gY29weS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDb3B5KHNvdXJjZSwgb2JqZWN0LCBwcm9wcykge1xuICBpZiAoIXByb3BzKSB7XG4gICAgcHJvcHMgPSBvYmplY3Q7XG4gICAgb2JqZWN0ID0ge307XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIG9iamVjdFtrZXldID0gc291cmNlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ29weTtcbiIsInZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mbGF0dGVuYCB3aXRoIGFkZGVkIHN1cHBvcnQgZm9yIHJlc3RyaWN0aW5nXG4gKiBmbGF0dGVuaW5nIGFuZCBzcGVjaWZ5aW5nIHRoZSBzdGFydCBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGZsYXR0ZW4uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGZsYXR0ZW4uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1N0cmljdF0gUmVzdHJpY3QgZmxhdHRlbmluZyB0byBhcnJheXMgYW5kIGBhcmd1bWVudHNgIG9iamVjdHMuXG4gKiBAcGFyYW0ge251bWJlcn0gW2Zyb21JbmRleD0wXSBUaGUgaW5kZXggdG8gc3RhcnQgZnJvbS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZsYXR0ZW5lZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZUZsYXR0ZW4oYXJyYXksIGlzRGVlcCwgaXNTdHJpY3QsIGZyb21JbmRleCkge1xuICB2YXIgaW5kZXggPSAoZnJvbUluZGV4IHx8IDApIC0gMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc0luZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcblxuICAgIGlmIChpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgKGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSkpIHtcbiAgICAgIGlmIChpc0RlZXApIHtcbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgZmxhdHRlbiBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgICAgdmFsdWUgPSBiYXNlRmxhdHRlbih2YWx1ZSwgaXNEZWVwLCBpc1N0cmljdCk7XG4gICAgICB9XG4gICAgICB2YXIgdmFsSW5kZXggPSAtMSxcbiAgICAgICAgICB2YWxMZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG5cbiAgICAgIHJlc3VsdC5sZW5ndGggKz0gdmFsTGVuZ3RoO1xuICAgICAgd2hpbGUgKCsrdmFsSW5kZXggPCB2YWxMZW5ndGgpIHtcbiAgICAgICAgcmVzdWx0WysrcmVzSW5kZXhdID0gdmFsdWVbdmFsSW5kZXhdO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWlzU3RyaWN0KSB7XG4gICAgICByZXN1bHRbKytyZXNJbmRleF0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRmxhdHRlbjtcbiIsInZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vdG9PYmplY3QnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvckluYCBhbmQgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBvYmplY3RgIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBpbnZva2luZyBgaXRlcmF0ZWVgIGZvclxuICogZWFjaCBwcm9wZXJ0eS4gSXRlcmF0b3IgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5XG4gKiByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGl0ZXJhYmxlID0gdG9PYmplY3Qob2JqZWN0KSxcbiAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvcjtcbiIsInZhciBiYXNlRm9yID0gcmVxdWlyZSgnLi9iYXNlRm9yJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvckluYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9ySW4ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzSW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3JJbjtcbiIsInZhciBiYXNlRm9yID0gcmVxdWlyZSgnLi9iYXNlRm9yJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvck93bjtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNGdW5jdGlvbmAgd2l0aG91dCBzdXBwb3J0IGZvciBlbnZpcm9ubWVudHNcbiAqIHdpdGggaW5jb3JyZWN0IGB0eXBlb2ZgIHJlc3VsdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBDaGFrcmEgSklUIGJ1ZyBpbiBjb21wYXRpYmlsaXR5IG1vZGVzIG9mIElFIDExLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy91bmRlcnNjb3JlL2lzc3Vlcy8xNjIxIGZvciBtb3JlIGRldGFpbHMuXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJyB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNGdW5jdGlvbjtcbiIsInZhciBhcnJheUVhY2ggPSByZXF1aXJlKCcuL2FycmF5RWFjaCcpLFxuICAgIGJhc2VGb3JPd24gPSByZXF1aXJlKCcuL2Jhc2VGb3JPd24nKSxcbiAgICBiYXNlTWVyZ2VEZWVwID0gcmVxdWlyZSgnLi9iYXNlTWVyZ2VEZWVwJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1R5cGVkQXJyYXknKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tZXJnZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhcmd1bWVudCBqdWdnbGluZyxcbiAqIG11bHRpcGxlIHNvdXJjZXMsIGFuZCBgdGhpc2AgYmluZGluZyBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgbWVyZ2luZyBwcm9wZXJ0aWVzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQT1bXV0gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0I9W11dIEFzc29jaWF0ZXMgdmFsdWVzIHdpdGggc291cmNlIGNvdW50ZXJwYXJ0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQikge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIHZhciBpc1NyY0FyciA9IGlzTGVuZ3RoKHNvdXJjZS5sZW5ndGgpICYmIChpc0FycmF5KHNvdXJjZSkgfHwgaXNUeXBlZEFycmF5KHNvdXJjZSkpO1xuICAoaXNTcmNBcnIgPyBhcnJheUVhY2ggOiBiYXNlRm9yT3duKShzb3VyY2UsIGZ1bmN0aW9uKHNyY1ZhbHVlLCBrZXksIHNvdXJjZSkge1xuICAgIGlmIChpc09iamVjdExpa2Uoc3JjVmFsdWUpKSB7XG4gICAgICBzdGFja0EgfHwgKHN0YWNrQSA9IFtdKTtcbiAgICAgIHN0YWNrQiB8fCAoc3RhY2tCID0gW10pO1xuICAgICAgcmV0dXJuIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgYmFzZU1lcmdlLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQik7XG4gICAgfVxuICAgIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICByZXN1bHQgPSBjdXN0b21pemVyID8gY3VzdG9taXplcih2YWx1ZSwgc3JjVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpIDogdW5kZWZpbmVkLFxuICAgICAgICBpc0NvbW1vbiA9IHR5cGVvZiByZXN1bHQgPT0gJ3VuZGVmaW5lZCc7XG5cbiAgICBpZiAoaXNDb21tb24pIHtcbiAgICAgIHJlc3VsdCA9IHNyY1ZhbHVlO1xuICAgIH1cbiAgICBpZiAoKGlzU3JjQXJyIHx8IHR5cGVvZiByZXN1bHQgIT0gJ3VuZGVmaW5lZCcpICYmXG4gICAgICAgIChpc0NvbW1vbiB8fCAocmVzdWx0ID09PSByZXN1bHQgPyByZXN1bHQgIT09IHZhbHVlIDogdmFsdWUgPT09IHZhbHVlKSkpIHtcbiAgICAgIG9iamVjdFtrZXldID0gcmVzdWx0O1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1lcmdlO1xuIiwidmFyIGFycmF5Q29weSA9IHJlcXVpcmUoJy4vYXJyYXlDb3B5JyksXG4gICAgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGlzUGxhaW5PYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzUGxhaW5PYmplY3QnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzVHlwZWRBcnJheScpLFxuICAgIHRvUGxhaW5PYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL3RvUGxhaW5PYmplY3QnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VNZXJnZWAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBtZXJnZXMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgbWVyZ2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBtZXJnZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1lcmdlRnVuYyBUaGUgZnVuY3Rpb24gdG8gbWVyZ2UgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgbWVyZ2luZyBwcm9wZXJ0aWVzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQT1bXV0gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0I9W11dIEFzc29jaWF0ZXMgdmFsdWVzIHdpdGggc291cmNlIGNvdW50ZXJwYXJ0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIG1lcmdlRnVuYywgY3VzdG9taXplciwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIGxlbmd0aCA9IHN0YWNrQS5sZW5ndGgsXG4gICAgICBzcmNWYWx1ZSA9IHNvdXJjZVtrZXldO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChzdGFja0FbbGVuZ3RoXSA9PSBzcmNWYWx1ZSkge1xuICAgICAgb2JqZWN0W2tleV0gPSBzdGFja0JbbGVuZ3RoXTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgdmFyIHZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICByZXN1bHQgPSBjdXN0b21pemVyID8gY3VzdG9taXplcih2YWx1ZSwgc3JjVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpIDogdW5kZWZpbmVkLFxuICAgICAgaXNDb21tb24gPSB0eXBlb2YgcmVzdWx0ID09ICd1bmRlZmluZWQnO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIHJlc3VsdCA9IHNyY1ZhbHVlO1xuICAgIGlmIChpc0xlbmd0aChzcmNWYWx1ZS5sZW5ndGgpICYmIChpc0FycmF5KHNyY1ZhbHVlKSB8fCBpc1R5cGVkQXJyYXkoc3JjVmFsdWUpKSkge1xuICAgICAgcmVzdWx0ID0gaXNBcnJheSh2YWx1ZSlcbiAgICAgICAgPyB2YWx1ZVxuICAgICAgICA6ICh2YWx1ZSA/IGFycmF5Q29weSh2YWx1ZSkgOiBbXSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3Qoc3JjVmFsdWUpIHx8IGlzQXJndW1lbnRzKHNyY1ZhbHVlKSkge1xuICAgICAgcmVzdWx0ID0gaXNBcmd1bWVudHModmFsdWUpXG4gICAgICAgID8gdG9QbGFpbk9iamVjdCh2YWx1ZSlcbiAgICAgICAgOiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkgPyB2YWx1ZSA6IHt9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICAvLyBBZGQgdGhlIHNvdXJjZSB2YWx1ZSB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMgYW5kIGFzc29jaWF0ZVxuICAvLyBpdCB3aXRoIGl0cyBtZXJnZWQgdmFsdWUuXG4gIHN0YWNrQS5wdXNoKHNyY1ZhbHVlKTtcbiAgc3RhY2tCLnB1c2gocmVzdWx0KTtcblxuICBpZiAoaXNDb21tb24pIHtcbiAgICAvLyBSZWN1cnNpdmVseSBtZXJnZSBvYmplY3RzIGFuZCBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBvYmplY3Rba2V5XSA9IG1lcmdlRnVuYyhyZXN1bHQsIHNyY1ZhbHVlLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQik7XG4gIH0gZWxzZSBpZiAocmVzdWx0ID09PSByZXN1bHQgPyByZXN1bHQgIT09IHZhbHVlIDogdmFsdWUgPT09IHZhbHVlKSB7XG4gICAgb2JqZWN0W2tleV0gPSByZXN1bHQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWVyZ2VEZWVwO1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0IGlzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVRvU3RyaW5nO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy52YWx1ZXNgIGFuZCBgXy52YWx1ZXNJbmAgd2hpY2ggY3JlYXRlcyBhblxuICogYXJyYXkgb2YgYG9iamVjdGAgcHJvcGVydHkgdmFsdWVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHByb3BlcnR5IG5hbWVzXG4gKiByZXR1cm5lZCBieSBga2V5c0Z1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gZ2V0IHZhbHVlcyBmb3IuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VWYWx1ZXMob2JqZWN0LCBwcm9wcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gb2JqZWN0W3Byb3BzW2luZGV4XV07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVmFsdWVzO1xuIiwidmFyIGlkZW50aXR5ID0gcmVxdWlyZSgnLi4vdXRpbGl0eS9pZGVudGl0eScpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUNhbGxiYWNrYCB3aGljaCBvbmx5IHN1cHBvcnRzIGB0aGlzYCBiaW5kaW5nXG4gKiBhbmQgc3BlY2lmeWluZyB0aGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYmluZC5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtudW1iZXJ9IFthcmdDb3VudF0gVGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhbGxiYWNrLlxuICovXG5mdW5jdGlvbiBiaW5kQ2FsbGJhY2soZnVuYywgdGhpc0FyZywgYXJnQ291bnQpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHR5cGVvZiB0aGlzQXJnID09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH1cbiAgc3dpdGNoIChhcmdDb3VudCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA0OiByZXR1cm4gZnVuY3Rpb24oYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmluZENhbGxiYWNrO1xuIiwidmFyIGJpbmRDYWxsYmFjayA9IHJlcXVpcmUoJy4vYmluZENhbGxiYWNrJyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCcuL2lzSXRlcmF0ZWVDYWxsJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgYXNzaWducyBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3QocykgdG8gYSBnaXZlblxuICogZGVzdGluYXRpb24gb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhc3NpZ25lciBUaGUgZnVuY3Rpb24gdG8gYXNzaWduIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVBc3NpZ25lcihhc3NpZ25lcikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG4gICAgICAgIG9iamVjdCA9IGFyZ3VtZW50c1swXTtcblxuICAgIGlmIChsZW5ndGggPCAyIHx8IG9iamVjdCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgICBpZiAobGVuZ3RoID4gMyAmJiBpc0l0ZXJhdGVlQ2FsbChhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSwgYXJndW1lbnRzWzNdKSkge1xuICAgICAgbGVuZ3RoID0gMjtcbiAgICB9XG4gICAgLy8gSnVnZ2xlIGFyZ3VtZW50cy5cbiAgICBpZiAobGVuZ3RoID4gMyAmJiB0eXBlb2YgYXJndW1lbnRzW2xlbmd0aCAtIDJdID09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciBjdXN0b21pemVyID0gYmluZENhbGxiYWNrKGFyZ3VtZW50c1stLWxlbmd0aCAtIDFdLCBhcmd1bWVudHNbbGVuZ3RoLS1dLCA1KTtcbiAgICB9IGVsc2UgaWYgKGxlbmd0aCA+IDIgJiYgdHlwZW9mIGFyZ3VtZW50c1tsZW5ndGggLSAxXSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjdXN0b21pemVyID0gYXJndW1lbnRzWy0tbGVuZ3RoXTtcbiAgICB9XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGFzc2lnbmVyKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVBc3NpZ25lcjtcbiIsIi8qKlxuICogVXNlZCBhcyB0aGUgbWF4aW11bSBsZW5ndGggb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgdmFsdWUgPSArdmFsdWU7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbmRleDtcbiIsInZhciBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBwcm92aWRlZCBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInKSB7XG4gICAgdmFyIGxlbmd0aCA9IG9iamVjdC5sZW5ndGgsXG4gICAgICAgIHByZXJlcSA9IGlzTGVuZ3RoKGxlbmd0aCkgJiYgaXNJbmRleChpbmRleCwgbGVuZ3RoKTtcbiAgfSBlbHNlIHtcbiAgICBwcmVyZXEgPSB0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdDtcbiAgfVxuICBpZiAocHJlcmVxKSB7XG4gICAgdmFyIG90aGVyID0gb2JqZWN0W2luZGV4XTtcbiAgICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gdmFsdWUgPT09IG90aGVyIDogb3RoZXIgIT09IG90aGVyO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0l0ZXJhdGVlQ2FsbDtcbiIsIi8qKlxuICogVXNlZCBhcyB0aGUgbWF4aW11bSBsZW5ndGggb2YgYW4gYXJyYXktbGlrZSB2YWx1ZS5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1udW1iZXIubWF4X3NhZmVfaW50ZWdlcilcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2VkIG9uIEVTIGBUb0xlbmd0aGAuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGgpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTGVuZ3RoO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcbiIsInZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vdG9PYmplY3QnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ucGlja2AgdGhhdCBwaWNrcyBgb2JqZWN0YCBwcm9wZXJ0aWVzIHNwZWNpZmllZFxuICogYnkgdGhlIGBwcm9wc2AgYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gcGljay5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHBpY2tCeUFycmF5KG9iamVjdCwgcHJvcHMpIHtcbiAgb2JqZWN0ID0gdG9PYmplY3Qob2JqZWN0KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IHt9O1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgcmVzdWx0W2tleV0gPSBvYmplY3Rba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwaWNrQnlBcnJheTtcbiIsInZhciBiYXNlRm9ySW4gPSByZXF1aXJlKCcuL2Jhc2VGb3JJbicpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5waWNrYCB0aGF0IHBpY2tzIGBvYmplY3RgIHByb3BlcnRpZXMgYHByZWRpY2F0ZWBcbiAqIHJldHVybnMgdHJ1dGh5IGZvci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gcGlja0J5Q2FsbGJhY2sob2JqZWN0LCBwcmVkaWNhdGUpIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBiYXNlRm9ySW4ob2JqZWN0LCBmdW5jdGlvbih2YWx1ZSwga2V5LCBvYmplY3QpIHtcbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBrZXksIG9iamVjdCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwaWNrQnlDYWxsYmFjaztcbiIsInZhciBiYXNlRm9ySW4gPSByZXF1aXJlKCcuL2Jhc2VGb3JJbicpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQSBmYWxsYmFjayBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1BsYWluT2JqZWN0YCB3aGljaCBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIGhhcyBhIGBbW1Byb3RvdHlwZV1dYFxuICogb2YgYG51bGxgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHNoaW1Jc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHZhciBDdG9yO1xuXG4gIC8vIEV4aXQgZWFybHkgZm9yIG5vbiBgT2JqZWN0YCBvYmplY3RzLlxuICBpZiAoIShpc09iamVjdExpa2UodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IG9iamVjdFRhZykgfHxcbiAgICAgICghaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NvbnN0cnVjdG9yJykgJiZcbiAgICAgICAgKEN0b3IgPSB2YWx1ZS5jb25zdHJ1Y3RvciwgdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiAhKEN0b3IgaW5zdGFuY2VvZiBDdG9yKSkpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIElFIDwgOSBpdGVyYXRlcyBpbmhlcml0ZWQgcHJvcGVydGllcyBiZWZvcmUgb3duIHByb3BlcnRpZXMuIElmIHRoZSBmaXJzdFxuICAvLyBpdGVyYXRlZCBwcm9wZXJ0eSBpcyBhbiBvYmplY3QncyBvd24gcHJvcGVydHkgdGhlbiB0aGVyZSBhcmUgbm8gaW5oZXJpdGVkXG4gIC8vIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAgdmFyIHJlc3VsdDtcbiAgLy8gSW4gbW9zdCBlbnZpcm9ubWVudHMgYW4gb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMgYXJlIGl0ZXJhdGVkIGJlZm9yZVxuICAvLyBpdHMgaW5oZXJpdGVkIHByb3BlcnRpZXMuIElmIHRoZSBsYXN0IGl0ZXJhdGVkIHByb3BlcnR5IGlzIGFuIG9iamVjdCdzXG4gIC8vIG93biBwcm9wZXJ0eSB0aGVuIHRoZXJlIGFyZSBubyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICBiYXNlRm9ySW4odmFsdWUsIGZ1bmN0aW9uKHN1YlZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHQgPSBrZXk7XG4gIH0pO1xuICByZXR1cm4gdHlwZW9mIHJlc3VsdCA9PSAndW5kZWZpbmVkJyB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCByZXN1bHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoaW1Jc1BsYWluT2JqZWN0O1xuIiwidmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpLFxuICAgIHN1cHBvcnQgPSByZXF1aXJlKCcuLi9zdXBwb3J0Jyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgZmFsbGJhY2sgaW1wbGVtZW50YXRpb24gb2YgYE9iamVjdC5rZXlzYCB3aGljaCBjcmVhdGVzIGFuIGFycmF5IG9mIHRoZVxuICogb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gc2hpbUtleXMob2JqZWN0KSB7XG4gIHZhciBwcm9wcyA9IGtleXNJbihvYmplY3QpLFxuICAgICAgcHJvcHNMZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBwcm9wc0xlbmd0aCAmJiBvYmplY3QubGVuZ3RoO1xuXG4gIHZhciBhbGxvd0luZGV4ZXMgPSBsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgKHN1cHBvcnQubm9uRW51bUFyZ3MgJiYgaXNBcmd1bWVudHMob2JqZWN0KSkpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBwcm9wc0xlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKChhbGxvd0luZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpIHx8IGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoaW1LZXlzO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gb2JqZWN0IGlmIGl0IGlzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWx1ZSkgPyB2YWx1ZSA6IE9iamVjdCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9PYmplY3Q7XG4iLCJ2YXIgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICB2YXIgbGVuZ3RoID0gaXNPYmplY3RMaWtlKHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA6IHVuZGVmaW5lZDtcbiAgcmV0dXJuIChpc0xlbmd0aChsZW5ndGgpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJndW1lbnRzO1xuIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc05hdGl2ZSA9IHJlcXVpcmUoJy4vaXNOYXRpdmUnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNBcnJheSA9IGlzTmF0aXZlKG5hdGl2ZUlzQXJyYXkgPSBBcnJheS5pc0FycmF5KSAmJiBuYXRpdmVJc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gbmF0aXZlSXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcnJheVRhZykgfHwgZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG4iLCJ2YXIgYmFzZUlzRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlSXNGdW5jdGlvbicpLFxuICAgIGlzTmF0aXZlID0gcmVxdWlyZSgnLi9pc05hdGl2ZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIFVpbnQ4QXJyYXkgPSBpc05hdGl2ZShVaW50OEFycmF5ID0gZ2xvYmFsLlVpbnQ4QXJyYXkpICYmIFVpbnQ4QXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0Z1bmN0aW9uID0gIShiYXNlSXNGdW5jdGlvbigveC8pIHx8IChVaW50OEFycmF5ICYmICFiYXNlSXNGdW5jdGlvbihVaW50OEFycmF5KSkpID8gYmFzZUlzRnVuY3Rpb24gOiBmdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gb2xkZXIgdmVyc2lvbnMgb2YgQ2hyb21lIGFuZCBTYWZhcmkgd2hpY2ggcmV0dXJuICdmdW5jdGlvbicgZm9yIHJlZ2V4ZXNcbiAgLy8gYW5kIFNhZmFyaSA4IGVxdWl2YWxlbnRzIHdoaWNoIHJldHVybiAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgY29uc3RydWN0b3JzLlxuICByZXR1cm4gb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsInZhciBlc2NhcGVSZWdFeHAgPSByZXF1aXJlKCcuLi9zdHJpbmcvZXNjYXBlUmVnRXhwJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkgPiA1KS4gKi9cbnZhciByZUhvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChvYmpUb1N0cmluZylcbiAgLnJlcGxhY2UoL3RvU3RyaW5nfChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWcpIHtcbiAgICByZXR1cm4gcmVOYXRpdmUudGVzdChmblRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVIb3N0Q3Rvci50ZXN0KHZhbHVlKSkgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNOYXRpdmU7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBsYW5ndWFnZSB0eXBlIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogKipOb3RlOioqIFNlZSB0aGUgW0VTNSBzcGVjXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKHZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwidmFyIGlzTmF0aXZlID0gcmVxdWlyZSgnLi9pc05hdGl2ZScpLFxuICAgIHNoaW1Jc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvc2hpbUlzUGxhaW5PYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRQcm90b3R5cGVPZiA9IGlzTmF0aXZlKGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKSAmJiBnZXRQcm90b3R5cGVPZjtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGFzc3VtZXMgb2JqZWN0cyBjcmVhdGVkIGJ5IHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3RvclxuICogaGF2ZSBubyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG52YXIgaXNQbGFpbk9iamVjdCA9ICFnZXRQcm90b3R5cGVPZiA/IHNoaW1Jc1BsYWluT2JqZWN0IDogZnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKCEodmFsdWUgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gb2JqZWN0VGFnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdmFsdWVPZiA9IHZhbHVlLnZhbHVlT2YsXG4gICAgICBvYmpQcm90byA9IGlzTmF0aXZlKHZhbHVlT2YpICYmIChvYmpQcm90byA9IGdldFByb3RvdHlwZU9mKHZhbHVlT2YpKSAmJiBnZXRQcm90b3R5cGVPZihvYmpQcm90byk7XG5cbiAgcmV0dXJuIG9ialByb3RvXG4gICAgPyAodmFsdWUgPT0gb2JqUHJvdG8gfHwgZ2V0UHJvdG90eXBlT2YodmFsdWUpID09IG9ialByb3RvKVxuICAgIDogc2hpbUlzUGxhaW5PYmplY3QodmFsdWUpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc1BsYWluT2JqZWN0O1xuIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPSB0eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPSB0eXBlZEFycmF5VGFnc1ttYXBUYWddID1cbnR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID1cbnR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzZXRUYWddID1cbnR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPSB0eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgdHlwZWRBcnJheVRhZ3Nbb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSldKSB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG4iLCJ2YXIgYmFzZUNvcHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlQ29weScpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzSW4nKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgcGxhaW4gb2JqZWN0IGZsYXR0ZW5pbmcgaW5oZXJpdGVkIGVudW1lcmFibGVcbiAqIHByb3BlcnRpZXMgb2YgYHZhbHVlYCB0byBvd24gcHJvcGVydGllcyBvZiB0aGUgcGxhaW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBwbGFpbiBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIG5ldyBGb28pO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiB9XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgXy50b1BsYWluT2JqZWN0KG5ldyBGb28pKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMyB9XG4gKi9cbmZ1bmN0aW9uIHRvUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGJhc2VDb3B5KHZhbHVlLCBrZXlzSW4odmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1BsYWluT2JqZWN0O1xuIiwidmFyIGJhc2VBc3NpZ24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlQXNzaWduJyksXG4gICAgY3JlYXRlQXNzaWduZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9jcmVhdGVBc3NpZ25lcicpO1xuXG4vKipcbiAqIEFzc2lnbnMgb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0KHMpIHRvIHRoZSBkZXN0aW5hdGlvblxuICogb2JqZWN0LiBTdWJzZXF1ZW50IHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKiBJZiBgY3VzdG9taXplcmAgaXMgcHJvdmlkZWQgaXQgaXMgaW52b2tlZCB0byBwcm9kdWNlIHRoZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBUaGUgYGN1c3RvbWl6ZXJgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIGZpdmUgYXJndW1lbnRzO1xuICogKG9iamVjdFZhbHVlLCBzb3VyY2VWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyBleHRlbmRcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY3VzdG9taXplcmAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmFzc2lnbih7ICd1c2VyJzogJ2Jhcm5leScgfSwgeyAnYWdlJzogNDAgfSwgeyAndXNlcic6ICdmcmVkJyB9KTtcbiAqIC8vID0+IHsgJ3VzZXInOiAnZnJlZCcsICdhZ2UnOiA0MCB9XG4gKlxuICogLy8gdXNpbmcgYSBjdXN0b21pemVyIGNhbGxiYWNrXG4gKiB2YXIgZGVmYXVsdHMgPSBfLnBhcnRpYWxSaWdodChfLmFzc2lnbiwgZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gKiAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCcgPyBvdGhlciA6IHZhbHVlO1xuICogfSk7XG4gKlxuICogZGVmYXVsdHMoeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ2FnZSc6IDM2IH0sIHsgJ3VzZXInOiAnZnJlZCcgfSk7XG4gKiAvLyA9PiB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9XG4gKi9cbnZhciBhc3NpZ24gPSBjcmVhdGVBc3NpZ25lcihiYXNlQXNzaWduKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ247XG4iLCJ2YXIgYXJyYXlDb3B5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYXJyYXlDb3B5JyksXG4gICAgYXNzaWduID0gcmVxdWlyZSgnLi9hc3NpZ24nKSxcbiAgICBhc3NpZ25EZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Fzc2lnbkRlZmF1bHRzJyk7XG5cbi8qKlxuICogQXNzaWducyBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3QocykgdG8gdGhlIGRlc3RpbmF0aW9uXG4gKiBvYmplY3QgZm9yIGFsbCBkZXN0aW5hdGlvbiBwcm9wZXJ0aWVzIHRoYXQgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYC4gT25jZSBhXG4gKiBwcm9wZXJ0eSBpcyBzZXQsIGFkZGl0aW9uYWwgZGVmYXVsdHMgb2YgdGhlIHNhbWUgcHJvcGVydHkgYXJlIGlnbm9yZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZhdWx0cyh7ICd1c2VyJzogJ2Jhcm5leScgfSwgeyAnYWdlJzogMzYgfSwgeyAndXNlcic6ICdmcmVkJyB9KTtcbiAqIC8vID0+IHsgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM2IH1cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdHMob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgdmFyIGFyZ3MgPSBhcnJheUNvcHkoYXJndW1lbnRzKTtcbiAgYXJncy5wdXNoKGFzc2lnbkRlZmF1bHRzKTtcbiAgcmV0dXJuIGFzc2lnbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc05hdGl2ZSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNOYXRpdmUnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKSxcbiAgICBzaGltS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3NoaW1LZXlzJyk7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IGlzTmF0aXZlKG5hdGl2ZUtleXMgPSBPYmplY3Qua2V5cykgJiYgbmF0aXZlS2V5cztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xudmFyIGtleXMgPSAhbmF0aXZlS2V5cyA/IHNoaW1LZXlzIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIGlmIChvYmplY3QpIHtcbiAgICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDtcbiAgfVxuICBpZiAoKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCkgfHxcbiAgICAgKHR5cGVvZiBvYmplY3QgIT0gJ2Z1bmN0aW9uJyAmJiAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkpKSkge1xuICAgIHJldHVybiBzaGltS2V5cyhvYmplY3QpO1xuICB9XG4gIHJldHVybiBpc09iamVjdChvYmplY3QpID8gbmF0aXZlS2V5cyhvYmplY3QpIDogW107XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG4iLCJ2YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpLFxuICAgIHN1cHBvcnQgPSByZXF1aXJlKCcuLi9zdXBwb3J0Jyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gIGxlbmd0aCA9IChsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgKHN1cHBvcnQubm9uRW51bUFyZ3MgJiYgaXNBcmd1bWVudHMob2JqZWN0KSkpICYmIGxlbmd0aCkgfHwgMDtcblxuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBpc1Byb3RvID0gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0LFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgIHNraXBJbmRleGVzID0gbGVuZ3RoID4gMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSAoaW5kZXggKyAnJyk7XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKHNraXBJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSAmJlxuICAgICAgICAhKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNJbjtcbiIsInZhciBiYXNlTWVyZ2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlTWVyZ2UnKSxcbiAgICBjcmVhdGVBc3NpZ25lciA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NyZWF0ZUFzc2lnbmVyJyk7XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgbWVyZ2VzIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgdGhlIHNvdXJjZSBvYmplY3QocyksIHRoYXRcbiAqIGRvbid0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAgaW50byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LiBTdWJzZXF1ZW50IHNvdXJjZXNcbiAqIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLiBJZiBgY3VzdG9taXplcmAgaXNcbiAqIHByb3ZpZGVkIGl0IGlzIGludm9rZWQgdG8gcHJvZHVjZSB0aGUgbWVyZ2VkIHZhbHVlcyBvZiB0aGUgZGVzdGluYXRpb24gYW5kXG4gKiBzb3VyY2UgcHJvcGVydGllcy4gSWYgYGN1c3RvbWl6ZXJgIHJldHVybnMgYHVuZGVmaW5lZGAgbWVyZ2luZyBpcyBoYW5kbGVkXG4gKiBieSB0aGUgbWV0aG9kIGluc3RlYWQuIFRoZSBgY3VzdG9taXplcmAgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkXG4gKiB3aXRoIGZpdmUgYXJndW1lbnRzOyAob2JqZWN0VmFsdWUsIHNvdXJjZVZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnaW5nIHByb3BlcnRpZXMuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGN1c3RvbWl6ZXJgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHVzZXJzID0ge1xuICogICAnZGF0YSc6IFt7ICd1c2VyJzogJ2Jhcm5leScgfSwgeyAndXNlcic6ICdmcmVkJyB9XVxuICogfTtcbiAqXG4gKiB2YXIgYWdlcyA9IHtcbiAqICAgJ2RhdGEnOiBbeyAnYWdlJzogMzYgfSwgeyAnYWdlJzogNDAgfV1cbiAqIH07XG4gKlxuICogXy5tZXJnZSh1c2VycywgYWdlcyk7XG4gKiAvLyA9PiB7ICdkYXRhJzogW3sgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM2IH0sIHsgJ3VzZXInOiAnZnJlZCcsICdhZ2UnOiA0MCB9XSB9XG4gKlxuICogLy8gdXNpbmcgYSBjdXN0b21pemVyIGNhbGxiYWNrXG4gKiB2YXIgb2JqZWN0ID0ge1xuICogICAnZnJ1aXRzJzogWydhcHBsZSddLFxuICogICAndmVnZXRhYmxlcyc6IFsnYmVldCddXG4gKiB9O1xuICpcbiAqIHZhciBvdGhlciA9IHtcbiAqICAgJ2ZydWl0cyc6IFsnYmFuYW5hJ10sXG4gKiAgICd2ZWdldGFibGVzJzogWydjYXJyb3QnXVxuICogfTtcbiAqXG4gKiBfLm1lcmdlKG9iamVjdCwgb3RoZXIsIGZ1bmN0aW9uKGEsIGIpIHtcbiAqICAgaWYgKF8uaXNBcnJheShhKSkge1xuICogICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAqICAgfVxuICogfSk7XG4gKiAvLyA9PiB7ICdmcnVpdHMnOiBbJ2FwcGxlJywgJ2JhbmFuYSddLCAndmVnZXRhYmxlcyc6IFsnYmVldCcsICdjYXJyb3QnXSB9XG4gKi9cbnZhciBtZXJnZSA9IGNyZWF0ZUFzc2lnbmVyKGJhc2VNZXJnZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbWVyZ2U7XG4iLCJ2YXIgYmFzZUZsYXR0ZW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlRmxhdHRlbicpLFxuICAgIGJpbmRDYWxsYmFjayA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2JpbmRDYWxsYmFjaycpLFxuICAgIHBpY2tCeUFycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcGlja0J5QXJyYXknKSxcbiAgICBwaWNrQnlDYWxsYmFjayA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3BpY2tCeUNhbGxiYWNrJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBvYmplY3QgY29tcG9zZWQgb2YgdGhlIHBpY2tlZCBgb2JqZWN0YCBwcm9wZXJ0aWVzLiBQcm9wZXJ0eVxuICogbmFtZXMgbWF5IGJlIHNwZWNpZmllZCBhcyBpbmRpdmlkdWFsIGFyZ3VtZW50cyBvciBhcyBhcnJheXMgb2YgcHJvcGVydHlcbiAqIG5hbWVzLiBJZiBgcHJlZGljYXRlYCBpcyBwcm92aWRlZCBpdCBpcyBpbnZva2VkIGZvciBlYWNoIHByb3BlcnR5IG9mIGBvYmplY3RgXG4gKiBwaWNraW5nIHRoZSBwcm9wZXJ0aWVzIGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvci4gVGhlIHByZWRpY2F0ZSBpc1xuICogYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGtleSwgb2JqZWN0KS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb258Li4uKHN0cmluZ3xzdHJpbmdbXSl9IFtwcmVkaWNhdGVdIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlclxuICogIGl0ZXJhdGlvbiBvciBwcm9wZXJ0eSBuYW1lcyB0byBwaWNrLCBzcGVjaWZpZWQgYXMgaW5kaXZpZHVhbCBwcm9wZXJ0eVxuICogIG5hbWVzIG9yIGFycmF5cyBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgcHJlZGljYXRlYC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnLCAnYWdlJzogNDAgfTtcbiAqXG4gKiBfLnBpY2sob2JqZWN0LCAndXNlcicpO1xuICogLy8gPT4geyAndXNlcic6ICdmcmVkJyB9XG4gKlxuICogXy5waWNrKG9iamVjdCwgXy5pc1N0cmluZyk7XG4gKiAvLyA9PiB7ICd1c2VyJzogJ2ZyZWQnIH1cbiAqL1xuZnVuY3Rpb24gcGljayhvYmplY3QsIHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4ge307XG4gIH1cbiAgcmV0dXJuIHR5cGVvZiBwcmVkaWNhdGUgPT0gJ2Z1bmN0aW9uJ1xuICAgID8gcGlja0J5Q2FsbGJhY2sob2JqZWN0LCBiaW5kQ2FsbGJhY2socHJlZGljYXRlLCB0aGlzQXJnLCAzKSlcbiAgICA6IHBpY2tCeUFycmF5KG9iamVjdCwgYmFzZUZsYXR0ZW4oYXJndW1lbnRzLCBmYWxzZSwgZmFsc2UsIDEpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwaWNrO1xuIiwidmFyIGJhc2VWYWx1ZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlVmFsdWVzJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IHZhbHVlcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8udmFsdWVzKG5ldyBGb28pO1xuICogLy8gPT4gWzEsIDJdIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy52YWx1ZXMoJ2hpJyk7XG4gKiAvLyA9PiBbJ2gnLCAnaSddXG4gKi9cbmZ1bmN0aW9uIHZhbHVlcyhvYmplY3QpIHtcbiAgcmV0dXJuIGJhc2VWYWx1ZXMob2JqZWN0LCBrZXlzKG9iamVjdCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZhbHVlcztcbiIsInZhciBiYXNlVG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlVG9TdHJpbmcnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycy5cbiAqIFNlZSB0aGlzIFthcnRpY2xlIG9uIGBSZWdFeHBgIGNoYXJhY3RlcnNdKGh0dHA6Ly93d3cucmVndWxhci1leHByZXNzaW9ucy5pbmZvL2NoYXJhY3RlcnMuaHRtbCNzcGVjaWFsKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhcnMgPSAvWy4qKz9eJHt9KCl8W1xcXVxcL1xcXFxdL2csXG4gICAgcmVIYXNSZWdFeHBDaGFycyA9IFJlZ0V4cChyZVJlZ0V4cENoYXJzLnNvdXJjZSk7XG5cbi8qKlxuICogRXNjYXBlcyB0aGUgYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzIFwiXFxcIiwgXCJeXCIsIFwiJFwiLCBcIi5cIiwgXCJ8XCIsIFwiP1wiLCBcIipcIixcbiAqIFwiK1wiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIgYW5kIFwifVwiIGluIGBzdHJpbmdgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6Ly9sb2Rhc2hcXC5jb20vXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IGJhc2VUb1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1JlZ0V4cENoYXJzLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlUmVnRXhwQ2hhcnMsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVzY2FwZVJlZ0V4cDtcbiIsInZhciBpc05hdGl2ZSA9IHJlcXVpcmUoJy4vbGFuZy9pc05hdGl2ZScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgZnVuY3Rpb25zIGNvbnRhaW5pbmcgYSBgdGhpc2AgcmVmZXJlbmNlLiAqL1xudmFyIHJlVGhpcyA9IC9cXGJ0aGlzXFxiLztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBET00gc3VwcG9ydC4gKi9cbnZhciBkb2N1bWVudCA9IChkb2N1bWVudCA9IGdsb2JhbC53aW5kb3cpICYmIGRvY3VtZW50LmRvY3VtZW50O1xuXG4vKiogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQW4gb2JqZWN0IGVudmlyb25tZW50IGZlYXR1cmUgZmxhZ3MuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEB0eXBlIE9iamVjdFxuICovXG52YXIgc3VwcG9ydCA9IHt9O1xuXG4oZnVuY3Rpb24oeCkge1xuXG4gIC8qKlxuICAgKiBEZXRlY3QgaWYgZnVuY3Rpb25zIGNhbiBiZSBkZWNvbXBpbGVkIGJ5IGBGdW5jdGlvbiN0b1N0cmluZ2BcbiAgICogKGFsbCBidXQgRmlyZWZveCBPUyBjZXJ0aWZpZWQgYXBwcywgb2xkZXIgT3BlcmEgbW9iaWxlIGJyb3dzZXJzLCBhbmRcbiAgICogdGhlIFBsYXlTdGF0aW9uIDM7IGZvcmNlZCBgZmFsc2VgIGZvciBXaW5kb3dzIDggYXBwcykuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnN1cHBvcnRcbiAgICogQHR5cGUgYm9vbGVhblxuICAgKi9cbiAgc3VwcG9ydC5mdW5jRGVjb21wID0gIWlzTmF0aXZlKGdsb2JhbC5XaW5SVEVycm9yKSAmJiByZVRoaXMudGVzdChmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pO1xuXG4gIC8qKlxuICAgKiBEZXRlY3QgaWYgYEZ1bmN0aW9uI25hbWVgIGlzIHN1cHBvcnRlZCAoYWxsIGJ1dCBJRSkuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnN1cHBvcnRcbiAgICogQHR5cGUgYm9vbGVhblxuICAgKi9cbiAgc3VwcG9ydC5mdW5jTmFtZXMgPSB0eXBlb2YgRnVuY3Rpb24ubmFtZSA9PSAnc3RyaW5nJztcblxuICAvKipcbiAgICogRGV0ZWN0IGlmIHRoZSBET00gaXMgc3VwcG9ydGVkLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy5zdXBwb3J0XG4gICAqIEB0eXBlIGJvb2xlYW5cbiAgICovXG4gIHRyeSB7XG4gICAgc3VwcG9ydC5kb20gPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkubm9kZVR5cGUgPT09IDExO1xuICB9IGNhdGNoKGUpIHtcbiAgICBzdXBwb3J0LmRvbSA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVjdCBpZiBgYXJndW1lbnRzYCBvYmplY3QgaW5kZXhlcyBhcmUgbm9uLWVudW1lcmFibGUuXG4gICAqXG4gICAqIEluIEZpcmVmb3ggPCA0LCBJRSA8IDksIFBoYW50b21KUywgYW5kIFNhZmFyaSA8IDUuMSBgYXJndW1lbnRzYCBvYmplY3RcbiAgICogaW5kZXhlcyBhcmUgbm9uLWVudW1lcmFibGUuIENocm9tZSA8IDI1IGFuZCBOb2RlLmpzIDwgMC4xMS4wIHRyZWF0XG4gICAqIGBhcmd1bWVudHNgIG9iamVjdCBpbmRleGVzIGFzIG5vbi1lbnVtZXJhYmxlIGFuZCBmYWlsIGBoYXNPd25Qcm9wZXJ0eWBcbiAgICogY2hlY2tzIGZvciBpbmRleGVzIHRoYXQgZXhjZWVkIHRoZWlyIGZ1bmN0aW9uJ3MgZm9ybWFsIHBhcmFtZXRlcnMgd2l0aFxuICAgKiBhc3NvY2lhdGVkIHZhbHVlcyBvZiBgMGAuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnN1cHBvcnRcbiAgICogQHR5cGUgYm9vbGVhblxuICAgKi9cbiAgdHJ5IHtcbiAgICBzdXBwb3J0Lm5vbkVudW1BcmdzID0gIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgfSBjYXRjaChlKSB7XG4gICAgc3VwcG9ydC5ub25FbnVtQXJncyA9IHRydWU7XG4gIH1cbn0oMCwgMCkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN1cHBvcnQ7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IHByb3ZpZGVkIHRvIGl0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICpcbiAqIF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7XG4iLCIvKiBSaW90IHYyLjAuMTEsIEBsaWNlbnNlIE1JVCwgKGMpIDIwMTUgTXV1dCBJbmMuICsgY29udHJpYnV0b3JzICovXG5cbjsoZnVuY3Rpb24oKSB7XG5cbiAgdmFyIHJpb3QgPSB7IHZlcnNpb246ICd2Mi4wLjExJywgc2V0dGluZ3M6IHt9IH1cblxuICAndXNlIHN0cmljdCdcblxucmlvdC5vYnNlcnZhYmxlID0gZnVuY3Rpb24oZWwpIHtcblxuICBlbCA9IGVsIHx8IHt9XG5cbiAgdmFyIGNhbGxiYWNrcyA9IHt9LFxuICAgICAgX2lkID0gMFxuXG4gIGVsLm9uID0gZnVuY3Rpb24oZXZlbnRzLCBmbikge1xuICAgIGlmICh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZm4uX2lkID0gdHlwZW9mIGZuLl9pZCA9PSAndW5kZWZpbmVkJyA/IF9pZCsrIDogZm4uX2lkXG5cbiAgICAgIGV2ZW50cy5yZXBsYWNlKC9cXFMrL2csIGZ1bmN0aW9uKG5hbWUsIHBvcykge1xuICAgICAgICAoY2FsbGJhY2tzW25hbWVdID0gY2FsbGJhY2tzW25hbWVdIHx8IFtdKS5wdXNoKGZuKVxuICAgICAgICBmbi50eXBlZCA9IHBvcyA+IDBcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgZWwub2ZmID0gZnVuY3Rpb24oZXZlbnRzLCBmbikge1xuICAgIGlmIChldmVudHMgPT0gJyonKSBjYWxsYmFja3MgPSB7fVxuICAgIGVsc2Uge1xuICAgICAgZXZlbnRzLnJlcGxhY2UoL1xcUysvZywgZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICB2YXIgYXJyID0gY2FsbGJhY2tzW25hbWVdXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGNiOyAoY2IgPSBhcnIgJiYgYXJyW2ldKTsgKytpKSB7XG4gICAgICAgICAgICBpZiAoY2IuX2lkID09IGZuLl9pZCkgeyBhcnIuc3BsaWNlKGksIDEpOyBpLS0gfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFja3NbbmFtZV0gPSBbXVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIC8vIG9ubHkgc2luZ2xlIGV2ZW50IHN1cHBvcnRlZFxuICBlbC5vbmUgPSBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgIGlmIChmbikgZm4ub25lID0gMVxuICAgIHJldHVybiBlbC5vbihuYW1lLCBmbilcbiAgfVxuXG4gIGVsLnRyaWdnZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgIGZucyA9IGNhbGxiYWNrc1tuYW1lXSB8fCBbXVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGZuOyAoZm4gPSBmbnNbaV0pOyArK2kpIHtcbiAgICAgIGlmICghZm4uYnVzeSkge1xuICAgICAgICBmbi5idXN5ID0gMVxuICAgICAgICBmbi5hcHBseShlbCwgZm4udHlwZWQgPyBbbmFtZV0uY29uY2F0KGFyZ3MpIDogYXJncylcbiAgICAgICAgaWYgKGZuLm9uZSkgeyBmbnMuc3BsaWNlKGksIDEpOyBpLS0gfVxuICAgICAgICAgZWxzZSBpZiAoZm5zW2ldICE9PSBmbikgeyBpLS0gfSAvLyBNYWtlcyBzZWxmLXJlbW92YWwgcG9zc2libGUgZHVyaW5nIGl0ZXJhdGlvblxuICAgICAgICBmbi5idXN5ID0gMFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgcmV0dXJuIGVsXG5cbn1cbjsoZnVuY3Rpb24ocmlvdCwgZXZ0KSB7XG5cbiAgLy8gYnJvd3NlcnMgb25seVxuICBpZiAoIXRoaXMudG9wKSByZXR1cm5cblxuICB2YXIgbG9jID0gbG9jYXRpb24sXG4gICAgICBmbnMgPSByaW90Lm9ic2VydmFibGUoKSxcbiAgICAgIHdpbiA9IHdpbmRvdyxcbiAgICAgIGN1cnJlbnRcblxuICBmdW5jdGlvbiBoYXNoKCkge1xuICAgIHJldHVybiBsb2MuaGFzaC5zbGljZSgxKVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VyKHBhdGgpIHtcbiAgICByZXR1cm4gcGF0aC5zcGxpdCgnLycpXG4gIH1cblxuICBmdW5jdGlvbiBlbWl0KHBhdGgpIHtcbiAgICBpZiAocGF0aC50eXBlKSBwYXRoID0gaGFzaCgpXG5cbiAgICBpZiAocGF0aCAhPSBjdXJyZW50KSB7XG4gICAgICBmbnMudHJpZ2dlci5hcHBseShudWxsLCBbJ0gnXS5jb25jYXQocGFyc2VyKHBhdGgpKSlcbiAgICAgIGN1cnJlbnQgPSBwYXRoXG4gICAgfVxuICB9XG5cbiAgdmFyIHIgPSByaW90LnJvdXRlID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgLy8gc3RyaW5nXG4gICAgaWYgKGFyZ1swXSkge1xuICAgICAgbG9jLmhhc2ggPSBhcmdcbiAgICAgIGVtaXQoYXJnKVxuXG4gICAgLy8gZnVuY3Rpb25cbiAgICB9IGVsc2Uge1xuICAgICAgZm5zLm9uKCdIJywgYXJnKVxuICAgIH1cbiAgfVxuXG4gIHIuZXhlYyA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgZm4uYXBwbHkobnVsbCwgcGFyc2VyKGhhc2goKSkpXG4gIH1cblxuICByLnBhcnNlciA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgcGFyc2VyID0gZm5cbiAgfVxuXG4gIHdpbi5hZGRFdmVudExpc3RlbmVyID8gd2luLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBlbWl0LCBmYWxzZSkgOiB3aW4uYXR0YWNoRXZlbnQoJ29uJyArIGV2dCwgZW1pdClcblxufSkocmlvdCwgJ2hhc2hjaGFuZ2UnKVxuLypcblxuLy8vLyBIb3cgaXQgd29ya3M/XG5cblxuVGhyZWUgd2F5czpcblxuMS4gRXhwcmVzc2lvbnM6IHRtcGwoJ3sgdmFsdWUgfScsIGRhdGEpLlxuICAgUmV0dXJucyB0aGUgcmVzdWx0IG9mIGV2YWx1YXRlZCBleHByZXNzaW9uIGFzIGEgcmF3IG9iamVjdC5cblxuMi4gVGVtcGxhdGVzOiB0bXBsKCdIaSB7IG5hbWUgfSB7IHN1cm5hbWUgfScsIGRhdGEpLlxuICAgUmV0dXJucyBhIHN0cmluZyB3aXRoIGV2YWx1YXRlZCBleHByZXNzaW9ucy5cblxuMy4gRmlsdGVyczogdG1wbCgneyBzaG93OiAhZG9uZSwgaGlnaGxpZ2h0OiBhY3RpdmUgfScsIGRhdGEpLlxuICAgUmV0dXJucyBhIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIHRydWVpc2gga2V5cyAobWFpbmx5XG4gICB1c2VkIGZvciBzZXR0aW5nIGh0bWwgY2xhc3NlcyksIGUuZy4gXCJzaG93IGhpZ2hsaWdodFwiLlxuXG5cbi8vIFRlbXBsYXRlIGV4YW1wbGVzXG5cbnRtcGwoJ3sgdGl0bGUgfHwgXCJVbnRpdGxlZFwiIH0nLCBkYXRhKVxudG1wbCgnUmVzdWx0cyBhcmUgeyByZXN1bHRzID8gXCJyZWFkeVwiIDogXCJsb2FkaW5nXCIgfScsIGRhdGEpXG50bXBsKCdUb2RheSBpcyB7IG5ldyBEYXRlKCkgfScsIGRhdGEpXG50bXBsKCd7IG1lc3NhZ2UubGVuZ3RoID4gMTQwICYmIFwiTWVzc2FnZSBpcyB0b28gbG9uZ1wiIH0nLCBkYXRhKVxudG1wbCgnVGhpcyBpdGVtIGdvdCB7IE1hdGgucm91bmQocmF0aW5nKSB9IHN0YXJzJywgZGF0YSlcbnRtcGwoJzxoMT57IHRpdGxlIH08L2gxPnsgYm9keSB9JywgZGF0YSlcblxuXG4vLyBGYWxzeSBleHByZXNzaW9ucyBpbiB0ZW1wbGF0ZXNcblxuSW4gdGVtcGxhdGVzIChhcyBvcHBvc2VkIHRvIHNpbmdsZSBleHByZXNzaW9ucykgYWxsIGZhbHN5IHZhbHVlc1xuZXhjZXB0IHplcm8gKHVuZGVmaW5lZC9udWxsL2ZhbHNlKSB3aWxsIGRlZmF1bHQgdG8gZW1wdHkgc3RyaW5nOlxuXG50bXBsKCd7IHVuZGVmaW5lZCB9IC0geyBmYWxzZSB9IC0geyBudWxsIH0gLSB7IDAgfScsIHt9KVxuLy8gd2lsbCByZXR1cm46IFwiIC0gLSAtIDBcIlxuXG4qL1xuXG5cbnZhciBicmFja2V0cyA9IChmdW5jdGlvbihvcmlnLCBzLCBiKSB7XG4gIHJldHVybiBmdW5jdGlvbih4KSB7XG5cbiAgICAvLyBtYWtlIHN1cmUgd2UgdXNlIHRoZSBjdXJyZW50IHNldHRpbmdcbiAgICBzID0gcmlvdC5zZXR0aW5ncy5icmFja2V0cyB8fCBvcmlnXG4gICAgaWYgKGIgIT0gcykgYiA9IHMuc3BsaXQoJyAnKVxuXG4gICAgLy8gaWYgcmVnZXhwIGdpdmVuLCByZXdyaXRlIGl0IHdpdGggY3VycmVudCBicmFja2V0cyAob25seSBpZiBkaWZmZXIgZnJvbSBkZWZhdWx0KVxuICAgIC8vIGVsc2UsIGdldCBicmFja2V0c1xuICAgIHJldHVybiB4ICYmIHgudGVzdFxuICAgICAgPyBzID09IG9yaWdcbiAgICAgICAgPyB4IDogUmVnRXhwKHguc291cmNlXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcey9nLCBiWzBdLnJlcGxhY2UoLyg/PS4pL2csICdcXFxcJykpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcfS9nLCBiWzFdLnJlcGxhY2UoLyg/PS4pL2csICdcXFxcJykpLFxuICAgICAgICAgICAgICAgICAgICB4Lmdsb2JhbCA/ICdnJyA6ICcnKVxuICAgICAgOiBiW3hdXG5cbiAgfVxufSkoJ3sgfScpXG5cblxudmFyIHRtcGwgPSAoZnVuY3Rpb24oKSB7XG5cbiAgdmFyIGNhY2hlID0ge30sXG4gICAgICByZV9leHByID0gLyh7W1xcc1xcU10qP30pLyxcbiAgICAgIHJlX3ZhcnMgPSAvKFsnXCJcXC9dKS4qP1teXFxcXF1cXDF8XFwuXFx3KnxcXHcqOnxcXGIoPzooPzpuZXd8dHlwZW9mfGlufGluc3RhbmNlb2YpIHwoPzp0aGlzfHRydWV8ZmFsc2V8bnVsbHx1bmRlZmluZWQpXFxifGZ1bmN0aW9uICpcXCgpfChbYS16X11cXHcqKS9naVxuICAgICAgICAgICAgICAvLyBbIDEgICAgICAgICAgICAgICBdWyAyICBdWyAzIF1bIDQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVsgNSAgICAgICBdXG4gICAgICAgICAgICAgIC8vIGZpbmQgdmFyaWFibGUgbmFtZXM6XG4gICAgICAgICAgICAgIC8vIDEuIHNraXAgcXVvdGVkIHN0cmluZ3MgYW5kIHJlZ2V4cHM6IFwiYSBiXCIsICdhIGInLCAnYSBcXCdiXFwnJywgL2EgYi9cbiAgICAgICAgICAgICAgLy8gMi4gc2tpcCBvYmplY3QgcHJvcGVydGllczogLm5hbWVcbiAgICAgICAgICAgICAgLy8gMy4gc2tpcCBvYmplY3QgbGl0ZXJhbHM6IG5hbWU6XG4gICAgICAgICAgICAgIC8vIDQuIHNraXAgamF2YXNjcmlwdCBrZXl3b3Jkc1xuICAgICAgICAgICAgICAvLyA1LiBtYXRjaCB2YXIgbmFtZVxuXG4gIC8vIGJ1aWxkIGEgdGVtcGxhdGUgKG9yIGdldCBpdCBmcm9tIGNhY2hlKSwgcmVuZGVyIHdpdGggZGF0YVxuICByZXR1cm4gZnVuY3Rpb24oc3RyLCBkYXRhKSB7XG4gICAgcmV0dXJuIHN0ciAmJiAoY2FjaGVbc3RyXSA9IGNhY2hlW3N0cl0gfHwgdG1wbChzdHIpKShkYXRhKVxuICB9XG5cblxuICAvLyBjcmVhdGUgYSB0ZW1wbGF0ZSBpbnN0YW5jZVxuXG4gIGZ1bmN0aW9uIHRtcGwocywgcCkge1xuXG4gICAgLy8gZGVmYXVsdCB0ZW1wbGF0ZSBzdHJpbmcgdG8ge31cbiAgICBwID0gKHMgfHwgKGJyYWNrZXRzKDApICsgYnJhY2tldHMoMSkpKVxuXG4gICAgICAvLyB0ZW1wb3JhcmlseSBjb252ZXJ0IFxceyBhbmQgXFx9IHRvIGEgbm9uLWNoYXJhY3RlclxuICAgICAgLnJlcGxhY2UoYnJhY2tldHMoL1xcXFx7LyksICdcXHVGRkYwJylcbiAgICAgIC5yZXBsYWNlKGJyYWNrZXRzKC9cXFxcfS8pLCAnXFx1RkZGMScpXG5cbiAgICAgIC8vIHNwbGl0IHN0cmluZyB0byBleHByZXNzaW9uIGFuZCBub24tZXhwcmVzaW9uIHBhcnRzXG4gICAgICAuc3BsaXQoYnJhY2tldHMocmVfZXhwcikpXG5cbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdkJywgJ3JldHVybiAnICsgKFxuXG4gICAgICAvLyBpcyBpdCBhIHNpbmdsZSBleHByZXNzaW9uIG9yIGEgdGVtcGxhdGU/IGkuZS4ge3h9IG9yIDxiPnt4fTwvYj5cbiAgICAgICFwWzBdICYmICFwWzJdICYmICFwWzNdXG5cbiAgICAgICAgLy8gaWYgZXhwcmVzc2lvbiwgZXZhbHVhdGUgaXRcbiAgICAgICAgPyBleHByKHBbMV0pXG5cbiAgICAgICAgLy8gaWYgdGVtcGxhdGUsIGV2YWx1YXRlIGFsbCBleHByZXNzaW9ucyBpbiBpdFxuICAgICAgICA6ICdbJyArIHAubWFwKGZ1bmN0aW9uKHMsIGkpIHtcblxuICAgICAgICAgICAgLy8gaXMgaXQgYW4gZXhwcmVzc2lvbiBvciBhIHN0cmluZyAoZXZlcnkgc2Vjb25kIHBhcnQgaXMgYW4gZXhwcmVzc2lvbilcbiAgICAgICAgICByZXR1cm4gaSAlIDJcblxuICAgICAgICAgICAgICAvLyBldmFsdWF0ZSB0aGUgZXhwcmVzc2lvbnNcbiAgICAgICAgICAgICAgPyBleHByKHMsIDEpXG5cbiAgICAgICAgICAgICAgLy8gcHJvY2VzcyBzdHJpbmcgcGFydHMgb2YgdGhlIHRlbXBsYXRlOlxuICAgICAgICAgICAgICA6ICdcIicgKyBzXG5cbiAgICAgICAgICAgICAgICAgIC8vIHByZXNlcnZlIG5ldyBsaW5lc1xuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKVxuXG4gICAgICAgICAgICAgICAgICAvLyBlc2NhcGUgcXVvdGVzXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpXG5cbiAgICAgICAgICAgICAgICArICdcIidcblxuICAgICAgICB9KS5qb2luKCcsJykgKyAnXS5qb2luKFwiXCIpJ1xuICAgICAgKVxuXG4gICAgICAvLyBicmluZyBlc2NhcGVkIHsgYW5kIH0gYmFja1xuICAgICAgLnJlcGxhY2UoL1xcdUZGRjAvZywgYnJhY2tldHMoMCkpXG4gICAgICAucmVwbGFjZSgvXFx1RkZGMS9nLCBicmFja2V0cygxKSlcblxuICAgICsgJzsnKVxuXG4gIH1cblxuXG4gIC8vIHBhcnNlIHsgLi4uIH0gZXhwcmVzc2lvblxuXG4gIGZ1bmN0aW9uIGV4cHIocywgbikge1xuICAgIHMgPSBzXG5cbiAgICAgIC8vIGNvbnZlcnQgbmV3IGxpbmVzIHRvIHNwYWNlc1xuICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnICcpXG5cbiAgICAgIC8vIHRyaW0gd2hpdGVzcGFjZSwgY3VybHkgYnJhY2tldHMsIHN0cmlwIGNvbW1lbnRzXG4gICAgICAucmVwbGFjZShicmFja2V0cygvXlt7IF0rfFsgfV0rJHxcXC9cXCouKz9cXCpcXC8vZyksICcnKVxuXG4gICAgLy8gaXMgaXQgYW4gb2JqZWN0IGxpdGVyYWw/IGkuZS4geyBrZXkgOiB2YWx1ZSB9XG4gICAgcmV0dXJuIC9eXFxzKltcXHctIFwiJ10rICo6Ly50ZXN0KHMpXG5cbiAgICAgIC8vIGlmIG9iamVjdCBsaXRlcmFsLCByZXR1cm4gdHJ1ZWlzaCBrZXlzXG4gICAgICAvLyBlLmcuOiB7IHNob3c6IGlzT3BlbigpLCBkb25lOiBpdGVtLmRvbmUgfSAtPiBcInNob3cgZG9uZVwiXG4gICAgICA/ICdbJyArIHMucmVwbGFjZSgvXFxXKihbXFx3LSBdKylcXFcqOihbXixdKykvZywgZnVuY3Rpb24oXywgaywgdikge1xuXG4gICAgICAgIHJldHVybiB2LnJlcGxhY2UoL1teJnw9IT48XSsvZywgd3JhcCkgKyAnP1wiJyArIGsudHJpbSgpICsgJ1wiOlwiXCIsJ1xuXG4gICAgICB9KSArICddLmpvaW4oXCIgXCIpJ1xuXG4gICAgICAvLyBpZiBqcyBleHByZXNzaW9uLCBldmFsdWF0ZSBhcyBqYXZhc2NyaXB0XG4gICAgICA6IHdyYXAocywgbilcblxuICB9XG5cblxuICAvLyBleGVjdXRlIGpzIHcvbyBicmVha2luZyBvbiBlcnJvcnMgb3IgdW5kZWZpbmVkIHZhcnNcblxuICBmdW5jdGlvbiB3cmFwKHMsIG5vbnVsbCkge1xuICAgIHMgPSBzLnRyaW0oKVxuICAgIHJldHVybiAhcyA/ICcnIDogJyhmdW5jdGlvbih2KXt0cnl7dj0nXG5cbiAgICAgICAgLy8gcHJlZml4IHZhcnMgKG5hbWUgPT4gZGF0YS5uYW1lKVxuICAgICAgICArIChzLnJlcGxhY2UocmVfdmFycywgZnVuY3Rpb24ocywgXywgdikgeyByZXR1cm4gdiA/ICcoZC4nK3YrJz09PXVuZGVmaW5lZD93aW5kb3cuJyt2Kyc6ZC4nK3YrJyknIDogcyB9KVxuXG4gICAgICAgICAgLy8gYnJlYWsgdGhlIGV4cHJlc3Npb24gaWYgaXRzIGVtcHR5IChyZXN1bHRpbmcgaW4gdW5kZWZpbmVkIHZhbHVlKVxuICAgICAgICAgIHx8ICd4JylcblxuICAgICAgKyAnfWZpbmFsbHl7cmV0dXJuICdcblxuICAgICAgICAvLyBkZWZhdWx0IHRvIGVtcHR5IHN0cmluZyBmb3IgZmFsc3kgdmFsdWVzIGV4Y2VwdCB6ZXJvXG4gICAgICAgICsgKG5vbnVsbCA/ICchdiYmdiE9PTA/XCJcIjp2JyA6ICd2JylcblxuICAgICAgKyAnfX0pLmNhbGwoZCknXG4gIH1cblxufSkoKVxuLy8geyBrZXksIGkgaW4gaXRlbXN9IC0+IHsga2V5LCBpLCBpdGVtcyB9XG5mdW5jdGlvbiBsb29wS2V5cyhleHByKSB7XG4gIHZhciByZXQgPSB7IHZhbDogZXhwciB9LFxuICAgICAgZWxzID0gZXhwci5zcGxpdCgvXFxzK2luXFxzKy8pXG5cbiAgaWYgKGVsc1sxXSkge1xuICAgIHJldC52YWwgPSBicmFja2V0cygwKSArIGVsc1sxXVxuICAgIGVscyA9IGVsc1swXS5zbGljZShicmFja2V0cygwKS5sZW5ndGgpLnRyaW0oKS5zcGxpdCgvLFxccyovKVxuICAgIHJldC5rZXkgPSBlbHNbMF1cbiAgICByZXQucG9zID0gZWxzWzFdXG4gIH1cblxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIG1raXRlbShleHByLCBrZXksIHZhbCkge1xuICB2YXIgaXRlbSA9IHt9XG4gIGl0ZW1bZXhwci5rZXldID0ga2V5XG4gIGlmIChleHByLnBvcykgaXRlbVtleHByLnBvc10gPSB2YWxcbiAgcmV0dXJuIGl0ZW1cbn1cblxuXG4vKiBCZXdhcmU6IGhlYXZ5IHN0dWZmICovXG5mdW5jdGlvbiBfZWFjaChkb20sIHBhcmVudCwgZXhwcikge1xuXG4gIHJlbUF0dHIoZG9tLCAnZWFjaCcpXG5cbiAgdmFyIHRlbXBsYXRlID0gZG9tLm91dGVySFRNTCxcbiAgICAgIHByZXYgPSBkb20ucHJldmlvdXNTaWJsaW5nLFxuICAgICAgcm9vdCA9IGRvbS5wYXJlbnROb2RlLFxuICAgICAgcmVuZGVyZWQgPSBbXSxcbiAgICAgIHRhZ3MgPSBbXSxcbiAgICAgIGNoZWNrc3VtXG5cbiAgZXhwciA9IGxvb3BLZXlzKGV4cHIpXG5cbiAgZnVuY3Rpb24gYWRkKHBvcywgaXRlbSwgdGFnKSB7XG4gICAgcmVuZGVyZWQuc3BsaWNlKHBvcywgMCwgaXRlbSlcbiAgICB0YWdzLnNwbGljZShwb3MsIDAsIHRhZylcbiAgfVxuXG5cbiAgLy8gY2xlYW4gdGVtcGxhdGUgY29kZSBhZnRlciB1cGRhdGUgKGFuZCBsZXQgd2FsayBmaW5pc2ggaXQncyBwYXJzZSlcbiAgcGFyZW50Lm9uZSgndXBkYXRlJywgZnVuY3Rpb24oKSB7XG4gICAgcm9vdC5yZW1vdmVDaGlsZChkb20pXG5cbiAgfSkub25lKCdwcmVtb3VudCcsIGZ1bmN0aW9uKCkge1xuICAgIGlmIChyb290LnN0dWIpIHJvb3QgPSBwYXJlbnQucm9vdFxuXG4gIH0pLm9uKCd1cGRhdGUnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBpdGVtcyA9IHRtcGwoZXhwci52YWwsIHBhcmVudClcbiAgICBpZiAoIWl0ZW1zKSByZXR1cm5cblxuICAgIC8vIG9iamVjdCBsb29wLiBhbnkgY2hhbmdlcyBjYXVzZSBmdWxsIHJlZHJhd1xuICAgIGlmICghQXJyYXkuaXNBcnJheShpdGVtcykpIHtcbiAgICAgIHZhciB0ZXN0c3VtID0gSlNPTi5zdHJpbmdpZnkoaXRlbXMpXG4gICAgICBpZiAodGVzdHN1bSA9PSBjaGVja3N1bSkgcmV0dXJuXG4gICAgICBjaGVja3N1bSA9IHRlc3RzdW1cblxuICAgICAgLy8gY2xlYXIgb2xkIGl0ZW1zXG4gICAgICBlYWNoKHRhZ3MsIGZ1bmN0aW9uKHRhZykgeyB0YWcudW5tb3VudCgpIH0pXG4gICAgICByZW5kZXJlZCA9IFtdXG4gICAgICB0YWdzID0gW11cblxuICAgICAgaXRlbXMgPSBPYmplY3Qua2V5cyhpdGVtcykubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICByZXR1cm4gbWtpdGVtKGV4cHIsIGtleSwgaXRlbXNba2V5XSlcbiAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvLyB1bm1vdW50IHJlZHVuZGFudFxuICAgIGVhY2goYXJyRGlmZihyZW5kZXJlZCwgaXRlbXMpLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICB2YXIgcG9zID0gcmVuZGVyZWQuaW5kZXhPZihpdGVtKSxcbiAgICAgICAgICB0YWcgPSB0YWdzW3Bvc11cblxuICAgICAgaWYgKHRhZykge1xuICAgICAgICB0YWcudW5tb3VudCgpXG4gICAgICAgIHJlbmRlcmVkLnNwbGljZShwb3MsIDEpXG4gICAgICAgIHRhZ3Muc3BsaWNlKHBvcywgMSlcbiAgICAgIH1cblxuICAgIH0pXG5cbiAgICAvLyBtb3VudCBuZXcgLyByZW9yZGVyXG4gICAgdmFyIG5vZGVzID0gcm9vdC5jaGlsZE5vZGVzLFxuICAgICAgICBwcmV2X2luZGV4ID0gW10uaW5kZXhPZi5jYWxsKG5vZGVzLCBwcmV2KVxuXG4gICAgZWFjaChpdGVtcywgZnVuY3Rpb24oaXRlbSwgaSkge1xuXG4gICAgICAvLyBzdGFydCBpbmRleCBzZWFyY2ggZnJvbSBwb3NpdGlvbiBiYXNlZCBvbiB0aGUgY3VycmVudCBpXG4gICAgICB2YXIgcG9zID0gaXRlbXMuaW5kZXhPZihpdGVtLCBpKSxcbiAgICAgICAgICBvbGRQb3MgPSByZW5kZXJlZC5pbmRleE9mKGl0ZW0sIGkpXG5cbiAgICAgIC8vIGlmIG5vdCBmb3VuZCwgc2VhcmNoIGJhY2t3YXJkcyBmcm9tIGN1cnJlbnQgaSBwb3NpdGlvblxuICAgICAgcG9zIDwgMCAmJiAocG9zID0gaXRlbXMubGFzdEluZGV4T2YoaXRlbSwgaSkpXG4gICAgICBvbGRQb3MgPCAwICYmIChvbGRQb3MgPSByZW5kZXJlZC5sYXN0SW5kZXhPZihpdGVtLCBpKSlcblxuICAgICAgLy8gbW91bnQgbmV3XG4gICAgICBpZiAob2xkUG9zIDwgMCkge1xuICAgICAgICBpZiAoIWNoZWNrc3VtICYmIGV4cHIua2V5KSBpdGVtID0gbWtpdGVtKGV4cHIsIGl0ZW0sIHBvcylcblxuICAgICAgICB2YXIgdGFnID0gbmV3IFRhZyh7IHRtcGw6IHRlbXBsYXRlIH0sIHtcbiAgICAgICAgICBiZWZvcmU6IG5vZGVzW3ByZXZfaW5kZXggKyAxICsgcG9zXSxcbiAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgICByb290OiByb290LFxuICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBhZGQocG9zLCBpdGVtLCB0YWcpXG4gICAgICB9XG5cbiAgICAgIC8vIGNoYW5nZSBwb3MgdmFsdWVcbiAgICAgIGlmIChleHByLnBvcyAmJiB0YWdzW29sZFBvc11bZXhwci5wb3NdICE9IHBvcykge1xuICAgICAgICB0YWdzW29sZFBvc10ub25lKCd1cGRhdGUnLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgaXRlbVtleHByLnBvc10gPSBwb3NcbiAgICAgICAgfSlcbiAgICAgICAgdGFnc1tvbGRQb3NdLnVwZGF0ZSgpXG4gICAgICB9XG5cbiAgICAgIC8vIHJlb3JkZXJcbiAgICAgIGlmIChwb3MgIT0gb2xkUG9zKSB7XG4gICAgICAgIHJvb3QuaW5zZXJ0QmVmb3JlKG5vZGVzW3ByZXZfaW5kZXggKyBvbGRQb3MgKyAxXSwgbm9kZXNbcHJldl9pbmRleCArIHBvcyArIDFdKVxuICAgICAgICByZXR1cm4gYWRkKHBvcywgcmVuZGVyZWQuc3BsaWNlKG9sZFBvcywgMSlbMF0sIHRhZ3Muc3BsaWNlKG9sZFBvcywgMSlbMF0pXG4gICAgICB9XG5cbiAgICB9KVxuXG4gICAgcmVuZGVyZWQgPSBpdGVtcy5zbGljZSgpXG5cbiAgfSlcblxufVxuXG5mdW5jdGlvbiBwYXJzZU5hbWVkRWxlbWVudHMocm9vdCwgdGFnLCBleHByZXNzaW9ucykge1xuICB3YWxrKHJvb3QsIGZ1bmN0aW9uKGRvbSkge1xuICAgIGlmIChkb20ubm9kZVR5cGUgPT0gMSkge1xuICAgICAgZWFjaChkb20uYXR0cmlidXRlcywgZnVuY3Rpb24oYXR0cikge1xuICAgICAgICBpZiAoL14obmFtZXxpZCkkLy50ZXN0KGF0dHIubmFtZSkpIHRhZ1thdHRyLnZhbHVlXSA9IGRvbVxuICAgICAgfSlcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIHBhcnNlTGF5b3V0KHJvb3QsIHRhZywgZXhwcmVzc2lvbnMpIHtcblxuICBmdW5jdGlvbiBhZGRFeHByKGRvbSwgdmFsLCBleHRyYSkge1xuICAgIGlmICh2YWwuaW5kZXhPZihicmFja2V0cygwKSkgPj0gMCkge1xuICAgICAgdmFyIGV4cHIgPSB7IGRvbTogZG9tLCBleHByOiB2YWwgfVxuICAgICAgZXhwcmVzc2lvbnMucHVzaChleHRlbmQoZXhwciwgZXh0cmEpKVxuICAgIH1cbiAgfVxuXG4gIHdhbGsocm9vdCwgZnVuY3Rpb24oZG9tKSB7XG4gICAgdmFyIHR5cGUgPSBkb20ubm9kZVR5cGVcblxuICAgIC8vIHRleHQgbm9kZVxuICAgIGlmICh0eXBlID09IDMgJiYgZG9tLnBhcmVudE5vZGUudGFnTmFtZSAhPSAnU1RZTEUnKSBhZGRFeHByKGRvbSwgZG9tLm5vZGVWYWx1ZSlcbiAgICBpZiAodHlwZSAhPSAxKSByZXR1cm5cblxuICAgIC8qIGVsZW1lbnQgKi9cblxuICAgIC8vIGxvb3BcbiAgICB2YXIgYXR0ciA9IGRvbS5nZXRBdHRyaWJ1dGUoJ2VhY2gnKVxuICAgIGlmIChhdHRyKSB7IF9lYWNoKGRvbSwgdGFnLCBhdHRyKTsgcmV0dXJuIGZhbHNlIH1cblxuICAgIC8vIGF0dHJpYnV0ZSBleHByZXNzaW9uc1xuICAgIGVhY2goZG9tLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGF0dHIpIHtcbiAgICAgIHZhciBuYW1lID0gYXR0ci5uYW1lLFxuICAgICAgICAgIGJvb2wgPSBuYW1lLnNwbGl0KCdfXycpWzFdXG5cbiAgICAgIGFkZEV4cHIoZG9tLCBhdHRyLnZhbHVlLCB7IGF0dHI6IGJvb2wgfHwgbmFtZSwgYm9vbDogYm9vbCB9KVxuICAgICAgaWYgKGJvb2wpIHsgcmVtQXR0cihkb20sIG5hbWUpOyByZXR1cm4gZmFsc2UgfVxuXG4gICAgfSlcblxuICAgIC8vIGN1c3RvbSBjaGlsZCB0YWdcbiAgICB2YXIgaW1wbCA9IHRhZ19pbXBsW2RvbS50YWdOYW1lLnRvTG93ZXJDYXNlKCldXG5cbiAgICBpZiAoaW1wbCkge1xuICAgICAgaW1wbCA9IG5ldyBUYWcoaW1wbCwgeyByb290OiBkb20sIHBhcmVudDogdGFnIH0pXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgfSlcbn1cblxuZnVuY3Rpb24gVGFnKGltcGwsIGNvbmYpIHtcblxuICB2YXIgc2VsZiA9IHJpb3Qub2JzZXJ2YWJsZSh0aGlzKSxcbiAgICAgIG9wdHMgPSBpbmhlcml0KGNvbmYub3B0cykgfHwge30sXG4gICAgICBkb20gPSBta2RvbShpbXBsLnRtcGwpLFxuICAgICAgcGFyZW50ID0gY29uZi5wYXJlbnQsXG4gICAgICBpc19sb29wID0gY29uZi5sb29wLFxuICAgICAgZXhwcmVzc2lvbnMgPSBbXSxcbiAgICAgIHJvb3QgPSBjb25mLnJvb3QsXG4gICAgICBpdGVtID0gY29uZi5pdGVtLFxuICAgICAgYXR0ciA9IHt9LFxuICAgICAgbG9vcF9kb21cblxuICBleHRlbmQodGhpcywgeyBwYXJlbnQ6IHBhcmVudCwgcm9vdDogcm9vdCwgb3B0czogb3B0cyB9LCBpdGVtKVxuXG4gIC8vIGdyYWIgYXR0cmlidXRlc1xuICBlYWNoKHJvb3QuYXR0cmlidXRlcywgZnVuY3Rpb24oZWwpIHtcbiAgICBhdHRyW2VsLm5hbWVdID0gZWwudmFsdWVcbiAgfSlcblxuICAvLyBvcHRpb25zXG4gIGZ1bmN0aW9uIHVwZGF0ZU9wdHMocmVtX2F0dHIpIHtcbiAgICBlYWNoKE9iamVjdC5rZXlzKGF0dHIpLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBvcHRzW25hbWVdID0gdG1wbChhdHRyW25hbWVdLCBwYXJlbnQgfHwgc2VsZilcbiAgICB9KVxuICB9XG5cbiAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbihkYXRhLCBpbml0KSB7XG4gICAgZXh0ZW5kKHNlbGYsIGRhdGEsIGl0ZW0pXG4gICAgdXBkYXRlT3B0cygpXG4gICAgc2VsZi50cmlnZ2VyKCd1cGRhdGUnLCBpdGVtKVxuICAgIHVwZGF0ZShleHByZXNzaW9ucywgc2VsZiwgaXRlbSlcbiAgICBzZWxmLnRyaWdnZXIoJ3VwZGF0ZWQnKVxuICB9XG5cbiAgdGhpcy51bm1vdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsID0gaXNfbG9vcCA/IGxvb3BfZG9tIDogcm9vdCxcbiAgICAgICAgcCA9IGVsLnBhcmVudE5vZGVcblxuICAgIGlmIChwKSB7XG4gICAgICBpZiAocGFyZW50KSBwLnJlbW92ZUNoaWxkKGVsKVxuICAgICAgZWxzZSB3aGlsZSAocm9vdC5maXJzdENoaWxkKSByb290LnJlbW92ZUNoaWxkKHJvb3QuZmlyc3RDaGlsZClcbiAgICAgIHNlbGYudHJpZ2dlcigndW5tb3VudCcpXG4gICAgICBwYXJlbnQgJiYgcGFyZW50Lm9mZigndXBkYXRlJywgc2VsZi51cGRhdGUpLm9mZigndW5tb3VudCcsIHNlbGYudW5tb3VudClcbiAgICAgIHNlbGYub2ZmKCcqJylcbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuXG4gICAgLy8gaW50ZXJuYWwgdXNlIG9ubHksIGZpeGVzICM0MDNcbiAgICBzZWxmLnRyaWdnZXIoJ3ByZW1vdW50JylcblxuICAgIGlmIChpc19sb29wKSB7XG4gICAgICBsb29wX2RvbSA9IGRvbS5maXJzdENoaWxkXG4gICAgICByb290Lmluc2VydEJlZm9yZShsb29wX2RvbSwgY29uZi5iZWZvcmUgfHwgbnVsbCkgLy8gbnVsbCBuZWVkZWQgZm9yIElFOFxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlIChkb20uZmlyc3RDaGlsZCkgcm9vdC5hcHBlbmRDaGlsZChkb20uZmlyc3RDaGlsZClcbiAgICB9XG5cbiAgICBpZiAocm9vdC5zdHViKSBzZWxmLnJvb3QgPSByb290ID0gcGFyZW50LnJvb3RcblxuICAgIC8vIG9uZSB3YXkgZGF0YSBmbG93OiBwcm9wYWdhdGUgdXBkYXRlcyBhbmQgdW5tb3VudHMgZG93bndhcmRzIGZyb20gcGFyZW50IHRvIGNoaWxkcmVuXG4gICAgcGFyZW50ICYmIHBhcmVudC5vbigndXBkYXRlJywgc2VsZi51cGRhdGUpLm9uZSgndW5tb3VudCcsIHNlbGYudW5tb3VudClcblxuICAgIHNlbGYudHJpZ2dlcignbW91bnQnKVxuICB9XG5cbiAgdXBkYXRlT3B0cygpXG5cbiAgLy8gbmFtZWQgZWxlbWVudHMgYXZhaWxhYmxlIGZvciBmblxuICBwYXJzZU5hbWVkRWxlbWVudHMoZG9tLCB0aGlzKVxuXG4gIC8vIGZuIChpbml0aWFsaWF0aW9uKVxuICBpZiAoaW1wbC5mbikgaW1wbC5mbi5jYWxsKHRoaXMsIG9wdHMpXG5cbiAgLy8gcGFyc2UgbGF5b3V0IGFmdGVyIGluaXQuIGZuIG1heSBjYWxjdWxhdGUgYXJncyBmb3IgbmVzdGVkIGN1c3RvbSB0YWdzXG4gIHBhcnNlTGF5b3V0KGRvbSwgdGhpcywgZXhwcmVzc2lvbnMpXG5cbiAgdGhpcy51cGRhdGUoKVxuICBtb3VudCgpXG5cbn1cblxuZnVuY3Rpb24gc2V0RXZlbnRIYW5kbGVyKG5hbWUsIGhhbmRsZXIsIGRvbSwgdGFnLCBpdGVtKSB7XG5cbiAgZG9tW25hbWVdID0gZnVuY3Rpb24oZSkge1xuXG4gICAgLy8gY3Jvc3MgYnJvd3NlciBldmVudCBmaXhcbiAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnRcbiAgICBlLndoaWNoID0gZS53aGljaCB8fCBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZVxuICAgIGUudGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50XG4gICAgZS5jdXJyZW50VGFyZ2V0ID0gZG9tXG4gICAgZS5pdGVtID0gaXRlbVxuXG4gICAgLy8gcHJldmVudCBkZWZhdWx0IGJlaGF2aW91ciAoYnkgZGVmYXVsdClcbiAgICBpZiAoaGFuZGxlci5jYWxsKHRhZywgZSkgIT09IHRydWUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQgJiYgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBlLnJldHVyblZhbHVlID0gZmFsc2VcbiAgICB9XG5cbiAgICB2YXIgZWwgPSBpdGVtID8gdGFnLnBhcmVudCA6IHRhZ1xuICAgIGVsLnVwZGF0ZSgpXG5cbiAgfVxuXG59XG5cbi8vIHVzZWQgYnkgaWYtIGF0dHJpYnV0ZVxuZnVuY3Rpb24gaW5zZXJ0VG8ocm9vdCwgbm9kZSwgYmVmb3JlKSB7XG4gIGlmIChyb290KSB7XG4gICAgcm9vdC5pbnNlcnRCZWZvcmUoYmVmb3JlLCBub2RlKVxuICAgIHJvb3QucmVtb3ZlQ2hpbGQobm9kZSlcbiAgfVxufVxuXG4vLyBpdGVtID0gY3VycmVudGx5IGxvb3BlZCBpdGVtXG5mdW5jdGlvbiB1cGRhdGUoZXhwcmVzc2lvbnMsIHRhZywgaXRlbSkge1xuXG4gIGVhY2goZXhwcmVzc2lvbnMsIGZ1bmN0aW9uKGV4cHIpIHtcblxuICAgIHZhciBkb20gPSBleHByLmRvbSxcbiAgICAgICAgYXR0cl9uYW1lID0gZXhwci5hdHRyLFxuICAgICAgICB2YWx1ZSA9IHRtcGwoZXhwci5leHByLCB0YWcpXG5cbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAnJ1xuXG4gICAgLy8gbm8gY2hhbmdlXG4gICAgaWYgKGV4cHIudmFsdWUgPT09IHZhbHVlKSByZXR1cm5cbiAgICBleHByLnZhbHVlID0gdmFsdWVcblxuICAgIC8vIHRleHQgbm9kZVxuICAgIGlmICghYXR0cl9uYW1lKSByZXR1cm4gZG9tLm5vZGVWYWx1ZSA9IHZhbHVlXG5cbiAgICAvLyByZW1vdmUgb3JpZ2luYWwgYXR0cmlidXRlXG4gICAgcmVtQXR0cihkb20sIGF0dHJfbmFtZSlcblxuICAgIC8vIGV2ZW50IGhhbmRsZXJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicpIHtcbiAgICAgIHNldEV2ZW50SGFuZGxlcihhdHRyX25hbWUsIHZhbHVlLCBkb20sIHRhZywgaXRlbSlcblxuICAgIC8vIGlmLSBjb25kaXRpb25hbFxuICAgIH0gZWxzZSBpZiAoYXR0cl9uYW1lID09ICdpZicpIHtcbiAgICAgIHZhciBzdHViID0gZXhwci5zdHViXG5cbiAgICAgIC8vIGFkZCB0byBET01cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBzdHViICYmIGluc2VydFRvKHN0dWIucGFyZW50Tm9kZSwgc3R1YiwgZG9tKVxuXG4gICAgICAvLyByZW1vdmUgZnJvbSBET01cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0dWIgPSBleHByLnN0dWIgPSBzdHViIHx8IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKVxuICAgICAgICBpbnNlcnRUbyhkb20ucGFyZW50Tm9kZSwgZG9tLCBzdHViKVxuICAgICAgfVxuXG4gICAgLy8gc2hvdyAvIGhpZGVcbiAgICB9IGVsc2UgaWYgKC9eKHNob3d8aGlkZSkkLy50ZXN0KGF0dHJfbmFtZSkpIHtcbiAgICAgIGlmIChhdHRyX25hbWUgPT0gJ2hpZGUnKSB2YWx1ZSA9ICF2YWx1ZVxuICAgICAgZG9tLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICcnIDogJ25vbmUnXG5cbiAgICAvLyBmaWVsZCB2YWx1ZVxuICAgIH0gZWxzZSBpZiAoYXR0cl9uYW1lID09ICd2YWx1ZScpIHtcbiAgICAgIGRvbS52YWx1ZSA9IHZhbHVlXG5cbiAgICAvLyA8aW1nIHNyYz1cInsgZXhwciB9XCI+XG4gICAgfSBlbHNlIGlmIChhdHRyX25hbWUuc2xpY2UoMCwgNCkgPT0gJ3Jpb3QnKSB7XG4gICAgICBhdHRyX25hbWUgPSBhdHRyX25hbWUuc2xpY2UoNSlcbiAgICAgIHZhbHVlID8gZG9tLnNldEF0dHJpYnV0ZShhdHRyX25hbWUsIHZhbHVlKSA6IHJlbUF0dHIoZG9tLCBhdHRyX25hbWUpXG5cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGV4cHIuYm9vbCkge1xuICAgICAgICBkb21bYXR0cl9uYW1lXSA9IHZhbHVlXG4gICAgICAgIGlmICghdmFsdWUpIHJldHVyblxuICAgICAgICB2YWx1ZSA9IGF0dHJfbmFtZVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9ICdvYmplY3QnKSBkb20uc2V0QXR0cmlidXRlKGF0dHJfbmFtZSwgdmFsdWUpXG5cbiAgICB9XG5cbiAgfSlcblxufVxuZnVuY3Rpb24gZWFjaChlbHMsIGZuKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSAoZWxzIHx8IFtdKS5sZW5ndGgsIGVsOyBpIDwgbGVuOyBpKyspIHtcbiAgICBlbCA9IGVsc1tpXVxuICAgIC8vIHJldHVybiBmYWxzZSAtPiByZW9tdmUgY3VycmVudCBpdGVtIGR1cmluZyBsb29wXG4gICAgaWYgKGVsICE9IG51bGwgJiYgZm4oZWwsIGkpID09PSBmYWxzZSkgaS0tXG4gIH1cbiAgcmV0dXJuIGVsc1xufVxuXG5mdW5jdGlvbiByZW1BdHRyKGRvbSwgbmFtZSkge1xuICBkb20ucmVtb3ZlQXR0cmlidXRlKG5hbWUpXG59XG5cbi8vIG1heCAyIGZyb20gb2JqZWN0cyBhbGxvd2VkXG5mdW5jdGlvbiBleHRlbmQob2JqLCBmcm9tLCBmcm9tMikge1xuICBmcm9tICYmIGVhY2goT2JqZWN0LmtleXMoZnJvbSksIGZ1bmN0aW9uKGtleSkge1xuICAgIG9ialtrZXldID0gZnJvbVtrZXldXG4gIH0pXG4gIHJldHVybiBmcm9tMiA/IGV4dGVuZChvYmosIGZyb20yKSA6IG9ialxufVxuXG5mdW5jdGlvbiBta2RvbSh0ZW1wbGF0ZSkge1xuICB2YXIgdGFnX25hbWUgPSB0ZW1wbGF0ZS50cmltKCkuc2xpY2UoMSwgMykudG9Mb3dlckNhc2UoKSxcbiAgICAgIHJvb3RfdGFnID0gL3RkfHRoLy50ZXN0KHRhZ19uYW1lKSA/ICd0cicgOiB0YWdfbmFtZSA9PSAndHInID8gJ3Rib2R5JyA6ICdkaXYnLFxuICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHJvb3RfdGFnKVxuXG4gIGVsLnN0dWIgPSB0cnVlXG4gIGVsLmlubmVySFRNTCA9IHRlbXBsYXRlXG4gIHJldHVybiBlbFxufVxuXG5mdW5jdGlvbiB3YWxrKGRvbSwgZm4pIHtcbiAgaWYgKGRvbSkge1xuICAgIGlmIChmbihkb20pID09PSBmYWxzZSkgd2Fsayhkb20ubmV4dFNpYmxpbmcsIGZuKVxuICAgIGVsc2Uge1xuICAgICAgZG9tID0gZG9tLmZpcnN0Q2hpbGRcblxuICAgICAgd2hpbGUgKGRvbSkge1xuICAgICAgICB3YWxrKGRvbSwgZm4pXG4gICAgICAgIGRvbSA9IGRvbS5uZXh0U2libGluZ1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcnJEaWZmKGFycjEsIGFycjIpIHtcbiAgcmV0dXJuIGFycjEuZmlsdGVyKGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIGFycjIuaW5kZXhPZihlbCkgPCAwXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGluaGVyaXQocGFyZW50KSB7XG4gIGZ1bmN0aW9uIENoaWxkKCkge31cbiAgQ2hpbGQucHJvdG90eXBlID0gcGFyZW50XG4gIHJldHVybiBuZXcgQ2hpbGQoKVxufVxuXG5cbi8qXG4gVmlydHVhbCBkb20gaXMgYW4gYXJyYXkgb2YgY3VzdG9tIHRhZ3Mgb24gdGhlIGRvY3VtZW50LlxuIFVwZGF0ZXMgYW5kIHVubW91bnRzIHByb3BhZ2F0ZSBkb3dud2FyZHMgZnJvbSBwYXJlbnQgdG8gY2hpbGRyZW4uXG4qL1xuXG52YXIgdmlydHVhbF9kb20gPSBbXSxcbiAgICB0YWdfaW1wbCA9IHt9XG5cbmZ1bmN0aW9uIGluamVjdFN0eWxlKGNzcykge1xuICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgbm9kZS5pbm5lckhUTUwgPSBjc3NcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChub2RlKVxufVxuXG5mdW5jdGlvbiBtb3VudFRvKHJvb3QsIHRhZ05hbWUsIG9wdHMpIHtcbiAgdmFyIHRhZyA9IHRhZ19pbXBsW3RhZ05hbWVdXG5cbiAgaWYgKHRhZyAmJiByb290KSB7XG4gICAgdGFnID0gbmV3IFRhZyh0YWcsIHsgcm9vdDogcm9vdCwgb3B0czogb3B0cyB9KVxuICAgIHZpcnR1YWxfZG9tLnB1c2godGFnKVxuICAgIHJldHVybiB0YWcub24oJ3VubW91bnQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZpcnR1YWxfZG9tLnNwbGljZSh2aXJ0dWFsX2RvbS5pbmRleE9mKHRhZyksIDEpXG4gICAgfSlcbiAgfVxufVxuXG5yaW90LnRhZyA9IGZ1bmN0aW9uKG5hbWUsIGh0bWwsIGNzcywgZm4pIHtcbiAgaWYgKHR5cGVvZiBjc3MgPT0gJ2Z1bmN0aW9uJykgZm4gPSBjc3NcbiAgZWxzZSBpZiAoY3NzKSBpbmplY3RTdHlsZShjc3MpXG4gIHRhZ19pbXBsW25hbWVdID0geyBuYW1lOiBuYW1lLCB0bXBsOiBodG1sLCBmbjogZm4gfVxufVxuXG5yaW90Lm1vdW50ID0gZnVuY3Rpb24oc2VsZWN0b3IsIHRhZ05hbWUsIG9wdHMpIHtcbiAgaWYgKHNlbGVjdG9yID09ICcqJykgc2VsZWN0b3IgPSBPYmplY3Qua2V5cyh0YWdfaW1wbCkuam9pbignLCAnKVxuICBpZiAodHlwZW9mIHRhZ05hbWUgPT0gJ29iamVjdCcpIHsgb3B0cyA9IHRhZ05hbWU7IHRhZ05hbWUgPSAwIH1cblxuICB2YXIgdGFncyA9IFtdXG5cbiAgZnVuY3Rpb24gcHVzaChyb290KSB7XG4gICAgdmFyIG5hbWUgPSB0YWdOYW1lIHx8IHJvb3QudGFnTmFtZS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICB0YWcgPSBtb3VudFRvKHJvb3QsIG5hbWUsIG9wdHMpXG5cbiAgICBpZiAodGFnKSB0YWdzLnB1c2godGFnKVxuICB9XG5cbiAgLy8gRE9NIG5vZGVcbiAgaWYgKHNlbGVjdG9yLnRhZ05hbWUpIHtcbiAgICBwdXNoKHNlbGVjdG9yKVxuICAgIHJldHVybiB0YWdzWzBdXG5cbiAgLy8gc2VsZWN0b3JcbiAgfSBlbHNlIHtcbiAgICBlYWNoKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCBwdXNoKVxuICAgIHJldHVybiB0YWdzXG4gIH1cblxufVxuXG4vLyB1cGRhdGUgZXZlcnl0aGluZ1xucmlvdC51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGVhY2godmlydHVhbF9kb20sIGZ1bmN0aW9uKHRhZykge1xuICAgIHRhZy51cGRhdGUoKVxuICB9KVxufVxuXG4vLyBAZGVwcmVjaWF0ZWRcbnJpb3QubW91bnRUbyA9IHJpb3QubW91bnRcblxuXG4gIFxuICAvLyBzaGFyZSBtZXRob2RzIGZvciBvdGhlciByaW90IHBhcnRzLCBlLmcuIGNvbXBpbGVyXG4gIHJpb3QudXRpbCA9IHsgYnJhY2tldHM6IGJyYWNrZXRzLCB0bXBsOiB0bXBsIH1cblxuICAvLyBzdXBwb3J0IENvbW1vbkpTXG4gIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG4gICAgbW9kdWxlLmV4cG9ydHMgPSByaW90XG5cbiAgLy8gc3VwcG9ydCBBTURcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuICAgIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIHJpb3QgfSlcblxuICAvLyBzdXBwb3J0IGJyb3dzZXJcbiAgZWxzZVxuICAgIHRoaXMucmlvdCA9IHJpb3RcblxufSkoKTtcbiIsIi8qXG4gKiBXaGVuIGZpcnN0IGNyZWF0ZWQgYSBQb3N0IG9iamVjdCBpcyBqdXN0IGEgaG9sZGVyIGZvciBQb3N0IGF0dHJpYnV0ZXNcbiAqIHdpdGggc29tZSBjb252ZW5pZW5jZSBtZXRob2RzIGZvciB1cGRhdGluZyBhdHRyaWJ1dGVzLCB2YWxpZGF0aW5nLCBldGMuXG4gKlxuICogRVhBTVBMRTpcbiAqXG4gKiAgICAgdmFyIFBvc3QgPSByZXF1aXJlKCdhcHAvcG9zdCcpXG4gKlxuICogICAgIHZhciBwb3N0ID0gbmV3IFBvc3QoeyB0aXRsZTogJ1NvbWUgdGl0bGUnIH0pXG4gKlxuICogICAgIGlmIChwb3N0LnZhbGlkYXRpb24oKS5pc1ZhbGlkKCkpIHsgUG9zdC5wZXJzaXN0KHBvc3QpIH1cbiAqXG4gKiBJbnN0ZWFkIG9mIHVzaW5nIGNhbGxiYWNrcyBvciBwcm9taXNlcywgdGhlIFBvc3QgZnVuY3Rpb24gaXMgb2JzZXJ2YWJsZTpcbiAqXG4gKiAgICAgUG9zdC5vbigncG9zdHM6ZGlkOnBlcnNpc3QnLCBmdW5jdGlvbihwb3N0KSB7XG4gKiAgICAgICBjb25zb2xlLmxvZygncG9zdCAnICsgcG9zdCArICcgd2FzIHN1Y2Nlc3NmdWxseSBjcmVhdGVkJylcbiAqICAgICB9KVxuICpcbiAqL1xuXG52YXIgXyA9IHtcbiAgZGVmYXVsdHMgOiByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L2RlZmF1bHRzJyksXG4gIG1lcmdlICAgIDogcmVxdWlyZSgnbG9kYXNoL29iamVjdC9tZXJnZScpLFxuICBwaWNrICAgICA6IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvcGljaycpXG59XG5cbnZhclxuICBmYnJlZiA9IG5ldyBGaXJlYmFzZSgnaHR0cHM6Ly9tdXNpZmF2cy5maXJlYmFzZWlvLmNvbScpLFxuICB0aW1lYWdvID0gcmVxdWlyZSgnLi4vbGliL2Zyb21ub3cnKSxcbiAgeXQgPSByZXF1aXJlKCcuLi9saWIveW91dHViZScpXG5cbmZ1bmN0aW9uIFBvc3Qob3B0cywga2V5KSB7XG4gIHRoaXMuc2V0YXR0cihfLmRlZmF1bHRzKHt9LCBvcHRzLCB7a2V5OiBrZXl9LCBQb3N0LmRlZmF1bHRzKSlcbn1cblxuUG9zdC5kZWZhdWx0cyA9IHtcbiAgZGF0ZTogdW5kZWZpbmVkLFxuICBkZXNjOiAnJyxcbiAgZW1iZWQ6IHt9LFxuICBmYXZvcml0ZWQ6IGZhbHNlLFxuICBrZXk6IG51bGwsXG4gIHN0b3JlZDogZmFsc2UsXG4gIHRpdGxlOiAnJyxcbiAgdWlkOiB1bmRlZmluZWQsXG4gIHVzZXJOYW1lOiB1bmRlZmluZWRcbn1cblxuLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBJbnN0YW5jZSBNZXRob2RzXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICovXG5cblBvc3QucHJvdG90eXBlLnRvZ2dsZUZhdiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmZhdm9yaXRlZCA9ICF0aGlzLmZhdm9yaXRlZFxufVxuXG5Qb3N0LnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbihvdGhlcikge1xuICByZXR1cm4gdGhpcy5rZXkgPT09IG90aGVyLmtleVxufVxuXG5Qb3N0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoXy5waWNrKHRoaXMuZ2V0YXR0cigpLCBbJ3RpdGxlJywgJ2tleSddKSlcbn1cblxuLy8gUmV0dXJucyBvbmx5IFBvc3QgKmRhdGEqIGF0dHJpYnV0ZXNcblBvc3QucHJvdG90eXBlLmdldGF0dHIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIF8ucGljayh0aGlzLCBPYmplY3Qua2V5cyhQb3N0LmRlZmF1bHRzKSlcbn1cblxuLy8gU2V0cyBhdHRyaWJ1dGVzIGFuZCBkZXJpdmVkL2NvbXB1dGVkIGF0dHJpYnV0ZXNcblBvc3QucHJvdG90eXBlLnNldGF0dHIgPSBmdW5jdGlvbihvcHRzKSB7XG4gIF8ubWVyZ2UodGhpcywgb3B0cylcblxuICB2YXIgcCA9IHRoaXNcblxuICB0aGlzLnN0b3JlZCA9ICghIXAua2V5KSAmJiAocC5rZXkgIT0gJ25ldycpXG4gIHRoaXMuZGF0ZSA9IHAuZGF0ZSA/IG5ldyBEYXRlKHAuZGF0ZSkgOiBuZXcgRGF0ZSgpXG5cbiAgaWYgKHAuZW1iZWQgJiYgKCFwLmVtYmVkLnR5cGUgfHwgcC5lbWJlZC50eXBlID09ICd1bmtub3duJykpIHtcbiAgICAvLyBUT0RPOiBwYXJzZSBvdGhlciBzZXJ2aWNlcyAoc291bmRjbG91ZCwgYmFuZGNhbXAsIGV0Yy4pXG4gICAgdGhpcy5lbWJlZCA9IHl0LmV4dHJhY3RFbWJlZChwLmVtYmVkLnVybClcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIHJldHVybnMgYW4gb2JqZWN0IHdpdGggdmFsaWRhdGlvbiByZXN1bHRzXG5Qb3N0LnByb3RvdHlwZS52YWxpZGF0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHZhciBwID0gdGhpcywgciA9IHsgZXJyb3JzOiBbXSwgaXNWYWxpZDogdHJ1ZSB9XG5cbiAgaWYgKCFwLmRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgci5lcnJvcnMuZGF0ZSA9ICdkYXRlIGlzIGludmFsaWQnXG4gICAgci5pc1ZhbGlkID0gZmFsc2VcbiAgfVxuXG4gIGlmICghcC50aXRsZSB8fCBwLnRpdGxlLmxlbmd0aCA9PSAwKSB7XG4gICAgci5lcnJvcnMudGl0bGUgPSAndGl0bGUgY2FuXFwndCBiZSBibGFuaydcbiAgICByLmlzVmFsaWQgPSBmYWxzZVxuICB9XG5cbiAgaWYgKCFwLmVtYmVkIHx8ICFwLmVtYmVkLnR5cGUgfHwgcC5lbWJlZC50eXBlID09ICd1bmtub3duJykge1xuICAgIHIuZXJyb3JzLnVybCA9ICd0aGUgZW1iZWQgdXJsIGlzIGludmFsaWQnXG4gICAgci5pc1ZhbGlkID0gZmFsc2VcbiAgfVxuXG4gIHJldHVybiByXG59XG5cbi8vIFJldHVybnMgYSBTdHJpbmcgZm9ybWF0dGVkIGRhdGUuXG5Qb3N0LnByb3RvdHlwZS50aW1lYWdvID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aW1lYWdvKHRoaXMuZGF0ZSlcbn1cblxuLy8gRmlyZWJhc2Ugcm9vdCBvZiBhbGwgdXNlciBwb3N0c1xuUG9zdC5wcm90b3R5cGUuZmJyb290cmVmID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmYnJlZi5jaGlsZCgndXNlcl9wb3N0cy8nICsgdGhpcy51aWQpXG59XG5cbi8vIEZpcmViYXNlIHJvb3Qgb2YgdGhlIHNwZWNpZmljIHVzZXIgcG9zdFxuUG9zdC5wcm90b3R5cGUuZmJwb3N0cmVmID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmZicm9vdHJlZigpLmNoaWxkKCcvJyArIHRoaXMua2V5KVxufVxuXG4vKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIFwiU3RhdGljXCIgTWV0aG9kc1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqL1xuXG4vLyBFeHRlbmQgdGhlIFBvc3QgRnVuY3Rpb24gKG5vdCB0aGUgaW5zdGFuY2VzKSB3aXRoIHB1Yi9zdWIgcHJvcGVydGllcy5cbnJlcXVpcmUoJ3Jpb3QnKS5vYnNlcnZhYmxlKFBvc3QpXG5cblBvc3QuZGVzdHJveSA9IGZ1bmN0aW9uKHBvc3QpIHtcbiAgcG9zdC5mYnBvc3RyZWYoKS5yZW1vdmUoZnVuY3Rpb24oZXJyb3Ipe1xuICAgIGlmICghZXJyb3IpIHtcbiAgICAgIHBvc3QuZGVzdHJveWVkID0gdHJ1ZVxuICAgICAgUG9zdC50cmlnZ2VyKCdzdG9yZTpwb3N0czpkaWQ6ZGVzdHJveScsIHBvc3QpXG4gICAgfVxuICB9KVxufVxuXG5cbnZhciBsaXN0ZW5lcnMgPSB7fVxuXG4vLyBXaGVuIGNhbGxlZCwgc3RvcmU6cG9zdHM6ZGlkOnJldHJpZXZlIGV2ZW50cyB3aWxsIGJlIHRyaWdnZXJlZFxuLy8gYWZ0ZXIgZmlyZWJhc2UgY2hpbGRfYWRkZWQgZXZlbnRzLlxuUG9zdC5yZXRyaWV2ZSA9IGZ1bmN0aW9uIHJldHJpZXZlKGNvbGxlY3Rpb24pIHtcbiAgaWYgKGxpc3RlbmVyc1tjb2xsZWN0aW9uXSkgeyByZXR1cm4gfVxuXG4gIHZhciByZWYgPSBmYnJlZi5jaGlsZChjb2xsZWN0aW9uKS5vcmRlckJ5UHJpb3JpdHkoKVxuXG4gIGxpc3RlbmVyc1tjb2xsZWN0aW9uXSA9IHJlZi5vbignY2hpbGRfYWRkZWQnLCBmdW5jdGlvbihzbmFwc2hvdCkge1xuICAgIHZhciBwb3N0ID0gbmV3IFBvc3Qoc25hcHNob3QudmFsKCksIHNuYXBzaG90LmtleSgpKVxuICAgIFBvc3QudHJpZ2dlcignc3RvcmU6cG9zdHM6ZGlkOnJldHJpZXZlJywgY29sbGVjdGlvbiwgcG9zdClcbiAgfSlcbn1cblxuUG9zdC5zdG9wUmV0cmlldmUgPSBmdW5jdGlvbihjb2xsZWN0aW9uKSB7XG4gIGlmICghbGlzdGVuZXJzW2NvbGxlY3Rpb25dKSB7IHJldHVybiB9XG5cbiAgZmJyZWYub2ZmKCdjaGlsZF9hZGRlZCcsIGxpc3RlbmVyc1tjb2xsZWN0aW9uXSlcbiAgZGVsZXRlIGxpc3RlbmVyc1tjb2xsZWN0aW9uXVxufVxuXG4vKlxuICogUmV0dXJucyBsYXRlc3QgMTAgaXRlbXMgZnJvbSBvbmUgb2YgdGhlc2UgY29sbGVjdGlvbnM6XG4gKiBwb3N0c1xuICogZmF2b3JpdGVkXG4gKiB1c2VyX2Zhdm9yaXRlcy91aWRcbiAqIHVzZXJfcG9zdHMvdWlkXG4gKi9cblBvc3QubGF0ZXN0ID0gZnVuY3Rpb24oY29sbGVjdGlvbikge1xuICB2YXIgciA9IGZicmVmLmNoaWxkKGNvbGxlY3Rpb24pLm9yZGVyQnlQcmlvcml0eSgpLmxpbWl0VG9GaXJzdCgxMClcblxuICAgIGNvbnNvbGUubG9nKGNvbGxlY3Rpb24pXG5cbiAgci5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uKHNuYXBzaG90KSB7XG4gICAgdmFyIGRhdGEgPSBzbmFwc2hvdC52YWwoKVxuXG4gICAgaWYgKCFkYXRhKSB7IHJldHVybiB9IC8vIG5vdGhpbmcgYXZhaWxhYmxlP1xuXG4gICAgdmFyIGxhdGVzdCA9IE9iamVjdC5rZXlzKGRhdGEpLnJlZHVjZShmdW5jdGlvbihhY2MsIGtleSkge1xuICAgICAgYWNjLnB1c2gobmV3IFBvc3QoZGF0YVtrZXldLCBrZXkpKVxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0sIFtdKS5zb3J0KGZ1bmN0aW9uKHBvc3QxLCBwb3N0Mikge1xuICAgICAgcmV0dXJuIHBvc3QyLmRhdGUgLSBwb3N0MS5kYXRlXG4gICAgfSlcblxuICAgIFBvc3QudHJpZ2dlcignc3RvcmU6cG9zdHM6ZGlkOmxhdGVzdCcsIGNvbGxlY3Rpb24sIGxhdGVzdClcbiAgfSlcbn1cblxuLy8gSW5pdGlhbCBjcmVhdGlvbiBvZiBhIHBvc3QuIFVzZSB1cGRhdGUgaW5zdGVhZCBpZiB0aGUgcG9zdCBhbHJlYWR5IGV4aXN0cy5cblBvc3QucGVyc2lzdCA9IGZ1bmN0aW9uIHBlcnNpc3QocG9zdCkge1xuICB2YXIgZGF0ZSA9IG5ldyBEYXRlKClcbiAgdmFyIGF0dHJzID0gXy5tZXJnZShwb3N0LmdldGF0dHIoKSwge2RhdGU6IGRhdGUudmFsdWVPZigpLCB1aWQ6IHBvc3QudWlkfSlcblxuICB2YXIgciA9IHBvc3QuZmJyb290cmVmKCkucHVzaChhdHRycywgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIFBvc3QudHJpZ2dlcignc3RvcmU6cG9zdHM6ZmFpbGVkOnBlcnNpc3QnLCBwb3N0LCBlcnJvcilcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zdC5zZXRhdHRyKHsga2V5OiByLmtleSgpLCBkYXRlOiBkYXRlfSlcbiAgICAgIFBvc3QudHJpZ2dlcignc3RvcmU6cG9zdHM6ZGlkOnBlcnNpc3QnLCBwb3N0KVxuICAgICAgci5zZXRQcmlvcml0eShkYXRlLnZhbHVlT2YoKSlcbiAgICB9XG4gIH0pXG59XG5cblBvc3QudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKHBvc3QpIHtcbiAgcG9zdC5mYnBvc3RyZWYoKS51cGRhdGUocG9zdC5nZXRhdHRyKCksIGZ1bmN0aW9uKGVycm9yKXtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIFBvc3QudHJpZ2dlcignc3RvcmU6cG9zdHM6ZmFpbGVkOnVwZGF0ZScsIHBvc3QsIGVycm9yKVxuICAgIH0gZWxzZSB7XG4gICAgICBQb3N0LnRyaWdnZXIoJ3N0b3JlOnBvc3RzOmRpZDp1cGRhdGUnLCBwb3N0KVxuICAgIH1cbiAgfSlcbn1cblxuLy8gS2VlcCBhIHRhbGx5IG9mIGxhdGVzdCBwb3N0cyBhbmQgbGF0ZXN0IGZhdm9yaXRlZCAvIHVzZXItZmF2b3JpdGVkLlxuZnVuY3Rpb24gZmF2c0FuZExhc3Rlc3RVcGRhdGVyKHBvc3QpIHtcbiAgdmFyXG4gICAgZiA9IGZicmVmLFxuICAgIHBzdCA9ICdwb3N0cy8nICsgcG9zdC5rZXksXG4gICAgZmF2ID0gJ2Zhdm9yaXRlZC8nICsgcG9zdC5rZXksXG4gICAgdXNmID0gJ3VzZXJfZmF2b3JpdGVzLycgKyBwb3N0LnVpZCArICcvJyArIHBvc3Qua2V5LFxuICAgIGF0ciA9IF8ubWVyZ2UocG9zdC5nZXRhdHRyKCksIHtkYXRlOiBwb3N0LmRhdGUudmFsdWVPZigpfSlcblxuICBpZiAocG9zdC5kZXN0cm95ZWQpIHtcbiAgICBmLmNoaWxkKGZhdikucmVtb3ZlKClcbiAgICBmLmNoaWxkKHBzdCkucmVtb3ZlKClcbiAgICBmLmNoaWxkKHVzZikucmVtb3ZlKClcbiAgfSBlbHNlIHtcbiAgICBmLmNoaWxkKHBzdCkuc2V0KGF0cilcblxuICAgIGlmIChwb3N0LmZhdm9yaXRlZCkge1xuICAgICAgZi5jaGlsZChmYXYpLnNldChhdHIpXG4gICAgICBmLmNoaWxkKHVzZikuc2V0KGF0cilcbiAgICB9IGVsc2Uge1xuICAgICAgZi5jaGlsZChmYXYpLnJlbW92ZSgpXG4gICAgICBmLmNoaWxkKHVzZikucmVtb3ZlKClcbiAgICB9XG4gIH1cbn1cblxuUG9zdC5vbignc3RvcmU6cG9zdHM6ZGlkOnBlcnNpc3QnLCBmYXZzQW5kTGFzdGVzdFVwZGF0ZXIpXG5Qb3N0Lm9uKCdzdG9yZTpwb3N0czpkaWQ6dXBkYXRlJywgZmF2c0FuZExhc3Rlc3RVcGRhdGVyKVxuUG9zdC5vbignc3RvcmU6cG9zdHM6ZGlkOmRlc3Ryb3knLCBmYXZzQW5kTGFzdGVzdFVwZGF0ZXIpXG5cbm1vZHVsZS5leHBvcnRzID0gUG9zdFxuIiwiLypcbiAqIFdoZW4gZmlyc3QgY3JlYXRlZCBhIFVzZXIgb2JqZWN0IGlzIGp1c3QgYSBob2xkZXIgZm9yIFVzZXIgYXR0cmlidXRlc1xuICogd2l0aCBzb21lIGNvbnZlbmllbmNlIG1ldGhvZHMgZm9yIHVwZGF0aW5nIGF0dHJpYnV0ZXMsIHZhbGlkYXRpbmcsIGV0Yy5cbiAqXG4gKiBUaGUgVXNlciBmdW5jdGlvbiBpcyBhbHNvIG9ic2VydmFibGUuIFB1Ymxpc2hpbmcgYW5kIHN1YnNjcmliaW5nXG4gKiB0byBVc2VyIGlzIHRoZSBvbmx5IHdheSB0byBpbnRlcmFjdCB3aXRoIHRoZSBhYnN0cmFjdCAndXNlcnMgc3RvcmUnLlxuICpcbiAqIFVzZXIuY3VycmVudCBob2xkcyBhIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudCB1c2VyLCB3aGljaCBtYXkgb3IgbWF5IG5vdCBiZVxuICogYXV0aGVudGljYXRlZC5cbiAqXG4gKiBFWEFNUExFOlxuICpcbiAqIHZhciBVc2VyID0gcmVxdWlyZSgnYXBwL3VzZXInKVxuICpcbiAqIHZhciBjdXJyZW50ID0gVXNlci5jdXJyZW50XG4gKlxuICogTk9URTpcbiAqXG4gKiBVbHRpbWF0ZWx5IHRoZSBtYWluIEZpcmViYXNlIHBhdGggZm9yIHBvc3RzIGlzIGJ1aWx0IGxpa2UgdGhpczpcbiAqIHVzZXJzL3VpZCA6IHsgLi4udXNlciBkYXRhLi4uIH1cbiAqL1xuXG52YXIgXyA9IHtcbiAgZGVmYXVsdHMgOiByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L2RlZmF1bHRzJyksXG4gIHBpY2sgICAgIDogcmVxdWlyZSgnbG9kYXNoL29iamVjdC9waWNrJylcbn1cblxudmFyIGZicmVmID0gbmV3IEZpcmViYXNlKCdodHRwczovL211c2lmYXZzLmZpcmViYXNlaW8uY29tJylcblxuZnVuY3Rpb24gVXNlcihvcHRzLCB1aWQpIHtcbiAgXy5kZWZhdWx0cyh0aGlzLCBvcHRzLCBVc2VyLmRlZmF1bHRzKVxuXG4gIC8vIGlmIGN1cnJlbnQgdXNlciB3YXMgaW5zdGFudGlhdGVkIG1vcmUgdGhhbiBvbmNlLlxuICBpZiAoVXNlci5jdXJyZW50ICYmIFVzZXIuY3VycmVudC51aWQgPT09IHVpZCkge1xuICAgIF8uZGVmYXVsdHModGhpcywgVXNlci5jdXJyZW50KVxuICB9XG59XG5cblVzZXIuZGVmYXVsdHMgPSB7XG4gICdhdmF0YXJVcmwnICAgOiAnL2Fzc2V0cy9wcm9maWxlLnBuZycsXG4gICdkZXNjcmlwdGlvbicgOiAnTXVzaUZhdnMhIHVzZXInLFxuICAnZGlzcGxheU5hbWUnIDogJ3VzZXInLFxuICAnbG9jYXRpb24nICAgIDogJ1VuaXZlcnNlJyxcbiAgJ2xvZ2dlZCcgICAgICA6IGZhbHNlLFxuICAndXJsJyAgICAgICAgIDogJ2h0dHBzOi8vbXVzaWZhdnMuY29tJ1xufVxuXG4vKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEluc3RhbmNlIE1ldGhvZHNcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKi9cblxuLy8gUmV0dXJucyBvbmx5ICpkYXRhKiBhdHRyaWJ1dGVzXG5Vc2VyLnByb3RvdHlwZS5nZXRhdHRyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBfLnBpY2sodGhpcywgVXNlci5hdHRyaWJ1dGVzKVxufVxuXG5Vc2VyLnByb3RvdHlwZS5sb2dvdXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hdXRoRGF0YSA9IG51bGxcbiAgdGhpcy5sb2dnZWQgPSBmYWxzZVxuICB0aGlzLnByb3ZpZGVyID0gJ3Vua25vd24nXG4gIHRoaXMudWlkID0gbnVsbFxufVxuXG4vLyB1cGRhdGUgZmIgZGF0YVxuVXNlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy51aWQpIHsgcmV0dXJuIH1cbiAgZmJyZWYuY2hpbGQoJ3VzZXJzJykuY2hpbGQodGhpcy51aWQpLnNldCh1c2VyLmdldGF0dHIoKSlcbn1cblxuVXNlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KF8ucGljayh0aGlzLmdldGF0dHIoKSwgWydkaXNwbGF5TmFtZScsICdsb2dnZWQnXSkpXG59XG5cbi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogXCJTdGF0aWNcIiBNZXRob2RzXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICovXG5cbi8vIEV4dGVuZCB0aGUgVXNlciAqZnVuY3Rpb24qIChub3QgdGhlIGluc3RhbmNlcykgd2l0aCBwdWIvc3ViIGF0dHJpYnV0ZXMuXG5yZXF1aXJlKCdyaW90Jykub2JzZXJ2YWJsZShVc2VyKVxuXG4vLyBVcGRhdGVzIGEgdXNlciB3aXRoIHRoZSBwcm92aWRlZCBhdXRoIGRhdGEuXG5mdW5jdGlvbiB1cGRhdGVBdXRoKGF1dGhEYXRhKSB7XG4gIGlmICghYXV0aERhdGEpIHsgcmV0dXJuIH1cblxuICB2YXIgdSA9IFVzZXIuY3VycmVudFxuXG4gIHUudWlkID0gYXV0aERhdGEudWlkXG4gIHUuYXV0aERhdGEgPSBhdXRoRGF0YVxuICB1LnByb3ZpZGVyID0gYXV0aERhdGEucHJvdmlkZXJcbiAgdS5sb2dnZWQgPSB0cnVlXG5cbiAgaWYgKGF1dGhEYXRhLnByb3ZpZGVyID09ICd0d2l0dGVyJykge1xuICAgIHUuZGlzcGxheU5hbWUgPSBhdXRoRGF0YS50d2l0dGVyLmRpc3BsYXlOYW1lXG5cbiAgICB2YXIgcCA9IGF1dGhEYXRhLnR3aXR0ZXIuY2FjaGVkVXNlclByb2ZpbGVcblxuICAgIGlmIChwKSB7XG4gICAgICB1LmF2YXRhclVybCA9IHAucHJvZmlsZV9pbWFnZV91cmxfaHR0cHNcbiAgICAgIHUuZGVzY3JpcHRpb24gPSBwLmRlc2NyaXB0aW9uXG4gICAgICB1LmxvY2F0aW9uID0gcC5sb2NhdGlvblxuICAgICAgdS51cmwgPSBwLnVybFxuICAgIH1cbiAgfVxuXG4gIF8uZGVmYXVsdHModGhpcywgdS5kZWZhdWx0cykgLy8gaW4gY2FzZSB3ZSBwaWNrZWQgdXAgc29tZSBudWxsc1xufVxuXG5Vc2VyLmxvZ2luID0gZnVuY3Rpb24ocHJvdmlkZXIpIHtcbiAgZmJyZWYuYXV0aFdpdGhPQXV0aFBvcHVwKHByb3ZpZGVyLCBmdW5jdGlvbihlcnJvciwgYXV0aERhdGEpIHtcbiAgICBpZiAoZXJyb3IgfHwgIWF1dGhEYXRhKSB7XG4gICAgICBVc2VyLnRyaWdnZXIoJ3N0b3JlOnVzZXJzOmZhaWxlZDpsb2dpbicsIGVycm9yIHx8IHtjb2RlOiAndW5rbm93bid9KVxuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVBdXRoKGF1dGhEYXRhKVxuICAgIH1cbiAgfSlcbn1cblxuVXNlci5sb2dvdXQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKFVzZXIuY3VycmVudCAmJiBVc2VyLmN1cnJlbnQubG9nZ2VkKSB7XG4gICAgVXNlci5jdXJyZW50LmxvZ291dCgpXG4gICAgZmJyZWYudW5hdXRoKClcbiAgfVxufVxuXG5Vc2VyLmxvb2t1cCA9IGZ1bmN0aW9uKHVpZCkge1xuICBmYnJlZi5jaGlsZCgndXNlcnMnKS5jaGlsZCh1aWQpLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24oc25hcHNob3Qpe1xuICAgIHZhciBkYXRhID0gc25hcHNob3QudmFsKClcbiAgICBpZiAoZGF0YSkge1xuICAgICAgVXNlci50cmlnZ2VyKCdzdG9yZTp1c2VyczpkaWQ6bG9va3VwJywgdWlkLCBuZXcgVXNlcihkYXRhLCB1aWQpKVxuICAgIH0gZWxzZSB7XG4gICAgICBVc2VyLnRyaWdnZXIoJ3N0b3JlOnVzZXJzOmZhaWxlZDpsb29rdXAnLCB1aWQpXG4gICAgfVxuICB9KVxufVxuXG4vLyBjcmVhdGVzIHRoZSBVc2VyLmN1cnJlbnQgaW5zdGFuY2UuXG5Vc2VyLnNldHVwQ3VycmVudCA9IGZ1bmN0aW9uKCkge1xuICBVc2VyLmN1cnJlbnQgPSBuZXcgVXNlcigpXG5cbiAgZmJyZWYub25BdXRoKGZ1bmN0aW9uKGF1dGhEYXRhKSB7XG4gICAgaWYgKGF1dGhEYXRhKSB7XG4gICAgICB1cGRhdGVBdXRoKGF1dGhEYXRhKVxuICAgICAgVXNlci50cmlnZ2VyKCdzdG9yZTp1c2VyczpkaWQ6bG9naW4nLCBVc2VyLmN1cnJlbnQsIGF1dGhEYXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICBVc2VyLmN1cnJlbnQubG9nb3V0KClcbiAgICAgIFVzZXIudHJpZ2dlcignc3RvcmU6dXNlcnM6ZGlkOmxvZ291dCcsIFVzZXIuY3VycmVudClcbiAgICB9XG4gIH0pXG4gIC8vIHVwZGF0ZUF1dGgoZmJyZWYuZ2V0QXV0aCgpKSAvLyBOT1RFOiByZW1vdmVkIHRvIGF2b2lkIGZiJ3Mgc3luYy4gYXV0aCBjaGVja1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJcbiIsInZhciBfID0ge1xuICBpc0Z1bmN0aW9uIDogcmVxdWlyZSgnbG9kYXNoL2xhbmcvaXNGdW5jdGlvbicpXG59XG5cbi8qXG4gKiBEZWZpbmVzIGEgY29tbW9uIEFQSSBhcm91bmQgRE9NIG5vZGUgaGFuZGxpbmcuIFRoZSBBUEkgaXMgaW5zcGlyZWQgYnlcbiAqIGNlcnRhaW4gbGliIHlvdSBtYXkgaGF2ZSBoZWFyZCBhYm91dC4uLiA6cFxuICovXG5mdW5jdGlvbiBEb21XcmFwKG5vZGUsIHNlbGVjdG9yKSB7XG4gIHRoaXNbMF0gPSB0aGlzLm5vZGUgPSBub2RlXG4gIHRoaXMuaWQgPSBub2RlLmlkXG5cbiAgaWYgKHNlbGVjdG9yKSB7XG4gICAgdGhpcy5ub2RlID0gbm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICB9XG5cbiAgdGhpcy5saXN0ZW5lcnMgPSBbXSAvLyBzYXZlIGV2ZW50IGxpc3RlbmVycyBzbyB3ZSBjYW4gdW5yZWdpc3RlciBlYXNpbHkuXG59XG5cbkRvbVdyYXAucHJvdG90eXBlLmh0bWwgPSBmdW5jdGlvbihodG1sKSB7XG4gIHRoaXMubm9kZS5pbm5lckhUTUwgPSBodG1sXG4gIHJldHVybiB0aGlzXG59XG5cbkRvbVdyYXAucHJvdG90eXBlLnByZXBlbmQgPSBmdW5jdGlvbihub2RlKSB7XG4gIHRoaXMubm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgdGhpcy5ub2RlLmZpcnN0Q2hpbGQpXG4gIHJldHVybiB0aGlzXG59XG5cbkRvbVdyYXAucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKG5vZGUpXG4gIHJldHVybiB0aGlzXG59XG5cbkRvbVdyYXAucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKG5vZGUpXG4gIHJldHVybiB0aGlzXG59XG5cbkRvbVdyYXAucHJvdG90eXBlLnRleHQgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHRoaXMubm9kZS50ZXh0Q29udGVudCA9IHRleHRcbiAgcmV0dXJuIHRoaXNcbn1cblxuRG9tV3JhcC5wcm90b3R5cGUudmFsID0gZnVuY3Rpb24oKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoKSB7IHRoaXMubm9kZS52YWx1ZSA9IGFyZ3VtZW50c1swXSB9XG4gIHJldHVybiB0aGlzLm5vZGUudmFsdWVcbn1cblxuRG9tV3JhcC5wcm90b3R5cGUuYWRkQ2xhc3MgPSBmdW5jdGlvbihjbGFzc25hbWUpIHtcbiAgdGhpcy5ub2RlLmNsYXNzTGlzdC5hZGQoY2xhc3NuYW1lKVxuICByZXR1cm4gdGhpc1xufVxuXG5Eb21XcmFwLnByb3RvdHlwZS5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGNsYXNzbmFtZSkge1xuICB0aGlzLm5vZGUuY2xhc3NMaXN0LnJlbW92ZShjbGFzc25hbWUpXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIFJldHVybiBmaXJzdCBwYXJlbnQgZWxlbWVudCBtYXRjaGluZyBzZWxlY3RvclxuRG9tV3JhcC5wcm90b3R5cGUucGFyZW50ID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgdmFyIHQgPSB0aGlzLm5vZGUucGFyZW50RWxlbWVudFxuICB3aGlsZSAodCkge1xuICAgIGlmICh0Lm1hdGNoZXMoc2VsZWN0b3IpKSB7IHJldHVybiBuZXcgRG9tV3JhcCh0KSB9XG4gICAgdCA9IHQucGFyZW50RWxlbWVudFxuICB9XG59XG5cbkRvbVdyYXAucHJvdG90eXBlLmRhdGEgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHJldHVybiB0aGlzLm5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBuYW1lKVxufVxuXG4vKiBUaGlzIGV2ZW50IGhhbmRsZXIgcHJldmVudHMgdGhlIGV2ZW50IGRlZmF1bHQgYWN0aW9uXG4gKiBhbmQgcmV0dXJucyBhIHdyYXBwZWQgZXZlbnQgdGFyZ2V0IGluc3RlYWQgaW4gYWRkaXRpb25cbiAqIHRvIHRoZSBvcmlnaW5hbCBldmVudC5cbiAqXG4gKiBub2RlLm9uKCdldmVudCcsIGZ1bilcbiAqIG5vZGUub24oJ2V2ZW50JywgJy5kZWxlZ2F0ZS1zZWxlY3RvcicsIGZ1bilcbiAqL1xuRG9tV3JhcC5wcm90b3R5cGUub24gPSBmdW5jdGlvbihldmVudG5hbWUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICB2YXIgZm4sIG4gPSB0aGlzLm5vZGVcblxuICBpZiAoXy5pc0Z1bmN0aW9uKHNlbGVjdG9yKSkge1xuICAgIGNhbGxiYWNrID0gc2VsZWN0b3JcbiAgICBmbiA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBjYWxsYmFjayhuZXcgRG9tV3JhcChldi50YXJnZXQpLCBldilcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm4gPSBmdW5jdGlvbihldikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuXG4gICAgICB2YXIgaSwgYywgdCA9IGV2LnRhcmdldCxcbiAgICAgICAgICBjYW5kaWRhdGVzID0gbi5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSxcbiAgICAgICAgICBsZW5ndGggPSBjYW5kaWRhdGVzLmxlbmd0aFxuXG4gICAgICB3aGlsZSAodCkge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgdGFyZ2V0IG9yIG9uZSBvZiB0aGVpciBwYXJlbnRzIGlzIGVxdWFsXG4gICAgICAgIC8vIHRvIGFueSBub2RlIG1hdGNoZWQgd2l0aCB0aGUgZGVsZWdhdGUgc2VsZWN0b3IuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgIGMgPSBjYW5kaWRhdGVzW2ldXG4gICAgICAgICAgaWYgKGMuaXNFcXVhbE5vZGUodCkpIHsgcmV0dXJuIGNhbGxiYWNrKG5ldyBEb21XcmFwKGMpLCBldikgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm8gbmVlZCB0byBjaGVjayBmdXJ0aGVyIHRoYW4gdGhlIG5vZGUgbiAoZXZlbnQgbGlzdGVuZXIpXG4gICAgICAgIGlmICh0LmlzRXF1YWxOb2RlKG4pKSB7IHJldHVybiB9XG5cbiAgICAgICAgdCA9IHQucGFyZW50RWxlbWVudFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG4uYWRkRXZlbnRMaXN0ZW5lcihldmVudG5hbWUsIGZuKVxuXG4gIHRoaXMubGlzdGVuZXJzLnB1c2goe2V2ZW50bmFtZTogZXZlbnRuYW1lLCBmbjogZm59KVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIGNhbGwgd2l0aG91dCBwYXJhbWV0ZXJzIGZvciByZW1vdmluZyBhbGwgbGlzdGVuZXJzLlxuRG9tV3JhcC5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24oZXZlbnRuYW1lLCBjYWxsYmFjaykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZG9uJ3Qgd29ycnkgYWJvdXQgcmVtb3ZpbmcgZnJvbSB0aGlzLmxpc3RlbmVycywgcmVtb3ZpbmcgdHdpY2UgaXNcbiAgICAgIC8vIGhhcm1sZXNzIGFuZCB0aGlzIG9iamVjdCBzaG91bGQgYmUgc2hvcnQgbGl2ZWQuXG4gICAgICB0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudG5hbWUsIGNhbGxiYWNrKVxuICB9IGVsc2Uge1xuICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZGF0YS5ldmVudG5hbWUsIGRhdGEuZm4pXG4gICAgfSwgdGhpcylcbiAgICB0aGlzLmxpc3RlbmVycyA9IFtdXG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5vZGUsIHNlbGVjdG9yKSB7XG4gIHJldHVybiBuZXcgRG9tV3JhcChub2RlLCBzZWxlY3Rvcilcbn1cbiIsIi8qXG4gKiBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3R4Y2hlbi9yaW90LWhuL2Jsb2IvZ2gtcGFnZXMvc3JjL2ZpbHRlcnMuanNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkYXRlKSB7XG4gIHZhciBiZXR3ZWVuID0gKERhdGUubm93KCkgLSBkYXRlKSAvIDEwMDBcblxuICBpZiAoYmV0d2VlbiA8IDApIHtcbiAgICByZXR1cm4gJ3JlY2VudGx5JyAvLyBPTUcgaXQgY29tZXMgZm9ybSB0aGUgZnV0dXJlISA6LXBcblxuICB9IGlmIChiZXR3ZWVuIDwgMzYwMCkge1xuICAgIHJldHVybiB+fihiZXR3ZWVuIC8gNjApICsgJyBtaW51dGVzIGFnbydcblxuICB9IGVsc2UgaWYgKGJldHdlZW4gPCA4NjQwMCkge1xuICAgIHJldHVybiB+fihiZXR3ZWVuIC8gMzYwMCkgKyAnIGhvdXJzIGFnbydcbiAgfVxuXG4gIHJldHVybiB+fihiZXR3ZWVuIC8gODY0MDApICsgJyBkYXlzIGFnbydcbn07XG4iLCJ2YXIgdXJscmVnZXggPSAveW91dHViZS5jb20uK1xcP3Y9KFthLXpBLXowLTlcXC1fXSspL2lcblxuZXhwb3J0cy5leHRyYWN0RW1iZWQgPSBmdW5jdGlvbih1cmwpIHtcbiAgdmFyIG1hdGNoID0gdXJscmVnZXguZXhlYyh1cmwpXG5cbiAgaWYgKG1hdGNoICYmIG1hdGNoLmxlbmd0aCkge1xuICAgIHJldHVybiB7dHlwZTogJ3lvdXR1YmUnLCB1cmw6IHVybCwgdmlkZW9JZDogbWF0Y2hbMV19XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHt0eXBlOiAndW5rbm93bicsIHVybDogdXJsfVxuICB9XG59XG4iLCJyZXF1aXJlKCcuL2FwcC91c2VyJykuc2V0dXBDdXJyZW50KCkgLy8gQ3JlYXRlIGluc3RhbmNlIG9mIGN1cnJlbnQgdXNlci5cblxuLy8gTW9kdWxlcyBkaXNwbGF5ZWQgYWxsIHRoZSB0aW1lOlxudmFyXG4gIE1lc3NhZ2UgPSByZXF1aXJlKCcuL21vZHVsZXMvbWVzc2FnZS9tZXNzYWdlJyksXG4gIE5hdmlnYXRpb24gPSByZXF1aXJlKCcuL21vZHVsZXMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uJyksXG4gIE1haW4gPSByZXF1aXJlKCcuL21vZHVsZXMvbWFpbi9tYWluJylcblxudmFyXG4gIG1haW4gPSBuZXcgTWFpbihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwLW1haW4nKSksXG4gIG1zZyA9IG5ldyBNZXNzYWdlKG1haW4sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAtbWVzc2FnZScpKSxcbiAgbmF2ID0gbmV3IE5hdmlnYXRpb24obWFpbiwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcC1uYXZpZ2F0aW9uJykpXG5cbnZhciByaW90ID0gcmVxdWlyZSgncmlvdCcpXG5cbnZhciByb3V0ZXIgPSBtYWluLnJvdXRlci5iaW5kKG1haW4pIC8vIHJpb3QgbWlzc2VzIHRoZSBjb250ZXh0IG90aGVyd2lzZS5cblxucmlvdC5yb3V0ZShyb3V0ZXIpIC8vIFNldHVwIGEgcm91dGVyIGhhbmRsZXIgKGhhc2hjaGFuZ2UgZXZlbnQpXG5yaW90LnJvdXRlLmV4ZWMocm91dGVyKSAvLyBDYWxsIHRoZSByb3V0ZXIgdy9vIHdhaXRpbmcgZm9yIGEgaGFzaGNoYW5nZSAoc3RhcnRzIHRoZSBhcHAhKVxuIiwidmFyIF8gPSB7ZXNjYXBlOiByZXF1aXJlKFwibG9kYXNoLmVzY2FwZVwiKX07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iail7XG52YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4scHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcbndpdGgob2JqfHx7fSl7XG5fX3ArPSc8bWFpbiBjbGFzcz1cIm1haW4gYXBwLWZyb250XCIgcm9sZT1cIm1haW5cIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS13aWR0aFwiIHNyYz1cIi9hc3NldHMvbXVzaWMuanBnXCI+PGRpdiBjbGFzcz1cImZyb250LWNvcHlcIj48aDE+QSBtaWNybyBCbG9nIGZvciB5b3VyIGZhdm9yaXRlIE11c2ljITwvaDE+PHA+U2hhcmUgeW91ciBmYXZvcml0ZSBtdXNpYyBhbmQgdmlkZW9zIHdpdGggeW91ciBmcmllbmRzLjxicj5XaXRoIE11c2lGYXZzIHlvdSBjYW4gZW1iZWQgY29udGVudCBmcm9tIFlvdVR1YmUsIFNvdW5kQ2xvdWQsIGFuZCBtb3JlLCBpbiBhIHNpbmdsZSBwbGFjZSE8L3A+PGgyPkxhdGVzdCBQb3N0czwvaDI+PHVsIGNsYXNzPVwicG9zdC1saXN0IGxhdGVzdC1wb3N0c1wiPjwvdWw+PGgyPkxhdGVzdCBGYXZvcml0ZWQ8L2gyPjx1bCBjbGFzcz1cInBvc3QtbGlzdCBsYXRlc3QtZmF2c1wiPjwvdWw+PC9kaXY+PC9tYWluPic7XG59XG5yZXR1cm4gX19wO1xufTtcbiIsInZhclxuICAkID0gcmVxdWlyZSgnLi4vLi4vbGliL2RvbVdyYXAnKSxcbiAgUG9zdCA9IHJlcXVpcmUoJy4uLy4uL2FwcC9wb3N0JyksXG4gIGl0ZW1zdHBsID0gcmVxdWlyZSgnLi9wb3N0LWl0ZW1zLmh0bWwnKSxcbiAgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2Zyb250Lmh0bWwnKVxuXG5mdW5jdGlvbiBGcm9udChwYXJlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgbm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZShvcHRpb25zKVxuXG4gIHRoaXMucGFyZW50ID0gcGFyZW50XG5cbiAgdGhpcy5ub2RlcyA9IHtcbiAgICByb290ICAgICAgOiAkKG5vZGUpLFxuICAgIHBvc3RzICAgICA6ICQobm9kZSwgJy5sYXRlc3QtcG9zdHMnKSxcbiAgICBmYXZvcml0ZWQgOiAkKG5vZGUsICcubGF0ZXN0LWZhdnMnKVxuICB9XG5cbiAgdGhpcy5oYW5kbGVQb3N0cyA9IGZ1bmN0aW9uKGNvbGxlY3Rpb24sIHBvc3RzKSB7XG4gICAgdGhpcy5ub2Rlc1tjb2xsZWN0aW9uXS5odG1sKGl0ZW1zdHBsKHsgcG9zdHM6IHBvc3RzIH0pKVxuICB9LmJpbmQodGhpcylcblxuICBQb3N0Lm9uKCdzdG9yZTpwb3N0czpkaWQ6bGF0ZXN0JywgdGhpcy5oYW5kbGVQb3N0cylcblxuICBQb3N0LmxhdGVzdCgncG9zdHMnKVxuICBQb3N0LmxhdGVzdCgnZmF2b3JpdGVkJylcbn1cblxuRnJvbnQucHJvdG90eXBlLnVubG9hZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm5vZGVzLnJvb3QuaHRtbCgnJylcbiAgUG9zdC5vZmYoJ3N0b3JlOnBvc3RzOmRpZDpsYXRlc3QnLCB0aGlzLmhhbmRsZVBvc3RzKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZyb250XG4iLCJ2YXIgXyA9IHtlc2NhcGU6IHJlcXVpcmUoXCJsb2Rhc2guZXNjYXBlXCIpfTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKXtcbnZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xud2l0aChvYmp8fHt9KXtcbl9fcCs9Jyc7XG4gcG9zdHMuZm9yRWFjaChmdW5jdGlvbihwb3N0KSB7IFxuX19wKz0nPGxpPjxpIGNsYXNzPVwiZmEgZmEtcGxheVwiPjwvaT4mbmJzcDsnK1xuKChfX3Q9KCBwb3N0LnRpdGxlICkpPT1udWxsPycnOl9fdCkrXG4nIHBvc3RlZCBieSZuYnNwOyA8YSBocmVmPVwiIycrXG4oKF9fdD0oIHBvc3QudWlkICkpPT1udWxsPycnOl9fdCkrXG4nL3Bvc3RzXCI+JytcbigoX190PSggcG9zdC51c2VyTmFtZSApKT09bnVsbD8nJzpfX3QpK1xuJyZuYnNwOzxpIGNsYXNzPVwiZmEgZmEtY2hpbGRcIj48L2k+PC9hPiAmbmJzcDsgPHNwYW4gY2xhc3M9XCJ0aW1lYWdvXCI+KCcrXG4oKF9fdD0oIHBvc3QudGltZWFnbygpICkpPT1udWxsPycnOl9fdCkrXG4nKTwvc3Bhbj48L2xpPic7XG4gfSkgXG5fX3ArPScnO1xufVxucmV0dXJuIF9fcDtcbn07XG4iLCJ2YXIgXyA9IHtlc2NhcGU6IHJlcXVpcmUoXCJsb2Rhc2guZXNjYXBlXCIpfTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKXtcbnZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xud2l0aChvYmp8fHt9KXtcbl9fcCs9JzxtYWluIGNsYXNzPVwibWFpblwiIHJvbGU9XCJtYWluXCI+PGRpdiBjbGFzcz1cImZyb250LWNvcHlcIj48aDE+TG9nIEluPC9oMT48cD5JbiBvcmRlciB0byBpbnRlcmFjdCB3aXRoIE11c2lGYXZzISB5b3VcXCdsbCBuZWVkIHRvIGxvZyBpbiBmaXJzdC48L3A+PHA+UGxlYXNlIHNlbGVjdCBvbmUgb2YgdGhlIHNlcnZpY2VzIGJlbG93IHRvIGxvZyBpbjo8L3A+PHVsIGNsYXNzPVwibG9naW4tbGlua3MgZmEtdWwgZmEtMnhcIj48bGk+PGkgY2xhc3M9XCJmYS1saSBmYSBmYS10d2l0dGVyLXNxdWFyZVwiPjwvaT4gPGEgaHJlZj1cIiNcIiBpZD1cInR3aXR0ZXItbG9naW5cIj5Ud2l0dGVyPC9hPjwvbGk+PGxpPjxpIGNsYXNzPVwiZmEtbGkgZmEgZmEtZ29vZ2xlLXBsdXMtc3F1YXJlXCI+PC9pPiA8YSBocmVmPVwiI1wiIGlkPVwiZ29vZ2xlLWxvZ2luXCI+R29vZ2xlPC9hPiA8c21hbGw+KFNvcnJ5LCB1bmF2YWlsYWJsZSBhdCB0aGUgbW9tZW50KTwvc21hbGw+PC9saT48bGk+PGkgY2xhc3M9XCJmYS1saSBmYSBmYS1mYWNlYm9vay1zcXVhcmVcIj48L2k+IDxhIGhyZWY9XCIjXCIgaWQ9XCJmYWNlYm9vay1sb2dpblwiPkZhY2Vib29rPC9hPiA8c21hbGw+KFNvcnJ5LCB1bmF2YWlsYWJsZSBhdCB0aGUgbW9tZW50KTwvc21hbGw+PC9saT48L3VsPjwvZGl2PjwvbWFpbj4nO1xufVxucmV0dXJuIF9fcDtcbn07XG4iLCJ2YXJcbiAgJCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9kb21XcmFwJyksXG4gIFVzZXIgPSByZXF1aXJlKCcuLi8uLi9hcHAvdXNlcicpLFxuICB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vbG9naW4uaHRtbCcpXG5cbmZ1bmN0aW9uIExvZ2luKHBhcmVudCwgbm9kZSwgb3B0aW9ucykge1xuICBub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKG9wdGlvbnMpXG5cbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnRcblxuICB0aGlzLm5vZGVzID0ge1xuICAgIHJvb3Q6ICQobm9kZSksXG4gICAgbGlzdDogJChub2RlLCAnLmxvZ2luLWxpbmtzJylcbiAgfVxuXG4gIHRoaXMubG9naW5MaXN0ZW5lciA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuaWQgPT0gJ3R3aXR0ZXItbG9naW4nKSB7XG4gICAgICBVc2VyLmxvZ2luKCd0d2l0dGVyJylcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHAgPSB0aGlzLnBhcmVudFxuICAgICAgcC5tZXNzYWdlKCdTb3JyeSwgYXV0aGVudGljYXRpbmcgd2l0aCB0aGlzIHByb3ZpZGVyIGlzIG5vdCBhdmFpbGFibGUgeWV0LicpXG4gICAgfVxuICB9LmJpbmQodGhpcylcblxuICB0aGlzLm5vZGVzLmxpc3Qub24oJ2NsaWNrJywgdGhpcy5sb2dpbkxpc3RlbmVyKVxufVxuXG5Mb2dpbi5wcm90b3R5cGUudW5sb2FkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubm9kZXMubGlzdC5vZmYoJ2NsaWNrJywgdGhpcy5sb2dpbkxpc3RlbmVyKVxuICB0aGlzLm5vZGVzLnJvb3QuaHRtbCgnJylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMb2dpblxuIiwidmFyXG4gIFVzZXIgPSByZXF1aXJlKCcuLi8uLi9hcHAvdXNlcicpLFxuICByaW90ID0gcmVxdWlyZSgncmlvdCcpXG5cbnJlcXVpcmUoJy4uL2Zyb250L2Zyb250JylcbnJlcXVpcmUoJy4uL2xvZ2luL2xvZ2luJylcbnJlcXVpcmUoJy4uL3VzZXIvdXNlcicpXG5cbmZ1bmN0aW9uIE1haW4ocm9vdE5vZGUpIHtcbiAgcmlvdC5vYnNlcnZhYmxlKHRoaXMpIC8vIG1haW4gY2FuIGxpc3RlbiB0byBldmVudHMuXG5cbiAgdmFyIG0gPSB0aGlzXG5cbiAgbS5yb290Tm9kZSA9IHJvb3ROb2RlXG5cbiAgbS5vbignbW9kdWxlOnVzZXI6ZmFpbGVkOmxvb2t1cCcsIGZ1bmN0aW9uKCl7XG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnJyAvLyBcInJlZGlyZWN0XCIgaG9tZS5cbiAgICBtLm1lc3NhZ2UoJ1NvcnJ5LCB3ZSBjb3VsZCBub3QgZmluZCB0aGF0IHVzZXIuJylcbiAgfSlcblxuICBtLm9uKCdtb2R1bGU6bmF2aWdhdGlvbjpkaWQ6bmV3cG9zdCcsIGZ1bmN0aW9uKHVzZXIpe1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCAhPSAnI21lL3Bvc3RzJykge1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnbWUvcG9zdHMnXG4gICAgICBtLnNob3dOZXdQb3N0ID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBtLmxhc3Rtb2Quc2hvd05ld1Bvc3QoKVxuICAgIH1cbiAgfSlcblxuICBtLm9uKCdtb2R1bGU6dXNlcjpkaWQ6bG9va3VwJywgZnVuY3Rpb24odWlkLCB1c2VyKSB7XG4gICAgaWYgKG0uc2hvd05ld1Bvc3QpIHtcbiAgICAgIG0ubGFzdG1vZC5zaG93TmV3UG9zdCgpXG4gICAgICBtLnNob3dOZXdQb3N0ID0gZmFsc2VcbiAgICB9XG4gIH0pXG5cbiAgVXNlci5vbignc3RvcmU6dXNlcnM6ZGlkOmxvZ2luJywgZnVuY3Rpb24odXNlcikge1xuICAgIG0ubWVzc2FnZSgnVGhhbmsgeW91ISBZb3UgaGF2ZSBiZWVuIGxvZ2dlZCBpbi4nKVxuICAgIHVzZXIudXBkYXRlKClcbiAgfSlcblxuICBVc2VyLm9uKCdzdG9yZTp1c2VyczpkaWQ6dXBkYXRlJywgZnVuY3Rpb24odXNlcikge1xuICAgIG0ucm91dGVyKHVzZXIudWlkLCAncG9zdHMnKSAvLyBcInJlZGlyZWN0XCIgdG8gdGhlIHVzZXIgcG9zdHMgc2NyZWVuLlxuICB9KVxuXG4gIFVzZXIub24oJ3N0b3JlOnVzZXJzOmRpZDpsb2dvdXQnLCBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJycgLy8gXCJyZWRpcmVjdFwiIGhvbWUuXG4gICAgbS5tZXNzYWdlKCdZb3VcXCd2ZSBiZWVuIGxvZ2dlZCBvdXQuJylcbiAgfSlcbn1cblxuTWFpbi5wcm90b3R5cGUubWVzc2FnZSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgdGhpcy50cmlnZ2VyKCdtb2R1bGU6bWVzc2FnZTpkbzptZXNzYWdlJywgdGV4dClcbn1cblxuTWFpbi5wcm90b3R5cGUubG9hZG1vZCA9IGZ1bmN0aW9uKG5hbWUsIG9wdGlvbnMpIHtcbiAgdmFyIG0gPSB0aGlzLCBDdG9yID0gcmVxdWlyZSgnLi4vJyArIG5hbWUgKyAnLycgKyBuYW1lKVxuICBpZiAobS5sYXN0bW9kKSB7IG0ubGFzdG1vZC51bmxvYWQoKSB9XG4gIG0ubGFzdG1vZCA9IG5ldyBDdG9yKG0sIG0ucm9vdE5vZGUsIG9wdGlvbnMpXG59XG5cbi8qXG4gKiBQYXJhbWV0ZXJzIHRvIHRoaXMgZnVuY3Rpb24gY29tZSBmcm9tIHRoZSByb3V0ZXIgKHJpb3Qucm91dGUpLFxuICogcGFyc2VkIGZyb20gdGhlIGxvY2F0aW9uIGhhc2guXG4gKi9cbk1haW4ucHJvdG90eXBlLnJvdXRlciA9IGZ1bmN0aW9uKF91aWQsIGFjdGlvbiwgcG9zdGlkKSB7XG4gIHRoaXMudHJpZ2dlcignbW9kdWxlOm1haW46ZGlkOnJvdXRlcicpXG5cbiAgdmFyIG0gPSB0aGlzLCB1c2VyID0gVXNlci5jdXJyZW50XG4gIHZhciB1aWQgPSAoX3VpZCA9PSAnbWUnKSA/IHVzZXIudWlkIDogX3VpZFxuXG4gIHN3aXRjaChhY3Rpb24pIHtcbiAgY2FzZSAncG9zdHMnOlxuICBjYXNlICdmYXZvcml0ZXMnOlxuXG4gICAgaWYgKF91aWQgPT0gJ21lJyAmJiAhdXNlci5sb2dnZWQpIHtcbiAgICAgIG0ubG9hZG1vZCgnbG9naW4nKVxuICAgICAgbS5tZXNzYWdlKCdQbGVhc2UgbG9naW4gdG8gYWNjZXNzIHlvdXIgcG9zdHMuJylcblxuICAgIH0gZWxzZSB7XG4gICAgICBtLmxvYWRtb2QoJ3VzZXInLCB7dWlkOiB1aWQsIGFjdGlvbjogYWN0aW9ufSlcbiAgICB9XG5cbiAgYnJlYWtcbiAgY2FzZSAnbG9nb3V0JzpcblxuICAgIGlmICh1c2VyLmxvZ2dlZCkge1xuICAgICAgVXNlci5sb2dnb3V0KClcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnJ1xuICAgIH1cblxuICBicmVha1xuICBkZWZhdWx0OlxuICAgIG0ubG9hZG1vZCgnZnJvbnQnKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWFpblxuIiwidmFyIF8gPSB7ZXNjYXBlOiByZXF1aXJlKFwibG9kYXNoLmVzY2FwZVwiKX07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iail7XG52YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4scHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcbndpdGgob2JqfHx7fSl7XG5fX3ArPSc8c3BhbiBjbGFzcz1cImFwcC1tZXNzYWdlLXRleHRcIj48L3NwYW4+PGRpdiBjbGFzcz1cImFwcC1tZXNzYWdlLWRpc21pc3NcIj48YSBocmVmPVwiI1wiIGNsYXNzPVwiYXBwLW1lc3NhZ2UtZGlzbWlzc1wiPkRpc21pc3M8L2E+PC9kaXY+Jztcbn1cbnJldHVybiBfX3A7XG59O1xuIiwidmFyXG4gICQgPSByZXF1aXJlKCcuLi8uLi9saWIvZG9tV3JhcCcpLFxuICB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vbWVzc2FnZS5odG1sJylcblxuZnVuY3Rpb24gTWVzc2FnZShwYXJlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgbm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZShvcHRpb25zKVxuXG4gIHRoaXMucGFyZW50ID0gcGFyZW50XG5cbiAgdGhpcy5ub2RlcyA9IHtcbiAgICByb290IDogJChub2RlKSxcbiAgICB0ZXh0IDogJChub2RlLCAnLmFwcC1tZXNzYWdlLXRleHQnKSxcbiAgICBkaXNtIDogJChub2RlLCAnLmFwcC1tZXNzYWdlLWRpc21pc3MnKVxuICB9XG5cbiAgdGhpcy5tYWluRG9NZXNzYWdlTGlzdGVuZXIgPSBmdW5jdGlvbih0ZXh0KXtcbiAgICB0aGlzLnNob3codGV4dClcbiAgfS5iaW5kKHRoaXMpXG5cbiAgdGhpcy5wYXJlbnQub24oJ21vZHVsZTptZXNzYWdlOmRvOm1lc3NhZ2UnLCB0aGlzLm1haW5Eb01lc3NhZ2VMaXN0ZW5lcilcblxuICB0aGlzLm5vZGVzLmRpc20ub24oJ2NsaWNrJywgZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgdGhpcy5kaXNtaXNzKClcbiAgfS5iaW5kKHRoaXMpKVxufVxuXG5NZXNzYWdlLnByb3RvdHlwZS51bmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wYXJlbnQub2ZmKCdtb2R1bGU6bWFpbjpkbzptZXNzYWdlJywgdGhpcy5tYWluRG9NZXNzYWdlTGlzdGVuZXIpXG4gIHRoaXMubm9kZXMuZGlzbS5vZmYoKVxuICB0aGlzLm5vZGVzLnJvb3QuaHRtbCgnJylcbn1cblxuTWVzc2FnZS5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgdGhpcy5ub2Rlcy5yb290LnJlbW92ZUNsYXNzKCdhcHAtaGlkZGVuJylcbiAgdGhpcy5ub2Rlcy50ZXh0LnRleHQobWVzc2FnZSlcbn1cblxuTWVzc2FnZS5wcm90b3R5cGUuZGlzbWlzcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm5vZGVzLnJvb3QuYWRkQ2xhc3MoJ2FwcC1oaWRkZW4nKVxuICB0aGlzLm5vZGVzLnRleHQudGV4dCgnJylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNZXNzYWdlXG4iLCJ2YXIgXyA9IHtlc2NhcGU6IHJlcXVpcmUoXCJsb2Rhc2guZXNjYXBlXCIpfTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKXtcbnZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xud2l0aChvYmp8fHt9KXtcbl9fcCs9JzxuYXYgY2xhc3M9XCJuYXZpZ2F0aW9uXCI+PHVsIGNsYXNzPVwibmF2LWFjdGlvbnNcIiByb2xlPVwibmF2aWdhdGlvblwiPjxsaT48YSBpZD1cIm5hdi1uZXdwb3N0XCIgaHJlZj1cIiNcIj5OZXcgUG9zdDwvYT48L2xpPjxsaT48YSBocmVmPVwiI21lL3Bvc3RzXCI+TXkgUG9zdHM8L2E+PC9saT48bGk+PGEgaHJlZj1cIiNtZS9mYXZvcml0ZXNcIj5NeSBGYXZvcml0ZXM8L2E+PC9saT48bGk+PGEgaWQ9XCJuYXYtbG9nb3V0XCIgaHJlZj1cIiNtZS9sb2dvdXRcIj5Mb2cgT3V0PC9hPjwvbGk+PC91bD48L25hdj4nO1xufVxucmV0dXJuIF9fcDtcbn07XG4iLCJ2YXJcbiAgJCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9kb21XcmFwJyksXG4gIFVzZXIgPSByZXF1aXJlKCcuLi8uLi9hcHAvdXNlcicpLFxuICByaW90ID0gcmVxdWlyZSgncmlvdCcpLFxuICB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vbmF2aWdhdGlvbi5odG1sJylcblxuZnVuY3Rpb24gTmF2aWdhdGlvbihwYXJlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgbm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZShvcHRpb25zKVxuXG4gIHZhciBuID0gdGhpc1xuXG4gIG4ucGFyZW50ID0gcGFyZW50XG5cbiAgbi5ub2RlcyA9IHtcbiAgICByb290ICAgIDogJChub2RlKSxcbiAgICBsb2dvdXQgIDogJChub2RlLCAnI25hdi1sb2dvdXQnKSxcbiAgICBuZXdwb3N0IDogJChub2RlLCAnI25hdi1uZXdwb3N0JylcbiAgfVxuXG4gIG4udXBkYXRlTG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKFVzZXIuY3VycmVudC5sb2dnZWQpIHsgbi5zaG93TG9nb3V0KCkgfSBlbHNlIHsgbi5oaWRlTG9nb3V0KCkgfVxuICB9XG5cbiAgbi5uZXdwb3N0TGlzdGVuZXIgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICBuLnBhcmVudC50cmlnZ2VyKCdtb2R1bGU6bmF2aWdhdGlvbjpkaWQ6bmV3cG9zdCcpXG4gIH1cblxuICBuLnBhcmVudC5vbignbW9kdWxlOm1haW46ZGlkOnJvdXRlcicsIG4udXBkYXRlTG9nb3V0KVxuICBuLm5vZGVzLm5ld3Bvc3Qub24oJ2NsaWNrJywgbi5uZXdwb3N0TGlzdGVuZXIpXG59XG5cbk5hdmlnYXRpb24ucHJvdG90eXBlLnVubG9hZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbiA9IHRoaXNcbiAgbi5wYXJlbnQub2ZmKCdtb2R1bGU6bWFpbjpkaWQ6cm91dGVyJywgbi51cGRhdGVMb2dvdXQpXG4gIG4ubm9kZXMubmV3cG9zdC5vbignY2xpY2snLCBuLm5ld3Bvc3RMaXN0ZW5lcilcbiAgbi5ub2Rlcy5yb290Lmh0bWwoJycpXG59XG5cbk5hdmlnYXRpb24ucHJvdG90eXBlLnNob3dMb2dvdXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5ub2Rlcy5sb2dvdXQucmVtb3ZlQ2xhc3MoJ2FwcC1oaWRkZW4nKVxufVxuXG5OYXZpZ2F0aW9uLnByb3RvdHlwZS5oaWRlTG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubm9kZXMubG9nb3V0LmFkZENsYXNzKCdhcHAtaGlkZGVuJylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBOYXZpZ2F0aW9uXG4iLCJ2YXIgXyA9IHtlc2NhcGU6IHJlcXVpcmUoXCJsb2Rhc2guZXNjYXBlXCIpfTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKXtcbnZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xud2l0aChvYmp8fHt9KXtcbl9fcCs9JzxoMj4nK1xuKChfX3Q9KCBzdG9yZWQgPyAnRWRpdGluZyBQb3N0JyA6ICdOZXcgUG9zdCcgKSk9PW51bGw/Jyc6X190KStcbic8L2gyPjxwPlBsZWFzZSBwcm92aWRlIHRoZSByZXNvdXJjZSB1cmwgdG8gc2hhcmUsIGEgdGl0bGUgYW5kIGEgZGVzY3JpcHRpb24uPC9wPjxkaXYgY2xhc3M9XCJwb3N0LWZvcm0tZW1iZWRcIj48bGFiZWw+RW1iZWQgVXJsIChlLmcuIFlvdVR1YmUgVXJsKTwvbGFiZWw+PGlucHV0IG5hbWU9XCJ1cmxcIiB0eXBlPVwidXJsXCIgcGxhY2Vob2xkZXI9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PVA5SjV0WVNoTlk4XCI+PC9kaXY+PGRpdiBjbGFzcz1cInBvc3QtZm9ybS1kYXRhXCI+PGlucHV0IG5hbWU9XCJ0aXRsZVwiIHRpdGxlPVwiUG9zdCBUaXRsZVwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJUaXRsZVwiPjx0ZXh0YXJlYSB0aXRsZT1cIlBvc3QgRGVzY3JpcHRpb25cIiBwbGFjZWhvbGRlcj1cIkRlc2NyaXB0aW9uXCI+PC90ZXh0YXJlYT48L2Rpdj48ZGl2IGNsYXNzPVwicG9zdC1hY3Rpb25zXCIgZGF0YS1wb3N0LWtleT1cIicrXG4oKF9fdD0oIHBvc3RLZXkgKSk9PW51bGw/Jyc6X190KStcbidcIj48YSBjbGFzcz1cInVuZG9cIiB0aXRsZT1cIlVuZG9cIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmEgZmEtdGltZXMtY2lyY2xlXCI+PC9pPiZuYnNwO0NhbmNlbDwvYT4gPGEgY2xhc3M9XCJzYXZlXCIgdGl0bGU9XCJTYXZlIGFuZCBQdWJsaXNoXCIgaHJlZj1cIiNcIj48aSBjbGFzcz1cImZhIGZhLXNhdmVcIj48L2k+Jm5ic3A7U2F2ZTwvYT4gPHNwYW4gY2xhc3M9XCJwb3N0LWVkaXQtbWVzc2FnZVwiPjwvc3Bhbj48L2Rpdj4nO1xufVxucmV0dXJuIF9fcDtcbn07XG4iLCJ2YXIgXyA9IHtcbiAgbWVyZ2UgIDogcmVxdWlyZSgnbG9kYXNoL29iamVjdC9tZXJnZScpLFxuICB2YWx1ZXMgOiByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L3ZhbHVlcycpXG59XG5cbnZhclxuICAkID0gcmVxdWlyZSgnLi4vLi4vbGliL2RvbVdyYXAnKSxcbiAgUG9zdCA9IHJlcXVpcmUoJy4uLy4uL2FwcC9wb3N0JyksXG4gIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9mb3JtLmh0bWwnKVxuXG5mdW5jdGlvbiBQb3N0Rm9ybShwYXJlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnRcbiAgdGhpcy5wb3N0ID0gbmV3IFBvc3Qob3B0aW9ucy5wb3N0KVxuXG4gIHZhciByID0gJChub2RlKS5odG1sKHRlbXBsYXRlKF8ubWVyZ2Uoe1xuICAgIHBvc3RLZXk6IHRoaXMucG9zdC5rZXkgfHwgJ25ldydcbiAgfSwgdGhpcy5wb3N0KSkpXG5cbiAgdGhpcy5ub2RlcyA9IHtcbiAgICByb290OiByLFxuICAgIGZvcm1NZXNzYWdlOiAkKG5vZGUsICcucG9zdC1lZGl0LW1lc3NhZ2UnKSxcbiAgICBpbnB1dFRpdGxlOiAkKG5vZGUsICdpbnB1dFtuYW1lPXRpdGxlXScpLFxuICAgIGlucHV0VXJsOiAkKG5vZGUsICdpbnB1dFtuYW1lPXVybF0nKSxcbiAgICBpbnB1dERlc2M6ICQobm9kZSwgJ3RleHRhcmVhJylcbiAgfVxuXG4gIHIuYWRkQ2xhc3MoJ2FwcC1wb3N0LWZvcm0nKVxuXG4gIHRoaXMudXBkYXRlRm9ybSgpXG59XG5cblBvc3RGb3JtLnByb3RvdHlwZS51bmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5ub2Rlcy5yb290LnJlbW92ZUNsYXNzKCdhcHAtcG9zdC1mb3JtJykuaHRtbCgnJylcbn1cblxuUG9zdEZvcm0ucHJvdG90eXBlLnVwZGF0ZUZvcm0gPSBmdW5jdGlvbigpIHtcbiAgdmFyIG4gPSB0aGlzLm5vZGVzLCBwID0gdGhpcy5wb3N0XG4gIG4uaW5wdXRUaXRsZS52YWwocC50aXRsZSlcbiAgbi5pbnB1dFVybC52YWwocC5lbWJlZC51cmwgfHwgJycpXG4gIG4uaW5wdXREZXNjLnZhbChwLmRlc2MpXG59XG5cblBvc3RGb3JtLnByb3RvdHlwZS51cGRhdGVQb3N0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBuID0gdGhpcy5ub2Rlc1xuICB0aGlzLnBvc3Quc2V0YXR0cih7XG4gICAgdGl0bGU6IG4uaW5wdXRUaXRsZS52YWwoKSxcbiAgICBlbWJlZDoge3VybDogbi5pbnB1dFVybC52YWwoKSB9LFxuICAgIGRlc2M6IG4uaW5wdXREZXNjLnZhbCgpXG4gIH0pXG59XG5cblBvc3RGb3JtLnByb3RvdHlwZS5pc1ZhbGlkID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXN1bHQgPSB0aGlzLnBvc3QudmFsaWRhdGlvbigpLCBuID0gdGhpcy5ub2Rlc1xuXG4gIG4uaW5wdXRVcmwucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKVxuICBuLmlucHV0VGl0bGUucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKVxuXG4gIGlmIChyZXN1bHQuaXNWYWxpZCkge1xuICAgIHJldHVybiB0cnVlXG4gIH0gZWxzZSB7XG4gICAgaWYgKHJlc3VsdC5lcnJvcnMudXJsKSB7IG4uaW5wdXRVcmwuYWRkQ2xhc3MoJ2ludmFsaWQnKSB9XG4gICAgaWYgKHJlc3VsdC5lcnJvcnMudGl0bGUpIHsgbi5pbnB1dFRpdGxlLmFkZENsYXNzKCdpbnZhbGlkJykgfVxuXG4gICAgdmFyIG1zZyA9IF8udmFsdWVzKHJlc3VsdC5lcnJvcnMpLmpvaW4oJywgJylcbiAgICBuLmZvcm1NZXNzYWdlLnRleHQoJ1NvcnJ5LCB0aGUgcG9zdCBjYW5cXCd0IGJlIHNhdmVkOiAnICsgbXNnICsgJy4nKVxuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0Rm9ybVxuIiwidmFyIF8gPSB7ZXNjYXBlOiByZXF1aXJlKFwibG9kYXNoLmVzY2FwZVwiKX07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iail7XG52YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4scHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcbndpdGgob2JqfHx7fSl7XG5fX3ArPSc8cCBjbGFzcz1cInRpbWVhZ29cIj5wb3N0ZWQgYnkmbmJzcDsnK1xuKChfX3Q9KCB1c2VyTmFtZSApKT09bnVsbD8nJzpfX3QpK1xuJyZuYnNwOycrXG4oKF9fdD0oIHRpbWVhZ28gKSk9PW51bGw/Jyc6X190KStcbic8L3A+PGgyPjxpIGNsYXNzPVwiZmEgZmEtcGxheVwiPjwvaT4mbmJzcDsnK1xuKChfX3Q9KCB0aXRsZSApKT09bnVsbD8nJzpfX3QpK1xuJzwvaDI+PGRpdiBjbGFzcz1cInBvc3Qtc2hvdy1lbWJlZFwiPjxpZnJhbWUgdHlwZT1cInRleHQvaHRtbFwiIHdpZHRoPVwiNjQwXCIgaGVpZ2h0PVwiMjYwXCIgc3JjPVwiaHR0cDovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8nK1xuKChfX3Q9KCBlbWJlZC52aWRlb0lkICkpPT1udWxsPycnOl9fdCkrXG4nXCIgZnJhbWVib3JkZXI9XCIwXCI+PC9pZnJhbWU+PC9kaXY+PHAgY2xhc3M9XCJwb3N0LXNob3ctZGVzY3JpcHRpb25cIj48aSBjbGFzcz1cImZhIGZhLWNoaWxkIGZhLTJ4XCI+PC9pPiZuYnNwOycrXG4oKF9fdD0oIGRlc2MgKSk9PW51bGw/Jyc6X190KStcbic8L3A+PGRpdiBjbGFzcz1cInBvc3QtYWN0aW9uc1wiIGRhdGEtcG9zdC1rZXk9XCInK1xuKChfX3Q9KCBwb3N0S2V5ICkpPT1udWxsPycnOl9fdCkrXG4nXCI+PGEgY2xhc3M9XCJmYXZcIiB0aXRsZT1cIkZhdm9yaXRlXCIgaHJlZj1cIiNcIj48aSBjbGFzcz1cImZhIGZhLWhlYXJ0XCI+PC9pPiZuYnNwO0Zhdm9yaXRlPC9hPiA8YSBjbGFzcz1cImVkaXRcIiB0aXRsZT1cIkVkaXRcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmEgZmEtZWRpdFwiPjwvaT4mbmJzcDtFZGl0PC9hPiA8YSBjbGFzcz1cInJlbW92ZVwiIHRpdGxlPVwiUmVtb3ZlXCIgaHJlZj1cIiNcIj48aSBjbGFzcz1cImZhIGZhLXRyYXNoXCI+PC9pPiZuYnNwO1JlbW92ZTwvYT48L2Rpdj4nO1xufVxucmV0dXJuIF9fcDtcbn07XG4iLCJ2YXJcbiAgJCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9kb21XcmFwJyksXG4gIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9zaG93Lmh0bWwnKVxuXG52YXIgXyA9IHtcbiAgbWVyZ2UgOiByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21lcmdlJylcbn1cblxuZnVuY3Rpb24gUG9zdFNob3cocGFyZW50LCBub2RlLCBvcHRpb25zKSB7XG4gIHRoaXMucGFyZW50ID0gcGFyZW50XG5cbiAgdmFyIHAgPSB0aGlzLnBvc3QgPSBvcHRpb25zLnBvc3RcblxuICBub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKF8ubWVyZ2UocC5nZXRhdHRyKCksIHtcbiAgICBwb3N0S2V5OiBwLmtleSB8fCAnbmV3JyxcbiAgICB0aW1lYWdvOiBwLnRpbWVhZ28oKVxuICB9KSlcblxuICB0aGlzLm5vZGVzID0ge1xuICAgIHJvb3Q6ICQobm9kZSkuYWRkQ2xhc3MoJ2FwcC1wb3N0LXNob3cnKSxcbiAgICBmYXY6ICQobm9kZSwgJy5mYXYnKVxuICB9XG5cbiAgdGhpcy51cGRhdGVGYXYoKVxufVxuXG5Qb3N0U2hvdy5wcm90b3R5cGUudXBkYXRlRmF2ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBwID0gdGhpcy5wb3N0LCBmID0gdGhpcy5ub2Rlcy5mYXZcblxuICBpZiAocC5mYXZvcml0ZWQpIHtcbiAgICBmLmFkZENsYXNzKCdwb3N0LWZhdm9yaXRlZCcpXG4gIH0gZWxzZSB7XG4gICAgZi5yZW1vdmVDbGFzcygncG9zdC1mYXZvcml0ZWQnKVxuICB9XG59XG5cblBvc3RTaG93LnByb3RvdHlwZS51bmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5ub2Rlcy5yb290LnJlbW92ZUNsYXNzKCdhcHAtcG9zdC1zaG93JykuaHRtbCgnJylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0U2hvd1xuIiwidmFyIF8gPSB7ZXNjYXBlOiByZXF1aXJlKFwibG9kYXNoLmVzY2FwZVwiKX07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iail7XG52YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4scHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcbndpdGgob2JqfHx7fSl7XG5fX3ArPSc8ZGl2IGNsYXNzPVwicHJvZmlsZS1pbmZvXCI+PHVsIGNsYXNzPVwiZmEtdWxcIj48bGkgY2xhc3M9XCJwcm9maWxlLXBpY1wiPjxpbWcgc3JjPVwiJytcbigoX190PSh1c2VyLmF2YXRhclVybCkpPT1udWxsPycnOl9fdCkrXG4nXCI+PC9saT48bGk+PGkgY2xhc3M9XCJmYS1saSBmYSBmYS1saW5rXCI+PC9pPiA8YSBocmVmPVwiJytcbigoX190PSh1c2VyLnVybCkpPT1udWxsPycnOl9fdCkrXG4nXCI+JytcbigoX190PSh1c2VyLmRpc3BsYXlOYW1lKSk9PW51bGw/Jyc6X190KStcbic8L2E+PGJyPjwvbGk+PGxpPjxpIGNsYXNzPVwiZmEtbGkgZmEgZmEtdXNlclwiPjwvaT4nK1xuKChfX3Q9KHVzZXIuZGVzY3JpcHRpb24pKT09bnVsbD8nJzpfX3QpK1xuJzwvbGk+PGxpPjxpIGNsYXNzPVwiZmEtbGkgZmEgZmEtbWFwLW1hcmtlclwiPjwvaT4nK1xuKChfX3Q9KHVzZXIubG9jYXRpb24pKT09bnVsbD8nJzpfX3QpK1xuJzwvbGk+PGxpPjxpIGNsYXNzPVwiZmEtbGkgZmEgZmEtdHdpdHRlci1zcXVhcmVcIj48L2k+IDxhIGhyZWY9XCJodHRwczovL3R3aXR0ZXIuY29tLycrXG4oKF9fdD0odXNlci5kaXNwbGF5TmFtZSkpPT1udWxsPycnOl9fdCkrXG4nXCI+QCcrXG4oKF9fdD0odXNlci5kaXNwbGF5TmFtZSkpPT1udWxsPycnOl9fdCkrXG4nPC9hPjwvbGk+PC91bD48L2Rpdj4nO1xufVxucmV0dXJuIF9fcDtcbn07XG4iLCJ2YXIgXyA9IHtlc2NhcGU6IHJlcXVpcmUoXCJsb2Rhc2guZXNjYXBlXCIpfTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKXtcbnZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xud2l0aChvYmp8fHt9KXtcbl9fcCs9Jzxhc2lkZSBjbGFzcz1cInByb2ZpbGVcIj48L2FzaWRlPjxtYWluIGNsYXNzPVwibWFpblwiIHJvbGU9XCJtYWluXCI+PGRpdiBjbGFzcz1cImFwcC1uZXctcG9zdFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJhcHAtcG9zdC1wbGFjZWhvbGRlclwiPjxoMT5IZXkhJm5ic3A7PGkgY2xhc3M9XCJmYSBmYS1jaGlsZFwiPjwvaT4mbmJzcDs8aSBjbGFzcz1cImZhIGZhLXBsYXlcIj48L2k+PC9oMT48cD5UaGlzIHVzZXIgaGFzIG5vdCcrXG4oKF9fdD0oIChhY3Rpb24gPT0gJ3Bvc3RzJykgPyAnIHBvc3RlZCBhbnl0aGluZyAnIDogJyBmYXZvcml0ZWQgYW55IHBvc3QgJyApKT09bnVsbD8nJzpfX3QpK1xuJ3lldC4gUGxlYXNlIGNoZWNrIGJhY2sgbGF0ZXIhPC9wPjwvZGl2PjxkaXYgY2xhc3M9XCJhcHAtcG9zdHNcIj48L2Rpdj48L21haW4+Jztcbn1cbnJldHVybiBfX3A7XG59O1xuIiwidmFyXG4gICQgPSByZXF1aXJlKCcuLi8uLi9saWIvZG9tV3JhcCcpLFxuICBQb3N0ID0gcmVxdWlyZSgnLi4vLi4vYXBwL3Bvc3QnKSxcbiAgVXNlciA9IHJlcXVpcmUoJy4uLy4uL2FwcC91c2VyJyksXG4gIFBvc3RGb3JtID0gcmVxdWlyZSgnLi4vcG9zdC9mb3JtJyksXG4gIFBvc3RTaG93ID0gcmVxdWlyZSgnLi4vcG9zdC9zaG93JyksXG4gIHByb2Z0cGwgPSByZXF1aXJlKCcuL3Byb2ZpbGUuaHRtbCcpLFxuICB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdXNlci5odG1sJylcblxuZnVuY3Rpb24gVXNlck1vZChwYXJlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnRcblxuICB0aGlzLm1vZHMgPSB7fSAvLyBzdG9yZSBQb3N0U2hvdyBhbmQgUG9zdEZvcm0gbW9kdWxlcy5cblxuICB0aGlzLmFjdGlvbiA9IG9wdGlvbnMuYWN0aW9uXG4gIHRoaXMudWlkID0gb3B0aW9ucy51aWRcbiAgdGhpcy5maXJlYmFzZXBhdGggPSAndXNlcl8nICsgdGhpcy5hY3Rpb24gKyAnLycgKyB0aGlzLnVpZFxuXG4gIG5vZGUuaW5uZXJIVE1MID0gdGVtcGxhdGUodGhpcylcblxuICB2YXIgciA9ICQobm9kZSlcblxuICB0aGlzLm5vZGVzID0ge1xuICAgIHJvb3QgICAgICA6IHIsXG4gICAgbmV3cG9zdCAgIDogJChub2RlLCAnLmFwcC1uZXctcG9zdCcpLFxuICAgIHBsYWNlaG9sZCA6ICQobm9kZSwgJy5hcHAtcG9zdC1wbGFjZWhvbGRlcicpLFxuICAgIHBvc3RzICAgICA6ICQobm9kZSwgJy5hcHAtcG9zdHMnKSxcbiAgICBwcm9mICAgICAgOiAkKG5vZGUsICcucHJvZmlsZScpXG4gIH1cblxuICB0aGlzLnVzZXJEaWRMb29rdXAgPSBmdW5jdGlvbih1aWQsIHVzZXIpIHtcbiAgICB0aGlzLnVzZXIgPSB1c2VyXG4gICAgdGhpcy5yZWRyYXdQcm9maWxlKClcbiAgICBQb3N0LnJldHJpZXZlKHRoaXMuZmlyZWJhc2VwYXRoKVxuICAgIHRoaXMucGFyZW50LnRyaWdnZXIoJ21vZHVsZTp1c2VyOmRpZDpsb29rdXAnLCB1aWQsIHVzZXIpXG4gIH0uYmluZCh0aGlzKVxuXG4gIHRoaXMudXNlckZhaWxlZExvb2t1cCA9IGZ1bmN0aW9uICh1aWQpIHtcbiAgICB0aGlzLnBhcmVudC50cmlnZ2VyKCdtb2R1bGU6dXNlcjpmYWlsZWQ6bG9va3VwJywgdWlkKVxuICB9LmJpbmQodGhpcylcblxuICB0aGlzLnBvc3RzRGlkUmV0cmlldmUgPSBmdW5jdGlvbihmaXJlYmFzZXBhdGgsIHBvc3Qpe1xuICAgIHZhciB1ID0gdGhpcywgbSA9IHRoaXMubW9kc1twb3N0LmtleV1cbiAgICBpZiAobSkgeyB1LnNob3dtb2QobSkgfSBlbHNlIHsgdS5hZGRQb3N0KHBvc3QpIH1cbiAgfS5iaW5kKHRoaXMpXG5cbiAgdGhpcy5wb3N0c0RpZFVwZGF0ZSA9IGZ1bmN0aW9uKHBvc3Qpe1xuICAgIHZhciB1ID0gdGhpcywgbSA9IHRoaXMubW9kc1twb3N0LmtleV1cbiAgICBpZiAobSkgeyB1LnNob3dtb2QobSkgfVxuICB9LmJpbmQodGhpcylcblxuICB2YXIgYWN0aW9uTW9kID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgdmFyIGtleSA9IHRhcmdldC5wYXJlbnQoJy5wb3N0LWFjdGlvbnMnKS5kYXRhKCdwb3N0LWtleScpXG4gICAgcmV0dXJuIHRoaXMubW9kc1trZXldXG4gIH0uYmluZCh0aGlzKVxuXG4gIHIub24oJ2NsaWNrJywgJy5mYXYnLCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICB2YXIgbW9kID0gYWN0aW9uTW9kKHRhcmdldClcbiAgICBtb2QucG9zdC50b2dnbGVGYXYoKVxuICAgIFBvc3QudXBkYXRlKG1vZC5wb3N0KVxuICB9LmJpbmQodGhpcykpXG5cbiAgci5vbignY2xpY2snLCAnLmVkaXQnLCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICB2YXIgbW9kID0gYWN0aW9uTW9kKHRhcmdldClcbiAgICB0aGlzLmVkaXRQb3N0KG1vZClcbiAgfS5iaW5kKHRoaXMpKVxuXG4gIHIub24oJ2NsaWNrJywgJy5yZW1vdmUnLCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICB2YXIgbW9kID0gYWN0aW9uTW9kKHRhcmdldClcbiAgICB0aGlzLnJlbW92ZVBvc3QobW9kKVxuICB9LmJpbmQodGhpcykpXG5cbiAgci5vbignY2xpY2snLCAnLnVuZG8nLCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICB2YXIgbW9kID0gYWN0aW9uTW9kKHRhcmdldClcbiAgICBpZiAobW9kLnBvc3Quc3RvcmVkKSB7XG4gICAgICB0aGlzLnNob3dtb2QobW9kKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZGVOZXdQb3N0KClcbiAgICB9XG4gIH0uYmluZCh0aGlzKSlcblxuICByLm9uKCdjbGljaycsICcuc2F2ZScsIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIHZhciBtb2QgPSBhY3Rpb25Nb2QodGFyZ2V0KVxuXG4gICAgbW9kLnVwZGF0ZVBvc3QoKVxuXG4gICAgaWYgKCFtb2QuaXNWYWxpZCgpKSB7XG4gICAgICAvLyBkbyBub3RoaW5nLCB0aGUgZm9ybSB3aWxsIHNob3cgYW4gZXJyb3IgbWVzc2FnZS5cbiAgICB9IGVsc2UgaWYgKG1vZC5wb3N0LnN0b3JlZCkge1xuICAgICAgUG9zdC51cGRhdGUobW9kLnBvc3QpXG4gICAgfSBlbHNlIHtcbiAgICAgIFBvc3QucGVyc2lzdChtb2QucG9zdClcbiAgICAgIHRoaXMuaGlkZU5ld1Bvc3QoKVxuICAgIH1cbiAgfS5iaW5kKHRoaXMpKVxuXG4gIFVzZXIub24oJ3N0b3JlOnVzZXJzOmZhaWxlZDpsb29rdXAnICwgdGhpcy51c2VyRmFpbGVkTG9va3VwKVxuICBVc2VyLm9uKCdzdG9yZTp1c2VyczpkaWQ6bG9va3VwJyAgICAsIHRoaXMudXNlckRpZExvb2t1cClcbiAgUG9zdC5vbignc3RvcmU6cG9zdHM6ZGlkOnJldHJpZXZlJyAgLCB0aGlzLnBvc3RzRGlkUmV0cmlldmUpXG4gIFBvc3Qub24oJ3N0b3JlOnBvc3RzOmRpZDp1cGRhdGUnICAgICwgdGhpcy5wb3N0c0RpZFVwZGF0ZSlcblxuICBVc2VyLmxvb2t1cCh0aGlzLnVpZClcbn1cblxuVXNlck1vZC5wcm90b3R5cGUudW5sb2FkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubm9kZXMucm9vdC5vZmYoKS5odG1sKCcnKSAvLyB1bnJlZ2lzdGVyIGFsbCBldmVudCBoYW5kbGVycy5cblxuICBVc2VyLm9mZignc3RvcmU6dXNlcnM6ZmFpbGVkOmxvb2t1cCcgLCB0aGlzLnVzZXJGYWlsZWRMb29rdXApXG4gIFVzZXIub2ZmKCdzdG9yZTp1c2VyczpkaWQ6bG9va3VwJyAgICAsIHRoaXMudXNlckRpZExvb2t1cClcbiAgUG9zdC5vZmYoJ3N0b3JlOnBvc3RzOmRpZDpyZXRyaWV2ZScgICwgdGhpcy5wb3N0c0RpZFJldHJpZXZlKVxuICBQb3N0Lm9mZignc3RvcmU6cG9zdHM6ZGlkOnVwZGF0ZScgICAgLCB0aGlzLnBvc3RzRGlkVXBkYXRlKVxuXG4gIFBvc3Quc3RvcFJldHJpZXZlKHRoaXMuZmlyZWJhc2VwYXRoKVxufVxuXG5Vc2VyTW9kLnByb3RvdHlwZS51cGRhdGVQbGFjZWhvbGRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbW9ka2V5cyA9IE9iamVjdC5rZXlzKHRoaXMubW9kcyksIHAgPSB0aGlzLm5vZGVzLnBsYWNlaG9sZFxuXG4gIGlmIChtb2RrZXlzLmxlbmd0aCA9PSAwIHx8IG1vZGtleXNbMF0gPT0gJ25ldycpIHtcbiAgICBwLnJlbW92ZUNsYXNzKCdhcHAtaGlkZGVuJylcbiAgfSBlbHNlIHtcbiAgICBwLmFkZENsYXNzKCdhcHAtaGlkZGVuJylcbiAgfVxufVxuXG5Vc2VyTW9kLnByb3RvdHlwZS5yZWRyYXdQcm9maWxlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubm9kZXMucHJvZi5odG1sKHByb2Z0cGwodGhpcykpXG59XG5cblVzZXJNb2QucHJvdG90eXBlLmhpZGVOZXdQb3N0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtID0gdGhpcy5tb2RzLm5ldywgbiA9IHRoaXMubm9kZXMubmV3cG9zdFxuICBpZiAobSkge1xuICAgIG0udW5sb2FkKClcbiAgICBuLmh0bWwoJycpXG4gICAgZGVsZXRlIHRoaXMubW9kc1snbmV3J11cbiAgICB0aGlzLnVwZGF0ZVBsYWNlaG9sZGVyKClcbiAgfVxufVxuXG5Vc2VyTW9kLnByb3RvdHlwZS5zaG93TmV3UG9zdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbSA9IHRoaXMsIGVsLCBwXG4gIGlmICghbS5tb2RzLm5ldykge1xuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBwID0gbmV3IFBvc3Qoe3VpZCA6IG0udWlkLCB1c2VyTmFtZSA6IG0udXNlci5kaXNwbGF5TmFtZX0pXG4gICAgbS5tb2RzWyduZXcnXSA9IG5ldyBQb3N0Rm9ybShtLCBlbCwge3Bvc3QgOiBwfSlcbiAgICBtLm5vZGVzLm5ld3Bvc3QuYXBwZW5kKGVsKVxuICAgIG0udXBkYXRlUGxhY2Vob2xkZXIoKVxuICB9XG59XG5cblVzZXJNb2QucHJvdG90eXBlLmVkaXRQb3N0ID0gZnVuY3Rpb24obW9kKSB7XG4gIHZhciBlbCA9IG1vZC5ub2Rlcy5yb290WzBdXG4gIG1vZC51bmxvYWQoKVxuICB0aGlzLm1vZHNbbW9kLnBvc3Qua2V5XSA9IG5ldyBQb3N0Rm9ybSh0aGlzLCBlbCwge3Bvc3QgOiBtb2QucG9zdH0pXG59XG5cblVzZXJNb2QucHJvdG90eXBlLmFkZFBvc3QgPSBmdW5jdGlvbihwb3N0KSB7XG4gIHZhciBtID0gdGhpcywgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICBwID0gbmV3IFBvc3RTaG93KG0sIGVsLCB7cG9zdCA6IHBvc3R9KVxuICBtLm1vZHNbcG9zdC5rZXldID0gcFxuICBtLm5vZGVzLnBvc3RzLnByZXBlbmQocC5ub2Rlcy5yb290WzBdKVxuICBtLnVwZGF0ZVBsYWNlaG9sZGVyKClcbn1cblxuLy8gU2hvdyBhIHBvc3QgdGhhdCB3YXMgcHJldmlvdXNseSBiZWluZyBlZGl0ZWQsIG9yIHVwZGF0ZSBpdCBpZiB0aGUgZGF0YSBjaGFuZ2VkLlxuVXNlck1vZC5wcm90b3R5cGUuc2hvd21vZCA9IGZ1bmN0aW9uKG1vZCkge1xuICBpZiAobW9kIGluc3RhbmNlb2YgUG9zdEZvcm0pIHtcbiAgICBtb2QudW5sb2FkKClcbiAgICB2YXIgcHMgPSBuZXcgUG9zdFNob3codGhpcywgbW9kLm5vZGVzLnJvb3RbMF0sIHtwb3N0IDogbW9kLnBvc3R9KVxuICAgIHRoaXMubW9kc1ttb2QucG9zdC5rZXldID0gcHNcbiAgfSBlbHNlIHtcbiAgICBtb2QudXBkYXRlRmF2KCkgLy8gdXBkYXRlIGp1c3QgZmF2IGZsYWcgZm9yIG5vdy5cbiAgfVxufVxuXG5Vc2VyTW9kLnByb3RvdHlwZS5yZW1vdmVQb3N0ID0gZnVuY3Rpb24obW9kKSB7XG4gIFBvc3QuZGVzdHJveShtb2QucG9zdClcbiAgbW9kLnVubG9hZCgpXG4gIHRoaXMubm9kZXMucG9zdHMucmVtb3ZlKG1vZC5ub2Rlcy5yb290WzBdKVxuICBkZWxldGUgdGhpcy5tb2RzW21vZC5rZXldXG4gIHRoaXMudXBkYXRlUGxhY2Vob2xkZXIoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJNb2RcbiJdfQ==

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
  favers: {},
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

Post.prototype.favoritedBy = function(uid) {
  return !!this.favers[uid]
}

// Firebase root of all user posts
Post.prototype.fbrootref = function() {
  return fbref.child('user_posts/' + this.uid)
}

// Firebase root of the specific user post
Post.prototype.fbpostref = function(postfix) {
  return this.fbrootref().child('/' + this.key + (postfix ? '/' + postfix : ''))
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

Post.toggleFav = function(post, uid) {
  var isfav = !post.favers[uid]
  post.fbpostref('favers').update({uid: isfav}, function(error){
    if (error) {
      Post.trigger('store:posts:failed:togglefav', post, error)
    } else {
      if (!isfav) {
        fbref.child('user_favorites/' + uid + '/' + post.key).remove()
      }
      Post.trigger('store:posts:did:togglefav', post, uid)
    }
  })
}

// update the various post references (like latest posts, favorited, etc.)
function updatePostReferences(post) {
  var
    f = fbref, usf,
    pst = 'posts/' + post.key,
    fav = 'favorited/' + post.key,
    atr = _.merge(post.getattr(), {date: post.date.valueOf()})
    favUids = Object.keys(post.favers)

  if (post.destroyed) {
    f.child(fav).remove()
    f.child(pst).remove()

    favUids.forEach(function(uid){
      f.child('user_favorites/' + uid + '/' + post.key).remove()
    })
  } else {
    f.child(pst).set(atr)

    if (favUids.length) {
      f.child(fav).set(atr)

      favUids.forEach(function(uid){
        f.child('user_favorites/' + uid + '/' + post.key).set(atr)
      })
    } else {
      f.child(fav).remove()
      // if it was 'unfavorited' toggleFav should had removed the
      // user_favorites ref already.
    }
  }
}

Post.on('store:posts:did:persist', updatePostReferences)
Post.on('store:posts:did:update', updatePostReferences)
Post.on('store:posts:did:destroy', updatePostReferences)
Post.on('store:posts:did:togglefav', updatePostReferences)

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
  'provider'    : 'unknown',
  'url'         : 'https://musifavs.com'
}

/*
 *******************************************************************************
 * Instance Methods
 *******************************************************************************
 */

// Returns only *data* attributes
User.prototype.getattr = function() {
  return _.pick(this, Object.keys(User.defaults))
}

User.prototype.logout = function() {
  this.authData = null
  this.logged = false
  this.provider = 'unknown'
  this.uid = null
}

// update fb data
User.prototype.update = function() {
  var user = this
  if (!user.uid) { return }
  fbref.child('users' + '/' + user.uid).set(user.getattr(), function(error) {
    if (error) {
      User.trigger('store:users:failed:update', user)
    } else {
      User.trigger('store:users:did:update', user)
    }
  })
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
  } else if (authData.provider == 'google') {
    u.displayName = authData.google.displayName

    var p = authData.google.cachedUserProfile

    if (p) {
      u.avatarUrl = p.picture
      u.description = 'G+ User'
      u.location = 'Planet Earth'
      u.url = p.link
    }
  }

  _.defaults(this, u.defaults) // in case we picked up some nulls

  u.update()
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
__p+='<main class="main" role="main"><div class="front-copy"><h1>Log In</h1><p>In order to interact with MusiFavs! you\'ll need to log in first.</p><p>Please select one of the services below to log in:</p><ul class="login-links fa-ul fa-2x"><li><i class="fa-li fa fa-google-plus-square"></i> <a href="#" id="google-login">Google</a></li><li><i class="fa-li fa fa-twitter-square"></i> <a href="#" id="twitter-login">Twitter</a></li><li><i class="fa-li fa fa-facebook-square"></i> <a href="#" id="facebook-login">Facebook</a> <small>(Sorry, unavailable at the moment)</small></li></ul></div></main>';
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
    } else if (target.id == 'google-login') {
      User.login('google')
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

    if (user.logged) { user.logout() }
    window.location.hash = ''

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
'"><a class="fav" title="Favorite" href="#"><i class="fa fa-heart"></i>&nbsp;Favorite</a>';
 if (owned) { 
__p+=' <a class="edit" title="Edit" href="#"><i class="fa fa-edit"></i>&nbsp;Edit</a> <a class="remove" title="Remove" href="#"><i class="fa fa-trash"></i>&nbsp;Remove</a>';
 } 
__p+='</div>';
}
return __p;
};

},{"lodash.escape":1}],66:[function(require,module,exports){
var
  $ = require('../../lib/domWrap'),
  template = require('./show.html'),
  User = require('../../app/user')

var _ = {
  merge : require('lodash/object/merge')
}

function PostShow(parent, node, options) {
  this.parent = parent

  var p = this.post = options.post

  node.innerHTML = template(_.merge(p.getattr(), {
    postKey: p.key || 'new',
    timeago: p.timeago(),
    owned: p.uid == User.current.uid
  }))

  this.nodes = {
    root: $(node).addClass('app-post-show'),
    fav: $(node, '.fav')
  }

  this.updateFav()
}

PostShow.prototype.updateFav = function() {
  var p = this.post, f = this.nodes.fav

  if (p.favoritedBy(User.current.uid)) {
    f.addClass('post-favorited')
  } else {
    f.removeClass('post-favorited')
  }
}

PostShow.prototype.unload = function() {
  this.nodes.root.removeClass('app-post-show').html('')
}

module.exports = PostShow

},{"../../app/user":48,"../../lib/domWrap":49,"./show.html":65,"lodash/object/merge":40}],67:[function(require,module,exports){
var _ = {escape: require("lodash.escape")};
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="profile-info"><ul class="fa-ul"><li class="profile-pic"><img src="'+
((__t=(user.avatarUrl))==null?'':__t)+
'"></li><li><i class="fa-li fa fa-user"></i>'+
((__t=(user.displayName))==null?'':__t)+
'</li><li><i class="fa-li fa fa-asterisk"></i>'+
((__t=(user.description))==null?'':__t)+
'</li><li><i class="fa-li fa fa-map-marker"></i>'+
((__t=(user.location))==null?'':__t)+
'</li>';
 if (user.provider == 'twitter') { 
__p+='<li><i class="fa-li fa fa-twitter-square"></i> <a href="https://twitter.com/'+
((__t=(user.displayName))==null?'':__t)+
'">@'+
((__t=(user.displayName))==null?'':__t)+
'</a></li>';
 } 
__p+='';
 if (user.provider == 'google') { 
__p+='<li><i class="fa-li fa fa-google-plus"></i> <a href="'+
((__t=(user.url))==null?'':__t)+
'">'+
((__t=(user.displayName))==null?'':__t)+
'</a><br></li>';
 } 
__p+='</ul></div>';
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
    Post.toggleFav(mod.post, User.current.uid)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmVzY2FwZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZXNjYXBlL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2V0b3N0cmluZy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlDb3B5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9hcnJheUVhY2guanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Fzc2lnbkRlZmF1bHRzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlQXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlQ29weS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZsYXR0ZW4uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VGb3IuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VGb3JJbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZvck93bi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUlzRnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VNZXJnZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZU1lcmdlRGVlcC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZVRvU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlVmFsdWVzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iaW5kQ2FsbGJhY2suanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2NyZWF0ZUFzc2lnbmVyLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9pc0luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9pc0l0ZXJhdGVlQ2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvaXNMZW5ndGguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2lzT2JqZWN0TGlrZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvcGlja0J5QXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL3BpY2tCeUNhbGxiYWNrLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9zaGltSXNQbGFpbk9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvc2hpbUtleXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL3RvT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9sYW5nL2lzQXJndW1lbnRzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9sYW5nL2lzQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2xhbmcvaXNGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9pc05hdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9pc1BsYWluT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9sYW5nL2lzVHlwZWRBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy90b1BsYWluT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvZGVmYXVsdHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3Qva2V5c0luLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvbWVyZ2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL29iamVjdC9waWNrLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvdmFsdWVzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9zdHJpbmcvZXNjYXBlUmVnRXhwLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9zdXBwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC91dGlsaXR5L2lkZW50aXR5LmpzIiwibm9kZV9tb2R1bGVzL3Jpb3QvcmlvdC5qcyIsInNyYy9hcHAvcG9zdC5qcyIsInNyYy9hcHAvdXNlci5qcyIsInNyYy9saWIvZG9tV3JhcC5qcyIsInNyYy9saWIvZnJvbW5vdy5qcyIsInNyYy9saWIveW91dHViZS5qcyIsInNyYy9tYWluLmpzIiwic3JjL21vZHVsZXMvZnJvbnQvZnJvbnQuaHRtbCIsInNyYy9tb2R1bGVzL2Zyb250L2Zyb250LmpzIiwic3JjL21vZHVsZXMvZnJvbnQvcG9zdC1pdGVtcy5odG1sIiwic3JjL21vZHVsZXMvbG9naW4vbG9naW4uaHRtbCIsInNyYy9tb2R1bGVzL2xvZ2luL2xvZ2luLmpzIiwic3JjL21vZHVsZXMvbWFpbi9tYWluLmpzIiwic3JjL21vZHVsZXMvbWVzc2FnZS9tZXNzYWdlLmh0bWwiLCJzcmMvbW9kdWxlcy9tZXNzYWdlL21lc3NhZ2UuanMiLCJzcmMvbW9kdWxlcy9uYXZpZ2F0aW9uL25hdmlnYXRpb24uaHRtbCIsInNyYy9tb2R1bGVzL25hdmlnYXRpb24vbmF2aWdhdGlvbi5qcyIsInNyYy9tb2R1bGVzL3Bvc3QvZm9ybS5odG1sIiwic3JjL21vZHVsZXMvcG9zdC9mb3JtLmpzIiwic3JjL21vZHVsZXMvcG9zdC9zaG93Lmh0bWwiLCJzcmMvbW9kdWxlcy9wb3N0L3Nob3cuanMiLCJzcmMvbW9kdWxlcy91c2VyL3Byb2ZpbGUuaHRtbCIsInNyYy9tb2R1bGVzL3VzZXIvdXNlci5odG1sIiwic3JjL21vZHVsZXMvdXNlci91c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3B6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VUb1N0cmluZyA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZXRvc3RyaW5nJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIEhUTUwgZW50aXRpZXMgYW5kIEhUTUwgY2hhcmFjdGVycy4gKi9cbnZhciByZVVuZXNjYXBlZEh0bWwgPSAvWyY8PlwiJ2BdL2csXG4gICAgcmVIYXNVbmVzY2FwZWRIdG1sID0gUmVnRXhwKHJlVW5lc2NhcGVkSHRtbC5zb3VyY2UpO1xuXG4vKiogVXNlZCB0byBtYXAgY2hhcmFjdGVycyB0byBIVE1MIGVudGl0aWVzLiAqL1xudmFyIGh0bWxFc2NhcGVzID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90OycsXG4gIFwiJ1wiOiAnJiMzOTsnLFxuICAnYCc6ICcmIzk2Oydcbn07XG5cbi8qKlxuICogVXNlZCBieSBgXy5lc2NhcGVgIHRvIGNvbnZlcnQgY2hhcmFjdGVycyB0byBIVE1MIGVudGl0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hyIFRoZSBtYXRjaGVkIGNoYXJhY3RlciB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIGNoYXJhY3Rlci5cbiAqL1xuZnVuY3Rpb24gZXNjYXBlSHRtbENoYXIoY2hyKSB7XG4gIHJldHVybiBodG1sRXNjYXBlc1tjaHJdO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBjaGFyYWN0ZXJzIFwiJlwiLCBcIjxcIiwgXCI+XCIsICdcIicsIFwiJ1wiLCBhbmQgJ2AnLCBpbiBgc3RyaW5nYCB0b1xuICogdGhlaXIgY29ycmVzcG9uZGluZyBIVE1MIGVudGl0aWVzLlxuICpcbiAqICoqTm90ZToqKiBObyBvdGhlciBjaGFyYWN0ZXJzIGFyZSBlc2NhcGVkLiBUbyBlc2NhcGUgYWRkaXRpb25hbCBjaGFyYWN0ZXJzXG4gKiB1c2UgYSB0aGlyZC1wYXJ0eSBsaWJyYXJ5IGxpa2UgW19oZV9dKGh0dHBzOi8vbXRocy5iZS9oZSkuXG4gKlxuICogVGhvdWdoIHRoZSBcIj5cIiBjaGFyYWN0ZXIgaXMgZXNjYXBlZCBmb3Igc3ltbWV0cnksIGNoYXJhY3RlcnMgbGlrZVxuICogXCI+XCIgYW5kIFwiL1wiIGRvbid0IHJlcXVpcmUgZXNjYXBpbmcgaW4gSFRNTCBhbmQgaGF2ZSBubyBzcGVjaWFsIG1lYW5pbmdcbiAqIHVubGVzcyB0aGV5J3JlIHBhcnQgb2YgYSB0YWcgb3IgdW5xdW90ZWQgYXR0cmlidXRlIHZhbHVlLlxuICogU2VlIFtNYXRoaWFzIEJ5bmVucydzIGFydGljbGVdKGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9hbWJpZ3VvdXMtYW1wZXJzYW5kcylcbiAqICh1bmRlciBcInNlbWktcmVsYXRlZCBmdW4gZmFjdFwiKSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEJhY2t0aWNrcyBhcmUgZXNjYXBlZCBiZWNhdXNlIGluIEludGVybmV0IEV4cGxvcmVyIDwgOSwgdGhleSBjYW4gYnJlYWsgb3V0XG4gKiBvZiBhdHRyaWJ1dGUgdmFsdWVzIG9yIEhUTUwgY29tbWVudHMuIFNlZSBbIzEwMl0oaHR0cHM6Ly9odG1sNXNlYy5vcmcvIzEwMiksXG4gKiBbIzEwOF0oaHR0cHM6Ly9odG1sNXNlYy5vcmcvIzEwOCksIGFuZCBbIzEzM10oaHR0cHM6Ly9odG1sNXNlYy5vcmcvIzEzMykgb2ZcbiAqIHRoZSBbSFRNTDUgU2VjdXJpdHkgQ2hlYXRzaGVldF0oaHR0cHM6Ly9odG1sNXNlYy5vcmcvKSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFdoZW4gd29ya2luZyB3aXRoIEhUTUwgeW91IHNob3VsZCBhbHdheXMgcXVvdGUgYXR0cmlidXRlIHZhbHVlcyB0byByZWR1Y2VcbiAqIFhTUyB2ZWN0b3JzLiBTZWUgW1J5YW4gR3JvdmUncyBhcnRpY2xlXShodHRwOi8vd29ua28uY29tL3Bvc3QvaHRtbC1lc2NhcGluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZSgnZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnKTtcbiAqIC8vID0+ICdmcmVkLCBiYXJuZXksICZhbXA7IHBlYmJsZXMnXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZShzdHJpbmcpIHtcbiAgLy8gUmVzZXQgYGxhc3RJbmRleGAgYmVjYXVzZSBpbiBJRSA8IDkgYFN0cmluZyNyZXBsYWNlYCBkb2VzIG5vdC5cbiAgc3RyaW5nID0gYmFzZVRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzVW5lc2NhcGVkSHRtbC50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVVuZXNjYXBlZEh0bWwsIGVzY2FwZUh0bWxDaGFyKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVzY2FwZTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBpZiBpdCBpcyBub3Qgb25lLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWRcbiAqIGZvciBgbnVsbGAgb3IgYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogKHZhbHVlICsgJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VUb1N0cmluZztcbiIsIi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlDb3B5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5Q29weTtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBvciBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlFYWNoKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5RWFjaDtcbiIsIi8qKlxuICogVXNlZCBieSBgXy5kZWZhdWx0c2AgdG8gY3VzdG9taXplIGl0cyBgXy5hc3NpZ25gIHVzZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSBvYmplY3RWYWx1ZSBUaGUgZGVzdGluYXRpb24gb2JqZWN0IHByb3BlcnR5IHZhbHVlLlxuICogQHBhcmFtIHsqfSBzb3VyY2VWYWx1ZSBUaGUgc291cmNlIG9iamVjdCBwcm9wZXJ0eSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSB2YWx1ZSB0byBhc3NpZ24gdG8gdGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYXNzaWduRGVmYXVsdHMob2JqZWN0VmFsdWUsIHNvdXJjZVZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0VmFsdWUgPT0gJ3VuZGVmaW5lZCcgPyBzb3VyY2VWYWx1ZSA6IG9iamVjdFZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbkRlZmF1bHRzO1xuIiwidmFyIGJhc2VDb3B5ID0gcmVxdWlyZSgnLi9iYXNlQ29weScpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5cycpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmFzc2lnbmAgd2l0aG91dCBzdXBwb3J0IGZvciBhcmd1bWVudCBqdWdnbGluZyxcbiAqIG11bHRpcGxlIHNvdXJjZXMsIGFuZCBgdGhpc2AgYmluZGluZyBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduaW5nIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZUFzc2lnbihvYmplY3QsIHNvdXJjZSwgY3VzdG9taXplcikge1xuICB2YXIgcHJvcHMgPSBrZXlzKHNvdXJjZSk7XG4gIGlmICghY3VzdG9taXplcikge1xuICAgIHJldHVybiBiYXNlQ29weShzb3VyY2UsIG9iamVjdCwgcHJvcHMpO1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XSxcbiAgICAgICAgdmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgcmVzdWx0ID0gY3VzdG9taXplcih2YWx1ZSwgc291cmNlW2tleV0sIGtleSwgb2JqZWN0LCBzb3VyY2UpO1xuXG4gICAgaWYgKChyZXN1bHQgPT09IHJlc3VsdCA/IHJlc3VsdCAhPT0gdmFsdWUgOiB2YWx1ZSA9PT0gdmFsdWUpIHx8XG4gICAgICAgICh0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCcgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICAgIG9iamVjdFtrZXldID0gcmVzdWx0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VBc3NpZ247XG4iLCIvKipcbiAqIENvcGllcyB0aGUgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGNvcHkuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlQ29weShzb3VyY2UsIG9iamVjdCwgcHJvcHMpIHtcbiAgaWYgKCFwcm9wcykge1xuICAgIHByb3BzID0gb2JqZWN0O1xuICAgIG9iamVjdCA9IHt9O1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBvYmplY3Rba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNvcHk7XG4iLCJ2YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmxhdHRlbmAgd2l0aCBhZGRlZCBzdXBwb3J0IGZvciByZXN0cmljdGluZ1xuICogZmxhdHRlbmluZyBhbmQgc3BlY2lmeWluZyB0aGUgc3RhcnQgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBmbGF0dGVuLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBmbGF0dGVuLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNTdHJpY3RdIFJlc3RyaWN0IGZsYXR0ZW5pbmcgdG8gYXJyYXlzIGFuZCBgYXJndW1lbnRzYCBvYmplY3RzLlxuICogQHBhcmFtIHtudW1iZXJ9IFtmcm9tSW5kZXg9MF0gVGhlIGluZGV4IHRvIHN0YXJ0IGZyb20uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmbGF0dGVuZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGbGF0dGVuKGFycmF5LCBpc0RlZXAsIGlzU3RyaWN0LCBmcm9tSW5kZXgpIHtcbiAgdmFyIGluZGV4ID0gKGZyb21JbmRleCB8fCAwKSAtIDEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXNJbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG5cbiAgICBpZiAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmIChpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpKSB7XG4gICAgICBpZiAoaXNEZWVwKSB7XG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGZsYXR0ZW4gYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICAgIHZhbHVlID0gYmFzZUZsYXR0ZW4odmFsdWUsIGlzRGVlcCwgaXNTdHJpY3QpO1xuICAgICAgfVxuICAgICAgdmFyIHZhbEluZGV4ID0gLTEsXG4gICAgICAgICAgdmFsTGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuXG4gICAgICByZXN1bHQubGVuZ3RoICs9IHZhbExlbmd0aDtcbiAgICAgIHdoaWxlICgrK3ZhbEluZGV4IDwgdmFsTGVuZ3RoKSB7XG4gICAgICAgIHJlc3VsdFsrK3Jlc0luZGV4XSA9IHZhbHVlW3ZhbEluZGV4XTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFpc1N0cmljdCkge1xuICAgICAgcmVzdWx0WysrcmVzSW5kZXhdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZsYXR0ZW47XG4iLCJ2YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL3RvT2JqZWN0Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGJhc2VGb3JJbmAgYW5kIGBiYXNlRm9yT3duYCB3aGljaCBpdGVyYXRlc1xuICogb3ZlciBgb2JqZWN0YCBwcm9wZXJ0aWVzIHJldHVybmVkIGJ5IGBrZXlzRnVuY2AgaW52b2tpbmcgYGl0ZXJhdGVlYCBmb3JcbiAqIGVhY2ggcHJvcGVydHkuIEl0ZXJhdG9yIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseVxuICogcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5c0Z1bmMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpdGVyYWJsZSA9IHRvT2JqZWN0KG9iamVjdCksXG4gICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3I7XG4iLCJ2YXIgYmFzZUZvciA9IHJlcXVpcmUoJy4vYmFzZUZvcicpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzSW4nKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JJbmAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvckluKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5c0luKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRm9ySW47XG4iLCJ2YXIgYmFzZUZvciA9IHJlcXVpcmUoJy4vYmFzZUZvcicpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5cycpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvck93bmAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvck93bihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3JPd247XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRnVuY3Rpb25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgZW52aXJvbm1lbnRzXG4gKiB3aXRoIGluY29ycmVjdCBgdHlwZW9mYCByZXN1bHRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgQ2hha3JhIEpJVCBidWcgaW4gY29tcGF0aWJpbGl0eSBtb2RlcyBvZiBJRSAxMS5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZS9pc3N1ZXMvMTYyMSBmb3IgbW9yZSBkZXRhaWxzLlxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzRnVuY3Rpb247XG4iLCJ2YXIgYXJyYXlFYWNoID0gcmVxdWlyZSgnLi9hcnJheUVhY2gnKSxcbiAgICBiYXNlRm9yT3duID0gcmVxdWlyZSgnLi9iYXNlRm9yT3duJyksXG4gICAgYmFzZU1lcmdlRGVlcCA9IHJlcXVpcmUoJy4vYmFzZU1lcmdlRGVlcCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNUeXBlZEFycmF5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWVyZ2VgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXJndW1lbnQganVnZ2xpbmcsXG4gKiBtdWx0aXBsZSBzb3VyY2VzLCBhbmQgYHRoaXNgIGJpbmRpbmcgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdpbmcgcHJvcGVydGllcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0E9W11dIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBBc3NvY2lhdGVzIHZhbHVlcyB3aXRoIHNvdXJjZSBjb3VudGVycGFydHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgY3VzdG9taXplciwgc3RhY2tBLCBzdGFja0IpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICB2YXIgaXNTcmNBcnIgPSBpc0xlbmd0aChzb3VyY2UubGVuZ3RoKSAmJiAoaXNBcnJheShzb3VyY2UpIHx8IGlzVHlwZWRBcnJheShzb3VyY2UpKTtcbiAgKGlzU3JjQXJyID8gYXJyYXlFYWNoIDogYmFzZUZvck93bikoc291cmNlLCBmdW5jdGlvbihzcmNWYWx1ZSwga2V5LCBzb3VyY2UpIHtcbiAgICBpZiAoaXNPYmplY3RMaWtlKHNyY1ZhbHVlKSkge1xuICAgICAgc3RhY2tBIHx8IChzdGFja0EgPSBbXSk7XG4gICAgICBzdGFja0IgfHwgKHN0YWNrQiA9IFtdKTtcbiAgICAgIHJldHVybiBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIGJhc2VNZXJnZSwgY3VzdG9taXplciwgc3RhY2tBLCBzdGFja0IpO1xuICAgIH1cbiAgICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIodmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgaXNDb21tb24gPSB0eXBlb2YgcmVzdWx0ID09ICd1bmRlZmluZWQnO1xuXG4gICAgaWYgKGlzQ29tbW9uKSB7XG4gICAgICByZXN1bHQgPSBzcmNWYWx1ZTtcbiAgICB9XG4gICAgaWYgKChpc1NyY0FyciB8fCB0eXBlb2YgcmVzdWx0ICE9ICd1bmRlZmluZWQnKSAmJlxuICAgICAgICAoaXNDb21tb24gfHwgKHJlc3VsdCA9PT0gcmVzdWx0ID8gcmVzdWx0ICE9PSB2YWx1ZSA6IHZhbHVlID09PSB2YWx1ZSkpKSB7XG4gICAgICBvYmplY3Rba2V5XSA9IHJlc3VsdDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VNZXJnZTtcbiIsInZhciBhcnJheUNvcHkgPSByZXF1aXJlKCcuL2FycmF5Q29weScpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICBpc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1BsYWluT2JqZWN0JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1R5cGVkQXJyYXknKSxcbiAgICB0b1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy90b1BsYWluT2JqZWN0Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlTWVyZ2VgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgbWVyZ2VzIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIG1lcmdlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gbWVyZ2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXJnZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1lcmdlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdpbmcgcHJvcGVydGllcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0E9W11dIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBBc3NvY2lhdGVzIHZhbHVlcyB3aXRoIHNvdXJjZSBjb3VudGVycGFydHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBtZXJnZUZ1bmMsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBsZW5ndGggPSBzdGFja0EubGVuZ3RoLFxuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoc3RhY2tBW2xlbmd0aF0gPT0gc3JjVmFsdWUpIHtcbiAgICAgIG9iamVjdFtrZXldID0gc3RhY2tCW2xlbmd0aF07XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIodmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKSA6IHVuZGVmaW5lZCxcbiAgICAgIGlzQ29tbW9uID0gdHlwZW9mIHJlc3VsdCA9PSAndW5kZWZpbmVkJztcblxuICBpZiAoaXNDb21tb24pIHtcbiAgICByZXN1bHQgPSBzcmNWYWx1ZTtcbiAgICBpZiAoaXNMZW5ndGgoc3JjVmFsdWUubGVuZ3RoKSAmJiAoaXNBcnJheShzcmNWYWx1ZSkgfHwgaXNUeXBlZEFycmF5KHNyY1ZhbHVlKSkpIHtcbiAgICAgIHJlc3VsdCA9IGlzQXJyYXkodmFsdWUpXG4gICAgICAgID8gdmFsdWVcbiAgICAgICAgOiAodmFsdWUgPyBhcnJheUNvcHkodmFsdWUpIDogW10pO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHNyY1ZhbHVlKSB8fCBpc0FyZ3VtZW50cyhzcmNWYWx1ZSkpIHtcbiAgICAgIHJlc3VsdCA9IGlzQXJndW1lbnRzKHZhbHVlKVxuICAgICAgICA/IHRvUGxhaW5PYmplY3QodmFsdWUpXG4gICAgICAgIDogKGlzUGxhaW5PYmplY3QodmFsdWUpID8gdmFsdWUgOiB7fSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLy8gQWRkIHRoZSBzb3VyY2UgdmFsdWUgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzIGFuZCBhc3NvY2lhdGVcbiAgLy8gaXQgd2l0aCBpdHMgbWVyZ2VkIHZhbHVlLlxuICBzdGFja0EucHVzaChzcmNWYWx1ZSk7XG4gIHN0YWNrQi5wdXNoKHJlc3VsdCk7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgbWVyZ2Ugb2JqZWN0cyBhbmQgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgb2JqZWN0W2tleV0gPSBtZXJnZUZ1bmMocmVzdWx0LCBzcmNWYWx1ZSwgY3VzdG9taXplciwgc3RhY2tBLCBzdGFja0IpO1xuICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gcmVzdWx0ID8gcmVzdWx0ICE9PSB2YWx1ZSA6IHZhbHVlID09PSB2YWx1ZSkge1xuICAgIG9iamVjdFtrZXldID0gcmVzdWx0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1lcmdlRGVlcDtcbiIsIi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBpZiBpdCBpcyBub3Qgb25lLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWRcbiAqIGZvciBgbnVsbGAgb3IgYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogKHZhbHVlICsgJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VUb1N0cmluZztcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udmFsdWVzYCBhbmQgYF8udmFsdWVzSW5gIHdoaWNoIGNyZWF0ZXMgYW5cbiAqIGFycmF5IG9mIGBvYmplY3RgIHByb3BlcnR5IHZhbHVlcyBjb3JyZXNwb25kaW5nIHRvIHRoZSBwcm9wZXJ0eSBuYW1lc1xuICogcmV0dXJuZWQgYnkgYGtleXNGdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGdldCB2YWx1ZXMgZm9yLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBiYXNlVmFsdWVzKG9iamVjdCwgcHJvcHMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IG9iamVjdFtwcm9wc1tpbmRleF1dO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVZhbHVlcztcbiIsInZhciBpZGVudGl0eSA9IHJlcXVpcmUoJy4uL3V0aWxpdHkvaWRlbnRpdHknKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VDYWxsYmFja2Agd2hpY2ggb25seSBzdXBwb3J0cyBgdGhpc2AgYmluZGluZ1xuICogYW5kIHNwZWNpZnlpbmcgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJpbmQuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYXJnQ291bnRdIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjYWxsYmFjay5cbiAqL1xuZnVuY3Rpb24gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGlkZW50aXR5O1xuICB9XG4gIGlmICh0eXBlb2YgdGhpc0FyZyA9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmdW5jO1xuICB9XG4gIHN3aXRjaCAoYXJnQ291bnQpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSk7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDU6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmRDYWxsYmFjaztcbiIsInZhciBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCcuL2JpbmRDYWxsYmFjaycpLFxuICAgIGlzSXRlcmF0ZWVDYWxsID0gcmVxdWlyZSgnLi9pc0l0ZXJhdGVlQ2FsbCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGFzc2lnbnMgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0KHMpIHRvIGEgZ2l2ZW5cbiAqIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuICAgICAgICBvYmplY3QgPSBhcmd1bWVudHNbMF07XG5cbiAgICBpZiAobGVuZ3RoIDwgMiB8fCBvYmplY3QgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG4gICAgaWYgKGxlbmd0aCA+IDMgJiYgaXNJdGVyYXRlZUNhbGwoYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0sIGFyZ3VtZW50c1szXSkpIHtcbiAgICAgIGxlbmd0aCA9IDI7XG4gICAgfVxuICAgIC8vIEp1Z2dsZSBhcmd1bWVudHMuXG4gICAgaWYgKGxlbmd0aCA+IDMgJiYgdHlwZW9mIGFyZ3VtZW50c1tsZW5ndGggLSAyXSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgY3VzdG9taXplciA9IGJpbmRDYWxsYmFjayhhcmd1bWVudHNbLS1sZW5ndGggLSAxXSwgYXJndW1lbnRzW2xlbmd0aC0tXSwgNSk7XG4gICAgfSBlbHNlIGlmIChsZW5ndGggPiAyICYmIHR5cGVvZiBhcmd1bWVudHNbbGVuZ3RoIC0gMV0gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY3VzdG9taXplciA9IGFyZ3VtZW50c1stLWxlbmd0aF07XG4gICAgfVxuICAgIHZhciBpbmRleCA9IDA7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgY3VzdG9taXplcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQXNzaWduZXI7XG4iLCIvKipcbiAqIFVzZWQgYXMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhbHVlID0gK3ZhbHVlO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW5kZXg7XG4iLCJ2YXIgaXNJbmRleCA9IHJlcXVpcmUoJy4vaXNJbmRleCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgcHJvdmlkZWQgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSB2YWx1ZSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gaW5kZXggVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBpbmRleCBvciBrZXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIG9iamVjdCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJykge1xuICAgIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoLFxuICAgICAgICBwcmVyZXEgPSBpc0xlbmd0aChsZW5ndGgpICYmIGlzSW5kZXgoaW5kZXgsIGxlbmd0aCk7XG4gIH0gZWxzZSB7XG4gICAgcHJlcmVxID0gdHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3Q7XG4gIH1cbiAgaWYgKHByZXJlcSkge1xuICAgIHZhciBvdGhlciA9IG9iamVjdFtpbmRleF07XG4gICAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/IHZhbHVlID09PSBvdGhlciA6IG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG4iLCIvKipcbiAqIFVzZWQgYXMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBFUyBgVG9MZW5ndGhgLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0xlbmd0aDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG4iLCJ2YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL3RvT2JqZWN0Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnBpY2tgIHRoYXQgcGlja3MgYG9iamVjdGAgcHJvcGVydGllcyBzcGVjaWZpZWRcbiAqIGJ5IHRoZSBgcHJvcHNgIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIHBpY2suXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBwaWNrQnlBcnJheShvYmplY3QsIHByb3BzKSB7XG4gIG9iamVjdCA9IHRvT2JqZWN0KG9iamVjdCk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICByZXN1bHQgPSB7fTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gb2JqZWN0W2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGlja0J5QXJyYXk7XG4iLCJ2YXIgYmFzZUZvckluID0gcmVxdWlyZSgnLi9iYXNlRm9ySW4nKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ucGlja2AgdGhhdCBwaWNrcyBgb2JqZWN0YCBwcm9wZXJ0aWVzIGBwcmVkaWNhdGVgXG4gKiByZXR1cm5zIHRydXRoeSBmb3IuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHBpY2tCeUNhbGxiYWNrKG9iamVjdCwgcHJlZGljYXRlKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgYmFzZUZvckluKG9iamVjdCwgZnVuY3Rpb24odmFsdWUsIGtleSwgb2JqZWN0KSB7XG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwga2V5LCBvYmplY3QpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGlja0J5Q2FsbGJhY2s7XG4iLCJ2YXIgYmFzZUZvckluID0gcmVxdWlyZSgnLi9iYXNlRm9ySW4nKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIEEgZmFsbGJhY2sgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNQbGFpbk9iamVjdGAgd2hpY2ggY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBoYXMgYSBgW1tQcm90b3R5cGVdXWBcbiAqIG9mIGBudWxsYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzaGltSXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICB2YXIgQ3RvcjtcblxuICAvLyBFeGl0IGVhcmx5IGZvciBub24gYE9iamVjdGAgb2JqZWN0cy5cbiAgaWYgKCEoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBvYmplY3RUYWcpIHx8XG4gICAgICAoIWhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjb25zdHJ1Y3RvcicpICYmXG4gICAgICAgIChDdG9yID0gdmFsdWUuY29uc3RydWN0b3IsIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgIShDdG9yIGluc3RhbmNlb2YgQ3RvcikpKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBJRSA8IDkgaXRlcmF0ZXMgaW5oZXJpdGVkIHByb3BlcnRpZXMgYmVmb3JlIG93biBwcm9wZXJ0aWVzLiBJZiB0aGUgZmlyc3RcbiAgLy8gaXRlcmF0ZWQgcHJvcGVydHkgaXMgYW4gb2JqZWN0J3Mgb3duIHByb3BlcnR5IHRoZW4gdGhlcmUgYXJlIG5vIGluaGVyaXRlZFxuICAvLyBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gIHZhciByZXN1bHQ7XG4gIC8vIEluIG1vc3QgZW52aXJvbm1lbnRzIGFuIG9iamVjdCdzIG93biBwcm9wZXJ0aWVzIGFyZSBpdGVyYXRlZCBiZWZvcmVcbiAgLy8gaXRzIGluaGVyaXRlZCBwcm9wZXJ0aWVzLiBJZiB0aGUgbGFzdCBpdGVyYXRlZCBwcm9wZXJ0eSBpcyBhbiBvYmplY3Qnc1xuICAvLyBvd24gcHJvcGVydHkgdGhlbiB0aGVyZSBhcmUgbm8gaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAgYmFzZUZvckluKHZhbHVlLCBmdW5jdGlvbihzdWJWYWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0ID0ga2V5O1xuICB9KTtcbiAgcmV0dXJuIHR5cGVvZiByZXN1bHQgPT0gJ3VuZGVmaW5lZCcgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgcmVzdWx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaGltSXNQbGFpbk9iamVjdDtcbiIsInZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vaXNJbmRleCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzSW4nKSxcbiAgICBzdXBwb3J0ID0gcmVxdWlyZSgnLi4vc3VwcG9ydCcpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uIG9mIGBPYmplY3Qua2V5c2Agd2hpY2ggY3JlYXRlcyBhbiBhcnJheSBvZiB0aGVcbiAqIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIHNoaW1LZXlzKG9iamVjdCkge1xuICB2YXIgcHJvcHMgPSBrZXlzSW4ob2JqZWN0KSxcbiAgICAgIHByb3BzTGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgbGVuZ3RoID0gcHJvcHNMZW5ndGggJiYgb2JqZWN0Lmxlbmd0aDtcblxuICB2YXIgYWxsb3dJbmRleGVzID0gbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IChzdXBwb3J0Lm5vbkVudW1BcmdzICYmIGlzQXJndW1lbnRzKG9iamVjdCkpKTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgcHJvcHNMZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIGlmICgoYWxsb3dJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaGltS2V5cztcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGFuIG9iamVjdCBpZiBpdCBpcyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3QodmFsdWUpID8gdmFsdWUgOiBPYmplY3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvT2JqZWN0O1xuIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgdmFyIGxlbmd0aCA9IGlzT2JqZWN0TGlrZSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggOiB1bmRlZmluZWQ7XG4gIHJldHVybiAoaXNMZW5ndGgobGVuZ3RoKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKSB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcbiIsInZhciBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNOYXRpdmUgPSByZXF1aXJlKCcuL2lzTmF0aXZlJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQXJyYXkgPSBpc05hdGl2ZShuYXRpdmVJc0FycmF5ID0gQXJyYXkuaXNBcnJheSkgJiYgbmF0aXZlSXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IG5hdGl2ZUlzQXJyYXkgfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJyYXlUYWcpIHx8IGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuIiwidmFyIGJhc2VJc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUlzRnVuY3Rpb24nKSxcbiAgICBpc05hdGl2ZSA9IHJlcXVpcmUoJy4vaXNOYXRpdmUnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBVaW50OEFycmF5ID0gaXNOYXRpdmUoVWludDhBcnJheSA9IGdsb2JhbC5VaW50OEFycmF5KSAmJiBVaW50OEFycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNGdW5jdGlvbiA9ICEoYmFzZUlzRnVuY3Rpb24oL3gvKSB8fCAoVWludDhBcnJheSAmJiAhYmFzZUlzRnVuY3Rpb24oVWludDhBcnJheSkpKSA/IGJhc2VJc0Z1bmN0aW9uIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIG9sZGVyIHZlcnNpb25zIG9mIENocm9tZSBhbmQgU2FmYXJpIHdoaWNoIHJldHVybiAnZnVuY3Rpb24nIGZvciByZWdleGVzXG4gIC8vIGFuZCBTYWZhcmkgOCBlcXVpdmFsZW50cyB3aGljaCByZXR1cm4gJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGNvbnN0cnVjdG9ycy5cbiAgcmV0dXJuIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG4iLCJ2YXIgZXNjYXBlUmVnRXhwID0gcmVxdWlyZSgnLi4vc3RyaW5nL2VzY2FwZVJlZ0V4cCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZm5Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZU5hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBlc2NhcGVSZWdFeHAob2JqVG9TdHJpbmcpXG4gIC5yZXBsYWNlKC90b1N0cmluZ3woZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnKSB7XG4gICAgcmV0dXJuIHJlTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIHJlSG9zdEN0b3IudGVzdCh2YWx1ZSkpIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmF0aXZlO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgbGFuZ3VhZ2UgdHlwZSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqICoqTm90ZToqKiBTZWUgdGhlIFtFUzUgc3BlY10oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICh2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsInZhciBpc05hdGl2ZSA9IHJlcXVpcmUoJy4vaXNOYXRpdmUnKSxcbiAgICBzaGltSXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3NoaW1Jc1BsYWluT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlT2YgPSBpc05hdGl2ZShnZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZikgJiYgZ2V0UHJvdG90eXBlT2Y7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBhc3N1bWVzIG9iamVjdHMgY3JlYXRlZCBieSB0aGUgYE9iamVjdGAgY29uc3RydWN0b3JcbiAqIGhhdmUgbm8gaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xudmFyIGlzUGxhaW5PYmplY3QgPSAhZ2V0UHJvdG90eXBlT2YgPyBzaGltSXNQbGFpbk9iamVjdCA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIGlmICghKHZhbHVlICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IG9iamVjdFRhZykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHZhbHVlT2YgPSB2YWx1ZS52YWx1ZU9mLFxuICAgICAgb2JqUHJvdG8gPSBpc05hdGl2ZSh2YWx1ZU9mKSAmJiAob2JqUHJvdG8gPSBnZXRQcm90b3R5cGVPZih2YWx1ZU9mKSkgJiYgZ2V0UHJvdG90eXBlT2Yob2JqUHJvdG8pO1xuXG4gIHJldHVybiBvYmpQcm90b1xuICAgID8gKHZhbHVlID09IG9ialByb3RvIHx8IGdldFByb3RvdHlwZU9mKHZhbHVlKSA9PSBvYmpQcm90bylcbiAgICA6IHNoaW1Jc1BsYWluT2JqZWN0KHZhbHVlKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQbGFpbk9iamVjdDtcbiIsInZhciBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID0gdHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID0gdHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID0gdHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID0gdHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID0gdHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmIHR5cGVkQXJyYXlUYWdzW29ialRvU3RyaW5nLmNhbGwodmFsdWUpXSkgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUeXBlZEFycmF5O1xuIiwidmFyIGJhc2VDb3B5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUNvcHknKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5c0luJyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHBsYWluIG9iamVjdCBmbGF0dGVuaW5nIGluaGVyaXRlZCBlbnVtZXJhYmxlXG4gKiBwcm9wZXJ0aWVzIG9mIGB2YWx1ZWAgdG8gb3duIHByb3BlcnRpZXMgb2YgdGhlIHBsYWluIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgcGxhaW4gb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBuZXcgRm9vKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIF8udG9QbGFpbk9iamVjdChuZXcgRm9vKSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDMgfVxuICovXG5mdW5jdGlvbiB0b1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBiYXNlQ29weSh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9QbGFpbk9iamVjdDtcbiIsInZhciBiYXNlQXNzaWduID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUFzc2lnbicpLFxuICAgIGNyZWF0ZUFzc2lnbmVyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvY3JlYXRlQXNzaWduZXInKTtcblxuLyoqXG4gKiBBc3NpZ25zIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdChzKSB0byB0aGUgZGVzdGluYXRpb25cbiAqIG9iamVjdC4gU3Vic2VxdWVudCBzb3VyY2VzIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLlxuICogSWYgYGN1c3RvbWl6ZXJgIGlzIHByb3ZpZGVkIGl0IGlzIGludm9rZWQgdG8gcHJvZHVjZSB0aGUgYXNzaWduZWQgdmFsdWVzLlxuICogVGhlIGBjdXN0b21pemVyYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCBmaXZlIGFyZ3VtZW50cztcbiAqIChvYmplY3RWYWx1ZSwgc291cmNlVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAYWxpYXMgZXh0ZW5kXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGN1c3RvbWl6ZXJgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5hc3NpZ24oeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ2FnZSc6IDQwIH0sIHsgJ3VzZXInOiAnZnJlZCcgfSk7XG4gKiAvLyA9PiB7ICd1c2VyJzogJ2ZyZWQnLCAnYWdlJzogNDAgfVxuICpcbiAqIC8vIHVzaW5nIGEgY3VzdG9taXplciBjYWxsYmFja1xuICogdmFyIGRlZmF1bHRzID0gXy5wYXJ0aWFsUmlnaHQoXy5hc3NpZ24sIGZ1bmN0aW9uKHZhbHVlLCBvdGhlcikge1xuICogICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICd1bmRlZmluZWQnID8gb3RoZXIgOiB2YWx1ZTtcbiAqIH0pO1xuICpcbiAqIGRlZmF1bHRzKHsgJ3VzZXInOiAnYmFybmV5JyB9LCB7ICdhZ2UnOiAzNiB9LCB7ICd1c2VyJzogJ2ZyZWQnIH0pO1xuICogLy8gPT4geyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfVxuICovXG52YXIgYXNzaWduID0gY3JlYXRlQXNzaWduZXIoYmFzZUFzc2lnbik7XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduO1xuIiwidmFyIGFycmF5Q29weSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2FycmF5Q29weScpLFxuICAgIGFzc2lnbiA9IHJlcXVpcmUoJy4vYXNzaWduJyksXG4gICAgYXNzaWduRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9hc3NpZ25EZWZhdWx0cycpO1xuXG4vKipcbiAqIEFzc2lnbnMgb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0KHMpIHRvIHRoZSBkZXN0aW5hdGlvblxuICogb2JqZWN0IGZvciBhbGwgZGVzdGluYXRpb24gcHJvcGVydGllcyB0aGF0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAuIE9uY2UgYVxuICogcHJvcGVydHkgaXMgc2V0LCBhZGRpdGlvbmFsIGRlZmF1bHRzIG9mIHRoZSBzYW1lIHByb3BlcnR5IGFyZSBpZ25vcmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmYXVsdHMoeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ2FnZSc6IDM2IH0sIHsgJ3VzZXInOiAnZnJlZCcgfSk7XG4gKiAvLyA9PiB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9XG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRzKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIHZhciBhcmdzID0gYXJyYXlDb3B5KGFyZ3VtZW50cyk7XG4gIGFyZ3MucHVzaChhc3NpZ25EZWZhdWx0cyk7XG4gIHJldHVybiBhc3NpZ24uYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsInZhciBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNOYXRpdmUgPSByZXF1aXJlKCcuLi9sYW5nL2lzTmF0aXZlJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0JyksXG4gICAgc2hpbUtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9zaGltS2V5cycpO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBpc05hdGl2ZShuYXRpdmVLZXlzID0gT2JqZWN0LmtleXMpICYmIG5hdGl2ZUtleXM7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbnZhciBrZXlzID0gIW5hdGl2ZUtleXMgPyBzaGltS2V5cyA6IGZ1bmN0aW9uKG9iamVjdCkge1xuICBpZiAob2JqZWN0KSB7XG4gICAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gIH1cbiAgaWYgKCh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QpIHx8XG4gICAgICh0eXBlb2Ygb2JqZWN0ICE9ICdmdW5jdGlvbicgJiYgKGxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpKSkpIHtcbiAgICByZXR1cm4gc2hpbUtleXMob2JqZWN0KTtcbiAgfVxuICByZXR1cm4gaXNPYmplY3Qob2JqZWN0KSA/IG5hdGl2ZUtleXMob2JqZWN0KSA6IFtdO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzO1xuIiwidmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNJbmRleCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKSxcbiAgICBzdXBwb3J0ID0gcmVxdWlyZSgnLi4vc3VwcG9ydCcpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB9XG4gIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICBsZW5ndGggPSAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IChzdXBwb3J0Lm5vbkVudW1BcmdzICYmIGlzQXJndW1lbnRzKG9iamVjdCkpKSAmJiBsZW5ndGgpIHx8IDA7XG5cbiAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgaXNQcm90byA9IHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCksXG4gICAgICBza2lwSW5kZXhlcyA9IGxlbmd0aCA+IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gKGluZGV4ICsgJycpO1xuICB9XG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShza2lwSW5kZXhlcyAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSkgJiZcbiAgICAgICAgIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzSW47XG4iLCJ2YXIgYmFzZU1lcmdlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZU1lcmdlJyksXG4gICAgY3JlYXRlQXNzaWduZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9jcmVhdGVBc3NpZ25lcicpO1xuXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IG1lcmdlcyBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHRoZSBzb3VyY2Ugb2JqZWN0KHMpLCB0aGF0XG4gKiBkb24ndCByZXNvbHZlIHRvIGB1bmRlZmluZWRgIGludG8gdGhlIGRlc3RpbmF0aW9uIG9iamVjdC4gU3Vic2VxdWVudCBzb3VyY2VzXG4gKiBvdmVyd3JpdGUgcHJvcGVydHkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy4gSWYgYGN1c3RvbWl6ZXJgIGlzXG4gKiBwcm92aWRlZCBpdCBpcyBpbnZva2VkIHRvIHByb2R1Y2UgdGhlIG1lcmdlZCB2YWx1ZXMgb2YgdGhlIGRlc3RpbmF0aW9uIGFuZFxuICogc291cmNlIHByb3BlcnRpZXMuIElmIGBjdXN0b21pemVyYCByZXR1cm5zIGB1bmRlZmluZWRgIG1lcmdpbmcgaXMgaGFuZGxlZFxuICogYnkgdGhlIG1ldGhvZCBpbnN0ZWFkLiBUaGUgYGN1c3RvbWl6ZXJgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZFxuICogd2l0aCBmaXZlIGFyZ3VtZW50czsgKG9iamVjdFZhbHVlLCBzb3VyY2VWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgbWVyZ2luZyBwcm9wZXJ0aWVzLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjdXN0b21pemVyYC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IHtcbiAqICAgJ2RhdGEnOiBbeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ3VzZXInOiAnZnJlZCcgfV1cbiAqIH07XG4gKlxuICogdmFyIGFnZXMgPSB7XG4gKiAgICdkYXRhJzogW3sgJ2FnZSc6IDM2IH0sIHsgJ2FnZSc6IDQwIH1dXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2UodXNlcnMsIGFnZXMpO1xuICogLy8gPT4geyAnZGF0YSc6IFt7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9LCB7ICd1c2VyJzogJ2ZyZWQnLCAnYWdlJzogNDAgfV0gfVxuICpcbiAqIC8vIHVzaW5nIGEgY3VzdG9taXplciBjYWxsYmFja1xuICogdmFyIG9iamVjdCA9IHtcbiAqICAgJ2ZydWl0cyc6IFsnYXBwbGUnXSxcbiAqICAgJ3ZlZ2V0YWJsZXMnOiBbJ2JlZXQnXVxuICogfTtcbiAqXG4gKiB2YXIgb3RoZXIgPSB7XG4gKiAgICdmcnVpdHMnOiBbJ2JhbmFuYSddLFxuICogICAndmVnZXRhYmxlcyc6IFsnY2Fycm90J11cbiAqIH07XG4gKlxuICogXy5tZXJnZShvYmplY3QsIG90aGVyLCBmdW5jdGlvbihhLCBiKSB7XG4gKiAgIGlmIChfLmlzQXJyYXkoYSkpIHtcbiAqICAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gKiAgIH1cbiAqIH0pO1xuICogLy8gPT4geyAnZnJ1aXRzJzogWydhcHBsZScsICdiYW5hbmEnXSwgJ3ZlZ2V0YWJsZXMnOiBbJ2JlZXQnLCAnY2Fycm90J10gfVxuICovXG52YXIgbWVyZ2UgPSBjcmVhdGVBc3NpZ25lcihiYXNlTWVyZ2UpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1lcmdlO1xuIiwidmFyIGJhc2VGbGF0dGVuID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUZsYXR0ZW4nKSxcbiAgICBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iaW5kQ2FsbGJhY2snKSxcbiAgICBwaWNrQnlBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3BpY2tCeUFycmF5JyksXG4gICAgcGlja0J5Q2FsbGJhY2sgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9waWNrQnlDYWxsYmFjaycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBwaWNrZWQgYG9iamVjdGAgcHJvcGVydGllcy4gUHJvcGVydHlcbiAqIG5hbWVzIG1heSBiZSBzcGVjaWZpZWQgYXMgaW5kaXZpZHVhbCBhcmd1bWVudHMgb3IgYXMgYXJyYXlzIG9mIHByb3BlcnR5XG4gKiBuYW1lcy4gSWYgYHByZWRpY2F0ZWAgaXMgcHJvdmlkZWQgaXQgaXMgaW52b2tlZCBmb3IgZWFjaCBwcm9wZXJ0eSBvZiBgb2JqZWN0YFxuICogcGlja2luZyB0aGUgcHJvcGVydGllcyBgcHJlZGljYXRlYCByZXR1cm5zIHRydXRoeSBmb3IuIFRoZSBwcmVkaWNhdGUgaXNcbiAqIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBrZXksIG9iamVjdCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufC4uLihzdHJpbmd8c3RyaW5nW10pfSBbcHJlZGljYXRlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXJcbiAqICBpdGVyYXRpb24gb3IgcHJvcGVydHkgbmFtZXMgdG8gcGljaywgc3BlY2lmaWVkIGFzIGluZGl2aWR1YWwgcHJvcGVydHlcbiAqICBuYW1lcyBvciBhcnJheXMgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYHByZWRpY2F0ZWAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJywgJ2FnZSc6IDQwIH07XG4gKlxuICogXy5waWNrKG9iamVjdCwgJ3VzZXInKTtcbiAqIC8vID0+IHsgJ3VzZXInOiAnZnJlZCcgfVxuICpcbiAqIF8ucGljayhvYmplY3QsIF8uaXNTdHJpbmcpO1xuICogLy8gPT4geyAndXNlcic6ICdmcmVkJyB9XG4gKi9cbmZ1bmN0aW9uIHBpY2sob2JqZWN0LCBwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG4gIHJldHVybiB0eXBlb2YgcHJlZGljYXRlID09ICdmdW5jdGlvbidcbiAgICA/IHBpY2tCeUNhbGxiYWNrKG9iamVjdCwgYmluZENhbGxiYWNrKHByZWRpY2F0ZSwgdGhpc0FyZywgMykpXG4gICAgOiBwaWNrQnlBcnJheShvYmplY3QsIGJhc2VGbGF0dGVuKGFyZ3VtZW50cywgZmFsc2UsIGZhbHNlLCAxKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGljaztcbiIsInZhciBiYXNlVmFsdWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZVZhbHVlcycpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSB2YWx1ZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLnZhbHVlcyhuZXcgRm9vKTtcbiAqIC8vID0+IFsxLCAyXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8udmFsdWVzKCdoaScpO1xuICogLy8gPT4gWydoJywgJ2knXVxuICovXG5mdW5jdGlvbiB2YWx1ZXMob2JqZWN0KSB7XG4gIHJldHVybiBiYXNlVmFsdWVzKG9iamVjdCwga2V5cyhvYmplY3QpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2YWx1ZXM7XG4iLCJ2YXIgYmFzZVRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZVRvU3RyaW5nJyk7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBzcGVjaWFsIGNoYXJhY3RlcnMuXG4gKiBTZWUgdGhpcyBbYXJ0aWNsZSBvbiBgUmVnRXhwYCBjaGFyYWN0ZXJzXShodHRwOi8vd3d3LnJlZ3VsYXItZXhwcmVzc2lvbnMuaW5mby9jaGFyYWN0ZXJzLmh0bWwjc3BlY2lhbClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciByZVJlZ0V4cENoYXJzID0gL1suKis/XiR7fSgpfFtcXF1cXC9cXFxcXS9nLFxuICAgIHJlSGFzUmVnRXhwQ2hhcnMgPSBSZWdFeHAocmVSZWdFeHBDaGFycy5zb3VyY2UpO1xuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiXlwiLCBcIiRcIiwgXCIuXCIsIFwifFwiLCBcIj9cIiwgXCIqXCIsXG4gKiBcIitcIiwgXCIoXCIsIFwiKVwiLCBcIltcIiwgXCJdXCIsIFwie1wiIGFuZCBcIn1cIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlUmVnRXhwKCdbbG9kYXNoXShodHRwczovL2xvZGFzaC5jb20vKScpO1xuICogLy8gPT4gJ1xcW2xvZGFzaFxcXVxcKGh0dHBzOi8vbG9kYXNoXFwuY29tL1xcKSdcbiAqL1xuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICBzdHJpbmcgPSBiYXNlVG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNSZWdFeHBDaGFycy50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXJzLCAnXFxcXCQmJylcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlc2NhcGVSZWdFeHA7XG4iLCJ2YXIgaXNOYXRpdmUgPSByZXF1aXJlKCcuL2xhbmcvaXNOYXRpdmUnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGZ1bmN0aW9ucyBjb250YWluaW5nIGEgYHRoaXNgIHJlZmVyZW5jZS4gKi9cbnZhciByZVRoaXMgPSAvXFxidGhpc1xcYi87XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgRE9NIHN1cHBvcnQuICovXG52YXIgZG9jdW1lbnQgPSAoZG9jdW1lbnQgPSBnbG9iYWwud2luZG93KSAmJiBkb2N1bWVudC5kb2N1bWVudDtcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIEFuIG9iamVjdCBlbnZpcm9ubWVudCBmZWF0dXJlIGZsYWdzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAdHlwZSBPYmplY3RcbiAqL1xudmFyIHN1cHBvcnQgPSB7fTtcblxuKGZ1bmN0aW9uKHgpIHtcblxuICAvKipcbiAgICogRGV0ZWN0IGlmIGZ1bmN0aW9ucyBjYW4gYmUgZGVjb21waWxlZCBieSBgRnVuY3Rpb24jdG9TdHJpbmdgXG4gICAqIChhbGwgYnV0IEZpcmVmb3ggT1MgY2VydGlmaWVkIGFwcHMsIG9sZGVyIE9wZXJhIG1vYmlsZSBicm93c2VycywgYW5kXG4gICAqIHRoZSBQbGF5U3RhdGlvbiAzOyBmb3JjZWQgYGZhbHNlYCBmb3IgV2luZG93cyA4IGFwcHMpLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy5zdXBwb3J0XG4gICAqIEB0eXBlIGJvb2xlYW5cbiAgICovXG4gIHN1cHBvcnQuZnVuY0RlY29tcCA9ICFpc05hdGl2ZShnbG9iYWwuV2luUlRFcnJvcikgJiYgcmVUaGlzLnRlc3QoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KTtcblxuICAvKipcbiAgICogRGV0ZWN0IGlmIGBGdW5jdGlvbiNuYW1lYCBpcyBzdXBwb3J0ZWQgKGFsbCBidXQgSUUpLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy5zdXBwb3J0XG4gICAqIEB0eXBlIGJvb2xlYW5cbiAgICovXG4gIHN1cHBvcnQuZnVuY05hbWVzID0gdHlwZW9mIEZ1bmN0aW9uLm5hbWUgPT0gJ3N0cmluZyc7XG5cbiAgLyoqXG4gICAqIERldGVjdCBpZiB0aGUgRE9NIGlzIHN1cHBvcnRlZC5cbiAgICpcbiAgICogQG1lbWJlck9mIF8uc3VwcG9ydFxuICAgKiBAdHlwZSBib29sZWFuXG4gICAqL1xuICB0cnkge1xuICAgIHN1cHBvcnQuZG9tID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLm5vZGVUeXBlID09PSAxMTtcbiAgfSBjYXRjaChlKSB7XG4gICAgc3VwcG9ydC5kb20gPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlY3QgaWYgYGFyZ3VtZW50c2Agb2JqZWN0IGluZGV4ZXMgYXJlIG5vbi1lbnVtZXJhYmxlLlxuICAgKlxuICAgKiBJbiBGaXJlZm94IDwgNCwgSUUgPCA5LCBQaGFudG9tSlMsIGFuZCBTYWZhcmkgPCA1LjEgYGFyZ3VtZW50c2Agb2JqZWN0XG4gICAqIGluZGV4ZXMgYXJlIG5vbi1lbnVtZXJhYmxlLiBDaHJvbWUgPCAyNSBhbmQgTm9kZS5qcyA8IDAuMTEuMCB0cmVhdFxuICAgKiBgYXJndW1lbnRzYCBvYmplY3QgaW5kZXhlcyBhcyBub24tZW51bWVyYWJsZSBhbmQgZmFpbCBgaGFzT3duUHJvcGVydHlgXG4gICAqIGNoZWNrcyBmb3IgaW5kZXhlcyB0aGF0IGV4Y2VlZCB0aGVpciBmdW5jdGlvbidzIGZvcm1hbCBwYXJhbWV0ZXJzIHdpdGhcbiAgICogYXNzb2NpYXRlZCB2YWx1ZXMgb2YgYDBgLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy5zdXBwb3J0XG4gICAqIEB0eXBlIGJvb2xlYW5cbiAgICovXG4gIHRyeSB7XG4gICAgc3VwcG9ydC5ub25FbnVtQXJncyA9ICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIH0gY2F0Y2goZSkge1xuICAgIHN1cHBvcnQubm9uRW51bUFyZ3MgPSB0cnVlO1xuICB9XG59KDAsIDApKTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0O1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBwcm92aWRlZCB0byBpdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdHlcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqXG4gKiBfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuIiwiLyogUmlvdCB2Mi4wLjExLCBAbGljZW5zZSBNSVQsIChjKSAyMDE1IE11dXQgSW5jLiArIGNvbnRyaWJ1dG9ycyAqL1xuXG47KGZ1bmN0aW9uKCkge1xuXG4gIHZhciByaW90ID0geyB2ZXJzaW9uOiAndjIuMC4xMScsIHNldHRpbmdzOiB7fSB9XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbnJpb3Qub2JzZXJ2YWJsZSA9IGZ1bmN0aW9uKGVsKSB7XG5cbiAgZWwgPSBlbCB8fCB7fVxuXG4gIHZhciBjYWxsYmFja3MgPSB7fSxcbiAgICAgIF9pZCA9IDBcblxuICBlbC5vbiA9IGZ1bmN0aW9uKGV2ZW50cywgZm4pIHtcbiAgICBpZiAodHlwZW9mIGZuID09ICdmdW5jdGlvbicpIHtcbiAgICAgIGZuLl9pZCA9IHR5cGVvZiBmbi5faWQgPT0gJ3VuZGVmaW5lZCcgPyBfaWQrKyA6IGZuLl9pZFxuXG4gICAgICBldmVudHMucmVwbGFjZSgvXFxTKy9nLCBmdW5jdGlvbihuYW1lLCBwb3MpIHtcbiAgICAgICAgKGNhbGxiYWNrc1tuYW1lXSA9IGNhbGxiYWNrc1tuYW1lXSB8fCBbXSkucHVzaChmbilcbiAgICAgICAgZm4udHlwZWQgPSBwb3MgPiAwXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIGVsLm9mZiA9IGZ1bmN0aW9uKGV2ZW50cywgZm4pIHtcbiAgICBpZiAoZXZlbnRzID09ICcqJykgY2FsbGJhY2tzID0ge31cbiAgICBlbHNlIHtcbiAgICAgIGV2ZW50cy5yZXBsYWNlKC9cXFMrL2csIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgdmFyIGFyciA9IGNhbGxiYWNrc1tuYW1lXVxuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBjYjsgKGNiID0gYXJyICYmIGFycltpXSk7ICsraSkge1xuICAgICAgICAgICAgaWYgKGNiLl9pZCA9PSBmbi5faWQpIHsgYXJyLnNwbGljZShpLCAxKTsgaS0tIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FsbGJhY2tzW25hbWVdID0gW11cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIGVsXG4gIH1cblxuICAvLyBvbmx5IHNpbmdsZSBldmVudCBzdXBwb3J0ZWRcbiAgZWwub25lID0gZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICBpZiAoZm4pIGZuLm9uZSA9IDFcbiAgICByZXR1cm4gZWwub24obmFtZSwgZm4pXG4gIH1cblxuICBlbC50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICBmbnMgPSBjYWxsYmFja3NbbmFtZV0gfHwgW11cblxuICAgIGZvciAodmFyIGkgPSAwLCBmbjsgKGZuID0gZm5zW2ldKTsgKytpKSB7XG4gICAgICBpZiAoIWZuLmJ1c3kpIHtcbiAgICAgICAgZm4uYnVzeSA9IDFcbiAgICAgICAgZm4uYXBwbHkoZWwsIGZuLnR5cGVkID8gW25hbWVdLmNvbmNhdChhcmdzKSA6IGFyZ3MpXG4gICAgICAgIGlmIChmbi5vbmUpIHsgZm5zLnNwbGljZShpLCAxKTsgaS0tIH1cbiAgICAgICAgIGVsc2UgaWYgKGZuc1tpXSAhPT0gZm4pIHsgaS0tIH0gLy8gTWFrZXMgc2VsZi1yZW1vdmFsIHBvc3NpYmxlIGR1cmluZyBpdGVyYXRpb25cbiAgICAgICAgZm4uYnVzeSA9IDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIHJldHVybiBlbFxuXG59XG47KGZ1bmN0aW9uKHJpb3QsIGV2dCkge1xuXG4gIC8vIGJyb3dzZXJzIG9ubHlcbiAgaWYgKCF0aGlzLnRvcCkgcmV0dXJuXG5cbiAgdmFyIGxvYyA9IGxvY2F0aW9uLFxuICAgICAgZm5zID0gcmlvdC5vYnNlcnZhYmxlKCksXG4gICAgICB3aW4gPSB3aW5kb3csXG4gICAgICBjdXJyZW50XG5cbiAgZnVuY3Rpb24gaGFzaCgpIHtcbiAgICByZXR1cm4gbG9jLmhhc2guc2xpY2UoMSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlcihwYXRoKSB7XG4gICAgcmV0dXJuIHBhdGguc3BsaXQoJy8nKVxuICB9XG5cbiAgZnVuY3Rpb24gZW1pdChwYXRoKSB7XG4gICAgaWYgKHBhdGgudHlwZSkgcGF0aCA9IGhhc2goKVxuXG4gICAgaWYgKHBhdGggIT0gY3VycmVudCkge1xuICAgICAgZm5zLnRyaWdnZXIuYXBwbHkobnVsbCwgWydIJ10uY29uY2F0KHBhcnNlcihwYXRoKSkpXG4gICAgICBjdXJyZW50ID0gcGF0aFxuICAgIH1cbiAgfVxuXG4gIHZhciByID0gcmlvdC5yb3V0ZSA9IGZ1bmN0aW9uKGFyZykge1xuICAgIC8vIHN0cmluZ1xuICAgIGlmIChhcmdbMF0pIHtcbiAgICAgIGxvYy5oYXNoID0gYXJnXG4gICAgICBlbWl0KGFyZylcblxuICAgIC8vIGZ1bmN0aW9uXG4gICAgfSBlbHNlIHtcbiAgICAgIGZucy5vbignSCcsIGFyZylcbiAgICB9XG4gIH1cblxuICByLmV4ZWMgPSBmdW5jdGlvbihmbikge1xuICAgIGZuLmFwcGx5KG51bGwsIHBhcnNlcihoYXNoKCkpKVxuICB9XG5cbiAgci5wYXJzZXIgPSBmdW5jdGlvbihmbikge1xuICAgIHBhcnNlciA9IGZuXG4gIH1cblxuICB3aW4uYWRkRXZlbnRMaXN0ZW5lciA/IHdpbi5hZGRFdmVudExpc3RlbmVyKGV2dCwgZW1pdCwgZmFsc2UpIDogd2luLmF0dGFjaEV2ZW50KCdvbicgKyBldnQsIGVtaXQpXG5cbn0pKHJpb3QsICdoYXNoY2hhbmdlJylcbi8qXG5cbi8vLy8gSG93IGl0IHdvcmtzP1xuXG5cblRocmVlIHdheXM6XG5cbjEuIEV4cHJlc3Npb25zOiB0bXBsKCd7IHZhbHVlIH0nLCBkYXRhKS5cbiAgIFJldHVybnMgdGhlIHJlc3VsdCBvZiBldmFsdWF0ZWQgZXhwcmVzc2lvbiBhcyBhIHJhdyBvYmplY3QuXG5cbjIuIFRlbXBsYXRlczogdG1wbCgnSGkgeyBuYW1lIH0geyBzdXJuYW1lIH0nLCBkYXRhKS5cbiAgIFJldHVybnMgYSBzdHJpbmcgd2l0aCBldmFsdWF0ZWQgZXhwcmVzc2lvbnMuXG5cbjMuIEZpbHRlcnM6IHRtcGwoJ3sgc2hvdzogIWRvbmUsIGhpZ2hsaWdodDogYWN0aXZlIH0nLCBkYXRhKS5cbiAgIFJldHVybnMgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiB0cnVlaXNoIGtleXMgKG1haW5seVxuICAgdXNlZCBmb3Igc2V0dGluZyBodG1sIGNsYXNzZXMpLCBlLmcuIFwic2hvdyBoaWdobGlnaHRcIi5cblxuXG4vLyBUZW1wbGF0ZSBleGFtcGxlc1xuXG50bXBsKCd7IHRpdGxlIHx8IFwiVW50aXRsZWRcIiB9JywgZGF0YSlcbnRtcGwoJ1Jlc3VsdHMgYXJlIHsgcmVzdWx0cyA/IFwicmVhZHlcIiA6IFwibG9hZGluZ1wiIH0nLCBkYXRhKVxudG1wbCgnVG9kYXkgaXMgeyBuZXcgRGF0ZSgpIH0nLCBkYXRhKVxudG1wbCgneyBtZXNzYWdlLmxlbmd0aCA+IDE0MCAmJiBcIk1lc3NhZ2UgaXMgdG9vIGxvbmdcIiB9JywgZGF0YSlcbnRtcGwoJ1RoaXMgaXRlbSBnb3QgeyBNYXRoLnJvdW5kKHJhdGluZykgfSBzdGFycycsIGRhdGEpXG50bXBsKCc8aDE+eyB0aXRsZSB9PC9oMT57IGJvZHkgfScsIGRhdGEpXG5cblxuLy8gRmFsc3kgZXhwcmVzc2lvbnMgaW4gdGVtcGxhdGVzXG5cbkluIHRlbXBsYXRlcyAoYXMgb3Bwb3NlZCB0byBzaW5nbGUgZXhwcmVzc2lvbnMpIGFsbCBmYWxzeSB2YWx1ZXNcbmV4Y2VwdCB6ZXJvICh1bmRlZmluZWQvbnVsbC9mYWxzZSkgd2lsbCBkZWZhdWx0IHRvIGVtcHR5IHN0cmluZzpcblxudG1wbCgneyB1bmRlZmluZWQgfSAtIHsgZmFsc2UgfSAtIHsgbnVsbCB9IC0geyAwIH0nLCB7fSlcbi8vIHdpbGwgcmV0dXJuOiBcIiAtIC0gLSAwXCJcblxuKi9cblxuXG52YXIgYnJhY2tldHMgPSAoZnVuY3Rpb24ob3JpZywgcywgYikge1xuICByZXR1cm4gZnVuY3Rpb24oeCkge1xuXG4gICAgLy8gbWFrZSBzdXJlIHdlIHVzZSB0aGUgY3VycmVudCBzZXR0aW5nXG4gICAgcyA9IHJpb3Quc2V0dGluZ3MuYnJhY2tldHMgfHwgb3JpZ1xuICAgIGlmIChiICE9IHMpIGIgPSBzLnNwbGl0KCcgJylcblxuICAgIC8vIGlmIHJlZ2V4cCBnaXZlbiwgcmV3cml0ZSBpdCB3aXRoIGN1cnJlbnQgYnJhY2tldHMgKG9ubHkgaWYgZGlmZmVyIGZyb20gZGVmYXVsdClcbiAgICAvLyBlbHNlLCBnZXQgYnJhY2tldHNcbiAgICByZXR1cm4geCAmJiB4LnRlc3RcbiAgICAgID8gcyA9PSBvcmlnXG4gICAgICAgID8geCA6IFJlZ0V4cCh4LnNvdXJjZVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHsvZywgYlswXS5yZXBsYWNlKC8oPz0uKS9nLCAnXFxcXCcpKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXH0vZywgYlsxXS5yZXBsYWNlKC8oPz0uKS9nLCAnXFxcXCcpKSxcbiAgICAgICAgICAgICAgICAgICAgeC5nbG9iYWwgPyAnZycgOiAnJylcbiAgICAgIDogYlt4XVxuXG4gIH1cbn0pKCd7IH0nKVxuXG5cbnZhciB0bXBsID0gKGZ1bmN0aW9uKCkge1xuXG4gIHZhciBjYWNoZSA9IHt9LFxuICAgICAgcmVfZXhwciA9IC8oe1tcXHNcXFNdKj99KS8sXG4gICAgICByZV92YXJzID0gLyhbJ1wiXFwvXSkuKj9bXlxcXFxdXFwxfFxcLlxcdyp8XFx3Kjp8XFxiKD86KD86bmV3fHR5cGVvZnxpbnxpbnN0YW5jZW9mKSB8KD86dGhpc3x0cnVlfGZhbHNlfG51bGx8dW5kZWZpbmVkKVxcYnxmdW5jdGlvbiAqXFwoKXwoW2Etel9dXFx3KikvZ2lcbiAgICAgICAgICAgICAgLy8gWyAxICAgICAgICAgICAgICAgXVsgMiAgXVsgMyBdWyA0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1bIDUgICAgICAgXVxuICAgICAgICAgICAgICAvLyBmaW5kIHZhcmlhYmxlIG5hbWVzOlxuICAgICAgICAgICAgICAvLyAxLiBza2lwIHF1b3RlZCBzdHJpbmdzIGFuZCByZWdleHBzOiBcImEgYlwiLCAnYSBiJywgJ2EgXFwnYlxcJycsIC9hIGIvXG4gICAgICAgICAgICAgIC8vIDIuIHNraXAgb2JqZWN0IHByb3BlcnRpZXM6IC5uYW1lXG4gICAgICAgICAgICAgIC8vIDMuIHNraXAgb2JqZWN0IGxpdGVyYWxzOiBuYW1lOlxuICAgICAgICAgICAgICAvLyA0LiBza2lwIGphdmFzY3JpcHQga2V5d29yZHNcbiAgICAgICAgICAgICAgLy8gNS4gbWF0Y2ggdmFyIG5hbWVcblxuICAvLyBidWlsZCBhIHRlbXBsYXRlIChvciBnZXQgaXQgZnJvbSBjYWNoZSksIHJlbmRlciB3aXRoIGRhdGFcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0ciwgZGF0YSkge1xuICAgIHJldHVybiBzdHIgJiYgKGNhY2hlW3N0cl0gPSBjYWNoZVtzdHJdIHx8IHRtcGwoc3RyKSkoZGF0YSlcbiAgfVxuXG5cbiAgLy8gY3JlYXRlIGEgdGVtcGxhdGUgaW5zdGFuY2VcblxuICBmdW5jdGlvbiB0bXBsKHMsIHApIHtcblxuICAgIC8vIGRlZmF1bHQgdGVtcGxhdGUgc3RyaW5nIHRvIHt9XG4gICAgcCA9IChzIHx8IChicmFja2V0cygwKSArIGJyYWNrZXRzKDEpKSlcblxuICAgICAgLy8gdGVtcG9yYXJpbHkgY29udmVydCBcXHsgYW5kIFxcfSB0byBhIG5vbi1jaGFyYWN0ZXJcbiAgICAgIC5yZXBsYWNlKGJyYWNrZXRzKC9cXFxcey8pLCAnXFx1RkZGMCcpXG4gICAgICAucmVwbGFjZShicmFja2V0cygvXFxcXH0vKSwgJ1xcdUZGRjEnKVxuXG4gICAgICAvLyBzcGxpdCBzdHJpbmcgdG8gZXhwcmVzc2lvbiBhbmQgbm9uLWV4cHJlc2lvbiBwYXJ0c1xuICAgICAgLnNwbGl0KGJyYWNrZXRzKHJlX2V4cHIpKVxuXG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbignZCcsICdyZXR1cm4gJyArIChcblxuICAgICAgLy8gaXMgaXQgYSBzaW5nbGUgZXhwcmVzc2lvbiBvciBhIHRlbXBsYXRlPyBpLmUuIHt4fSBvciA8Yj57eH08L2I+XG4gICAgICAhcFswXSAmJiAhcFsyXSAmJiAhcFszXVxuXG4gICAgICAgIC8vIGlmIGV4cHJlc3Npb24sIGV2YWx1YXRlIGl0XG4gICAgICAgID8gZXhwcihwWzFdKVxuXG4gICAgICAgIC8vIGlmIHRlbXBsYXRlLCBldmFsdWF0ZSBhbGwgZXhwcmVzc2lvbnMgaW4gaXRcbiAgICAgICAgOiAnWycgKyBwLm1hcChmdW5jdGlvbihzLCBpKSB7XG5cbiAgICAgICAgICAgIC8vIGlzIGl0IGFuIGV4cHJlc3Npb24gb3IgYSBzdHJpbmcgKGV2ZXJ5IHNlY29uZCBwYXJ0IGlzIGFuIGV4cHJlc3Npb24pXG4gICAgICAgICAgcmV0dXJuIGkgJSAyXG5cbiAgICAgICAgICAgICAgLy8gZXZhbHVhdGUgdGhlIGV4cHJlc3Npb25zXG4gICAgICAgICAgICAgID8gZXhwcihzLCAxKVxuXG4gICAgICAgICAgICAgIC8vIHByb2Nlc3Mgc3RyaW5nIHBhcnRzIG9mIHRoZSB0ZW1wbGF0ZTpcbiAgICAgICAgICAgICAgOiAnXCInICsgc1xuXG4gICAgICAgICAgICAgICAgICAvLyBwcmVzZXJ2ZSBuZXcgbGluZXNcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJylcblxuICAgICAgICAgICAgICAgICAgLy8gZXNjYXBlIHF1b3Rlc1xuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKVxuXG4gICAgICAgICAgICAgICAgKyAnXCInXG5cbiAgICAgICAgfSkuam9pbignLCcpICsgJ10uam9pbihcIlwiKSdcbiAgICAgIClcblxuICAgICAgLy8gYnJpbmcgZXNjYXBlZCB7IGFuZCB9IGJhY2tcbiAgICAgIC5yZXBsYWNlKC9cXHVGRkYwL2csIGJyYWNrZXRzKDApKVxuICAgICAgLnJlcGxhY2UoL1xcdUZGRjEvZywgYnJhY2tldHMoMSkpXG5cbiAgICArICc7JylcblxuICB9XG5cblxuICAvLyBwYXJzZSB7IC4uLiB9IGV4cHJlc3Npb25cblxuICBmdW5jdGlvbiBleHByKHMsIG4pIHtcbiAgICBzID0gc1xuXG4gICAgICAvLyBjb252ZXJ0IG5ldyBsaW5lcyB0byBzcGFjZXNcbiAgICAgIC5yZXBsYWNlKC9cXG4vZywgJyAnKVxuXG4gICAgICAvLyB0cmltIHdoaXRlc3BhY2UsIGN1cmx5IGJyYWNrZXRzLCBzdHJpcCBjb21tZW50c1xuICAgICAgLnJlcGxhY2UoYnJhY2tldHMoL15beyBdK3xbIH1dKyR8XFwvXFwqLis/XFwqXFwvL2cpLCAnJylcblxuICAgIC8vIGlzIGl0IGFuIG9iamVjdCBsaXRlcmFsPyBpLmUuIHsga2V5IDogdmFsdWUgfVxuICAgIHJldHVybiAvXlxccypbXFx3LSBcIiddKyAqOi8udGVzdChzKVxuXG4gICAgICAvLyBpZiBvYmplY3QgbGl0ZXJhbCwgcmV0dXJuIHRydWVpc2gga2V5c1xuICAgICAgLy8gZS5nLjogeyBzaG93OiBpc09wZW4oKSwgZG9uZTogaXRlbS5kb25lIH0gLT4gXCJzaG93IGRvbmVcIlxuICAgICAgPyAnWycgKyBzLnJlcGxhY2UoL1xcVyooW1xcdy0gXSspXFxXKjooW14sXSspL2csIGZ1bmN0aW9uKF8sIGssIHYpIHtcblxuICAgICAgICByZXR1cm4gdi5yZXBsYWNlKC9bXiZ8PSE+PF0rL2csIHdyYXApICsgJz9cIicgKyBrLnRyaW0oKSArICdcIjpcIlwiLCdcblxuICAgICAgfSkgKyAnXS5qb2luKFwiIFwiKSdcblxuICAgICAgLy8gaWYganMgZXhwcmVzc2lvbiwgZXZhbHVhdGUgYXMgamF2YXNjcmlwdFxuICAgICAgOiB3cmFwKHMsIG4pXG5cbiAgfVxuXG5cbiAgLy8gZXhlY3V0ZSBqcyB3L28gYnJlYWtpbmcgb24gZXJyb3JzIG9yIHVuZGVmaW5lZCB2YXJzXG5cbiAgZnVuY3Rpb24gd3JhcChzLCBub251bGwpIHtcbiAgICBzID0gcy50cmltKClcbiAgICByZXR1cm4gIXMgPyAnJyA6ICcoZnVuY3Rpb24odil7dHJ5e3Y9J1xuXG4gICAgICAgIC8vIHByZWZpeCB2YXJzIChuYW1lID0+IGRhdGEubmFtZSlcbiAgICAgICAgKyAocy5yZXBsYWNlKHJlX3ZhcnMsIGZ1bmN0aW9uKHMsIF8sIHYpIHsgcmV0dXJuIHYgPyAnKGQuJyt2Kyc9PT11bmRlZmluZWQ/d2luZG93LicrdisnOmQuJyt2KycpJyA6IHMgfSlcblxuICAgICAgICAgIC8vIGJyZWFrIHRoZSBleHByZXNzaW9uIGlmIGl0cyBlbXB0eSAocmVzdWx0aW5nIGluIHVuZGVmaW5lZCB2YWx1ZSlcbiAgICAgICAgICB8fCAneCcpXG5cbiAgICAgICsgJ31maW5hbGx5e3JldHVybiAnXG5cbiAgICAgICAgLy8gZGVmYXVsdCB0byBlbXB0eSBzdHJpbmcgZm9yIGZhbHN5IHZhbHVlcyBleGNlcHQgemVyb1xuICAgICAgICArIChub251bGwgPyAnIXYmJnYhPT0wP1wiXCI6dicgOiAndicpXG5cbiAgICAgICsgJ319KS5jYWxsKGQpJ1xuICB9XG5cbn0pKClcbi8vIHsga2V5LCBpIGluIGl0ZW1zfSAtPiB7IGtleSwgaSwgaXRlbXMgfVxuZnVuY3Rpb24gbG9vcEtleXMoZXhwcikge1xuICB2YXIgcmV0ID0geyB2YWw6IGV4cHIgfSxcbiAgICAgIGVscyA9IGV4cHIuc3BsaXQoL1xccytpblxccysvKVxuXG4gIGlmIChlbHNbMV0pIHtcbiAgICByZXQudmFsID0gYnJhY2tldHMoMCkgKyBlbHNbMV1cbiAgICBlbHMgPSBlbHNbMF0uc2xpY2UoYnJhY2tldHMoMCkubGVuZ3RoKS50cmltKCkuc3BsaXQoLyxcXHMqLylcbiAgICByZXQua2V5ID0gZWxzWzBdXG4gICAgcmV0LnBvcyA9IGVsc1sxXVxuICB9XG5cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBta2l0ZW0oZXhwciwga2V5LCB2YWwpIHtcbiAgdmFyIGl0ZW0gPSB7fVxuICBpdGVtW2V4cHIua2V5XSA9IGtleVxuICBpZiAoZXhwci5wb3MpIGl0ZW1bZXhwci5wb3NdID0gdmFsXG4gIHJldHVybiBpdGVtXG59XG5cblxuLyogQmV3YXJlOiBoZWF2eSBzdHVmZiAqL1xuZnVuY3Rpb24gX2VhY2goZG9tLCBwYXJlbnQsIGV4cHIpIHtcblxuICByZW1BdHRyKGRvbSwgJ2VhY2gnKVxuXG4gIHZhciB0ZW1wbGF0ZSA9IGRvbS5vdXRlckhUTUwsXG4gICAgICBwcmV2ID0gZG9tLnByZXZpb3VzU2libGluZyxcbiAgICAgIHJvb3QgPSBkb20ucGFyZW50Tm9kZSxcbiAgICAgIHJlbmRlcmVkID0gW10sXG4gICAgICB0YWdzID0gW10sXG4gICAgICBjaGVja3N1bVxuXG4gIGV4cHIgPSBsb29wS2V5cyhleHByKVxuXG4gIGZ1bmN0aW9uIGFkZChwb3MsIGl0ZW0sIHRhZykge1xuICAgIHJlbmRlcmVkLnNwbGljZShwb3MsIDAsIGl0ZW0pXG4gICAgdGFncy5zcGxpY2UocG9zLCAwLCB0YWcpXG4gIH1cblxuXG4gIC8vIGNsZWFuIHRlbXBsYXRlIGNvZGUgYWZ0ZXIgdXBkYXRlIChhbmQgbGV0IHdhbGsgZmluaXNoIGl0J3MgcGFyc2UpXG4gIHBhcmVudC5vbmUoJ3VwZGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgIHJvb3QucmVtb3ZlQ2hpbGQoZG9tKVxuXG4gIH0pLm9uZSgncHJlbW91bnQnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAocm9vdC5zdHViKSByb290ID0gcGFyZW50LnJvb3RcblxuICB9KS5vbigndXBkYXRlJywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgaXRlbXMgPSB0bXBsKGV4cHIudmFsLCBwYXJlbnQpXG4gICAgaWYgKCFpdGVtcykgcmV0dXJuXG5cbiAgICAvLyBvYmplY3QgbG9vcC4gYW55IGNoYW5nZXMgY2F1c2UgZnVsbCByZWRyYXdcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICB2YXIgdGVzdHN1bSA9IEpTT04uc3RyaW5naWZ5KGl0ZW1zKVxuICAgICAgaWYgKHRlc3RzdW0gPT0gY2hlY2tzdW0pIHJldHVyblxuICAgICAgY2hlY2tzdW0gPSB0ZXN0c3VtXG5cbiAgICAgIC8vIGNsZWFyIG9sZCBpdGVtc1xuICAgICAgZWFjaCh0YWdzLCBmdW5jdGlvbih0YWcpIHsgdGFnLnVubW91bnQoKSB9KVxuICAgICAgcmVuZGVyZWQgPSBbXVxuICAgICAgdGFncyA9IFtdXG5cbiAgICAgIGl0ZW1zID0gT2JqZWN0LmtleXMoaXRlbXMpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgcmV0dXJuIG1raXRlbShleHByLCBrZXksIGl0ZW1zW2tleV0pXG4gICAgICB9KVxuXG4gICAgfVxuXG4gICAgLy8gdW5tb3VudCByZWR1bmRhbnRcbiAgICBlYWNoKGFyckRpZmYocmVuZGVyZWQsIGl0ZW1zKSwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgdmFyIHBvcyA9IHJlbmRlcmVkLmluZGV4T2YoaXRlbSksXG4gICAgICAgICAgdGFnID0gdGFnc1twb3NdXG5cbiAgICAgIGlmICh0YWcpIHtcbiAgICAgICAgdGFnLnVubW91bnQoKVxuICAgICAgICByZW5kZXJlZC5zcGxpY2UocG9zLCAxKVxuICAgICAgICB0YWdzLnNwbGljZShwb3MsIDEpXG4gICAgICB9XG5cbiAgICB9KVxuXG4gICAgLy8gbW91bnQgbmV3IC8gcmVvcmRlclxuICAgIHZhciBub2RlcyA9IHJvb3QuY2hpbGROb2RlcyxcbiAgICAgICAgcHJldl9pbmRleCA9IFtdLmluZGV4T2YuY2FsbChub2RlcywgcHJldilcblxuICAgIGVhY2goaXRlbXMsIGZ1bmN0aW9uKGl0ZW0sIGkpIHtcblxuICAgICAgLy8gc3RhcnQgaW5kZXggc2VhcmNoIGZyb20gcG9zaXRpb24gYmFzZWQgb24gdGhlIGN1cnJlbnQgaVxuICAgICAgdmFyIHBvcyA9IGl0ZW1zLmluZGV4T2YoaXRlbSwgaSksXG4gICAgICAgICAgb2xkUG9zID0gcmVuZGVyZWQuaW5kZXhPZihpdGVtLCBpKVxuXG4gICAgICAvLyBpZiBub3QgZm91bmQsIHNlYXJjaCBiYWNrd2FyZHMgZnJvbSBjdXJyZW50IGkgcG9zaXRpb25cbiAgICAgIHBvcyA8IDAgJiYgKHBvcyA9IGl0ZW1zLmxhc3RJbmRleE9mKGl0ZW0sIGkpKVxuICAgICAgb2xkUG9zIDwgMCAmJiAob2xkUG9zID0gcmVuZGVyZWQubGFzdEluZGV4T2YoaXRlbSwgaSkpXG5cbiAgICAgIC8vIG1vdW50IG5ld1xuICAgICAgaWYgKG9sZFBvcyA8IDApIHtcbiAgICAgICAgaWYgKCFjaGVja3N1bSAmJiBleHByLmtleSkgaXRlbSA9IG1raXRlbShleHByLCBpdGVtLCBwb3MpXG5cbiAgICAgICAgdmFyIHRhZyA9IG5ldyBUYWcoeyB0bXBsOiB0ZW1wbGF0ZSB9LCB7XG4gICAgICAgICAgYmVmb3JlOiBub2Rlc1twcmV2X2luZGV4ICsgMSArIHBvc10sXG4gICAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgICAgcm9vdDogcm9vdCxcbiAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gYWRkKHBvcywgaXRlbSwgdGFnKVxuICAgICAgfVxuXG4gICAgICAvLyBjaGFuZ2UgcG9zIHZhbHVlXG4gICAgICBpZiAoZXhwci5wb3MgJiYgdGFnc1tvbGRQb3NdW2V4cHIucG9zXSAhPSBwb3MpIHtcbiAgICAgICAgdGFnc1tvbGRQb3NdLm9uZSgndXBkYXRlJywgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIGl0ZW1bZXhwci5wb3NdID0gcG9zXG4gICAgICAgIH0pXG4gICAgICAgIHRhZ3Nbb2xkUG9zXS51cGRhdGUoKVxuICAgICAgfVxuXG4gICAgICAvLyByZW9yZGVyXG4gICAgICBpZiAocG9zICE9IG9sZFBvcykge1xuICAgICAgICByb290Lmluc2VydEJlZm9yZShub2Rlc1twcmV2X2luZGV4ICsgb2xkUG9zICsgMV0sIG5vZGVzW3ByZXZfaW5kZXggKyBwb3MgKyAxXSlcbiAgICAgICAgcmV0dXJuIGFkZChwb3MsIHJlbmRlcmVkLnNwbGljZShvbGRQb3MsIDEpWzBdLCB0YWdzLnNwbGljZShvbGRQb3MsIDEpWzBdKVxuICAgICAgfVxuXG4gICAgfSlcblxuICAgIHJlbmRlcmVkID0gaXRlbXMuc2xpY2UoKVxuXG4gIH0pXG5cbn1cblxuZnVuY3Rpb24gcGFyc2VOYW1lZEVsZW1lbnRzKHJvb3QsIHRhZywgZXhwcmVzc2lvbnMpIHtcbiAgd2Fsayhyb290LCBmdW5jdGlvbihkb20pIHtcbiAgICBpZiAoZG9tLm5vZGVUeXBlID09IDEpIHtcbiAgICAgIGVhY2goZG9tLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGF0dHIpIHtcbiAgICAgICAgaWYgKC9eKG5hbWV8aWQpJC8udGVzdChhdHRyLm5hbWUpKSB0YWdbYXR0ci52YWx1ZV0gPSBkb21cbiAgICAgIH0pXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBwYXJzZUxheW91dChyb290LCB0YWcsIGV4cHJlc3Npb25zKSB7XG5cbiAgZnVuY3Rpb24gYWRkRXhwcihkb20sIHZhbCwgZXh0cmEpIHtcbiAgICBpZiAodmFsLmluZGV4T2YoYnJhY2tldHMoMCkpID49IDApIHtcbiAgICAgIHZhciBleHByID0geyBkb206IGRvbSwgZXhwcjogdmFsIH1cbiAgICAgIGV4cHJlc3Npb25zLnB1c2goZXh0ZW5kKGV4cHIsIGV4dHJhKSlcbiAgICB9XG4gIH1cblxuICB3YWxrKHJvb3QsIGZ1bmN0aW9uKGRvbSkge1xuICAgIHZhciB0eXBlID0gZG9tLm5vZGVUeXBlXG5cbiAgICAvLyB0ZXh0IG5vZGVcbiAgICBpZiAodHlwZSA9PSAzICYmIGRvbS5wYXJlbnROb2RlLnRhZ05hbWUgIT0gJ1NUWUxFJykgYWRkRXhwcihkb20sIGRvbS5ub2RlVmFsdWUpXG4gICAgaWYgKHR5cGUgIT0gMSkgcmV0dXJuXG5cbiAgICAvKiBlbGVtZW50ICovXG5cbiAgICAvLyBsb29wXG4gICAgdmFyIGF0dHIgPSBkb20uZ2V0QXR0cmlidXRlKCdlYWNoJylcbiAgICBpZiAoYXR0cikgeyBfZWFjaChkb20sIHRhZywgYXR0cik7IHJldHVybiBmYWxzZSB9XG5cbiAgICAvLyBhdHRyaWJ1dGUgZXhwcmVzc2lvbnNcbiAgICBlYWNoKGRvbS5hdHRyaWJ1dGVzLCBmdW5jdGlvbihhdHRyKSB7XG4gICAgICB2YXIgbmFtZSA9IGF0dHIubmFtZSxcbiAgICAgICAgICBib29sID0gbmFtZS5zcGxpdCgnX18nKVsxXVxuXG4gICAgICBhZGRFeHByKGRvbSwgYXR0ci52YWx1ZSwgeyBhdHRyOiBib29sIHx8IG5hbWUsIGJvb2w6IGJvb2wgfSlcbiAgICAgIGlmIChib29sKSB7IHJlbUF0dHIoZG9tLCBuYW1lKTsgcmV0dXJuIGZhbHNlIH1cblxuICAgIH0pXG5cbiAgICAvLyBjdXN0b20gY2hpbGQgdGFnXG4gICAgdmFyIGltcGwgPSB0YWdfaW1wbFtkb20udGFnTmFtZS50b0xvd2VyQ2FzZSgpXVxuXG4gICAgaWYgKGltcGwpIHtcbiAgICAgIGltcGwgPSBuZXcgVGFnKGltcGwsIHsgcm9vdDogZG9tLCBwYXJlbnQ6IHRhZyB9KVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gIH0pXG59XG5cbmZ1bmN0aW9uIFRhZyhpbXBsLCBjb25mKSB7XG5cbiAgdmFyIHNlbGYgPSByaW90Lm9ic2VydmFibGUodGhpcyksXG4gICAgICBvcHRzID0gaW5oZXJpdChjb25mLm9wdHMpIHx8IHt9LFxuICAgICAgZG9tID0gbWtkb20oaW1wbC50bXBsKSxcbiAgICAgIHBhcmVudCA9IGNvbmYucGFyZW50LFxuICAgICAgaXNfbG9vcCA9IGNvbmYubG9vcCxcbiAgICAgIGV4cHJlc3Npb25zID0gW10sXG4gICAgICByb290ID0gY29uZi5yb290LFxuICAgICAgaXRlbSA9IGNvbmYuaXRlbSxcbiAgICAgIGF0dHIgPSB7fSxcbiAgICAgIGxvb3BfZG9tXG5cbiAgZXh0ZW5kKHRoaXMsIHsgcGFyZW50OiBwYXJlbnQsIHJvb3Q6IHJvb3QsIG9wdHM6IG9wdHMgfSwgaXRlbSlcblxuICAvLyBncmFiIGF0dHJpYnV0ZXNcbiAgZWFjaChyb290LmF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGVsKSB7XG4gICAgYXR0cltlbC5uYW1lXSA9IGVsLnZhbHVlXG4gIH0pXG5cbiAgLy8gb3B0aW9uc1xuICBmdW5jdGlvbiB1cGRhdGVPcHRzKHJlbV9hdHRyKSB7XG4gICAgZWFjaChPYmplY3Qua2V5cyhhdHRyKSwgZnVuY3Rpb24obmFtZSkge1xuICAgICAgb3B0c1tuYW1lXSA9IHRtcGwoYXR0cltuYW1lXSwgcGFyZW50IHx8IHNlbGYpXG4gICAgfSlcbiAgfVxuXG4gIHRoaXMudXBkYXRlID0gZnVuY3Rpb24oZGF0YSwgaW5pdCkge1xuICAgIGV4dGVuZChzZWxmLCBkYXRhLCBpdGVtKVxuICAgIHVwZGF0ZU9wdHMoKVxuICAgIHNlbGYudHJpZ2dlcigndXBkYXRlJywgaXRlbSlcbiAgICB1cGRhdGUoZXhwcmVzc2lvbnMsIHNlbGYsIGl0ZW0pXG4gICAgc2VsZi50cmlnZ2VyKCd1cGRhdGVkJylcbiAgfVxuXG4gIHRoaXMudW5tb3VudCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IGlzX2xvb3AgPyBsb29wX2RvbSA6IHJvb3QsXG4gICAgICAgIHAgPSBlbC5wYXJlbnROb2RlXG5cbiAgICBpZiAocCkge1xuICAgICAgaWYgKHBhcmVudCkgcC5yZW1vdmVDaGlsZChlbClcbiAgICAgIGVsc2Ugd2hpbGUgKHJvb3QuZmlyc3RDaGlsZCkgcm9vdC5yZW1vdmVDaGlsZChyb290LmZpcnN0Q2hpbGQpXG4gICAgICBzZWxmLnRyaWdnZXIoJ3VubW91bnQnKVxuICAgICAgcGFyZW50ICYmIHBhcmVudC5vZmYoJ3VwZGF0ZScsIHNlbGYudXBkYXRlKS5vZmYoJ3VubW91bnQnLCBzZWxmLnVubW91bnQpXG4gICAgICBzZWxmLm9mZignKicpXG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiBtb3VudCgpIHtcblxuICAgIC8vIGludGVybmFsIHVzZSBvbmx5LCBmaXhlcyAjNDAzXG4gICAgc2VsZi50cmlnZ2VyKCdwcmVtb3VudCcpXG5cbiAgICBpZiAoaXNfbG9vcCkge1xuICAgICAgbG9vcF9kb20gPSBkb20uZmlyc3RDaGlsZFxuICAgICAgcm9vdC5pbnNlcnRCZWZvcmUobG9vcF9kb20sIGNvbmYuYmVmb3JlIHx8IG51bGwpIC8vIG51bGwgbmVlZGVkIGZvciBJRThcblxuICAgIH0gZWxzZSB7XG4gICAgICB3aGlsZSAoZG9tLmZpcnN0Q2hpbGQpIHJvb3QuYXBwZW5kQ2hpbGQoZG9tLmZpcnN0Q2hpbGQpXG4gICAgfVxuXG4gICAgaWYgKHJvb3Quc3R1Yikgc2VsZi5yb290ID0gcm9vdCA9IHBhcmVudC5yb290XG5cbiAgICAvLyBvbmUgd2F5IGRhdGEgZmxvdzogcHJvcGFnYXRlIHVwZGF0ZXMgYW5kIHVubW91bnRzIGRvd253YXJkcyBmcm9tIHBhcmVudCB0byBjaGlsZHJlblxuICAgIHBhcmVudCAmJiBwYXJlbnQub24oJ3VwZGF0ZScsIHNlbGYudXBkYXRlKS5vbmUoJ3VubW91bnQnLCBzZWxmLnVubW91bnQpXG5cbiAgICBzZWxmLnRyaWdnZXIoJ21vdW50JylcbiAgfVxuXG4gIHVwZGF0ZU9wdHMoKVxuXG4gIC8vIG5hbWVkIGVsZW1lbnRzIGF2YWlsYWJsZSBmb3IgZm5cbiAgcGFyc2VOYW1lZEVsZW1lbnRzKGRvbSwgdGhpcylcblxuICAvLyBmbiAoaW5pdGlhbGlhdGlvbilcbiAgaWYgKGltcGwuZm4pIGltcGwuZm4uY2FsbCh0aGlzLCBvcHRzKVxuXG4gIC8vIHBhcnNlIGxheW91dCBhZnRlciBpbml0LiBmbiBtYXkgY2FsY3VsYXRlIGFyZ3MgZm9yIG5lc3RlZCBjdXN0b20gdGFnc1xuICBwYXJzZUxheW91dChkb20sIHRoaXMsIGV4cHJlc3Npb25zKVxuXG4gIHRoaXMudXBkYXRlKClcbiAgbW91bnQoKVxuXG59XG5cbmZ1bmN0aW9uIHNldEV2ZW50SGFuZGxlcihuYW1lLCBoYW5kbGVyLCBkb20sIHRhZywgaXRlbSkge1xuXG4gIGRvbVtuYW1lXSA9IGZ1bmN0aW9uKGUpIHtcblxuICAgIC8vIGNyb3NzIGJyb3dzZXIgZXZlbnQgZml4XG4gICAgZSA9IGUgfHwgd2luZG93LmV2ZW50XG4gICAgZS53aGljaCA9IGUud2hpY2ggfHwgZS5jaGFyQ29kZSB8fCBlLmtleUNvZGVcbiAgICBlLnRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudFxuICAgIGUuY3VycmVudFRhcmdldCA9IGRvbVxuICAgIGUuaXRlbSA9IGl0ZW1cblxuICAgIC8vIHByZXZlbnQgZGVmYXVsdCBiZWhhdmlvdXIgKGJ5IGRlZmF1bHQpXG4gICAgaWYgKGhhbmRsZXIuY2FsbCh0YWcsIGUpICE9PSB0cnVlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0ICYmIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgdmFyIGVsID0gaXRlbSA/IHRhZy5wYXJlbnQgOiB0YWdcbiAgICBlbC51cGRhdGUoKVxuXG4gIH1cblxufVxuXG4vLyB1c2VkIGJ5IGlmLSBhdHRyaWJ1dGVcbmZ1bmN0aW9uIGluc2VydFRvKHJvb3QsIG5vZGUsIGJlZm9yZSkge1xuICBpZiAocm9vdCkge1xuICAgIHJvb3QuaW5zZXJ0QmVmb3JlKGJlZm9yZSwgbm9kZSlcbiAgICByb290LnJlbW92ZUNoaWxkKG5vZGUpXG4gIH1cbn1cblxuLy8gaXRlbSA9IGN1cnJlbnRseSBsb29wZWQgaXRlbVxuZnVuY3Rpb24gdXBkYXRlKGV4cHJlc3Npb25zLCB0YWcsIGl0ZW0pIHtcblxuICBlYWNoKGV4cHJlc3Npb25zLCBmdW5jdGlvbihleHByKSB7XG5cbiAgICB2YXIgZG9tID0gZXhwci5kb20sXG4gICAgICAgIGF0dHJfbmFtZSA9IGV4cHIuYXR0cixcbiAgICAgICAgdmFsdWUgPSB0bXBsKGV4cHIuZXhwciwgdGFnKVxuXG4gICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gJydcblxuICAgIC8vIG5vIGNoYW5nZVxuICAgIGlmIChleHByLnZhbHVlID09PSB2YWx1ZSkgcmV0dXJuXG4gICAgZXhwci52YWx1ZSA9IHZhbHVlXG5cbiAgICAvLyB0ZXh0IG5vZGVcbiAgICBpZiAoIWF0dHJfbmFtZSkgcmV0dXJuIGRvbS5ub2RlVmFsdWUgPSB2YWx1ZVxuXG4gICAgLy8gcmVtb3ZlIG9yaWdpbmFsIGF0dHJpYnV0ZVxuICAgIHJlbUF0dHIoZG9tLCBhdHRyX25hbWUpXG5cbiAgICAvLyBldmVudCBoYW5kbGVyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBzZXRFdmVudEhhbmRsZXIoYXR0cl9uYW1lLCB2YWx1ZSwgZG9tLCB0YWcsIGl0ZW0pXG5cbiAgICAvLyBpZi0gY29uZGl0aW9uYWxcbiAgICB9IGVsc2UgaWYgKGF0dHJfbmFtZSA9PSAnaWYnKSB7XG4gICAgICB2YXIgc3R1YiA9IGV4cHIuc3R1YlxuXG4gICAgICAvLyBhZGQgdG8gRE9NXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgc3R1YiAmJiBpbnNlcnRUbyhzdHViLnBhcmVudE5vZGUsIHN0dWIsIGRvbSlcblxuICAgICAgLy8gcmVtb3ZlIGZyb20gRE9NXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHViID0gZXhwci5zdHViID0gc3R1YiB8fCBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJylcbiAgICAgICAgaW5zZXJ0VG8oZG9tLnBhcmVudE5vZGUsIGRvbSwgc3R1YilcbiAgICAgIH1cblxuICAgIC8vIHNob3cgLyBoaWRlXG4gICAgfSBlbHNlIGlmICgvXihzaG93fGhpZGUpJC8udGVzdChhdHRyX25hbWUpKSB7XG4gICAgICBpZiAoYXR0cl9uYW1lID09ICdoaWRlJykgdmFsdWUgPSAhdmFsdWVcbiAgICAgIGRvbS5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnJyA6ICdub25lJ1xuXG4gICAgLy8gZmllbGQgdmFsdWVcbiAgICB9IGVsc2UgaWYgKGF0dHJfbmFtZSA9PSAndmFsdWUnKSB7XG4gICAgICBkb20udmFsdWUgPSB2YWx1ZVxuXG4gICAgLy8gPGltZyBzcmM9XCJ7IGV4cHIgfVwiPlxuICAgIH0gZWxzZSBpZiAoYXR0cl9uYW1lLnNsaWNlKDAsIDQpID09ICdyaW90Jykge1xuICAgICAgYXR0cl9uYW1lID0gYXR0cl9uYW1lLnNsaWNlKDUpXG4gICAgICB2YWx1ZSA/IGRvbS5zZXRBdHRyaWJ1dGUoYXR0cl9uYW1lLCB2YWx1ZSkgOiByZW1BdHRyKGRvbSwgYXR0cl9uYW1lKVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChleHByLmJvb2wpIHtcbiAgICAgICAgZG9tW2F0dHJfbmFtZV0gPSB2YWx1ZVxuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm5cbiAgICAgICAgdmFsdWUgPSBhdHRyX25hbWVcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnb2JqZWN0JykgZG9tLnNldEF0dHJpYnV0ZShhdHRyX25hbWUsIHZhbHVlKVxuXG4gICAgfVxuXG4gIH0pXG5cbn1cbmZ1bmN0aW9uIGVhY2goZWxzLCBmbikge1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gKGVscyB8fCBbXSkubGVuZ3RoLCBlbDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgZWwgPSBlbHNbaV1cbiAgICAvLyByZXR1cm4gZmFsc2UgLT4gcmVvbXZlIGN1cnJlbnQgaXRlbSBkdXJpbmcgbG9vcFxuICAgIGlmIChlbCAhPSBudWxsICYmIGZuKGVsLCBpKSA9PT0gZmFsc2UpIGktLVxuICB9XG4gIHJldHVybiBlbHNcbn1cblxuZnVuY3Rpb24gcmVtQXR0cihkb20sIG5hbWUpIHtcbiAgZG9tLnJlbW92ZUF0dHJpYnV0ZShuYW1lKVxufVxuXG4vLyBtYXggMiBmcm9tIG9iamVjdHMgYWxsb3dlZFxuZnVuY3Rpb24gZXh0ZW5kKG9iaiwgZnJvbSwgZnJvbTIpIHtcbiAgZnJvbSAmJiBlYWNoKE9iamVjdC5rZXlzKGZyb20pLCBmdW5jdGlvbihrZXkpIHtcbiAgICBvYmpba2V5XSA9IGZyb21ba2V5XVxuICB9KVxuICByZXR1cm4gZnJvbTIgPyBleHRlbmQob2JqLCBmcm9tMikgOiBvYmpcbn1cblxuZnVuY3Rpb24gbWtkb20odGVtcGxhdGUpIHtcbiAgdmFyIHRhZ19uYW1lID0gdGVtcGxhdGUudHJpbSgpLnNsaWNlKDEsIDMpLnRvTG93ZXJDYXNlKCksXG4gICAgICByb290X3RhZyA9IC90ZHx0aC8udGVzdCh0YWdfbmFtZSkgPyAndHInIDogdGFnX25hbWUgPT0gJ3RyJyA/ICd0Ym9keScgOiAnZGl2JyxcbiAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChyb290X3RhZylcblxuICBlbC5zdHViID0gdHJ1ZVxuICBlbC5pbm5lckhUTUwgPSB0ZW1wbGF0ZVxuICByZXR1cm4gZWxcbn1cblxuZnVuY3Rpb24gd2Fsayhkb20sIGZuKSB7XG4gIGlmIChkb20pIHtcbiAgICBpZiAoZm4oZG9tKSA9PT0gZmFsc2UpIHdhbGsoZG9tLm5leHRTaWJsaW5nLCBmbilcbiAgICBlbHNlIHtcbiAgICAgIGRvbSA9IGRvbS5maXJzdENoaWxkXG5cbiAgICAgIHdoaWxlIChkb20pIHtcbiAgICAgICAgd2Fsayhkb20sIGZuKVxuICAgICAgICBkb20gPSBkb20ubmV4dFNpYmxpbmdcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXJyRGlmZihhcnIxLCBhcnIyKSB7XG4gIHJldHVybiBhcnIxLmZpbHRlcihmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiBhcnIyLmluZGV4T2YoZWwpIDwgMFxuICB9KVxufVxuXG5mdW5jdGlvbiBpbmhlcml0KHBhcmVudCkge1xuICBmdW5jdGlvbiBDaGlsZCgpIHt9XG4gIENoaWxkLnByb3RvdHlwZSA9IHBhcmVudFxuICByZXR1cm4gbmV3IENoaWxkKClcbn1cblxuXG4vKlxuIFZpcnR1YWwgZG9tIGlzIGFuIGFycmF5IG9mIGN1c3RvbSB0YWdzIG9uIHRoZSBkb2N1bWVudC5cbiBVcGRhdGVzIGFuZCB1bm1vdW50cyBwcm9wYWdhdGUgZG93bndhcmRzIGZyb20gcGFyZW50IHRvIGNoaWxkcmVuLlxuKi9cblxudmFyIHZpcnR1YWxfZG9tID0gW10sXG4gICAgdGFnX2ltcGwgPSB7fVxuXG5mdW5jdGlvbiBpbmplY3RTdHlsZShjc3MpIHtcbiAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gIG5vZGUuaW5uZXJIVE1MID0gY3NzXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobm9kZSlcbn1cblxuZnVuY3Rpb24gbW91bnRUbyhyb290LCB0YWdOYW1lLCBvcHRzKSB7XG4gIHZhciB0YWcgPSB0YWdfaW1wbFt0YWdOYW1lXVxuXG4gIGlmICh0YWcgJiYgcm9vdCkge1xuICAgIHRhZyA9IG5ldyBUYWcodGFnLCB7IHJvb3Q6IHJvb3QsIG9wdHM6IG9wdHMgfSlcbiAgICB2aXJ0dWFsX2RvbS5wdXNoKHRhZylcbiAgICByZXR1cm4gdGFnLm9uKCd1bm1vdW50JywgZnVuY3Rpb24oKSB7XG4gICAgICB2aXJ0dWFsX2RvbS5zcGxpY2UodmlydHVhbF9kb20uaW5kZXhPZih0YWcpLCAxKVxuICAgIH0pXG4gIH1cbn1cblxucmlvdC50YWcgPSBmdW5jdGlvbihuYW1lLCBodG1sLCBjc3MsIGZuKSB7XG4gIGlmICh0eXBlb2YgY3NzID09ICdmdW5jdGlvbicpIGZuID0gY3NzXG4gIGVsc2UgaWYgKGNzcykgaW5qZWN0U3R5bGUoY3NzKVxuICB0YWdfaW1wbFtuYW1lXSA9IHsgbmFtZTogbmFtZSwgdG1wbDogaHRtbCwgZm46IGZuIH1cbn1cblxucmlvdC5tb3VudCA9IGZ1bmN0aW9uKHNlbGVjdG9yLCB0YWdOYW1lLCBvcHRzKSB7XG4gIGlmIChzZWxlY3RvciA9PSAnKicpIHNlbGVjdG9yID0gT2JqZWN0LmtleXModGFnX2ltcGwpLmpvaW4oJywgJylcbiAgaWYgKHR5cGVvZiB0YWdOYW1lID09ICdvYmplY3QnKSB7IG9wdHMgPSB0YWdOYW1lOyB0YWdOYW1lID0gMCB9XG5cbiAgdmFyIHRhZ3MgPSBbXVxuXG4gIGZ1bmN0aW9uIHB1c2gocm9vdCkge1xuICAgIHZhciBuYW1lID0gdGFnTmFtZSB8fCByb290LnRhZ05hbWUudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgdGFnID0gbW91bnRUbyhyb290LCBuYW1lLCBvcHRzKVxuXG4gICAgaWYgKHRhZykgdGFncy5wdXNoKHRhZylcbiAgfVxuXG4gIC8vIERPTSBub2RlXG4gIGlmIChzZWxlY3Rvci50YWdOYW1lKSB7XG4gICAgcHVzaChzZWxlY3RvcilcbiAgICByZXR1cm4gdGFnc1swXVxuXG4gIC8vIHNlbGVjdG9yXG4gIH0gZWxzZSB7XG4gICAgZWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSwgcHVzaClcbiAgICByZXR1cm4gdGFnc1xuICB9XG5cbn1cblxuLy8gdXBkYXRlIGV2ZXJ5dGhpbmdcbnJpb3QudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBlYWNoKHZpcnR1YWxfZG9tLCBmdW5jdGlvbih0YWcpIHtcbiAgICB0YWcudXBkYXRlKClcbiAgfSlcbn1cblxuLy8gQGRlcHJlY2lhdGVkXG5yaW90Lm1vdW50VG8gPSByaW90Lm1vdW50XG5cblxuICBcbiAgLy8gc2hhcmUgbWV0aG9kcyBmb3Igb3RoZXIgcmlvdCBwYXJ0cywgZS5nLiBjb21waWxlclxuICByaW90LnV0aWwgPSB7IGJyYWNrZXRzOiBicmFja2V0cywgdG1wbDogdG1wbCB9XG5cbiAgLy8gc3VwcG9ydCBDb21tb25KU1xuICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuICAgIG1vZHVsZS5leHBvcnRzID0gcmlvdFxuXG4gIC8vIHN1cHBvcnQgQU1EXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiByaW90IH0pXG5cbiAgLy8gc3VwcG9ydCBicm93c2VyXG4gIGVsc2VcbiAgICB0aGlzLnJpb3QgPSByaW90XG5cbn0pKCk7XG4iLCIvKlxuICogV2hlbiBmaXJzdCBjcmVhdGVkIGEgUG9zdCBvYmplY3QgaXMganVzdCBhIGhvbGRlciBmb3IgUG9zdCBhdHRyaWJ1dGVzXG4gKiB3aXRoIHNvbWUgY29udmVuaWVuY2UgbWV0aG9kcyBmb3IgdXBkYXRpbmcgYXR0cmlidXRlcywgdmFsaWRhdGluZywgZXRjLlxuICpcbiAqIEVYQU1QTEU6XG4gKlxuICogICAgIHZhciBQb3N0ID0gcmVxdWlyZSgnYXBwL3Bvc3QnKVxuICpcbiAqICAgICB2YXIgcG9zdCA9IG5ldyBQb3N0KHsgdGl0bGU6ICdTb21lIHRpdGxlJyB9KVxuICpcbiAqICAgICBpZiAocG9zdC52YWxpZGF0aW9uKCkuaXNWYWxpZCgpKSB7IFBvc3QucGVyc2lzdChwb3N0KSB9XG4gKlxuICogSW5zdGVhZCBvZiB1c2luZyBjYWxsYmFja3Mgb3IgcHJvbWlzZXMsIHRoZSBQb3N0IGZ1bmN0aW9uIGlzIG9ic2VydmFibGU6XG4gKlxuICogICAgIFBvc3Qub24oJ3Bvc3RzOmRpZDpwZXJzaXN0JywgZnVuY3Rpb24ocG9zdCkge1xuICogICAgICAgY29uc29sZS5sb2coJ3Bvc3QgJyArIHBvc3QgKyAnIHdhcyBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpXG4gKiAgICAgfSlcbiAqXG4gKi9cblxudmFyIF8gPSB7XG4gIGRlZmF1bHRzIDogcmVxdWlyZSgnbG9kYXNoL29iamVjdC9kZWZhdWx0cycpLFxuICBtZXJnZSAgICA6IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvbWVyZ2UnKSxcbiAgcGljayAgICAgOiByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L3BpY2snKVxufVxuXG52YXJcbiAgZmJyZWYgPSBuZXcgRmlyZWJhc2UoJ2h0dHBzOi8vbXVzaWZhdnMuZmlyZWJhc2Vpby5jb20nKSxcbiAgdGltZWFnbyA9IHJlcXVpcmUoJy4uL2xpYi9mcm9tbm93JyksXG4gIHl0ID0gcmVxdWlyZSgnLi4vbGliL3lvdXR1YmUnKVxuXG5mdW5jdGlvbiBQb3N0KG9wdHMsIGtleSkge1xuICB0aGlzLnNldGF0dHIoXy5kZWZhdWx0cyh7fSwgb3B0cywge2tleToga2V5fSwgUG9zdC5kZWZhdWx0cykpXG59XG5cblBvc3QuZGVmYXVsdHMgPSB7XG4gIGRhdGU6IHVuZGVmaW5lZCxcbiAgZGVzYzogJycsXG4gIGVtYmVkOiB7fSxcbiAgZmF2ZXJzOiB7fSxcbiAga2V5OiBudWxsLFxuICBzdG9yZWQ6IGZhbHNlLFxuICB0aXRsZTogJycsXG4gIHVpZDogdW5kZWZpbmVkLFxuICB1c2VyTmFtZTogdW5kZWZpbmVkXG59XG5cbi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogSW5zdGFuY2UgTWV0aG9kc1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqL1xuXG5Qb3N0LnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbihvdGhlcikge1xuICByZXR1cm4gdGhpcy5rZXkgPT09IG90aGVyLmtleVxufVxuXG5Qb3N0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoXy5waWNrKHRoaXMuZ2V0YXR0cigpLCBbJ3RpdGxlJywgJ2tleSddKSlcbn1cblxuLy8gUmV0dXJucyBvbmx5IFBvc3QgKmRhdGEqIGF0dHJpYnV0ZXNcblBvc3QucHJvdG90eXBlLmdldGF0dHIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIF8ucGljayh0aGlzLCBPYmplY3Qua2V5cyhQb3N0LmRlZmF1bHRzKSlcbn1cblxuLy8gU2V0cyBhdHRyaWJ1dGVzIGFuZCBkZXJpdmVkL2NvbXB1dGVkIGF0dHJpYnV0ZXNcblBvc3QucHJvdG90eXBlLnNldGF0dHIgPSBmdW5jdGlvbihvcHRzKSB7XG4gIF8ubWVyZ2UodGhpcywgb3B0cylcblxuICB2YXIgcCA9IHRoaXNcblxuICB0aGlzLnN0b3JlZCA9ICghIXAua2V5KSAmJiAocC5rZXkgIT0gJ25ldycpXG4gIHRoaXMuZGF0ZSA9IHAuZGF0ZSA/IG5ldyBEYXRlKHAuZGF0ZSkgOiBuZXcgRGF0ZSgpXG5cbiAgaWYgKHAuZW1iZWQgJiYgKCFwLmVtYmVkLnR5cGUgfHwgcC5lbWJlZC50eXBlID09ICd1bmtub3duJykpIHtcbiAgICAvLyBUT0RPOiBwYXJzZSBvdGhlciBzZXJ2aWNlcyAoc291bmRjbG91ZCwgYmFuZGNhbXAsIGV0Yy4pXG4gICAgdGhpcy5lbWJlZCA9IHl0LmV4dHJhY3RFbWJlZChwLmVtYmVkLnVybClcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIHJldHVybnMgYW4gb2JqZWN0IHdpdGggdmFsaWRhdGlvbiByZXN1bHRzXG5Qb3N0LnByb3RvdHlwZS52YWxpZGF0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHZhciBwID0gdGhpcywgciA9IHsgZXJyb3JzOiBbXSwgaXNWYWxpZDogdHJ1ZSB9XG5cbiAgaWYgKCFwLmRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgci5lcnJvcnMuZGF0ZSA9ICdkYXRlIGlzIGludmFsaWQnXG4gICAgci5pc1ZhbGlkID0gZmFsc2VcbiAgfVxuXG4gIGlmICghcC50aXRsZSB8fCBwLnRpdGxlLmxlbmd0aCA9PSAwKSB7XG4gICAgci5lcnJvcnMudGl0bGUgPSAndGl0bGUgY2FuXFwndCBiZSBibGFuaydcbiAgICByLmlzVmFsaWQgPSBmYWxzZVxuICB9XG5cbiAgaWYgKCFwLmVtYmVkIHx8ICFwLmVtYmVkLnR5cGUgfHwgcC5lbWJlZC50eXBlID09ICd1bmtub3duJykge1xuICAgIHIuZXJyb3JzLnVybCA9ICd0aGUgZW1iZWQgdXJsIGlzIGludmFsaWQnXG4gICAgci5pc1ZhbGlkID0gZmFsc2VcbiAgfVxuXG4gIHJldHVybiByXG59XG5cbi8vIFJldHVybnMgYSBTdHJpbmcgZm9ybWF0dGVkIGRhdGUuXG5Qb3N0LnByb3RvdHlwZS50aW1lYWdvID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aW1lYWdvKHRoaXMuZGF0ZSlcbn1cblxuUG9zdC5wcm90b3R5cGUuZmF2b3JpdGVkQnkgPSBmdW5jdGlvbih1aWQpIHtcbiAgcmV0dXJuICEhdGhpcy5mYXZlcnNbdWlkXVxufVxuXG4vLyBGaXJlYmFzZSByb290IG9mIGFsbCB1c2VyIHBvc3RzXG5Qb3N0LnByb3RvdHlwZS5mYnJvb3RyZWYgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZicmVmLmNoaWxkKCd1c2VyX3Bvc3RzLycgKyB0aGlzLnVpZClcbn1cblxuLy8gRmlyZWJhc2Ugcm9vdCBvZiB0aGUgc3BlY2lmaWMgdXNlciBwb3N0XG5Qb3N0LnByb3RvdHlwZS5mYnBvc3RyZWYgPSBmdW5jdGlvbihwb3N0Zml4KSB7XG4gIHJldHVybiB0aGlzLmZicm9vdHJlZigpLmNoaWxkKCcvJyArIHRoaXMua2V5ICsgKHBvc3RmaXggPyAnLycgKyBwb3N0Zml4IDogJycpKVxufVxuXG4vKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIFwiU3RhdGljXCIgTWV0aG9kc1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqL1xuXG4vLyBFeHRlbmQgdGhlIFBvc3QgRnVuY3Rpb24gKG5vdCB0aGUgaW5zdGFuY2VzKSB3aXRoIHB1Yi9zdWIgcHJvcGVydGllcy5cbnJlcXVpcmUoJ3Jpb3QnKS5vYnNlcnZhYmxlKFBvc3QpXG5cblBvc3QuZGVzdHJveSA9IGZ1bmN0aW9uKHBvc3QpIHtcbiAgcG9zdC5mYnBvc3RyZWYoKS5yZW1vdmUoZnVuY3Rpb24oZXJyb3Ipe1xuICAgIGlmICghZXJyb3IpIHtcbiAgICAgIHBvc3QuZGVzdHJveWVkID0gdHJ1ZVxuICAgICAgUG9zdC50cmlnZ2VyKCdzdG9yZTpwb3N0czpkaWQ6ZGVzdHJveScsIHBvc3QpXG4gICAgfVxuICB9KVxufVxuXG5cbnZhciBsaXN0ZW5lcnMgPSB7fVxuXG4vLyBXaGVuIGNhbGxlZCwgc3RvcmU6cG9zdHM6ZGlkOnJldHJpZXZlIGV2ZW50cyB3aWxsIGJlIHRyaWdnZXJlZFxuLy8gYWZ0ZXIgZmlyZWJhc2UgY2hpbGRfYWRkZWQgZXZlbnRzLlxuUG9zdC5yZXRyaWV2ZSA9IGZ1bmN0aW9uIHJldHJpZXZlKGNvbGxlY3Rpb24pIHtcbiAgaWYgKGxpc3RlbmVyc1tjb2xsZWN0aW9uXSkgeyByZXR1cm4gfVxuXG4gIHZhciByZWYgPSBmYnJlZi5jaGlsZChjb2xsZWN0aW9uKS5vcmRlckJ5UHJpb3JpdHkoKVxuXG4gIGxpc3RlbmVyc1tjb2xsZWN0aW9uXSA9IHJlZi5vbignY2hpbGRfYWRkZWQnLCBmdW5jdGlvbihzbmFwc2hvdCkge1xuICAgIHZhciBwb3N0ID0gbmV3IFBvc3Qoc25hcHNob3QudmFsKCksIHNuYXBzaG90LmtleSgpKVxuICAgIFBvc3QudHJpZ2dlcignc3RvcmU6cG9zdHM6ZGlkOnJldHJpZXZlJywgY29sbGVjdGlvbiwgcG9zdClcbiAgfSlcbn1cblxuUG9zdC5zdG9wUmV0cmlldmUgPSBmdW5jdGlvbihjb2xsZWN0aW9uKSB7XG4gIGlmICghbGlzdGVuZXJzW2NvbGxlY3Rpb25dKSB7IHJldHVybiB9XG5cbiAgZmJyZWYub2ZmKCdjaGlsZF9hZGRlZCcsIGxpc3RlbmVyc1tjb2xsZWN0aW9uXSlcbiAgZGVsZXRlIGxpc3RlbmVyc1tjb2xsZWN0aW9uXVxufVxuXG4vKlxuICogUmV0dXJucyBsYXRlc3QgMTAgaXRlbXMgZnJvbSBvbmUgb2YgdGhlc2UgY29sbGVjdGlvbnM6XG4gKiBwb3N0c1xuICogZmF2b3JpdGVkXG4gKiB1c2VyX2Zhdm9yaXRlcy91aWRcbiAqIHVzZXJfcG9zdHMvdWlkXG4gKi9cblBvc3QubGF0ZXN0ID0gZnVuY3Rpb24oY29sbGVjdGlvbikge1xuICB2YXIgciA9IGZicmVmLmNoaWxkKGNvbGxlY3Rpb24pLm9yZGVyQnlQcmlvcml0eSgpLmxpbWl0VG9GaXJzdCgxMClcblxuICAgIGNvbnNvbGUubG9nKGNvbGxlY3Rpb24pXG5cbiAgci5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uKHNuYXBzaG90KSB7XG4gICAgdmFyIGRhdGEgPSBzbmFwc2hvdC52YWwoKVxuXG4gICAgaWYgKCFkYXRhKSB7IHJldHVybiB9IC8vIG5vdGhpbmcgYXZhaWxhYmxlP1xuXG4gICAgdmFyIGxhdGVzdCA9IE9iamVjdC5rZXlzKGRhdGEpLnJlZHVjZShmdW5jdGlvbihhY2MsIGtleSkge1xuICAgICAgYWNjLnB1c2gobmV3IFBvc3QoZGF0YVtrZXldLCBrZXkpKVxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0sIFtdKS5zb3J0KGZ1bmN0aW9uKHBvc3QxLCBwb3N0Mikge1xuICAgICAgcmV0dXJuIHBvc3QyLmRhdGUgLSBwb3N0MS5kYXRlXG4gICAgfSlcblxuICAgIFBvc3QudHJpZ2dlcignc3RvcmU6cG9zdHM6ZGlkOmxhdGVzdCcsIGNvbGxlY3Rpb24sIGxhdGVzdClcbiAgfSlcbn1cblxuLy8gSW5pdGlhbCBjcmVhdGlvbiBvZiBhIHBvc3QuIFVzZSB1cGRhdGUgaW5zdGVhZCBpZiB0aGUgcG9zdCBhbHJlYWR5IGV4aXN0cy5cblBvc3QucGVyc2lzdCA9IGZ1bmN0aW9uIHBlcnNpc3QocG9zdCkge1xuICB2YXIgZGF0ZSA9IG5ldyBEYXRlKClcbiAgdmFyIGF0dHJzID0gXy5tZXJnZShwb3N0LmdldGF0dHIoKSwge2RhdGU6IGRhdGUudmFsdWVPZigpLCB1aWQ6IHBvc3QudWlkfSlcblxuICB2YXIgciA9IHBvc3QuZmJyb290cmVmKCkucHVzaChhdHRycywgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIFBvc3QudHJpZ2dlcignc3RvcmU6cG9zdHM6ZmFpbGVkOnBlcnNpc3QnLCBwb3N0LCBlcnJvcilcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zdC5zZXRhdHRyKHsga2V5OiByLmtleSgpLCBkYXRlOiBkYXRlfSlcbiAgICAgIFBvc3QudHJpZ2dlcignc3RvcmU6cG9zdHM6ZGlkOnBlcnNpc3QnLCBwb3N0KVxuICAgICAgci5zZXRQcmlvcml0eShkYXRlLnZhbHVlT2YoKSlcbiAgICB9XG4gIH0pXG59XG5cblBvc3QudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKHBvc3QpIHtcbiAgcG9zdC5mYnBvc3RyZWYoKS51cGRhdGUocG9zdC5nZXRhdHRyKCksIGZ1bmN0aW9uKGVycm9yKXtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIFBvc3QudHJpZ2dlcignc3RvcmU6cG9zdHM6ZmFpbGVkOnVwZGF0ZScsIHBvc3QsIGVycm9yKVxuICAgIH0gZWxzZSB7XG4gICAgICBQb3N0LnRyaWdnZXIoJ3N0b3JlOnBvc3RzOmRpZDp1cGRhdGUnLCBwb3N0KVxuICAgIH1cbiAgfSlcbn1cblxuUG9zdC50b2dnbGVGYXYgPSBmdW5jdGlvbihwb3N0LCB1aWQpIHtcbiAgdmFyIGlzZmF2ID0gIXBvc3QuZmF2ZXJzW3VpZF1cbiAgcG9zdC5mYnBvc3RyZWYoJ2ZhdmVycycpLnVwZGF0ZSh7dWlkOiBpc2Zhdn0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIFBvc3QudHJpZ2dlcignc3RvcmU6cG9zdHM6ZmFpbGVkOnRvZ2dsZWZhdicsIHBvc3QsIGVycm9yKVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWlzZmF2KSB7XG4gICAgICAgIGZicmVmLmNoaWxkKCd1c2VyX2Zhdm9yaXRlcy8nICsgdWlkICsgJy8nICsgcG9zdC5rZXkpLnJlbW92ZSgpXG4gICAgICB9XG4gICAgICBQb3N0LnRyaWdnZXIoJ3N0b3JlOnBvc3RzOmRpZDp0b2dnbGVmYXYnLCBwb3N0LCB1aWQpXG4gICAgfVxuICB9KVxufVxuXG4vLyB1cGRhdGUgdGhlIHZhcmlvdXMgcG9zdCByZWZlcmVuY2VzIChsaWtlIGxhdGVzdCBwb3N0cywgZmF2b3JpdGVkLCBldGMuKVxuZnVuY3Rpb24gdXBkYXRlUG9zdFJlZmVyZW5jZXMocG9zdCkge1xuICB2YXJcbiAgICBmID0gZmJyZWYsIHVzZixcbiAgICBwc3QgPSAncG9zdHMvJyArIHBvc3Qua2V5LFxuICAgIGZhdiA9ICdmYXZvcml0ZWQvJyArIHBvc3Qua2V5LFxuICAgIGF0ciA9IF8ubWVyZ2UocG9zdC5nZXRhdHRyKCksIHtkYXRlOiBwb3N0LmRhdGUudmFsdWVPZigpfSlcbiAgICBmYXZVaWRzID0gT2JqZWN0LmtleXMocG9zdC5mYXZlcnMpXG5cbiAgaWYgKHBvc3QuZGVzdHJveWVkKSB7XG4gICAgZi5jaGlsZChmYXYpLnJlbW92ZSgpXG4gICAgZi5jaGlsZChwc3QpLnJlbW92ZSgpXG5cbiAgICBmYXZVaWRzLmZvckVhY2goZnVuY3Rpb24odWlkKXtcbiAgICAgIGYuY2hpbGQoJ3VzZXJfZmF2b3JpdGVzLycgKyB1aWQgKyAnLycgKyBwb3N0LmtleSkucmVtb3ZlKClcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGYuY2hpbGQocHN0KS5zZXQoYXRyKVxuXG4gICAgaWYgKGZhdlVpZHMubGVuZ3RoKSB7XG4gICAgICBmLmNoaWxkKGZhdikuc2V0KGF0cilcblxuICAgICAgZmF2VWlkcy5mb3JFYWNoKGZ1bmN0aW9uKHVpZCl7XG4gICAgICAgIGYuY2hpbGQoJ3VzZXJfZmF2b3JpdGVzLycgKyB1aWQgKyAnLycgKyBwb3N0LmtleSkuc2V0KGF0cilcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGYuY2hpbGQoZmF2KS5yZW1vdmUoKVxuICAgICAgLy8gaWYgaXQgd2FzICd1bmZhdm9yaXRlZCcgdG9nZ2xlRmF2IHNob3VsZCBoYWQgcmVtb3ZlZCB0aGVcbiAgICAgIC8vIHVzZXJfZmF2b3JpdGVzIHJlZiBhbHJlYWR5LlxuICAgIH1cbiAgfVxufVxuXG5Qb3N0Lm9uKCdzdG9yZTpwb3N0czpkaWQ6cGVyc2lzdCcsIHVwZGF0ZVBvc3RSZWZlcmVuY2VzKVxuUG9zdC5vbignc3RvcmU6cG9zdHM6ZGlkOnVwZGF0ZScsIHVwZGF0ZVBvc3RSZWZlcmVuY2VzKVxuUG9zdC5vbignc3RvcmU6cG9zdHM6ZGlkOmRlc3Ryb3knLCB1cGRhdGVQb3N0UmVmZXJlbmNlcylcblBvc3Qub24oJ3N0b3JlOnBvc3RzOmRpZDp0b2dnbGVmYXYnLCB1cGRhdGVQb3N0UmVmZXJlbmNlcylcblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0XG4iLCIvKlxuICogV2hlbiBmaXJzdCBjcmVhdGVkIGEgVXNlciBvYmplY3QgaXMganVzdCBhIGhvbGRlciBmb3IgVXNlciBhdHRyaWJ1dGVzXG4gKiB3aXRoIHNvbWUgY29udmVuaWVuY2UgbWV0aG9kcyBmb3IgdXBkYXRpbmcgYXR0cmlidXRlcywgdmFsaWRhdGluZywgZXRjLlxuICpcbiAqIFRoZSBVc2VyIGZ1bmN0aW9uIGlzIGFsc28gb2JzZXJ2YWJsZS4gUHVibGlzaGluZyBhbmQgc3Vic2NyaWJpbmdcbiAqIHRvIFVzZXIgaXMgdGhlIG9ubHkgd2F5IHRvIGludGVyYWN0IHdpdGggdGhlIGFic3RyYWN0ICd1c2VycyBzdG9yZScuXG4gKlxuICogVXNlci5jdXJyZW50IGhvbGRzIGEgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHVzZXIsIHdoaWNoIG1heSBvciBtYXkgbm90IGJlXG4gKiBhdXRoZW50aWNhdGVkLlxuICpcbiAqIEVYQU1QTEU6XG4gKlxuICogdmFyIFVzZXIgPSByZXF1aXJlKCdhcHAvdXNlcicpXG4gKlxuICogdmFyIGN1cnJlbnQgPSBVc2VyLmN1cnJlbnRcbiAqXG4gKiBOT1RFOlxuICpcbiAqIFVsdGltYXRlbHkgdGhlIG1haW4gRmlyZWJhc2UgcGF0aCBmb3IgcG9zdHMgaXMgYnVpbHQgbGlrZSB0aGlzOlxuICogdXNlcnMvdWlkIDogeyAuLi51c2VyIGRhdGEuLi4gfVxuICovXG5cbnZhciBfID0ge1xuICBkZWZhdWx0cyA6IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvZGVmYXVsdHMnKSxcbiAgcGljayAgICAgOiByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L3BpY2snKVxufVxuXG52YXIgZmJyZWYgPSBuZXcgRmlyZWJhc2UoJ2h0dHBzOi8vbXVzaWZhdnMuZmlyZWJhc2Vpby5jb20nKVxuXG5mdW5jdGlvbiBVc2VyKG9wdHMsIHVpZCkge1xuICBfLmRlZmF1bHRzKHRoaXMsIG9wdHMsIFVzZXIuZGVmYXVsdHMpXG5cbiAgLy8gaWYgY3VycmVudCB1c2VyIHdhcyBpbnN0YW50aWF0ZWQgbW9yZSB0aGFuIG9uY2UuXG4gIGlmIChVc2VyLmN1cnJlbnQgJiYgVXNlci5jdXJyZW50LnVpZCA9PT0gdWlkKSB7XG4gICAgXy5kZWZhdWx0cyh0aGlzLCBVc2VyLmN1cnJlbnQpXG4gIH1cbn1cblxuVXNlci5kZWZhdWx0cyA9IHtcbiAgJ2F2YXRhclVybCcgICA6ICcvYXNzZXRzL3Byb2ZpbGUucG5nJyxcbiAgJ2Rlc2NyaXB0aW9uJyA6ICdNdXNpRmF2cyEgdXNlcicsXG4gICdkaXNwbGF5TmFtZScgOiAndXNlcicsXG4gICdsb2NhdGlvbicgICAgOiAnVW5pdmVyc2UnLFxuICAnbG9nZ2VkJyAgICAgIDogZmFsc2UsXG4gICdwcm92aWRlcicgICAgOiAndW5rbm93bicsXG4gICd1cmwnICAgICAgICAgOiAnaHR0cHM6Ly9tdXNpZmF2cy5jb20nXG59XG5cbi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogSW5zdGFuY2UgTWV0aG9kc1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqL1xuXG4vLyBSZXR1cm5zIG9ubHkgKmRhdGEqIGF0dHJpYnV0ZXNcblVzZXIucHJvdG90eXBlLmdldGF0dHIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIF8ucGljayh0aGlzLCBPYmplY3Qua2V5cyhVc2VyLmRlZmF1bHRzKSlcbn1cblxuVXNlci5wcm90b3R5cGUubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXV0aERhdGEgPSBudWxsXG4gIHRoaXMubG9nZ2VkID0gZmFsc2VcbiAgdGhpcy5wcm92aWRlciA9ICd1bmtub3duJ1xuICB0aGlzLnVpZCA9IG51bGxcbn1cblxuLy8gdXBkYXRlIGZiIGRhdGFcblVzZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdXNlciA9IHRoaXNcbiAgaWYgKCF1c2VyLnVpZCkgeyByZXR1cm4gfVxuICBmYnJlZi5jaGlsZCgndXNlcnMnICsgJy8nICsgdXNlci51aWQpLnNldCh1c2VyLmdldGF0dHIoKSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIFVzZXIudHJpZ2dlcignc3RvcmU6dXNlcnM6ZmFpbGVkOnVwZGF0ZScsIHVzZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIFVzZXIudHJpZ2dlcignc3RvcmU6dXNlcnM6ZGlkOnVwZGF0ZScsIHVzZXIpXG4gICAgfVxuICB9KVxufVxuXG5Vc2VyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoXy5waWNrKHRoaXMuZ2V0YXR0cigpLCBbJ2Rpc3BsYXlOYW1lJywgJ2xvZ2dlZCddKSlcbn1cblxuLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBcIlN0YXRpY1wiIE1ldGhvZHNcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKi9cblxuLy8gRXh0ZW5kIHRoZSBVc2VyICpmdW5jdGlvbiogKG5vdCB0aGUgaW5zdGFuY2VzKSB3aXRoIHB1Yi9zdWIgYXR0cmlidXRlcy5cbnJlcXVpcmUoJ3Jpb3QnKS5vYnNlcnZhYmxlKFVzZXIpXG5cbi8vIFVwZGF0ZXMgYSB1c2VyIHdpdGggdGhlIHByb3ZpZGVkIGF1dGggZGF0YS5cbmZ1bmN0aW9uIHVwZGF0ZUF1dGgoYXV0aERhdGEpIHtcbiAgaWYgKCFhdXRoRGF0YSkgeyByZXR1cm4gfVxuXG4gIHZhciB1ID0gVXNlci5jdXJyZW50XG5cbiAgdS51aWQgPSBhdXRoRGF0YS51aWRcbiAgdS5hdXRoRGF0YSA9IGF1dGhEYXRhXG4gIHUucHJvdmlkZXIgPSBhdXRoRGF0YS5wcm92aWRlclxuICB1LmxvZ2dlZCA9IHRydWVcblxuICBpZiAoYXV0aERhdGEucHJvdmlkZXIgPT0gJ3R3aXR0ZXInKSB7XG4gICAgdS5kaXNwbGF5TmFtZSA9IGF1dGhEYXRhLnR3aXR0ZXIuZGlzcGxheU5hbWVcblxuICAgIHZhciBwID0gYXV0aERhdGEudHdpdHRlci5jYWNoZWRVc2VyUHJvZmlsZVxuXG4gICAgaWYgKHApIHtcbiAgICAgIHUuYXZhdGFyVXJsID0gcC5wcm9maWxlX2ltYWdlX3VybF9odHRwc1xuICAgICAgdS5kZXNjcmlwdGlvbiA9IHAuZGVzY3JpcHRpb25cbiAgICAgIHUubG9jYXRpb24gPSBwLmxvY2F0aW9uXG4gICAgICB1LnVybCA9IHAudXJsXG4gICAgfVxuICB9IGVsc2UgaWYgKGF1dGhEYXRhLnByb3ZpZGVyID09ICdnb29nbGUnKSB7XG4gICAgdS5kaXNwbGF5TmFtZSA9IGF1dGhEYXRhLmdvb2dsZS5kaXNwbGF5TmFtZVxuXG4gICAgdmFyIHAgPSBhdXRoRGF0YS5nb29nbGUuY2FjaGVkVXNlclByb2ZpbGVcblxuICAgIGlmIChwKSB7XG4gICAgICB1LmF2YXRhclVybCA9IHAucGljdHVyZVxuICAgICAgdS5kZXNjcmlwdGlvbiA9ICdHKyBVc2VyJ1xuICAgICAgdS5sb2NhdGlvbiA9ICdQbGFuZXQgRWFydGgnXG4gICAgICB1LnVybCA9IHAubGlua1xuICAgIH1cbiAgfVxuXG4gIF8uZGVmYXVsdHModGhpcywgdS5kZWZhdWx0cykgLy8gaW4gY2FzZSB3ZSBwaWNrZWQgdXAgc29tZSBudWxsc1xuXG4gIHUudXBkYXRlKClcbn1cblxuVXNlci5sb2dpbiA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gIGZicmVmLmF1dGhXaXRoT0F1dGhQb3B1cChwcm92aWRlciwgZnVuY3Rpb24oZXJyb3IsIGF1dGhEYXRhKSB7XG4gICAgaWYgKGVycm9yIHx8ICFhdXRoRGF0YSkge1xuICAgICAgVXNlci50cmlnZ2VyKCdzdG9yZTp1c2VyczpmYWlsZWQ6bG9naW4nLCBlcnJvciB8fCB7Y29kZTogJ3Vua25vd24nfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlQXV0aChhdXRoRGF0YSlcbiAgICB9XG4gIH0pXG59XG5cblVzZXIubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gIGlmIChVc2VyLmN1cnJlbnQgJiYgVXNlci5jdXJyZW50LmxvZ2dlZCkge1xuICAgIFVzZXIuY3VycmVudC5sb2dvdXQoKVxuICAgIGZicmVmLnVuYXV0aCgpXG4gIH1cbn1cblxuVXNlci5sb29rdXAgPSBmdW5jdGlvbih1aWQpIHtcbiAgZmJyZWYuY2hpbGQoJ3VzZXJzJykuY2hpbGQodWlkKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uKHNuYXBzaG90KXtcbiAgICB2YXIgZGF0YSA9IHNuYXBzaG90LnZhbCgpXG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIFVzZXIudHJpZ2dlcignc3RvcmU6dXNlcnM6ZGlkOmxvb2t1cCcsIHVpZCwgbmV3IFVzZXIoZGF0YSwgdWlkKSlcbiAgICB9IGVsc2Uge1xuICAgICAgVXNlci50cmlnZ2VyKCdzdG9yZTp1c2VyczpmYWlsZWQ6bG9va3VwJywgdWlkKVxuICAgIH1cbiAgfSlcbn1cblxuLy8gY3JlYXRlcyB0aGUgVXNlci5jdXJyZW50IGluc3RhbmNlLlxuVXNlci5zZXR1cEN1cnJlbnQgPSBmdW5jdGlvbigpIHtcbiAgVXNlci5jdXJyZW50ID0gbmV3IFVzZXIoKVxuXG4gIGZicmVmLm9uQXV0aChmdW5jdGlvbihhdXRoRGF0YSkge1xuICAgIGlmIChhdXRoRGF0YSkge1xuICAgICAgdXBkYXRlQXV0aChhdXRoRGF0YSlcbiAgICAgIFVzZXIudHJpZ2dlcignc3RvcmU6dXNlcnM6ZGlkOmxvZ2luJywgVXNlci5jdXJyZW50LCBhdXRoRGF0YSlcbiAgICB9IGVsc2Uge1xuICAgICAgVXNlci5jdXJyZW50LmxvZ291dCgpXG4gICAgICBVc2VyLnRyaWdnZXIoJ3N0b3JlOnVzZXJzOmRpZDpsb2dvdXQnLCBVc2VyLmN1cnJlbnQpXG4gICAgfVxuICB9KVxuICAvLyB1cGRhdGVBdXRoKGZicmVmLmdldEF1dGgoKSkgLy8gTk9URTogcmVtb3ZlZCB0byBhdm9pZCBmYidzIHN5bmMuIGF1dGggY2hlY2tcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVc2VyXG4iLCJ2YXIgXyA9IHtcbiAgaXNGdW5jdGlvbiA6IHJlcXVpcmUoJ2xvZGFzaC9sYW5nL2lzRnVuY3Rpb24nKVxufVxuXG4vKlxuICogRGVmaW5lcyBhIGNvbW1vbiBBUEkgYXJvdW5kIERPTSBub2RlIGhhbmRsaW5nLiBUaGUgQVBJIGlzIGluc3BpcmVkIGJ5XG4gKiBjZXJ0YWluIGxpYiB5b3UgbWF5IGhhdmUgaGVhcmQgYWJvdXQuLi4gOnBcbiAqL1xuZnVuY3Rpb24gRG9tV3JhcChub2RlLCBzZWxlY3Rvcikge1xuICB0aGlzWzBdID0gdGhpcy5ub2RlID0gbm9kZVxuICB0aGlzLmlkID0gbm9kZS5pZFxuXG4gIGlmIChzZWxlY3Rvcikge1xuICAgIHRoaXMubm9kZSA9IG5vZGUucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgfVxuXG4gIHRoaXMubGlzdGVuZXJzID0gW10gLy8gc2F2ZSBldmVudCBsaXN0ZW5lcnMgc28gd2UgY2FuIHVucmVnaXN0ZXIgZWFzaWx5LlxufVxuXG5Eb21XcmFwLnByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24oaHRtbCkge1xuICB0aGlzLm5vZGUuaW5uZXJIVE1MID0gaHRtbFxuICByZXR1cm4gdGhpc1xufVxuXG5Eb21XcmFwLnByb3RvdHlwZS5wcmVwZW5kID0gZnVuY3Rpb24obm9kZSkge1xuICB0aGlzLm5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIHRoaXMubm9kZS5maXJzdENoaWxkKVxuICByZXR1cm4gdGhpc1xufVxuXG5Eb21XcmFwLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihub2RlKSB7XG4gIHRoaXMubm9kZS5hcHBlbmRDaGlsZChub2RlKVxuICByZXR1cm4gdGhpc1xufVxuXG5Eb21XcmFwLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihub2RlKSB7XG4gIHRoaXMubm9kZS5yZW1vdmVDaGlsZChub2RlKVxuICByZXR1cm4gdGhpc1xufVxuXG5Eb21XcmFwLnByb3RvdHlwZS50ZXh0ID0gZnVuY3Rpb24odGV4dCkge1xuICB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSB0ZXh0XG4gIHJldHVybiB0aGlzXG59XG5cbkRvbVdyYXAucHJvdG90eXBlLnZhbCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCkgeyB0aGlzLm5vZGUudmFsdWUgPSBhcmd1bWVudHNbMF0gfVxuICByZXR1cm4gdGhpcy5ub2RlLnZhbHVlXG59XG5cbkRvbVdyYXAucHJvdG90eXBlLmFkZENsYXNzID0gZnVuY3Rpb24oY2xhc3NuYW1lKSB7XG4gIHRoaXMubm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzbmFtZSlcbiAgcmV0dXJuIHRoaXNcbn1cblxuRG9tV3JhcC5wcm90b3R5cGUucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihjbGFzc25hbWUpIHtcbiAgdGhpcy5ub2RlLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NuYW1lKVxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBSZXR1cm4gZmlyc3QgcGFyZW50IGVsZW1lbnQgbWF0Y2hpbmcgc2VsZWN0b3JcbkRvbVdyYXAucHJvdG90eXBlLnBhcmVudCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHZhciB0ID0gdGhpcy5ub2RlLnBhcmVudEVsZW1lbnRcbiAgd2hpbGUgKHQpIHtcbiAgICBpZiAodC5tYXRjaGVzKHNlbGVjdG9yKSkgeyByZXR1cm4gbmV3IERvbVdyYXAodCkgfVxuICAgIHQgPSB0LnBhcmVudEVsZW1lbnRcbiAgfVxufVxuXG5Eb21XcmFwLnByb3RvdHlwZS5kYXRhID0gZnVuY3Rpb24obmFtZSkge1xuICByZXR1cm4gdGhpcy5ub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS0nICsgbmFtZSlcbn1cblxuLyogVGhpcyBldmVudCBoYW5kbGVyIHByZXZlbnRzIHRoZSBldmVudCBkZWZhdWx0IGFjdGlvblxuICogYW5kIHJldHVybnMgYSB3cmFwcGVkIGV2ZW50IHRhcmdldCBpbnN0ZWFkIGluIGFkZGl0aW9uXG4gKiB0byB0aGUgb3JpZ2luYWwgZXZlbnQuXG4gKlxuICogbm9kZS5vbignZXZlbnQnLCBmdW4pXG4gKiBub2RlLm9uKCdldmVudCcsICcuZGVsZWdhdGUtc2VsZWN0b3InLCBmdW4pXG4gKi9cbkRvbVdyYXAucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oZXZlbnRuYW1lLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgdmFyIGZuLCBuID0gdGhpcy5ub2RlXG5cbiAgaWYgKF8uaXNGdW5jdGlvbihzZWxlY3RvcikpIHtcbiAgICBjYWxsYmFjayA9IHNlbGVjdG9yXG4gICAgZm4gPSBmdW5jdGlvbihldikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgY2FsbGJhY2sobmV3IERvbVdyYXAoZXYudGFyZ2V0KSwgZXYpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZuID0gZnVuY3Rpb24oZXYpIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcblxuICAgICAgdmFyIGksIGMsIHQgPSBldi50YXJnZXQsXG4gICAgICAgICAgY2FuZGlkYXRlcyA9IG4ucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciksXG4gICAgICAgICAgbGVuZ3RoID0gY2FuZGlkYXRlcy5sZW5ndGhcblxuICAgICAgd2hpbGUgKHQpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHRhcmdldCBvciBvbmUgb2YgdGhlaXIgcGFyZW50cyBpcyBlcXVhbFxuICAgICAgICAvLyB0byBhbnkgbm9kZSBtYXRjaGVkIHdpdGggdGhlIGRlbGVnYXRlIHNlbGVjdG9yLlxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjID0gY2FuZGlkYXRlc1tpXVxuICAgICAgICAgIGlmIChjLmlzRXF1YWxOb2RlKHQpKSB7IHJldHVybiBjYWxsYmFjayhuZXcgRG9tV3JhcChjKSwgZXYpIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vIG5lZWQgdG8gY2hlY2sgZnVydGhlciB0aGFuIHRoZSBub2RlIG4gKGV2ZW50IGxpc3RlbmVyKVxuICAgICAgICBpZiAodC5pc0VxdWFsTm9kZShuKSkgeyByZXR1cm4gfVxuXG4gICAgICAgIHQgPSB0LnBhcmVudEVsZW1lbnRcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRuYW1lLCBmbilcblxuICB0aGlzLmxpc3RlbmVycy5wdXNoKHtldmVudG5hbWU6IGV2ZW50bmFtZSwgZm46IGZufSlcblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBjYWxsIHdpdGhvdXQgcGFyYW1ldGVycyBmb3IgcmVtb3ZpbmcgYWxsIGxpc3RlbmVycy5cbkRvbVdyYXAucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKGV2ZW50bmFtZSwgY2FsbGJhY2spIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGRvbid0IHdvcnJ5IGFib3V0IHJlbW92aW5nIGZyb20gdGhpcy5saXN0ZW5lcnMsIHJlbW92aW5nIHR3aWNlIGlzXG4gICAgICAvLyBoYXJtbGVzcyBhbmQgdGhpcyBvYmplY3Qgc2hvdWxkIGJlIHNob3J0IGxpdmVkLlxuICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRuYW1lLCBjYWxsYmFjaylcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGRhdGEuZXZlbnRuYW1lLCBkYXRhLmZuKVxuICAgIH0sIHRoaXMpXG4gICAgdGhpcy5saXN0ZW5lcnMgPSBbXVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihub2RlLCBzZWxlY3Rvcikge1xuICByZXR1cm4gbmV3IERvbVdyYXAobm9kZSwgc2VsZWN0b3IpXG59XG4iLCIvKlxuICogQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS90eGNoZW4vcmlvdC1obi9ibG9iL2doLXBhZ2VzL3NyYy9maWx0ZXJzLmpzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0ZSkge1xuICB2YXIgYmV0d2VlbiA9IChEYXRlLm5vdygpIC0gZGF0ZSkgLyAxMDAwXG5cbiAgaWYgKGJldHdlZW4gPCAwKSB7XG4gICAgcmV0dXJuICdyZWNlbnRseScgLy8gT01HIGl0IGNvbWVzIGZvcm0gdGhlIGZ1dHVyZSEgOi1wXG5cbiAgfSBpZiAoYmV0d2VlbiA8IDM2MDApIHtcbiAgICByZXR1cm4gfn4oYmV0d2VlbiAvIDYwKSArICcgbWludXRlcyBhZ28nXG5cbiAgfSBlbHNlIGlmIChiZXR3ZWVuIDwgODY0MDApIHtcbiAgICByZXR1cm4gfn4oYmV0d2VlbiAvIDM2MDApICsgJyBob3VycyBhZ28nXG4gIH1cblxuICByZXR1cm4gfn4oYmV0d2VlbiAvIDg2NDAwKSArICcgZGF5cyBhZ28nXG59O1xuIiwidmFyIHVybHJlZ2V4ID0gL3lvdXR1YmUuY29tLitcXD92PShbYS16QS16MC05XFwtX10rKS9pXG5cbmV4cG9ydHMuZXh0cmFjdEVtYmVkID0gZnVuY3Rpb24odXJsKSB7XG4gIHZhciBtYXRjaCA9IHVybHJlZ2V4LmV4ZWModXJsKVxuXG4gIGlmIChtYXRjaCAmJiBtYXRjaC5sZW5ndGgpIHtcbiAgICByZXR1cm4ge3R5cGU6ICd5b3V0dWJlJywgdXJsOiB1cmwsIHZpZGVvSWQ6IG1hdGNoWzFdfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB7dHlwZTogJ3Vua25vd24nLCB1cmw6IHVybH1cbiAgfVxufVxuIiwicmVxdWlyZSgnLi9hcHAvdXNlcicpLnNldHVwQ3VycmVudCgpIC8vIENyZWF0ZSBpbnN0YW5jZSBvZiBjdXJyZW50IHVzZXIuXG5cbi8vIE1vZHVsZXMgZGlzcGxheWVkIGFsbCB0aGUgdGltZTpcbnZhclxuICBNZXNzYWdlID0gcmVxdWlyZSgnLi9tb2R1bGVzL21lc3NhZ2UvbWVzc2FnZScpLFxuICBOYXZpZ2F0aW9uID0gcmVxdWlyZSgnLi9tb2R1bGVzL25hdmlnYXRpb24vbmF2aWdhdGlvbicpLFxuICBNYWluID0gcmVxdWlyZSgnLi9tb2R1bGVzL21haW4vbWFpbicpXG5cbnZhclxuICBtYWluID0gbmV3IE1haW4oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcC1tYWluJykpLFxuICBtc2cgPSBuZXcgTWVzc2FnZShtYWluLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwLW1lc3NhZ2UnKSksXG4gIG5hdiA9IG5ldyBOYXZpZ2F0aW9uKG1haW4sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAtbmF2aWdhdGlvbicpKVxuXG52YXIgcmlvdCA9IHJlcXVpcmUoJ3Jpb3QnKVxuXG52YXIgcm91dGVyID0gbWFpbi5yb3V0ZXIuYmluZChtYWluKSAvLyByaW90IG1pc3NlcyB0aGUgY29udGV4dCBvdGhlcndpc2UuXG5cbnJpb3Qucm91dGUocm91dGVyKSAvLyBTZXR1cCBhIHJvdXRlciBoYW5kbGVyIChoYXNoY2hhbmdlIGV2ZW50KVxucmlvdC5yb3V0ZS5leGVjKHJvdXRlcikgLy8gQ2FsbCB0aGUgcm91dGVyIHcvbyB3YWl0aW5nIGZvciBhIGhhc2hjaGFuZ2UgKHN0YXJ0cyB0aGUgYXBwISlcbiIsInZhciBfID0ge2VzY2FwZTogcmVxdWlyZShcImxvZGFzaC5lc2NhcGVcIil9O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmope1xudmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLHByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XG53aXRoKG9ianx8e30pe1xuX19wKz0nPG1haW4gY2xhc3M9XCJtYWluIGFwcC1mcm9udFwiIHJvbGU9XCJtYWluXCI+PGltZyBjbGFzcz1cInJlc3BvbnNpdmUtd2lkdGhcIiBzcmM9XCIvYXNzZXRzL211c2ljLmpwZ1wiPjxkaXYgY2xhc3M9XCJmcm9udC1jb3B5XCI+PGgxPkEgbWljcm8gQmxvZyBmb3IgeW91ciBmYXZvcml0ZSBNdXNpYyE8L2gxPjxwPlNoYXJlIHlvdXIgZmF2b3JpdGUgbXVzaWMgYW5kIHZpZGVvcyB3aXRoIHlvdXIgZnJpZW5kcy48YnI+V2l0aCBNdXNpRmF2cyB5b3UgY2FuIGVtYmVkIGNvbnRlbnQgZnJvbSBZb3VUdWJlLCBTb3VuZENsb3VkLCBhbmQgbW9yZSwgaW4gYSBzaW5nbGUgcGxhY2UhPC9wPjxoMj5MYXRlc3QgUG9zdHM8L2gyPjx1bCBjbGFzcz1cInBvc3QtbGlzdCBsYXRlc3QtcG9zdHNcIj48L3VsPjxoMj5MYXRlc3QgRmF2b3JpdGVkPC9oMj48dWwgY2xhc3M9XCJwb3N0LWxpc3QgbGF0ZXN0LWZhdnNcIj48L3VsPjwvZGl2PjwvbWFpbj4nO1xufVxucmV0dXJuIF9fcDtcbn07XG4iLCJ2YXJcbiAgJCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9kb21XcmFwJyksXG4gIFBvc3QgPSByZXF1aXJlKCcuLi8uLi9hcHAvcG9zdCcpLFxuICBpdGVtc3RwbCA9IHJlcXVpcmUoJy4vcG9zdC1pdGVtcy5odG1sJyksXG4gIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9mcm9udC5odG1sJylcblxuZnVuY3Rpb24gRnJvbnQocGFyZW50LCBub2RlLCBvcHRpb25zKSB7XG4gIG5vZGUuaW5uZXJIVE1MID0gdGVtcGxhdGUob3B0aW9ucylcblxuICB0aGlzLnBhcmVudCA9IHBhcmVudFxuXG4gIHRoaXMubm9kZXMgPSB7XG4gICAgcm9vdCAgICAgIDogJChub2RlKSxcbiAgICBwb3N0cyAgICAgOiAkKG5vZGUsICcubGF0ZXN0LXBvc3RzJyksXG4gICAgZmF2b3JpdGVkIDogJChub2RlLCAnLmxhdGVzdC1mYXZzJylcbiAgfVxuXG4gIHRoaXMuaGFuZGxlUG9zdHMgPSBmdW5jdGlvbihjb2xsZWN0aW9uLCBwb3N0cykge1xuICAgIHRoaXMubm9kZXNbY29sbGVjdGlvbl0uaHRtbChpdGVtc3RwbCh7IHBvc3RzOiBwb3N0cyB9KSlcbiAgfS5iaW5kKHRoaXMpXG5cbiAgUG9zdC5vbignc3RvcmU6cG9zdHM6ZGlkOmxhdGVzdCcsIHRoaXMuaGFuZGxlUG9zdHMpXG5cbiAgUG9zdC5sYXRlc3QoJ3Bvc3RzJylcbiAgUG9zdC5sYXRlc3QoJ2Zhdm9yaXRlZCcpXG59XG5cbkZyb250LnByb3RvdHlwZS51bmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5ub2Rlcy5yb290Lmh0bWwoJycpXG4gIFBvc3Qub2ZmKCdzdG9yZTpwb3N0czpkaWQ6bGF0ZXN0JywgdGhpcy5oYW5kbGVQb3N0cylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGcm9udFxuIiwidmFyIF8gPSB7ZXNjYXBlOiByZXF1aXJlKFwibG9kYXNoLmVzY2FwZVwiKX07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iail7XG52YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4scHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcbndpdGgob2JqfHx7fSl7XG5fX3ArPScnO1xuIHBvc3RzLmZvckVhY2goZnVuY3Rpb24ocG9zdCkgeyBcbl9fcCs9JzxsaT48aSBjbGFzcz1cImZhIGZhLXBsYXlcIj48L2k+Jm5ic3A7JytcbigoX190PSggcG9zdC50aXRsZSApKT09bnVsbD8nJzpfX3QpK1xuJyBwb3N0ZWQgYnkmbmJzcDsgPGEgaHJlZj1cIiMnK1xuKChfX3Q9KCBwb3N0LnVpZCApKT09bnVsbD8nJzpfX3QpK1xuJy9wb3N0c1wiPicrXG4oKF9fdD0oIHBvc3QudXNlck5hbWUgKSk9PW51bGw/Jyc6X190KStcbicmbmJzcDs8aSBjbGFzcz1cImZhIGZhLWNoaWxkXCI+PC9pPjwvYT4gJm5ic3A7IDxzcGFuIGNsYXNzPVwidGltZWFnb1wiPignK1xuKChfX3Q9KCBwb3N0LnRpbWVhZ28oKSApKT09bnVsbD8nJzpfX3QpK1xuJyk8L3NwYW4+PC9saT4nO1xuIH0pIFxuX19wKz0nJztcbn1cbnJldHVybiBfX3A7XG59O1xuIiwidmFyIF8gPSB7ZXNjYXBlOiByZXF1aXJlKFwibG9kYXNoLmVzY2FwZVwiKX07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iail7XG52YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4scHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcbndpdGgob2JqfHx7fSl7XG5fX3ArPSc8bWFpbiBjbGFzcz1cIm1haW5cIiByb2xlPVwibWFpblwiPjxkaXYgY2xhc3M9XCJmcm9udC1jb3B5XCI+PGgxPkxvZyBJbjwvaDE+PHA+SW4gb3JkZXIgdG8gaW50ZXJhY3Qgd2l0aCBNdXNpRmF2cyEgeW91XFwnbGwgbmVlZCB0byBsb2cgaW4gZmlyc3QuPC9wPjxwPlBsZWFzZSBzZWxlY3Qgb25lIG9mIHRoZSBzZXJ2aWNlcyBiZWxvdyB0byBsb2cgaW46PC9wPjx1bCBjbGFzcz1cImxvZ2luLWxpbmtzIGZhLXVsIGZhLTJ4XCI+PGxpPjxpIGNsYXNzPVwiZmEtbGkgZmEgZmEtZ29vZ2xlLXBsdXMtc3F1YXJlXCI+PC9pPiA8YSBocmVmPVwiI1wiIGlkPVwiZ29vZ2xlLWxvZ2luXCI+R29vZ2xlPC9hPjwvbGk+PGxpPjxpIGNsYXNzPVwiZmEtbGkgZmEgZmEtdHdpdHRlci1zcXVhcmVcIj48L2k+IDxhIGhyZWY9XCIjXCIgaWQ9XCJ0d2l0dGVyLWxvZ2luXCI+VHdpdHRlcjwvYT48L2xpPjxsaT48aSBjbGFzcz1cImZhLWxpIGZhIGZhLWZhY2Vib29rLXNxdWFyZVwiPjwvaT4gPGEgaHJlZj1cIiNcIiBpZD1cImZhY2Vib29rLWxvZ2luXCI+RmFjZWJvb2s8L2E+IDxzbWFsbD4oU29ycnksIHVuYXZhaWxhYmxlIGF0IHRoZSBtb21lbnQpPC9zbWFsbD48L2xpPjwvdWw+PC9kaXY+PC9tYWluPic7XG59XG5yZXR1cm4gX19wO1xufTtcbiIsInZhclxuICAkID0gcmVxdWlyZSgnLi4vLi4vbGliL2RvbVdyYXAnKSxcbiAgVXNlciA9IHJlcXVpcmUoJy4uLy4uL2FwcC91c2VyJyksXG4gIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9sb2dpbi5odG1sJylcblxuZnVuY3Rpb24gTG9naW4ocGFyZW50LCBub2RlLCBvcHRpb25zKSB7XG4gIG5vZGUuaW5uZXJIVE1MID0gdGVtcGxhdGUob3B0aW9ucylcblxuICB0aGlzLnBhcmVudCA9IHBhcmVudFxuXG4gIHRoaXMubm9kZXMgPSB7XG4gICAgcm9vdDogJChub2RlKSxcbiAgICBsaXN0OiAkKG5vZGUsICcubG9naW4tbGlua3MnKVxuICB9XG5cbiAgdGhpcy5sb2dpbkxpc3RlbmVyID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5pZCA9PSAndHdpdHRlci1sb2dpbicpIHtcbiAgICAgIFVzZXIubG9naW4oJ3R3aXR0ZXInKVxuICAgIH0gZWxzZSBpZiAodGFyZ2V0LmlkID09ICdnb29nbGUtbG9naW4nKSB7XG4gICAgICBVc2VyLmxvZ2luKCdnb29nbGUnKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcCA9IHRoaXMucGFyZW50XG4gICAgICBwLm1lc3NhZ2UoJ1NvcnJ5LCBhdXRoZW50aWNhdGluZyB3aXRoIHRoaXMgcHJvdmlkZXIgaXMgbm90IGF2YWlsYWJsZSB5ZXQuJylcbiAgICB9XG4gIH0uYmluZCh0aGlzKVxuXG4gIHRoaXMubm9kZXMubGlzdC5vbignY2xpY2snLCB0aGlzLmxvZ2luTGlzdGVuZXIpXG59XG5cbkxvZ2luLnByb3RvdHlwZS51bmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5ub2Rlcy5saXN0Lm9mZignY2xpY2snLCB0aGlzLmxvZ2luTGlzdGVuZXIpXG4gIHRoaXMubm9kZXMucm9vdC5odG1sKCcnKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvZ2luXG4iLCJ2YXJcbiAgVXNlciA9IHJlcXVpcmUoJy4uLy4uL2FwcC91c2VyJyksXG4gIHJpb3QgPSByZXF1aXJlKCdyaW90JylcblxucmVxdWlyZSgnLi4vZnJvbnQvZnJvbnQnKVxucmVxdWlyZSgnLi4vbG9naW4vbG9naW4nKVxucmVxdWlyZSgnLi4vdXNlci91c2VyJylcblxuZnVuY3Rpb24gTWFpbihyb290Tm9kZSkge1xuICByaW90Lm9ic2VydmFibGUodGhpcykgLy8gbWFpbiBjYW4gbGlzdGVuIHRvIGV2ZW50cy5cblxuICB2YXIgbSA9IHRoaXNcblxuICBtLnJvb3ROb2RlID0gcm9vdE5vZGVcblxuICBtLm9uKCdtb2R1bGU6dXNlcjpmYWlsZWQ6bG9va3VwJywgZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnIC8vIFwicmVkaXJlY3RcIiBob21lLlxuICAgIG0ubWVzc2FnZSgnU29ycnksIHdlIGNvdWxkIG5vdCBmaW5kIHRoYXQgdXNlci4nKVxuICB9KVxuXG4gIG0ub24oJ21vZHVsZTpuYXZpZ2F0aW9uOmRpZDpuZXdwb3N0JywgZnVuY3Rpb24odXNlcil7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoICE9ICcjbWUvcG9zdHMnKSB7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICdtZS9wb3N0cydcbiAgICAgIG0uc2hvd05ld1Bvc3QgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIG0ubGFzdG1vZC5zaG93TmV3UG9zdCgpXG4gICAgfVxuICB9KVxuXG4gIG0ub24oJ21vZHVsZTp1c2VyOmRpZDpsb29rdXAnLCBmdW5jdGlvbih1aWQsIHVzZXIpIHtcbiAgICBpZiAobS5zaG93TmV3UG9zdCkge1xuICAgICAgbS5sYXN0bW9kLnNob3dOZXdQb3N0KClcbiAgICAgIG0uc2hvd05ld1Bvc3QgPSBmYWxzZVxuICAgIH1cbiAgfSlcblxuICBVc2VyLm9uKCdzdG9yZTp1c2VyczpkaWQ6bG9naW4nLCBmdW5jdGlvbih1c2VyKSB7XG4gICAgbS5tZXNzYWdlKCdUaGFuayB5b3UhIFlvdSBoYXZlIGJlZW4gbG9nZ2VkIGluLicpXG4gICAgdXNlci51cGRhdGUoKVxuICB9KVxuXG4gIFVzZXIub24oJ3N0b3JlOnVzZXJzOmRpZDpsb2dvdXQnLCBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJycgLy8gXCJyZWRpcmVjdFwiIGhvbWUuXG4gICAgbS5tZXNzYWdlKCdZb3VcXCd2ZSBiZWVuIGxvZ2dlZCBvdXQuJylcbiAgfSlcbn1cblxuTWFpbi5wcm90b3R5cGUubWVzc2FnZSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgdGhpcy50cmlnZ2VyKCdtb2R1bGU6bWVzc2FnZTpkbzptZXNzYWdlJywgdGV4dClcbn1cblxuTWFpbi5wcm90b3R5cGUubG9hZG1vZCA9IGZ1bmN0aW9uKG5hbWUsIG9wdGlvbnMpIHtcbiAgdmFyIG0gPSB0aGlzLCBDdG9yID0gcmVxdWlyZSgnLi4vJyArIG5hbWUgKyAnLycgKyBuYW1lKVxuICBpZiAobS5sYXN0bW9kKSB7IG0ubGFzdG1vZC51bmxvYWQoKSB9XG4gIG0ubGFzdG1vZCA9IG5ldyBDdG9yKG0sIG0ucm9vdE5vZGUsIG9wdGlvbnMpXG59XG5cbi8qXG4gKiBQYXJhbWV0ZXJzIHRvIHRoaXMgZnVuY3Rpb24gY29tZSBmcm9tIHRoZSByb3V0ZXIgKHJpb3Qucm91dGUpLFxuICogcGFyc2VkIGZyb20gdGhlIGxvY2F0aW9uIGhhc2guXG4gKi9cbk1haW4ucHJvdG90eXBlLnJvdXRlciA9IGZ1bmN0aW9uKF91aWQsIGFjdGlvbiwgcG9zdGlkKSB7XG4gIHRoaXMudHJpZ2dlcignbW9kdWxlOm1haW46ZGlkOnJvdXRlcicpXG5cbiAgdmFyIG0gPSB0aGlzLCB1c2VyID0gVXNlci5jdXJyZW50XG4gIHZhciB1aWQgPSAoX3VpZCA9PSAnbWUnKSA/IHVzZXIudWlkIDogX3VpZFxuXG4gIHN3aXRjaChhY3Rpb24pIHtcbiAgY2FzZSAncG9zdHMnOlxuICBjYXNlICdmYXZvcml0ZXMnOlxuXG4gICAgaWYgKF91aWQgPT0gJ21lJyAmJiAhdXNlci5sb2dnZWQpIHtcbiAgICAgIG0ubG9hZG1vZCgnbG9naW4nKVxuICAgICAgbS5tZXNzYWdlKCdQbGVhc2UgbG9naW4gdG8gYWNjZXNzIHlvdXIgcG9zdHMuJylcblxuICAgIH0gZWxzZSB7XG4gICAgICBtLmxvYWRtb2QoJ3VzZXInLCB7dWlkOiB1aWQsIGFjdGlvbjogYWN0aW9ufSlcbiAgICB9XG5cbiAgYnJlYWtcbiAgY2FzZSAnbG9nb3V0JzpcblxuICAgIGlmICh1c2VyLmxvZ2dlZCkgeyB1c2VyLmxvZ291dCgpIH1cbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnXG5cbiAgYnJlYWtcbiAgZGVmYXVsdDpcbiAgICBtLmxvYWRtb2QoJ2Zyb250JylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1haW5cbiIsInZhciBfID0ge2VzY2FwZTogcmVxdWlyZShcImxvZGFzaC5lc2NhcGVcIil9O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmope1xudmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLHByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XG53aXRoKG9ianx8e30pe1xuX19wKz0nPHNwYW4gY2xhc3M9XCJhcHAtbWVzc2FnZS10ZXh0XCI+PC9zcGFuPjxkaXYgY2xhc3M9XCJhcHAtbWVzc2FnZS1kaXNtaXNzXCI+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImFwcC1tZXNzYWdlLWRpc21pc3NcIj5EaXNtaXNzPC9hPjwvZGl2Pic7XG59XG5yZXR1cm4gX19wO1xufTtcbiIsInZhclxuICAkID0gcmVxdWlyZSgnLi4vLi4vbGliL2RvbVdyYXAnKSxcbiAgdGVtcGxhdGUgPSByZXF1aXJlKCcuL21lc3NhZ2UuaHRtbCcpXG5cbmZ1bmN0aW9uIE1lc3NhZ2UocGFyZW50LCBub2RlLCBvcHRpb25zKSB7XG4gIG5vZGUuaW5uZXJIVE1MID0gdGVtcGxhdGUob3B0aW9ucylcblxuICB0aGlzLnBhcmVudCA9IHBhcmVudFxuXG4gIHRoaXMubm9kZXMgPSB7XG4gICAgcm9vdCA6ICQobm9kZSksXG4gICAgdGV4dCA6ICQobm9kZSwgJy5hcHAtbWVzc2FnZS10ZXh0JyksXG4gICAgZGlzbSA6ICQobm9kZSwgJy5hcHAtbWVzc2FnZS1kaXNtaXNzJylcbiAgfVxuXG4gIHRoaXMubWFpbkRvTWVzc2FnZUxpc3RlbmVyID0gZnVuY3Rpb24odGV4dCl7XG4gICAgdGhpcy5zaG93KHRleHQpXG4gIH0uYmluZCh0aGlzKVxuXG4gIHRoaXMucGFyZW50Lm9uKCdtb2R1bGU6bWVzc2FnZTpkbzptZXNzYWdlJywgdGhpcy5tYWluRG9NZXNzYWdlTGlzdGVuZXIpXG5cbiAgdGhpcy5ub2Rlcy5kaXNtLm9uKCdjbGljaycsIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIHRoaXMuZGlzbWlzcygpXG4gIH0uYmluZCh0aGlzKSlcbn1cblxuTWVzc2FnZS5wcm90b3R5cGUudW5sb2FkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGFyZW50Lm9mZignbW9kdWxlOm1haW46ZG86bWVzc2FnZScsIHRoaXMubWFpbkRvTWVzc2FnZUxpc3RlbmVyKVxuICB0aGlzLm5vZGVzLmRpc20ub2ZmKClcbiAgdGhpcy5ub2Rlcy5yb290Lmh0bWwoJycpXG59XG5cbk1lc3NhZ2UucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gIHRoaXMubm9kZXMucm9vdC5yZW1vdmVDbGFzcygnYXBwLWhpZGRlbicpXG4gIHRoaXMubm9kZXMudGV4dC50ZXh0KG1lc3NhZ2UpXG59XG5cbk1lc3NhZ2UucHJvdG90eXBlLmRpc21pc3MgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5ub2Rlcy5yb290LmFkZENsYXNzKCdhcHAtaGlkZGVuJylcbiAgdGhpcy5ub2Rlcy50ZXh0LnRleHQoJycpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTWVzc2FnZVxuIiwidmFyIF8gPSB7ZXNjYXBlOiByZXF1aXJlKFwibG9kYXNoLmVzY2FwZVwiKX07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iail7XG52YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4scHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcbndpdGgob2JqfHx7fSl7XG5fX3ArPSc8bmF2IGNsYXNzPVwibmF2aWdhdGlvblwiPjx1bCBjbGFzcz1cIm5hdi1hY3Rpb25zXCIgcm9sZT1cIm5hdmlnYXRpb25cIj48bGk+PGEgaWQ9XCJuYXYtbmV3cG9zdFwiIGhyZWY9XCIjXCI+TmV3IFBvc3Q8L2E+PC9saT48bGk+PGEgaHJlZj1cIiNtZS9wb3N0c1wiPk15IFBvc3RzPC9hPjwvbGk+PGxpPjxhIGhyZWY9XCIjbWUvZmF2b3JpdGVzXCI+TXkgRmF2b3JpdGVzPC9hPjwvbGk+PGxpPjxhIGlkPVwibmF2LWxvZ291dFwiIGhyZWY9XCIjbWUvbG9nb3V0XCI+TG9nIE91dDwvYT48L2xpPjwvdWw+PC9uYXY+Jztcbn1cbnJldHVybiBfX3A7XG59O1xuIiwidmFyXG4gICQgPSByZXF1aXJlKCcuLi8uLi9saWIvZG9tV3JhcCcpLFxuICBVc2VyID0gcmVxdWlyZSgnLi4vLi4vYXBwL3VzZXInKSxcbiAgcmlvdCA9IHJlcXVpcmUoJ3Jpb3QnKSxcbiAgdGVtcGxhdGUgPSByZXF1aXJlKCcuL25hdmlnYXRpb24uaHRtbCcpXG5cbmZ1bmN0aW9uIE5hdmlnYXRpb24ocGFyZW50LCBub2RlLCBvcHRpb25zKSB7XG4gIG5vZGUuaW5uZXJIVE1MID0gdGVtcGxhdGUob3B0aW9ucylcblxuICB2YXIgbiA9IHRoaXNcblxuICBuLnBhcmVudCA9IHBhcmVudFxuXG4gIG4ubm9kZXMgPSB7XG4gICAgcm9vdCAgICA6ICQobm9kZSksXG4gICAgbG9nb3V0ICA6ICQobm9kZSwgJyNuYXYtbG9nb3V0JyksXG4gICAgbmV3cG9zdCA6ICQobm9kZSwgJyNuYXYtbmV3cG9zdCcpXG4gIH1cblxuICBuLnVwZGF0ZUxvZ291dCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChVc2VyLmN1cnJlbnQubG9nZ2VkKSB7IG4uc2hvd0xvZ291dCgpIH0gZWxzZSB7IG4uaGlkZUxvZ291dCgpIH1cbiAgfVxuXG4gIG4ubmV3cG9zdExpc3RlbmVyID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgbi5wYXJlbnQudHJpZ2dlcignbW9kdWxlOm5hdmlnYXRpb246ZGlkOm5ld3Bvc3QnKVxuICB9XG5cbiAgbi5wYXJlbnQub24oJ21vZHVsZTptYWluOmRpZDpyb3V0ZXInLCBuLnVwZGF0ZUxvZ291dClcbiAgbi5ub2Rlcy5uZXdwb3N0Lm9uKCdjbGljaycsIG4ubmV3cG9zdExpc3RlbmVyKVxufVxuXG5OYXZpZ2F0aW9uLnByb3RvdHlwZS51bmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG4gPSB0aGlzXG4gIG4ucGFyZW50Lm9mZignbW9kdWxlOm1haW46ZGlkOnJvdXRlcicsIG4udXBkYXRlTG9nb3V0KVxuICBuLm5vZGVzLm5ld3Bvc3Qub24oJ2NsaWNrJywgbi5uZXdwb3N0TGlzdGVuZXIpXG4gIG4ubm9kZXMucm9vdC5odG1sKCcnKVxufVxuXG5OYXZpZ2F0aW9uLnByb3RvdHlwZS5zaG93TG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubm9kZXMubG9nb3V0LnJlbW92ZUNsYXNzKCdhcHAtaGlkZGVuJylcbn1cblxuTmF2aWdhdGlvbi5wcm90b3R5cGUuaGlkZUxvZ291dCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm5vZGVzLmxvZ291dC5hZGRDbGFzcygnYXBwLWhpZGRlbicpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTmF2aWdhdGlvblxuIiwidmFyIF8gPSB7ZXNjYXBlOiByZXF1aXJlKFwibG9kYXNoLmVzY2FwZVwiKX07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iail7XG52YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4scHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcbndpdGgob2JqfHx7fSl7XG5fX3ArPSc8aDI+JytcbigoX190PSggc3RvcmVkID8gJ0VkaXRpbmcgUG9zdCcgOiAnTmV3IFBvc3QnICkpPT1udWxsPycnOl9fdCkrXG4nPC9oMj48cD5QbGVhc2UgcHJvdmlkZSB0aGUgcmVzb3VyY2UgdXJsIHRvIHNoYXJlLCBhIHRpdGxlIGFuZCBhIGRlc2NyaXB0aW9uLjwvcD48ZGl2IGNsYXNzPVwicG9zdC1mb3JtLWVtYmVkXCI+PGxhYmVsPkVtYmVkIFVybCAoZS5nLiBZb3VUdWJlIFVybCk8L2xhYmVsPjxpbnB1dCBuYW1lPVwidXJsXCIgdHlwZT1cInVybFwiIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1QOUo1dFlTaE5ZOFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJwb3N0LWZvcm0tZGF0YVwiPjxpbnB1dCBuYW1lPVwidGl0bGVcIiB0aXRsZT1cIlBvc3QgVGl0bGVcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVGl0bGVcIj48dGV4dGFyZWEgdGl0bGU9XCJQb3N0IERlc2NyaXB0aW9uXCIgcGxhY2Vob2xkZXI9XCJEZXNjcmlwdGlvblwiPjwvdGV4dGFyZWE+PC9kaXY+PGRpdiBjbGFzcz1cInBvc3QtYWN0aW9uc1wiIGRhdGEtcG9zdC1rZXk9XCInK1xuKChfX3Q9KCBwb3N0S2V5ICkpPT1udWxsPycnOl9fdCkrXG4nXCI+PGEgY2xhc3M9XCJ1bmRvXCIgdGl0bGU9XCJVbmRvXCIgaHJlZj1cIiNcIj48aSBjbGFzcz1cImZhIGZhLXRpbWVzLWNpcmNsZVwiPjwvaT4mbmJzcDtDYW5jZWw8L2E+IDxhIGNsYXNzPVwic2F2ZVwiIHRpdGxlPVwiU2F2ZSBhbmQgUHVibGlzaFwiIGhyZWY9XCIjXCI+PGkgY2xhc3M9XCJmYSBmYS1zYXZlXCI+PC9pPiZuYnNwO1NhdmU8L2E+IDxzcGFuIGNsYXNzPVwicG9zdC1lZGl0LW1lc3NhZ2VcIj48L3NwYW4+PC9kaXY+Jztcbn1cbnJldHVybiBfX3A7XG59O1xuIiwidmFyIF8gPSB7XG4gIG1lcmdlICA6IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvbWVyZ2UnKSxcbiAgdmFsdWVzIDogcmVxdWlyZSgnbG9kYXNoL29iamVjdC92YWx1ZXMnKVxufVxuXG52YXJcbiAgJCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9kb21XcmFwJyksXG4gIFBvc3QgPSByZXF1aXJlKCcuLi8uLi9hcHAvcG9zdCcpLFxuICB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vZm9ybS5odG1sJylcblxuZnVuY3Rpb24gUG9zdEZvcm0ocGFyZW50LCBub2RlLCBvcHRpb25zKSB7XG4gIHRoaXMucGFyZW50ID0gcGFyZW50XG4gIHRoaXMucG9zdCA9IG5ldyBQb3N0KG9wdGlvbnMucG9zdClcblxuICB2YXIgciA9ICQobm9kZSkuaHRtbCh0ZW1wbGF0ZShfLm1lcmdlKHtcbiAgICBwb3N0S2V5OiB0aGlzLnBvc3Qua2V5IHx8ICduZXcnXG4gIH0sIHRoaXMucG9zdCkpKVxuXG4gIHRoaXMubm9kZXMgPSB7XG4gICAgcm9vdDogcixcbiAgICBmb3JtTWVzc2FnZTogJChub2RlLCAnLnBvc3QtZWRpdC1tZXNzYWdlJyksXG4gICAgaW5wdXRUaXRsZTogJChub2RlLCAnaW5wdXRbbmFtZT10aXRsZV0nKSxcbiAgICBpbnB1dFVybDogJChub2RlLCAnaW5wdXRbbmFtZT11cmxdJyksXG4gICAgaW5wdXREZXNjOiAkKG5vZGUsICd0ZXh0YXJlYScpXG4gIH1cblxuICByLmFkZENsYXNzKCdhcHAtcG9zdC1mb3JtJylcblxuICB0aGlzLnVwZGF0ZUZvcm0oKVxufVxuXG5Qb3N0Rm9ybS5wcm90b3R5cGUudW5sb2FkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubm9kZXMucm9vdC5yZW1vdmVDbGFzcygnYXBwLXBvc3QtZm9ybScpLmh0bWwoJycpXG59XG5cblBvc3RGb3JtLnByb3RvdHlwZS51cGRhdGVGb3JtID0gZnVuY3Rpb24oKSB7XG4gIHZhciBuID0gdGhpcy5ub2RlcywgcCA9IHRoaXMucG9zdFxuICBuLmlucHV0VGl0bGUudmFsKHAudGl0bGUpXG4gIG4uaW5wdXRVcmwudmFsKHAuZW1iZWQudXJsIHx8ICcnKVxuICBuLmlucHV0RGVzYy52YWwocC5kZXNjKVxufVxuXG5Qb3N0Rm9ybS5wcm90b3R5cGUudXBkYXRlUG9zdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbiA9IHRoaXMubm9kZXNcbiAgdGhpcy5wb3N0LnNldGF0dHIoe1xuICAgIHRpdGxlOiBuLmlucHV0VGl0bGUudmFsKCksXG4gICAgZW1iZWQ6IHt1cmw6IG4uaW5wdXRVcmwudmFsKCkgfSxcbiAgICBkZXNjOiBuLmlucHV0RGVzYy52YWwoKVxuICB9KVxufVxuXG5Qb3N0Rm9ybS5wcm90b3R5cGUuaXNWYWxpZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzdWx0ID0gdGhpcy5wb3N0LnZhbGlkYXRpb24oKSwgbiA9IHRoaXMubm9kZXNcblxuICBuLmlucHV0VXJsLnJlbW92ZUNsYXNzKCdpbnZhbGlkJylcbiAgbi5pbnB1dFRpdGxlLnJlbW92ZUNsYXNzKCdpbnZhbGlkJylcblxuICBpZiAocmVzdWx0LmlzVmFsaWQpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9IGVsc2Uge1xuICAgIGlmIChyZXN1bHQuZXJyb3JzLnVybCkgeyBuLmlucHV0VXJsLmFkZENsYXNzKCdpbnZhbGlkJykgfVxuICAgIGlmIChyZXN1bHQuZXJyb3JzLnRpdGxlKSB7IG4uaW5wdXRUaXRsZS5hZGRDbGFzcygnaW52YWxpZCcpIH1cblxuICAgIHZhciBtc2cgPSBfLnZhbHVlcyhyZXN1bHQuZXJyb3JzKS5qb2luKCcsICcpXG4gICAgbi5mb3JtTWVzc2FnZS50ZXh0KCdTb3JyeSwgdGhlIHBvc3QgY2FuXFwndCBiZSBzYXZlZDogJyArIG1zZyArICcuJylcblxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUG9zdEZvcm1cbiIsInZhciBfID0ge2VzY2FwZTogcmVxdWlyZShcImxvZGFzaC5lc2NhcGVcIil9O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmope1xudmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLHByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XG53aXRoKG9ianx8e30pe1xuX19wKz0nPHAgY2xhc3M9XCJ0aW1lYWdvXCI+cG9zdGVkIGJ5Jm5ic3A7JytcbigoX190PSggdXNlck5hbWUgKSk9PW51bGw/Jyc6X190KStcbicmbmJzcDsnK1xuKChfX3Q9KCB0aW1lYWdvICkpPT1udWxsPycnOl9fdCkrXG4nPC9wPjxoMj48aSBjbGFzcz1cImZhIGZhLXBsYXlcIj48L2k+Jm5ic3A7JytcbigoX190PSggdGl0bGUgKSk9PW51bGw/Jyc6X190KStcbic8L2gyPjxkaXYgY2xhc3M9XCJwb3N0LXNob3ctZW1iZWRcIj48aWZyYW1lIHR5cGU9XCJ0ZXh0L2h0bWxcIiB3aWR0aD1cIjY0MFwiIGhlaWdodD1cIjI2MFwiIHNyYz1cImh0dHA6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJytcbigoX190PSggZW1iZWQudmlkZW9JZCApKT09bnVsbD8nJzpfX3QpK1xuJ1wiIGZyYW1lYm9yZGVyPVwiMFwiPjwvaWZyYW1lPjwvZGl2PjxwIGNsYXNzPVwicG9zdC1zaG93LWRlc2NyaXB0aW9uXCI+PGkgY2xhc3M9XCJmYSBmYS1jaGlsZCBmYS0yeFwiPjwvaT4mbmJzcDsnK1xuKChfX3Q9KCBkZXNjICkpPT1udWxsPycnOl9fdCkrXG4nPC9wPjxkaXYgY2xhc3M9XCJwb3N0LWFjdGlvbnNcIiBkYXRhLXBvc3Qta2V5PVwiJytcbigoX190PSggcG9zdEtleSApKT09bnVsbD8nJzpfX3QpK1xuJ1wiPjxhIGNsYXNzPVwiZmF2XCIgdGl0bGU9XCJGYXZvcml0ZVwiIGhyZWY9XCIjXCI+PGkgY2xhc3M9XCJmYSBmYS1oZWFydFwiPjwvaT4mbmJzcDtGYXZvcml0ZTwvYT4nO1xuIGlmIChvd25lZCkgeyBcbl9fcCs9JyA8YSBjbGFzcz1cImVkaXRcIiB0aXRsZT1cIkVkaXRcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmEgZmEtZWRpdFwiPjwvaT4mbmJzcDtFZGl0PC9hPiA8YSBjbGFzcz1cInJlbW92ZVwiIHRpdGxlPVwiUmVtb3ZlXCIgaHJlZj1cIiNcIj48aSBjbGFzcz1cImZhIGZhLXRyYXNoXCI+PC9pPiZuYnNwO1JlbW92ZTwvYT4nO1xuIH0gXG5fX3ArPSc8L2Rpdj4nO1xufVxucmV0dXJuIF9fcDtcbn07XG4iLCJ2YXJcbiAgJCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9kb21XcmFwJyksXG4gIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9zaG93Lmh0bWwnKSxcbiAgVXNlciA9IHJlcXVpcmUoJy4uLy4uL2FwcC91c2VyJylcblxudmFyIF8gPSB7XG4gIG1lcmdlIDogcmVxdWlyZSgnbG9kYXNoL29iamVjdC9tZXJnZScpXG59XG5cbmZ1bmN0aW9uIFBvc3RTaG93KHBhcmVudCwgbm9kZSwgb3B0aW9ucykge1xuICB0aGlzLnBhcmVudCA9IHBhcmVudFxuXG4gIHZhciBwID0gdGhpcy5wb3N0ID0gb3B0aW9ucy5wb3N0XG5cbiAgbm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZShfLm1lcmdlKHAuZ2V0YXR0cigpLCB7XG4gICAgcG9zdEtleTogcC5rZXkgfHwgJ25ldycsXG4gICAgdGltZWFnbzogcC50aW1lYWdvKCksXG4gICAgb3duZWQ6IHAudWlkID09IFVzZXIuY3VycmVudC51aWRcbiAgfSkpXG5cbiAgdGhpcy5ub2RlcyA9IHtcbiAgICByb290OiAkKG5vZGUpLmFkZENsYXNzKCdhcHAtcG9zdC1zaG93JyksXG4gICAgZmF2OiAkKG5vZGUsICcuZmF2JylcbiAgfVxuXG4gIHRoaXMudXBkYXRlRmF2KClcbn1cblxuUG9zdFNob3cucHJvdG90eXBlLnVwZGF0ZUZhdiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcCA9IHRoaXMucG9zdCwgZiA9IHRoaXMubm9kZXMuZmF2XG5cbiAgaWYgKHAuZmF2b3JpdGVkQnkoVXNlci5jdXJyZW50LnVpZCkpIHtcbiAgICBmLmFkZENsYXNzKCdwb3N0LWZhdm9yaXRlZCcpXG4gIH0gZWxzZSB7XG4gICAgZi5yZW1vdmVDbGFzcygncG9zdC1mYXZvcml0ZWQnKVxuICB9XG59XG5cblBvc3RTaG93LnByb3RvdHlwZS51bmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5ub2Rlcy5yb290LnJlbW92ZUNsYXNzKCdhcHAtcG9zdC1zaG93JykuaHRtbCgnJylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0U2hvd1xuIiwidmFyIF8gPSB7ZXNjYXBlOiByZXF1aXJlKFwibG9kYXNoLmVzY2FwZVwiKX07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iail7XG52YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4scHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcbndpdGgob2JqfHx7fSl7XG5fX3ArPSc8ZGl2IGNsYXNzPVwicHJvZmlsZS1pbmZvXCI+PHVsIGNsYXNzPVwiZmEtdWxcIj48bGkgY2xhc3M9XCJwcm9maWxlLXBpY1wiPjxpbWcgc3JjPVwiJytcbigoX190PSh1c2VyLmF2YXRhclVybCkpPT1udWxsPycnOl9fdCkrXG4nXCI+PC9saT48bGk+PGkgY2xhc3M9XCJmYS1saSBmYSBmYS11c2VyXCI+PC9pPicrXG4oKF9fdD0odXNlci5kaXNwbGF5TmFtZSkpPT1udWxsPycnOl9fdCkrXG4nPC9saT48bGk+PGkgY2xhc3M9XCJmYS1saSBmYSBmYS1hc3Rlcmlza1wiPjwvaT4nK1xuKChfX3Q9KHVzZXIuZGVzY3JpcHRpb24pKT09bnVsbD8nJzpfX3QpK1xuJzwvbGk+PGxpPjxpIGNsYXNzPVwiZmEtbGkgZmEgZmEtbWFwLW1hcmtlclwiPjwvaT4nK1xuKChfX3Q9KHVzZXIubG9jYXRpb24pKT09bnVsbD8nJzpfX3QpK1xuJzwvbGk+JztcbiBpZiAodXNlci5wcm92aWRlciA9PSAndHdpdHRlcicpIHsgXG5fX3ArPSc8bGk+PGkgY2xhc3M9XCJmYS1saSBmYSBmYS10d2l0dGVyLXNxdWFyZVwiPjwvaT4gPGEgaHJlZj1cImh0dHBzOi8vdHdpdHRlci5jb20vJytcbigoX190PSh1c2VyLmRpc3BsYXlOYW1lKSk9PW51bGw/Jyc6X190KStcbidcIj5AJytcbigoX190PSh1c2VyLmRpc3BsYXlOYW1lKSk9PW51bGw/Jyc6X190KStcbic8L2E+PC9saT4nO1xuIH0gXG5fX3ArPScnO1xuIGlmICh1c2VyLnByb3ZpZGVyID09ICdnb29nbGUnKSB7IFxuX19wKz0nPGxpPjxpIGNsYXNzPVwiZmEtbGkgZmEgZmEtZ29vZ2xlLXBsdXNcIj48L2k+IDxhIGhyZWY9XCInK1xuKChfX3Q9KHVzZXIudXJsKSk9PW51bGw/Jyc6X190KStcbidcIj4nK1xuKChfX3Q9KHVzZXIuZGlzcGxheU5hbWUpKT09bnVsbD8nJzpfX3QpK1xuJzwvYT48YnI+PC9saT4nO1xuIH0gXG5fX3ArPSc8L3VsPjwvZGl2Pic7XG59XG5yZXR1cm4gX19wO1xufTtcbiIsInZhciBfID0ge2VzY2FwZTogcmVxdWlyZShcImxvZGFzaC5lc2NhcGVcIil9O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmope1xudmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLHByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XG53aXRoKG9ianx8e30pe1xuX19wKz0nPGFzaWRlIGNsYXNzPVwicHJvZmlsZVwiPjwvYXNpZGU+PG1haW4gY2xhc3M9XCJtYWluXCIgcm9sZT1cIm1haW5cIj48ZGl2IGNsYXNzPVwiYXBwLW5ldy1wb3N0XCI+PC9kaXY+PGRpdiBjbGFzcz1cImFwcC1wb3N0LXBsYWNlaG9sZGVyXCI+PGgxPkhleSEmbmJzcDs8aSBjbGFzcz1cImZhIGZhLWNoaWxkXCI+PC9pPiZuYnNwOzxpIGNsYXNzPVwiZmEgZmEtcGxheVwiPjwvaT48L2gxPjxwPlRoaXMgdXNlciBoYXMgbm90JytcbigoX190PSggKGFjdGlvbiA9PSAncG9zdHMnKSA/ICcgcG9zdGVkIGFueXRoaW5nICcgOiAnIGZhdm9yaXRlZCBhbnkgcG9zdCAnICkpPT1udWxsPycnOl9fdCkrXG4neWV0LiBQbGVhc2UgY2hlY2sgYmFjayBsYXRlciE8L3A+PC9kaXY+PGRpdiBjbGFzcz1cImFwcC1wb3N0c1wiPjwvZGl2PjwvbWFpbj4nO1xufVxucmV0dXJuIF9fcDtcbn07XG4iLCJ2YXJcbiAgJCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9kb21XcmFwJyksXG4gIFBvc3QgPSByZXF1aXJlKCcuLi8uLi9hcHAvcG9zdCcpLFxuICBVc2VyID0gcmVxdWlyZSgnLi4vLi4vYXBwL3VzZXInKSxcbiAgUG9zdEZvcm0gPSByZXF1aXJlKCcuLi9wb3N0L2Zvcm0nKSxcbiAgUG9zdFNob3cgPSByZXF1aXJlKCcuLi9wb3N0L3Nob3cnKSxcbiAgcHJvZnRwbCA9IHJlcXVpcmUoJy4vcHJvZmlsZS5odG1sJyksXG4gIHRlbXBsYXRlID0gcmVxdWlyZSgnLi91c2VyLmh0bWwnKVxuXG5mdW5jdGlvbiBVc2VyTW9kKHBhcmVudCwgbm9kZSwgb3B0aW9ucykge1xuICB0aGlzLnBhcmVudCA9IHBhcmVudFxuXG4gIHRoaXMubW9kcyA9IHt9IC8vIHN0b3JlIFBvc3RTaG93IGFuZCBQb3N0Rm9ybSBtb2R1bGVzLlxuXG4gIHRoaXMuYWN0aW9uID0gb3B0aW9ucy5hY3Rpb25cbiAgdGhpcy51aWQgPSBvcHRpb25zLnVpZFxuICB0aGlzLmZpcmViYXNlcGF0aCA9ICd1c2VyXycgKyB0aGlzLmFjdGlvbiArICcvJyArIHRoaXMudWlkXG5cbiAgbm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZSh0aGlzKVxuXG4gIHZhciByID0gJChub2RlKVxuXG4gIHRoaXMubm9kZXMgPSB7XG4gICAgcm9vdCAgICAgIDogcixcbiAgICBuZXdwb3N0ICAgOiAkKG5vZGUsICcuYXBwLW5ldy1wb3N0JyksXG4gICAgcGxhY2Vob2xkIDogJChub2RlLCAnLmFwcC1wb3N0LXBsYWNlaG9sZGVyJyksXG4gICAgcG9zdHMgICAgIDogJChub2RlLCAnLmFwcC1wb3N0cycpLFxuICAgIHByb2YgICAgICA6ICQobm9kZSwgJy5wcm9maWxlJylcbiAgfVxuXG4gIHRoaXMudXNlckRpZExvb2t1cCA9IGZ1bmN0aW9uKHVpZCwgdXNlcikge1xuICAgIHRoaXMudXNlciA9IHVzZXJcbiAgICB0aGlzLnJlZHJhd1Byb2ZpbGUoKVxuICAgIFBvc3QucmV0cmlldmUodGhpcy5maXJlYmFzZXBhdGgpXG4gICAgdGhpcy5wYXJlbnQudHJpZ2dlcignbW9kdWxlOnVzZXI6ZGlkOmxvb2t1cCcsIHVpZCwgdXNlcilcbiAgfS5iaW5kKHRoaXMpXG5cbiAgdGhpcy51c2VyRmFpbGVkTG9va3VwID0gZnVuY3Rpb24gKHVpZCkge1xuICAgIHRoaXMucGFyZW50LnRyaWdnZXIoJ21vZHVsZTp1c2VyOmZhaWxlZDpsb29rdXAnLCB1aWQpXG4gIH0uYmluZCh0aGlzKVxuXG4gIHRoaXMucG9zdHNEaWRSZXRyaWV2ZSA9IGZ1bmN0aW9uKGZpcmViYXNlcGF0aCwgcG9zdCl7XG4gICAgdmFyIHUgPSB0aGlzLCBtID0gdGhpcy5tb2RzW3Bvc3Qua2V5XVxuICAgIGlmIChtKSB7IHUuc2hvd21vZChtKSB9IGVsc2UgeyB1LmFkZFBvc3QocG9zdCkgfVxuICB9LmJpbmQodGhpcylcblxuICB0aGlzLnBvc3RzRGlkVXBkYXRlID0gZnVuY3Rpb24ocG9zdCl7XG4gICAgdmFyIHUgPSB0aGlzLCBtID0gdGhpcy5tb2RzW3Bvc3Qua2V5XVxuICAgIGlmIChtKSB7IHUuc2hvd21vZChtKSB9XG4gIH0uYmluZCh0aGlzKVxuXG4gIHZhciBhY3Rpb25Nb2QgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICB2YXIga2V5ID0gdGFyZ2V0LnBhcmVudCgnLnBvc3QtYWN0aW9ucycpLmRhdGEoJ3Bvc3Qta2V5JylcbiAgICByZXR1cm4gdGhpcy5tb2RzW2tleV1cbiAgfS5iaW5kKHRoaXMpXG5cbiAgci5vbignY2xpY2snLCAnLmZhdicsIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIHZhciBtb2QgPSBhY3Rpb25Nb2QodGFyZ2V0KVxuICAgIFBvc3QudG9nZ2xlRmF2KG1vZC5wb3N0LCBVc2VyLmN1cnJlbnQudWlkKVxuICB9LmJpbmQodGhpcykpXG5cbiAgci5vbignY2xpY2snLCAnLmVkaXQnLCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICB2YXIgbW9kID0gYWN0aW9uTW9kKHRhcmdldClcbiAgICB0aGlzLmVkaXRQb3N0KG1vZClcbiAgfS5iaW5kKHRoaXMpKVxuXG4gIHIub24oJ2NsaWNrJywgJy5yZW1vdmUnLCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICB2YXIgbW9kID0gYWN0aW9uTW9kKHRhcmdldClcbiAgICB0aGlzLnJlbW92ZVBvc3QobW9kKVxuICB9LmJpbmQodGhpcykpXG5cbiAgci5vbignY2xpY2snLCAnLnVuZG8nLCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICB2YXIgbW9kID0gYWN0aW9uTW9kKHRhcmdldClcbiAgICBpZiAobW9kLnBvc3Quc3RvcmVkKSB7XG4gICAgICB0aGlzLnNob3dtb2QobW9kKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZGVOZXdQb3N0KClcbiAgICB9XG4gIH0uYmluZCh0aGlzKSlcblxuICByLm9uKCdjbGljaycsICcuc2F2ZScsIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIHZhciBtb2QgPSBhY3Rpb25Nb2QodGFyZ2V0KVxuXG4gICAgbW9kLnVwZGF0ZVBvc3QoKVxuXG4gICAgaWYgKCFtb2QuaXNWYWxpZCgpKSB7XG4gICAgICAvLyBkbyBub3RoaW5nLCB0aGUgZm9ybSB3aWxsIHNob3cgYW4gZXJyb3IgbWVzc2FnZS5cbiAgICB9IGVsc2UgaWYgKG1vZC5wb3N0LnN0b3JlZCkge1xuICAgICAgUG9zdC51cGRhdGUobW9kLnBvc3QpXG4gICAgfSBlbHNlIHtcbiAgICAgIFBvc3QucGVyc2lzdChtb2QucG9zdClcbiAgICAgIHRoaXMuaGlkZU5ld1Bvc3QoKVxuICAgIH1cbiAgfS5iaW5kKHRoaXMpKVxuXG4gIFVzZXIub24oJ3N0b3JlOnVzZXJzOmZhaWxlZDpsb29rdXAnICwgdGhpcy51c2VyRmFpbGVkTG9va3VwKVxuICBVc2VyLm9uKCdzdG9yZTp1c2VyczpkaWQ6bG9va3VwJyAgICAsIHRoaXMudXNlckRpZExvb2t1cClcbiAgUG9zdC5vbignc3RvcmU6cG9zdHM6ZGlkOnJldHJpZXZlJyAgLCB0aGlzLnBvc3RzRGlkUmV0cmlldmUpXG4gIFBvc3Qub24oJ3N0b3JlOnBvc3RzOmRpZDp1cGRhdGUnICAgICwgdGhpcy5wb3N0c0RpZFVwZGF0ZSlcblxuICBVc2VyLmxvb2t1cCh0aGlzLnVpZClcbn1cblxuVXNlck1vZC5wcm90b3R5cGUudW5sb2FkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubm9kZXMucm9vdC5vZmYoKS5odG1sKCcnKSAvLyB1bnJlZ2lzdGVyIGFsbCBldmVudCBoYW5kbGVycy5cblxuICBVc2VyLm9mZignc3RvcmU6dXNlcnM6ZmFpbGVkOmxvb2t1cCcgLCB0aGlzLnVzZXJGYWlsZWRMb29rdXApXG4gIFVzZXIub2ZmKCdzdG9yZTp1c2VyczpkaWQ6bG9va3VwJyAgICAsIHRoaXMudXNlckRpZExvb2t1cClcbiAgUG9zdC5vZmYoJ3N0b3JlOnBvc3RzOmRpZDpyZXRyaWV2ZScgICwgdGhpcy5wb3N0c0RpZFJldHJpZXZlKVxuICBQb3N0Lm9mZignc3RvcmU6cG9zdHM6ZGlkOnVwZGF0ZScgICAgLCB0aGlzLnBvc3RzRGlkVXBkYXRlKVxuXG4gIFBvc3Quc3RvcFJldHJpZXZlKHRoaXMuZmlyZWJhc2VwYXRoKVxufVxuXG5Vc2VyTW9kLnByb3RvdHlwZS51cGRhdGVQbGFjZWhvbGRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbW9ka2V5cyA9IE9iamVjdC5rZXlzKHRoaXMubW9kcyksIHAgPSB0aGlzLm5vZGVzLnBsYWNlaG9sZFxuXG4gIGlmIChtb2RrZXlzLmxlbmd0aCA9PSAwIHx8IG1vZGtleXNbMF0gPT0gJ25ldycpIHtcbiAgICBwLnJlbW92ZUNsYXNzKCdhcHAtaGlkZGVuJylcbiAgfSBlbHNlIHtcbiAgICBwLmFkZENsYXNzKCdhcHAtaGlkZGVuJylcbiAgfVxufVxuXG5Vc2VyTW9kLnByb3RvdHlwZS5yZWRyYXdQcm9maWxlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubm9kZXMucHJvZi5odG1sKHByb2Z0cGwodGhpcykpXG59XG5cblVzZXJNb2QucHJvdG90eXBlLmhpZGVOZXdQb3N0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtID0gdGhpcy5tb2RzLm5ldywgbiA9IHRoaXMubm9kZXMubmV3cG9zdFxuICBpZiAobSkge1xuICAgIG0udW5sb2FkKClcbiAgICBuLmh0bWwoJycpXG4gICAgZGVsZXRlIHRoaXMubW9kc1snbmV3J11cbiAgICB0aGlzLnVwZGF0ZVBsYWNlaG9sZGVyKClcbiAgfVxufVxuXG5Vc2VyTW9kLnByb3RvdHlwZS5zaG93TmV3UG9zdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbSA9IHRoaXMsIGVsLCBwXG4gIGlmICghbS5tb2RzLm5ldykge1xuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBwID0gbmV3IFBvc3Qoe3VpZCA6IG0udWlkLCB1c2VyTmFtZSA6IG0udXNlci5kaXNwbGF5TmFtZX0pXG4gICAgbS5tb2RzWyduZXcnXSA9IG5ldyBQb3N0Rm9ybShtLCBlbCwge3Bvc3QgOiBwfSlcbiAgICBtLm5vZGVzLm5ld3Bvc3QuYXBwZW5kKGVsKVxuICAgIG0udXBkYXRlUGxhY2Vob2xkZXIoKVxuICB9XG59XG5cblVzZXJNb2QucHJvdG90eXBlLmVkaXRQb3N0ID0gZnVuY3Rpb24obW9kKSB7XG4gIHZhciBlbCA9IG1vZC5ub2Rlcy5yb290WzBdXG4gIG1vZC51bmxvYWQoKVxuICB0aGlzLm1vZHNbbW9kLnBvc3Qua2V5XSA9IG5ldyBQb3N0Rm9ybSh0aGlzLCBlbCwge3Bvc3QgOiBtb2QucG9zdH0pXG59XG5cblVzZXJNb2QucHJvdG90eXBlLmFkZFBvc3QgPSBmdW5jdGlvbihwb3N0KSB7XG4gIHZhciBtID0gdGhpcywgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICBwID0gbmV3IFBvc3RTaG93KG0sIGVsLCB7cG9zdCA6IHBvc3R9KVxuICBtLm1vZHNbcG9zdC5rZXldID0gcFxuICBtLm5vZGVzLnBvc3RzLnByZXBlbmQocC5ub2Rlcy5yb290WzBdKVxuICBtLnVwZGF0ZVBsYWNlaG9sZGVyKClcbn1cblxuLy8gU2hvdyBhIHBvc3QgdGhhdCB3YXMgcHJldmlvdXNseSBiZWluZyBlZGl0ZWQsIG9yIHVwZGF0ZSBpdCBpZiB0aGUgZGF0YSBjaGFuZ2VkLlxuVXNlck1vZC5wcm90b3R5cGUuc2hvd21vZCA9IGZ1bmN0aW9uKG1vZCkge1xuICBpZiAobW9kIGluc3RhbmNlb2YgUG9zdEZvcm0pIHtcbiAgICBtb2QudW5sb2FkKClcbiAgICB2YXIgcHMgPSBuZXcgUG9zdFNob3codGhpcywgbW9kLm5vZGVzLnJvb3RbMF0sIHtwb3N0IDogbW9kLnBvc3R9KVxuICAgIHRoaXMubW9kc1ttb2QucG9zdC5rZXldID0gcHNcbiAgfSBlbHNlIHtcbiAgICBtb2QudXBkYXRlRmF2KCkgLy8gdXBkYXRlIGp1c3QgZmF2IGZsYWcgZm9yIG5vdy5cbiAgfVxufVxuXG5Vc2VyTW9kLnByb3RvdHlwZS5yZW1vdmVQb3N0ID0gZnVuY3Rpb24obW9kKSB7XG4gIFBvc3QuZGVzdHJveShtb2QucG9zdClcbiAgbW9kLnVubG9hZCgpXG4gIHRoaXMubm9kZXMucG9zdHMucmVtb3ZlKG1vZC5ub2Rlcy5yb290WzBdKVxuICBkZWxldGUgdGhpcy5tb2RzW21vZC5rZXldXG4gIHRoaXMudXBkYXRlUGxhY2Vob2xkZXIoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJNb2RcbiJdfQ==

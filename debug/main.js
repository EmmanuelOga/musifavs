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
var arrayFilter = require('../internal/arrayFilter'),
    baseCallback = require('../internal/baseCallback'),
    baseFilter = require('../internal/baseFilter'),
    isArray = require('../lang/isArray');

/**
 * The opposite of `_.filter`; this method returns the elements of `collection`
 * that `predicate` does **not** return truthy for.
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Array} Returns the new filtered array.
 * @example
 *
 * _.reject([1, 2, 3, 4], function(n) {
 *   return n % 2 == 0;
 * });
 * // => [1, 3]
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': false },
 *   { 'user': 'fred',   'age': 40, 'active': true }
 * ];
 *
 * // using the `_.matches` callback shorthand
 * _.pluck(_.reject(users, { 'age': 40, 'active': true }), 'user');
 * // => ['barney']
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.pluck(_.reject(users, 'active', false), 'user');
 * // => ['fred']
 *
 * // using the `_.property` callback shorthand
 * _.pluck(_.reject(users, 'active'), 'user');
 * // => ['barney']
 */
function reject(collection, predicate, thisArg) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  predicate = baseCallback(predicate, thisArg, 3);
  return func(collection, function(value, index, collection) {
    return !predicate(value, index, collection);
  });
}

module.exports = reject;

},{"../internal/arrayFilter":6,"../internal/baseCallback":9,"../internal/baseFilter":12,"../lang/isArray":47}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
/**
 * A specialized version of `_.filter` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"../object/keys":56,"./baseCopy":10}],9:[function(require,module,exports){
var baseMatches = require('./baseMatches'),
    baseMatchesProperty = require('./baseMatchesProperty'),
    baseProperty = require('./baseProperty'),
    bindCallback = require('./bindCallback'),
    identity = require('../utility/identity'),
    isBindable = require('./isBindable');

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return (typeof thisArg != 'undefined' && isBindable(func))
      ? bindCallback(func, thisArg, argCount)
      : func;
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return typeof thisArg == 'undefined'
    ? baseProperty(func + '')
    : baseMatchesProperty(func + '', thisArg);
}

module.exports = baseCallback;

},{"../utility/identity":63,"./baseMatches":21,"./baseMatchesProperty":22,"./baseProperty":25,"./bindCallback":29,"./isBindable":34}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
var baseForOwn = require('./baseForOwn'),
    isLength = require('./isLength'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
function baseEach(collection, iteratee) {
  var length = collection ? collection.length : 0;
  if (!isLength(length)) {
    return baseForOwn(collection, iteratee);
  }
  var index = -1,
      iterable = toObject(collection);

  while (++index < length) {
    if (iteratee(iterable[index], index, iterable) === false) {
      break;
    }
  }
  return collection;
}

module.exports = baseEach;

},{"./baseForOwn":16,"./isLength":37,"./toObject":45}],12:[function(require,module,exports){
var baseEach = require('./baseEach');

/**
 * The base implementation of `_.filter` without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

module.exports = baseFilter;

},{"./baseEach":11}],13:[function(require,module,exports){
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

},{"../lang/isArguments":46,"../lang/isArray":47,"./isLength":37,"./isObjectLike":38}],14:[function(require,module,exports){
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

},{"./toObject":45}],15:[function(require,module,exports){
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

},{"../object/keysIn":57,"./baseFor":14}],16:[function(require,module,exports){
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

},{"../object/keys":56,"./baseFor":14}],17:[function(require,module,exports){
var baseIsEqualDeep = require('./baseIsEqualDeep');

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isWhere, stackA, stackB) {
  // Exit early for identical values.
  if (value === other) {
    // Treat `+0` vs. `-0` as not equal.
    return value !== 0 || (1 / value == 1 / other);
  }
  var valType = typeof value,
      othType = typeof other;

  // Exit early for unlike primitive values.
  if ((valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object') ||
      value == null || other == null) {
    // Return `false` unless both values are `NaN`.
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isWhere, stackA, stackB);
}

module.exports = baseIsEqual;

},{"./baseIsEqualDeep":18}],18:[function(require,module,exports){
var equalArrays = require('./equalArrays'),
    equalByTag = require('./equalByTag'),
    equalObjects = require('./equalObjects'),
    isArray = require('../lang/isArray'),
    isTypedArray = require('../lang/isTypedArray');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

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
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  var valWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
      othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

  if (valWrapped || othWrapped) {
    return equalFunc(valWrapped ? object.value() : object, othWrapped ? other.value() : other, customizer, isWhere, stackA, stackB);
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isWhere, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

module.exports = baseIsEqualDeep;

},{"../lang/isArray":47,"../lang/isTypedArray":52,"./equalArrays":31,"./equalByTag":32,"./equalObjects":33}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} props The source property names to match.
 * @param {Array} values The source values to match.
 * @param {Array} strictCompareFlags Strict comparison flags for source values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, props, values, strictCompareFlags, customizer) {
  var length = props.length;
  if (object == null) {
    return !length;
  }
  var index = -1,
      noCustomizer = !customizer;

  while (++index < length) {
    if ((noCustomizer && strictCompareFlags[index])
          ? values[index] !== object[props[index]]
          : !hasOwnProperty.call(object, props[index])
        ) {
      return false;
    }
  }
  index = -1;
  while (++index < length) {
    var key = props[index];
    if (noCustomizer && strictCompareFlags[index]) {
      var result = hasOwnProperty.call(object, key);
    } else {
      var objValue = object[key],
          srcValue = values[index];

      result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (typeof result == 'undefined') {
        result = baseIsEqual(srcValue, objValue, customizer, true);
      }
    }
    if (!result) {
      return false;
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./baseIsEqual":17}],21:[function(require,module,exports){
var baseIsMatch = require('./baseIsMatch'),
    isStrictComparable = require('./isStrictComparable'),
    keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.matches` which does not clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var props = keys(source),
      length = props.length;

  if (length == 1) {
    var key = props[0],
        value = source[key];

    if (isStrictComparable(value)) {
      return function(object) {
        return object != null && object[key] === value && hasOwnProperty.call(object, key);
      };
    }
  }
  var values = Array(length),
      strictCompareFlags = Array(length);

  while (length--) {
    value = source[props[length]];
    values[length] = value;
    strictCompareFlags[length] = isStrictComparable(value);
  }
  return function(object) {
    return baseIsMatch(object, props, values, strictCompareFlags);
  };
}

module.exports = baseMatches;

},{"../object/keys":56,"./baseIsMatch":20,"./isStrictComparable":39}],22:[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual'),
    isStrictComparable = require('./isStrictComparable');

/**
 * The base implementation of `_.matchesProperty` which does not coerce `key`
 * to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} value The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(key, value) {
  if (isStrictComparable(value)) {
    return function(object) {
      return object != null && object[key] === value;
    };
  }
  return function(object) {
    return object != null && baseIsEqual(value, object[key], null, true);
  };
}

module.exports = baseMatchesProperty;

},{"./baseIsEqual":17,"./isStrictComparable":39}],23:[function(require,module,exports){
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

},{"../lang/isArray":47,"../lang/isObject":50,"../lang/isTypedArray":52,"./arrayEach":5,"./baseForOwn":16,"./baseMergeDeep":24,"./isLength":37,"./isObjectLike":38}],24:[function(require,module,exports){
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

},{"../lang/isArguments":46,"../lang/isArray":47,"../lang/isPlainObject":51,"../lang/isTypedArray":52,"../lang/toPlainObject":53,"./arrayCopy":4,"./isLength":37}],25:[function(require,module,exports){
/**
 * The base implementation of `_.property` which does not coerce `key` to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],26:[function(require,module,exports){
var identity = require('../utility/identity'),
    metaMap = require('./metaMap');

/**
 * The base implementation of `setData` without support for hot loop detection.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var baseSetData = !metaMap ? identity : function(func, data) {
  metaMap.set(func, data);
  return func;
};

module.exports = baseSetData;

},{"../utility/identity":63,"./metaMap":40}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{"../utility/identity":63}],30:[function(require,module,exports){
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

},{"./bindCallback":29,"./isIterateeCall":36}],31:[function(require,module,exports){
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length,
      result = true;

  if (arrLength != othLength && !(isWhere && othLength > arrLength)) {
    return false;
  }
  // Deep compare the contents, ignoring non-numeric properties.
  while (result && ++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    result = undefined;
    if (customizer) {
      result = isWhere
        ? customizer(othValue, arrValue, index)
        : customizer(arrValue, othValue, index);
    }
    if (typeof result == 'undefined') {
      // Recursively compare arrays (susceptible to call stack limits).
      if (isWhere) {
        var othIndex = othLength;
        while (othIndex--) {
          othValue = other[othIndex];
          result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
          if (result) {
            break;
          }
        }
      } else {
        result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
      }
    }
  }
  return !!result;
}

module.exports = equalArrays;

},{}],32:[function(require,module,exports){
/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} value The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        // But, treat `-0` vs. `+0` as not equal.
        : (object == 0 ? ((1 / object) == (1 / other)) : object == +other);

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

module.exports = equalByTag;

},{}],33:[function(require,module,exports){
var keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isWhere) {
    return false;
  }
  var hasCtor,
      index = -1;

  while (++index < objLength) {
    var key = objProps[index],
        result = hasOwnProperty.call(other, key);

    if (result) {
      var objValue = object[key],
          othValue = other[key];

      result = undefined;
      if (customizer) {
        result = isWhere
          ? customizer(othValue, objValue, key)
          : customizer(objValue, othValue, key);
      }
      if (typeof result == 'undefined') {
        // Recursively compare objects (susceptible to call stack limits).
        result = (objValue && objValue === othValue) || equalFunc(objValue, othValue, customizer, isWhere, stackA, stackB);
      }
    }
    if (!result) {
      return false;
    }
    hasCtor || (hasCtor = key == 'constructor');
  }
  if (!hasCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

module.exports = equalObjects;

},{"../object/keys":56}],34:[function(require,module,exports){
var baseSetData = require('./baseSetData'),
    isNative = require('../lang/isNative'),
    support = require('../support');

/** Used to detect named functions. */
var reFuncName = /^\s*function[ \n\r\t]+\w/;

/** Used to detect functions containing a `this` reference. */
var reThis = /\bthis\b/;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Checks if `func` is eligible for `this` binding.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is eligible, else `false`.
 */
function isBindable(func) {
  var result = !(support.funcNames ? func.name : support.funcDecomp);

  if (!result) {
    var source = fnToString.call(func);
    if (!support.funcNames) {
      result = !reFuncName.test(source);
    }
    if (!result) {
      // Check if `func` references the `this` keyword and store the result.
      result = reThis.test(source) || isNative(func);
      baseSetData(func, result);
    }
  }
  return result;
}

module.exports = isBindable;

},{"../lang/isNative":49,"../support":62,"./baseSetData":26}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{"../lang/isObject":50,"./isIndex":35,"./isLength":37}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && (value === 0 ? ((1 / value) > 0) : !isObject(value));
}

module.exports = isStrictComparable;

},{"../lang/isObject":50}],40:[function(require,module,exports){
(function (global){
var isNative = require('../lang/isNative');

/** Native method references. */
var WeakMap = isNative(WeakMap = global.WeakMap) && WeakMap;

/** Used to store function metadata. */
var metaMap = WeakMap && new WeakMap;

module.exports = metaMap;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../lang/isNative":49}],41:[function(require,module,exports){
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

},{"./toObject":45}],42:[function(require,module,exports){
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

},{"./baseForIn":15}],43:[function(require,module,exports){
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

},{"./baseForIn":15,"./isObjectLike":38}],44:[function(require,module,exports){
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

},{"../lang/isArguments":46,"../lang/isArray":47,"../object/keysIn":57,"../support":62,"./isIndex":35,"./isLength":37}],45:[function(require,module,exports){
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

},{"../lang/isObject":50}],46:[function(require,module,exports){
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

},{"../internal/isLength":37,"../internal/isObjectLike":38}],47:[function(require,module,exports){
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

},{"../internal/isLength":37,"../internal/isObjectLike":38,"./isNative":49}],48:[function(require,module,exports){
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

},{"../internal/baseIsFunction":19,"./isNative":49}],49:[function(require,module,exports){
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

},{"../internal/isObjectLike":38,"../string/escapeRegExp":61}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
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

},{"../internal/shimIsPlainObject":43,"./isNative":49}],52:[function(require,module,exports){
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

},{"../internal/isLength":37,"../internal/isObjectLike":38}],53:[function(require,module,exports){
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

},{"../internal/baseCopy":10,"../object/keysIn":57}],54:[function(require,module,exports){
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

},{"../internal/baseAssign":8,"../internal/createAssigner":30}],55:[function(require,module,exports){
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

},{"../internal/arrayCopy":4,"../internal/assignDefaults":7,"./assign":54}],56:[function(require,module,exports){
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

},{"../internal/isLength":37,"../internal/shimKeys":44,"../lang/isNative":49,"../lang/isObject":50}],57:[function(require,module,exports){
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

},{"../internal/isIndex":35,"../internal/isLength":37,"../lang/isArguments":46,"../lang/isArray":47,"../lang/isObject":50,"../support":62}],58:[function(require,module,exports){
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

},{"../internal/baseMerge":23,"../internal/createAssigner":30}],59:[function(require,module,exports){
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

},{"../internal/baseFlatten":13,"../internal/bindCallback":29,"../internal/pickByArray":41,"../internal/pickByCallback":42}],60:[function(require,module,exports){
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

},{"../internal/baseValues":28,"./keys":56}],61:[function(require,module,exports){
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

},{"../internal/baseToString":27}],62:[function(require,module,exports){
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

},{"./lang/isNative":49}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
/* Riot v2.0.12, @license MIT, (c) 2015 Muut Inc. + contributors */

;(function() {

  var riot = { version: 'v2.0.12', settings: {} }

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
      re_vars = /(['"\/]).*?[^\\]\1|\.\w*|\w*:|\b(?:(?:new|typeof|in|instanceof) |(?:this|true|false|null|undefined)\b|function *\()|([a-z_$]\w*)/gi
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
    s = (s || (brackets(0) + brackets(1)))

      // temporarily convert \{ and \} to a non-character
      .replace(brackets(/\\{/g), '\uFFF0')
      .replace(brackets(/\\}/g), '\uFFF1')

    // split string to expression and non-expresion parts
    p = split(s, brackets(/{[\s\S]*?}/g))

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
              ? expr(s, true)

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

      }) + '].join(" ").trim()'

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
        + (nonull === true ? '!v&&v!==0?"":v' : 'v')

      + '}}).call(d)'
  }


  // a substitute for str.split(re) for IE8
  // because IE8 doesn't support capturing parenthesis in it

  function split(s, re) {
    var parts = [], last = 0
    s.replace(re, function(m, i) {
      // push matched expression and part before it
      parts.push(s.slice(last, i), m)
      last = i + m.length
    })
    // push the remaining part
    return parts.concat(s.slice(last))
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

  // clean template code
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
          item: item
        })

        tag.mount()

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


function parseNamedElements(root, parent, child_tags) {

  walk(root, function(dom) {
    if (dom.nodeType == 1) {

      // custom child tag
      var child = getTag(dom)

      if (child && !dom.getAttribute('each')) {
        var tag = new Tag(child, { root: dom, parent: parent })
        parent.tags[dom.getAttribute('name') || child.name] = tag
        child_tags.push(tag)
      }

      each(dom.attributes, function(attr) {
        if (/^(name|id)$/.test(attr.name)) parent[attr.value] = dom
      })
    }

  })

}

function parseExpressions(root, tag, expressions) {

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

    // skip custom tags
    if (getTag(dom)) return false

  })

}

function Tag(impl, conf) {

  var self = riot.observable(this),
      opts = inherit(conf.opts) || {},
      dom = mkdom(impl.tmpl),
      parent = conf.parent,
      expressions = [],
      child_tags = [],
      root = conf.root,
      item = conf.item,
      fn = impl.fn,
      attr = {},
      loop_dom

  if (fn && root.riot) return
  root.riot = true

  extend(this, { parent: parent, root: root, opts: opts, tags: {} }, item)

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

  this.mount = function() {

    updateOpts()

    // initialiation
    fn && fn.call(self, opts)

    toggle(true)

    // parse layout after init. fn may calculate args for nested custom tags
    parseExpressions(dom, self, expressions)

    self.update()

    // internal use only, fixes #403
    self.trigger('premount')

    if (fn) {
      while (dom.firstChild) root.appendChild(dom.firstChild)

    } else {
      loop_dom = dom.firstChild
      root.insertBefore(loop_dom, conf.before || null) // null needed for IE8
    }

    if (root.stub) self.root = root = parent.root
    self.trigger('mount')

  }


  this.unmount = function() {
    var el = fn ? root : loop_dom,
        p = el.parentNode

    if (p) {
      if (parent) p.removeChild(el)
      else while (root.firstChild) root.removeChild(root.firstChild)
      toggle()
      self.trigger('unmount')
      self.off('*')
      delete root.riot
    }

  }

  function toggle(is_mount) {

    // mount/unmount children
    each(child_tags, function(child) { child[is_mount ? 'mount' : 'unmount']() })

    // listen/unlisten parent (events flow one way from parent to children)
    if (parent) {
      var evt = is_mount ? 'on' : 'off'
      parent[evt]('update', self.update)[evt]('unmount', self.unmount)
    }
  }

  // named elements available for fn
  parseNamedElements(dom, this, child_tags)


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
        value = tmpl(expr.expr, tag),
        parent = expr.dom.parentNode

    if (value == null) value = ''

    // leave out riot- prefixes from strings inside textarea
    if (parent && parent.tagName == 'TEXTAREA') value = value.replace(/riot-/g, '')

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
    } else if (attr_name.slice(0, 5) == 'riot-') {
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


function getTag(dom) {
  return tag_impl[dom.tagName.toLowerCase()]
}

function injectStyle(css) {
  var node = document.createElement('style')
  node.innerHTML = css
  document.head.appendChild(node)
}

function mountTo(root, tagName, opts) {
  var tag = tag_impl[tagName]

  if (tag && root) tag = new Tag(tag, { root: root, opts: opts })

  if (tag && tag.mount) {
    tag.mount()
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

// @deprecated
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

},{}],65:[function(require,module,exports){
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
  pick     : require('lodash/object/pick'),
  reject   : require('lodash/collection/reject')
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
  var favers = _.merge({}, post.favers) // "clone"

  if (post.favoritedBy(uid)) { // toggle.
    delete favers[uid]
  } else {
    favers[uid] = true
  }

  post.fbpostref('favers').update(favers, function(error){
    if (error) {
      Post.trigger('store:posts:failed:togglefav', post, error)
    } else {
      post.favers = favers

      // update the refs for the owner of the post (note use of post.uid instead
      // of just uid of the user toggling the fav)
      var
        upstref = fbref.child('user_posts/' + post.uid + '/' + post.key),
        ufavref = fbref.child('user_favorites/' + post.uid + '/' + post.key)

      upstref.update(post.getattr())

      if (post.favoritedBy(post.uid)) {
        ufavref.update(post.getattr())
      } else {
        ufavref.remove() // may need to remove if no longer faved
      }

      // update the general list of all favorites
      var favsref = fbref.child('favorited/' + post.key)

      if (Object.keys(post.favers).length > 0) {
        favsref.update(post.getattr()) // someone still likes it!
      } else {
        favsref.remove() // nobody likes this anymore.
      }

      // update all other favers (may return empty array)
      otherUids = _.reject(Object.keys(favers).concat(uid), function(_uid) { return _uid == post.uid })

      otherUids.forEach(function(uid){
        var otherfav = fbref.child('user_favorites/' + uid + '/' + post.key)

        if (post.favoritedBy(uid)) {
          otherfav.update(post.getattr())
        } else {
          otherfav.remove()
        }
      })

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
    // fav addition is handled in toggleFav
  }
}

Post.on('store:posts:did:persist', updatePostReferences)
Post.on('store:posts:did:update', updatePostReferences)
Post.on('store:posts:did:destroy', updatePostReferences)
Post.on('store:posts:did:togglefav', updatePostReferences)

module.exports = Post

},{"../lib/fromnow":68,"../lib/youtube":69,"lodash/collection/reject":3,"lodash/object/defaults":55,"lodash/object/merge":58,"lodash/object/pick":59,"riot":64}],66:[function(require,module,exports){
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

},{"lodash/object/defaults":55,"lodash/object/pick":59,"riot":64}],67:[function(require,module,exports){
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

DomWrap.prototype.matches = function(selector) {
  return this.node.matches(selector)
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
      var n = new DomWrap(ev.target),
        r = n.matches(selector) ? n : n.parent(selector)
      if (r) { callback(r, ev) }
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

},{"lodash/lang/isFunction":48}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
var urlregex = /youtube.com.+\?v=([a-zA-z0-9\-_]+)/i

exports.extractEmbed = function(url) {
  var match = urlregex.exec(url)

  if (match && match.length) {
    return {type: 'youtube', url: url, videoId: match[1]}
  } else {
    return {type: 'unknown', url: url}
  }
}

},{}],70:[function(require,module,exports){
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

},{"./app/user":66,"./modules/main/main":76,"./modules/message/message":78,"./modules/navigation/navigation":80,"riot":64}],71:[function(require,module,exports){
var _ = {escape: require("lodash.escape")};
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<main class="main app-front" role="main"><img class="responsive-width" src="/assets/music.jpg"><div class="front-copy"><h1>A micro Blog for your favorite Music!</h1><p>Share your favorite music and videos with your friends.<br>With MusiFavs you can embed content from YouTube, SoundCloud, and more, in a single place!</p><h2>Latest Posts</h2><ul class="post-list latest-posts"></ul><h2>Latest Favorited</h2><ul class="post-list latest-favs"></ul></div></main>';
}
return __p;
};

},{"lodash.escape":1}],72:[function(require,module,exports){
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

},{"../../app/post":65,"../../lib/domWrap":67,"./front.html":71,"./post-items.html":73}],73:[function(require,module,exports){
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

},{"lodash.escape":1}],74:[function(require,module,exports){
var _ = {escape: require("lodash.escape")};
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<main class="main" role="main"><div class="front-copy"><h1>Log In</h1><p>In order to interact with MusiFavs! you\'ll need to log in first.</p><p>Please select one of the services below to log in:</p><ul class="login-links fa-ul fa-2x"><li><i class="fa-li fa fa-google-plus-square"></i> <a href="#" id="google-login">Google</a></li><li><i class="fa-li fa fa-twitter-square"></i> <a href="#" id="twitter-login">Twitter</a></li><li><i class="fa-li fa fa-facebook-square"></i> <a href="#" id="facebook-login">Facebook</a> <small>(Sorry, unavailable at the moment)</small></li></ul></div></main>';
}
return __p;
};

},{"lodash.escape":1}],75:[function(require,module,exports){
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

},{"../../app/user":66,"../../lib/domWrap":67,"./login.html":74}],76:[function(require,module,exports){
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
    user.update()
    window.location.hash = '' // "redirect" home.
    m.message('Thank you! You have been logged in.')
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

},{"../../app/user":66,"../front/front":72,"../login/login":75,"../user/user":87,"riot":64}],77:[function(require,module,exports){
var _ = {escape: require("lodash.escape")};
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<span class="app-message-text"></span><div class="app-message-dismiss"><a href="#" class="app-message-dismiss">Dismiss</a></div>';
}
return __p;
};

},{"lodash.escape":1}],78:[function(require,module,exports){
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

},{"../../lib/domWrap":67,"./message.html":77}],79:[function(require,module,exports){
var _ = {escape: require("lodash.escape")};
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<nav class="navigation"><ul class="nav-actions" role="navigation"><li><a id="nav-newpost" href="#">New Post</a></li><li><a href="#me/posts">My Posts</a></li><li><a href="#me/favorites">My Favorites</a></li><li><a id="nav-logout" href="#me/logout">Log Out</a></li></ul></nav>';
}
return __p;
};

},{"lodash.escape":1}],80:[function(require,module,exports){
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

},{"../../app/user":66,"../../lib/domWrap":67,"./navigation.html":79,"riot":64}],81:[function(require,module,exports){
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

},{"lodash.escape":1}],82:[function(require,module,exports){
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

},{"../../app/post":65,"../../lib/domWrap":67,"./form.html":81,"lodash/object/merge":58,"lodash/object/values":60}],83:[function(require,module,exports){
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

},{"lodash.escape":1}],84:[function(require,module,exports){
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

},{"../../app/user":66,"../../lib/domWrap":67,"./show.html":83,"lodash/object/merge":58}],85:[function(require,module,exports){
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

},{"lodash.escape":1}],86:[function(require,module,exports){
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

},{"lodash.escape":1}],87:[function(require,module,exports){
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

  var u = this

  u.mods = {} // store PostShow and PostForm modules.

  u.action = options.action
  u.uid = options.uid
  u.firebasepath = 'user_' + u.action + '/' + u.uid

  var r = $(node).html(template(u))

  u.nodes = {
    root      : r,
    newpost   : $(node, '.app-new-post'),
    placehold : $(node, '.app-post-placeholder'),
    posts     : $(node, '.app-posts'),
    prof      : $(node, '.profile')
  }

  u.userDidLookup = function(uid, user) {
    u.user = user
    u.redrawProfile()
    Post.retrieve(u.firebasepath)
    u.parent.trigger('module:user:did:lookup', uid, user)
  }

  u.userFailedLookup = function (uid) {
    u.parent.trigger('module:user:failed:lookup', uid)
  }

  u.postsDidRetrieve = function(firebasepath, post){
    var m = u.mods[post.key]
    if (m) { u.showmod(m) } else { u.addPost(post) }
  }

  u.postsDidUpdate = function(post){
    var m = u.mods[post.key]
    if (m) { u.showmod(m) }
  }

  var actionMod = function(target) {
    var key = target.parent('.post-actions').data('post-key')
    return u.mods[key]
  }

  r.on('click', '.fav', function(target) {
    var mod = actionMod(target)
    Post.toggleFav(mod.post, User.current.uid)
  })

  r.on('click', '.edit', function(target) {
    u.editPost(actionMod(target))
  })

  r.on('click', '.remove', function(target) {
    u.removePost(actionMod(target))
  })

  r.on('click', '.undo', function(target) {
    var mod = actionMod(target)
    if (mod.post.stored) {
      u.showmod(mod)
    } else {
      u.hideNewPost()
    }
  })

  r.on('click', '.save', function(target) {
    var mod = actionMod(target)
    mod.updatePost()

    if (!mod.isValid()) {
      // do nothing, the form will show an error message.
    } else if (mod.post.stored) {
      Post.update(mod.post)
    } else {
      Post.persist(mod.post)
      u.hideNewPost()
    }
  })

  User.on('store:users:failed:lookup' , u.userFailedLookup)
  User.on('store:users:did:lookup'    , u.userDidLookup)
  Post.on('store:posts:did:retrieve'  , u.postsDidRetrieve)
  Post.on('store:posts:did:update'    , u.postsDidUpdate)
  Post.on('store:posts:did:togglefav' , u.postsDidUpdate)

  User.lookup(u.uid)
}

UserMod.prototype.unload = function() {
  var u = this

  u.nodes.root.off().html('') // unregister all event handlers.

  User.off('store:users:failed:lookup' , u.userFailedLookup)
  User.off('store:users:did:lookup'    , u.userDidLookup)
  Post.off('store:posts:did:retrieve'  , u.postsDidRetrieve)
  Post.off('store:posts:did:update'    , u.postsDidUpdate)
  Post.off('store:posts:did:togglefav' , u.postsDidUpdate)

  Post.stopRetrieve(u.firebasepath)
}

UserMod.prototype.updatePlaceholder = function() {
  var modkeys = Object.keys(this.mods), p = this.nodes.placehold

  if (modkeys.length > 0 || this.mods['new']) {
    p.addClass('app-hidden')
  } else {
    p.removeClass('app-hidden')
  }
}

UserMod.prototype.redrawProfile = function() {
  this.nodes.prof.html(proftpl(this))
}

UserMod.prototype.hideNewPost = function() {
  var u = this, m = u.mods.new, n = u.nodes.newpost
  if (m) {
    m.unload()
    n.html('')
    delete u.mods['new']
  }
  u.updatePlaceholder()
}

UserMod.prototype.showNewPost = function() {
  var u = this, el, post
  if (!u.mods.new) {
    el = document.createElement('div')
    post = new Post({uid : u.uid, userName : u.user.displayName})
    u.mods['new'] = new PostForm(u, el, {post : post})
    u.nodes.newpost.append(el)
  }
  u.updatePlaceholder()
}

UserMod.prototype.editPost = function(mod) {
  var u = this, el = mod.nodes.root[0]
  mod.unload()
  u.mods[mod.post.key] = new PostForm(u, el, {post : mod.post})
}

UserMod.prototype.addPost = function(post) {
  var u = this, el = document.createElement('div'),
    pmod = new PostShow(u, el, {post : post})
  u.mods[post.key] = pmod
  u.nodes.posts.prepend(pmod.nodes.root[0])
  u.updatePlaceholder()
}

// Show a post that was previously being edited, or update it if the data changed.
UserMod.prototype.showmod = function(mod) {
  var u = this
  if (mod instanceof PostForm) {
    mod.unload()
    var pmod = new PostShow(u, mod.nodes.root[0], {post : mod.post})
    u.mods[mod.post.key] = pmod
  } else {
    mod.updateFav() // update just fav flag for now (could handle live udpates ITF)
  }
}

UserMod.prototype.removePost = function(mod) {
  var u = this
  mod.unload()
  Post.destroy(mod.post)
  u.nodes.posts.remove(mod.nodes.root[0])
  delete u.mods[mod.post.key]
  u.updatePlaceholder()
}

module.exports = UserMod

},{"../../app/post":65,"../../app/user":66,"../../lib/domWrap":67,"../post/form":82,"../post/show":84,"./profile.html":85,"./user.html":86}]},{},[70])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmVzY2FwZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZXNjYXBlL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2V0b3N0cmluZy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvY29sbGVjdGlvbi9yZWplY3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2FycmF5Q29weS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlFYWNoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9hcnJheUZpbHRlci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYXNzaWduRGVmYXVsdHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VBc3NpZ24uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VDYWxsYmFjay5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUNvcHkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VFYWNoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlRmlsdGVyLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlRmxhdHRlbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZvci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZvckluLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9yT3duLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlSXNFcXVhbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUlzRXF1YWxEZWVwLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlSXNGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUlzTWF0Y2guanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VNYXRjaGVzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlTWF0Y2hlc1Byb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlTWVyZ2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VNZXJnZURlZXAuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZVNldERhdGEuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZVZhbHVlcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmluZENhbGxiYWNrLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9jcmVhdGVBc3NpZ25lci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvZXF1YWxBcnJheXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2VxdWFsQnlUYWcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2VxdWFsT2JqZWN0cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvaXNCaW5kYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvaXNJbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvaXNJdGVyYXRlZUNhbGwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2lzTGVuZ3RoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9pc09iamVjdExpa2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2lzU3RyaWN0Q29tcGFyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvbWV0YU1hcC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvcGlja0J5QXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL3BpY2tCeUNhbGxiYWNrLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9zaGltSXNQbGFpbk9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvc2hpbUtleXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL3RvT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9sYW5nL2lzQXJndW1lbnRzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9sYW5nL2lzQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2xhbmcvaXNGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9pc05hdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9pc1BsYWluT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9sYW5nL2lzVHlwZWRBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy90b1BsYWluT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvZGVmYXVsdHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3Qva2V5c0luLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvbWVyZ2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL29iamVjdC9waWNrLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvdmFsdWVzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9zdHJpbmcvZXNjYXBlUmVnRXhwLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9zdXBwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC91dGlsaXR5L2lkZW50aXR5LmpzIiwibm9kZV9tb2R1bGVzL3Jpb3QvcmlvdC5qcyIsInNyYy9hcHAvcG9zdC5qcyIsInNyYy9hcHAvdXNlci5qcyIsInNyYy9saWIvZG9tV3JhcC5qcyIsInNyYy9saWIvZnJvbW5vdy5qcyIsInNyYy9saWIveW91dHViZS5qcyIsInNyYy9tYWluLmpzIiwic3JjL21vZHVsZXMvZnJvbnQvZnJvbnQuaHRtbCIsInNyYy9tb2R1bGVzL2Zyb250L2Zyb250LmpzIiwic3JjL21vZHVsZXMvZnJvbnQvcG9zdC1pdGVtcy5odG1sIiwic3JjL21vZHVsZXMvbG9naW4vbG9naW4uaHRtbCIsInNyYy9tb2R1bGVzL2xvZ2luL2xvZ2luLmpzIiwic3JjL21vZHVsZXMvbWFpbi9tYWluLmpzIiwic3JjL21vZHVsZXMvbWVzc2FnZS9tZXNzYWdlLmh0bWwiLCJzcmMvbW9kdWxlcy9tZXNzYWdlL21lc3NhZ2UuanMiLCJzcmMvbW9kdWxlcy9uYXZpZ2F0aW9uL25hdmlnYXRpb24uaHRtbCIsInNyYy9tb2R1bGVzL25hdmlnYXRpb24vbmF2aWdhdGlvbi5qcyIsInNyYy9tb2R1bGVzL3Bvc3QvZm9ybS5odG1sIiwic3JjL21vZHVsZXMvcG9zdC9mb3JtLmpzIiwic3JjL21vZHVsZXMvcG9zdC9zaG93Lmh0bWwiLCJzcmMvbW9kdWxlcy9wb3N0L3Nob3cuanMiLCJzcmMvbW9kdWxlcy91c2VyL3Byb2ZpbGUuaHRtbCIsInNyYy9tb2R1bGVzL3VzZXIvdXNlci5odG1sIiwic3JjL21vZHVsZXMvdXNlci91c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzMyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG52YXIgYmFzZVRvU3RyaW5nID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNldG9zdHJpbmcnKTtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggSFRNTCBlbnRpdGllcyBhbmQgSFRNTCBjaGFyYWN0ZXJzLiAqL1xudmFyIHJlVW5lc2NhcGVkSHRtbCA9IC9bJjw+XCInYF0vZyxcbiAgICByZUhhc1VuZXNjYXBlZEh0bWwgPSBSZWdFeHAocmVVbmVzY2FwZWRIdG1sLnNvdXJjZSk7XG5cbi8qKiBVc2VkIHRvIG1hcCBjaGFyYWN0ZXJzIHRvIEhUTUwgZW50aXRpZXMuICovXG52YXIgaHRtbEVzY2FwZXMgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmIzM5OycsXG4gICdgJzogJyYjOTY7J1xufTtcblxuLyoqXG4gKiBVc2VkIGJ5IGBfLmVzY2FwZWAgdG8gY29udmVydCBjaGFyYWN0ZXJzIHRvIEhUTUwgZW50aXRpZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaHIgVGhlIG1hdGNoZWQgY2hhcmFjdGVyIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgY2hhcmFjdGVyLlxuICovXG5mdW5jdGlvbiBlc2NhcGVIdG1sQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGh0bWxFc2NhcGVzW2Nocl07XG59XG5cbi8qKlxuICogQ29udmVydHMgdGhlIGNoYXJhY3RlcnMgXCImXCIsIFwiPFwiLCBcIj5cIiwgJ1wiJywgXCInXCIsIGFuZCAnYCcsIGluIGBzdHJpbmdgIHRvXG4gKiB0aGVpciBjb3JyZXNwb25kaW5nIEhUTUwgZW50aXRpZXMuXG4gKlxuICogKipOb3RlOioqIE5vIG90aGVyIGNoYXJhY3RlcnMgYXJlIGVzY2FwZWQuIFRvIGVzY2FwZSBhZGRpdGlvbmFsIGNoYXJhY3RlcnNcbiAqIHVzZSBhIHRoaXJkLXBhcnR5IGxpYnJhcnkgbGlrZSBbX2hlX10oaHR0cHM6Ly9tdGhzLmJlL2hlKS5cbiAqXG4gKiBUaG91Z2ggdGhlIFwiPlwiIGNoYXJhY3RlciBpcyBlc2NhcGVkIGZvciBzeW1tZXRyeSwgY2hhcmFjdGVycyBsaWtlXG4gKiBcIj5cIiBhbmQgXCIvXCIgZG9uJ3QgcmVxdWlyZSBlc2NhcGluZyBpbiBIVE1MIGFuZCBoYXZlIG5vIHNwZWNpYWwgbWVhbmluZ1xuICogdW5sZXNzIHRoZXkncmUgcGFydCBvZiBhIHRhZyBvciB1bnF1b3RlZCBhdHRyaWJ1dGUgdmFsdWUuXG4gKiBTZWUgW01hdGhpYXMgQnluZW5zJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2FtYmlndW91cy1hbXBlcnNhbmRzKVxuICogKHVuZGVyIFwic2VtaS1yZWxhdGVkIGZ1biBmYWN0XCIpIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQmFja3RpY2tzIGFyZSBlc2NhcGVkIGJlY2F1c2UgaW4gSW50ZXJuZXQgRXhwbG9yZXIgPCA5LCB0aGV5IGNhbiBicmVhayBvdXRcbiAqIG9mIGF0dHJpYnV0ZSB2YWx1ZXMgb3IgSFRNTCBjb21tZW50cy4gU2VlIFsjMTAyXShodHRwczovL2h0bWw1c2VjLm9yZy8jMTAyKSxcbiAqIFsjMTA4XShodHRwczovL2h0bWw1c2VjLm9yZy8jMTA4KSwgYW5kIFsjMTMzXShodHRwczovL2h0bWw1c2VjLm9yZy8jMTMzKSBvZlxuICogdGhlIFtIVE1MNSBTZWN1cml0eSBDaGVhdHNoZWV0XShodHRwczovL2h0bWw1c2VjLm9yZy8pIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogV2hlbiB3b3JraW5nIHdpdGggSFRNTCB5b3Ugc2hvdWxkIGFsd2F5cyBxdW90ZSBhdHRyaWJ1dGUgdmFsdWVzIHRvIHJlZHVjZVxuICogWFNTIHZlY3RvcnMuIFNlZSBbUnlhbiBHcm92ZSdzIGFydGljbGVdKGh0dHA6Ly93b25rby5jb20vcG9zdC9odG1sLWVzY2FwaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlKCdmcmVkLCBiYXJuZXksICYgcGViYmxlcycpO1xuICogLy8gPT4gJ2ZyZWQsIGJhcm5leSwgJmFtcDsgcGViYmxlcydcbiAqL1xuZnVuY3Rpb24gZXNjYXBlKHN0cmluZykge1xuICAvLyBSZXNldCBgbGFzdEluZGV4YCBiZWNhdXNlIGluIElFIDwgOSBgU3RyaW5nI3JlcGxhY2VgIGRvZXMgbm90LlxuICBzdHJpbmcgPSBiYXNlVG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNVbmVzY2FwZWRIdG1sLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlVW5lc2NhcGVkSHRtbCwgZXNjYXBlSHRtbENoYXIpXG4gICAgOiBzdHJpbmc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXNjYXBlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggMy4wLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE1IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjcuMCA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTUgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0IGlzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVRvU3RyaW5nO1xuIiwidmFyIGFycmF5RmlsdGVyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYXJyYXlGaWx0ZXInKSxcbiAgICBiYXNlQ2FsbGJhY2sgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlQ2FsbGJhY2snKSxcbiAgICBiYXNlRmlsdGVyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUZpbHRlcicpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKTtcblxuLyoqXG4gKiBUaGUgb3Bwb3NpdGUgb2YgYF8uZmlsdGVyYDsgdGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZWxlbWVudHMgb2YgYGNvbGxlY3Rpb25gXG4gKiB0aGF0IGBwcmVkaWNhdGVgIGRvZXMgKipub3QqKiByZXR1cm4gdHJ1dGh5IGZvci5cbiAqXG4gKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcHJvdmlkZWQgZm9yIGBwcmVkaWNhdGVgIHRoZSBjcmVhdGVkIGBfLnByb3BlcnR5YFxuICogc3R5bGUgY2FsbGJhY2sgcmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gKlxuICogSWYgYSB2YWx1ZSBpcyBhbHNvIHByb3ZpZGVkIGZvciBgdGhpc0FyZ2AgdGhlIGNyZWF0ZWQgYF8ubWF0Y2hlc1Byb3BlcnR5YFxuICogc3R5bGUgY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSBhIG1hdGNoaW5nIHByb3BlcnR5XG4gKiB2YWx1ZSwgZWxzZSBgZmFsc2VgLlxuICpcbiAqIElmIGFuIG9iamVjdCBpcyBwcm92aWRlZCBmb3IgYHByZWRpY2F0ZWAgdGhlIGNyZWF0ZWQgYF8ubWF0Y2hlc2Agc3R5bGVcbiAqIGNhbGxiYWNrIHJldHVybnMgYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BlcnRpZXMgb2YgdGhlIGdpdmVuXG4gKiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fHN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxzdHJpbmd9IFtwcmVkaWNhdGU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWRcbiAqICBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBwcmVkaWNhdGVgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmlsdGVyZWQgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ucmVqZWN0KFsxLCAyLCAzLCA0XSwgZnVuY3Rpb24obikge1xuICogICByZXR1cm4gbiAlIDIgPT0gMDtcbiAqIH0pO1xuICogLy8gPT4gWzEsIDNdXG4gKlxuICogdmFyIHVzZXJzID0gW1xuICogICB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiwgJ2FjdGl2ZSc6IGZhbHNlIH0sXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgJ2FnZSc6IDQwLCAnYWN0aXZlJzogdHJ1ZSB9XG4gKiBdO1xuICpcbiAqIC8vIHVzaW5nIHRoZSBgXy5tYXRjaGVzYCBjYWxsYmFjayBzaG9ydGhhbmRcbiAqIF8ucGx1Y2soXy5yZWplY3QodXNlcnMsIHsgJ2FnZSc6IDQwLCAnYWN0aXZlJzogdHJ1ZSB9KSwgJ3VzZXInKTtcbiAqIC8vID0+IFsnYmFybmV5J11cbiAqXG4gKiAvLyB1c2luZyB0aGUgYF8ubWF0Y2hlc1Byb3BlcnR5YCBjYWxsYmFjayBzaG9ydGhhbmRcbiAqIF8ucGx1Y2soXy5yZWplY3QodXNlcnMsICdhY3RpdmUnLCBmYWxzZSksICd1c2VyJyk7XG4gKiAvLyA9PiBbJ2ZyZWQnXVxuICpcbiAqIC8vIHVzaW5nIHRoZSBgXy5wcm9wZXJ0eWAgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLnBsdWNrKF8ucmVqZWN0KHVzZXJzLCAnYWN0aXZlJyksICd1c2VyJyk7XG4gKiAvLyA9PiBbJ2Jhcm5leSddXG4gKi9cbmZ1bmN0aW9uIHJlamVjdChjb2xsZWN0aW9uLCBwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgdmFyIGZ1bmMgPSBpc0FycmF5KGNvbGxlY3Rpb24pID8gYXJyYXlGaWx0ZXIgOiBiYXNlRmlsdGVyO1xuICBwcmVkaWNhdGUgPSBiYXNlQ2FsbGJhY2socHJlZGljYXRlLCB0aGlzQXJnLCAzKTtcbiAgcmV0dXJuIGZ1bmMoY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgcmV0dXJuICFwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVqZWN0O1xuIiwiLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBgc291cmNlYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUNvcHkoc291cmNlLCBhcnJheSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlDb3B5O1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIG9yIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUVhY2goYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlFYWNoO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZmlsdGVyYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgb3IgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZpbHRlcmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheUZpbHRlcihhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzSW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJlc3VsdFsrK3Jlc0luZGV4XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5RmlsdGVyO1xuIiwiLyoqXG4gKiBVc2VkIGJ5IGBfLmRlZmF1bHRzYCB0byBjdXN0b21pemUgaXRzIGBfLmFzc2lnbmAgdXNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IG9iamVjdFZhbHVlIFRoZSBkZXN0aW5hdGlvbiBvYmplY3QgcHJvcGVydHkgdmFsdWUuXG4gKiBAcGFyYW0geyp9IHNvdXJjZVZhbHVlIFRoZSBzb3VyY2Ugb2JqZWN0IHByb3BlcnR5IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHZhbHVlIHRvIGFzc2lnbiB0byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICovXG5mdW5jdGlvbiBhc3NpZ25EZWZhdWx0cyhvYmplY3RWYWx1ZSwgc291cmNlVmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3RWYWx1ZSA9PSAndW5kZWZpbmVkJyA/IHNvdXJjZVZhbHVlIDogb2JqZWN0VmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduRGVmYXVsdHM7XG4iLCJ2YXIgYmFzZUNvcHkgPSByZXF1aXJlKCcuL2Jhc2VDb3B5JyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uYXNzaWduYCB3aXRob3V0IHN1cHBvcnQgZm9yIGFyZ3VtZW50IGp1Z2dsaW5nLFxuICogbXVsdGlwbGUgc291cmNlcywgYW5kIGB0aGlzYCBiaW5kaW5nIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25pbmcgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlQXNzaWduKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyKSB7XG4gIHZhciBwcm9wcyA9IGtleXMoc291cmNlKTtcbiAgaWYgKCFjdXN0b21pemVyKSB7XG4gICAgcmV0dXJuIGJhc2VDb3B5KHNvdXJjZSwgb2JqZWN0LCBwcm9wcyk7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdLFxuICAgICAgICB2YWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICByZXN1bHQgPSBjdXN0b21pemVyKHZhbHVlLCBzb3VyY2Vba2V5XSwga2V5LCBvYmplY3QsIHNvdXJjZSk7XG5cbiAgICBpZiAoKHJlc3VsdCA9PT0gcmVzdWx0ID8gcmVzdWx0ICE9PSB2YWx1ZSA6IHZhbHVlID09PSB2YWx1ZSkgfHxcbiAgICAgICAgKHR5cGVvZiB2YWx1ZSA9PSAndW5kZWZpbmVkJyAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgICAgb2JqZWN0W2tleV0gPSByZXN1bHQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUFzc2lnbjtcbiIsInZhciBiYXNlTWF0Y2hlcyA9IHJlcXVpcmUoJy4vYmFzZU1hdGNoZXMnKSxcbiAgICBiYXNlTWF0Y2hlc1Byb3BlcnR5ID0gcmVxdWlyZSgnLi9iYXNlTWF0Y2hlc1Byb3BlcnR5JyksXG4gICAgYmFzZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9iYXNlUHJvcGVydHknKSxcbiAgICBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCcuL2JpbmRDYWxsYmFjaycpLFxuICAgIGlkZW50aXR5ID0gcmVxdWlyZSgnLi4vdXRpbGl0eS9pZGVudGl0eScpLFxuICAgIGlzQmluZGFibGUgPSByZXF1aXJlKCcuL2lzQmluZGFibGUnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jYWxsYmFja2Agd2hpY2ggc3VwcG9ydHMgc3BlY2lmeWluZyB0aGVcbiAqIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gW2Z1bmM9Xy5pZGVudGl0eV0gVGhlIHZhbHVlIHRvIGNvbnZlcnQgdG8gYSBjYWxsYmFjay5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyZ0NvdW50XSBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FsbGJhY2suXG4gKi9cbmZ1bmN0aW9uIGJhc2VDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBmdW5jO1xuICBpZiAodHlwZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgdGhpc0FyZyAhPSAndW5kZWZpbmVkJyAmJiBpc0JpbmRhYmxlKGZ1bmMpKVxuICAgICAgPyBiaW5kQ2FsbGJhY2soZnVuYywgdGhpc0FyZywgYXJnQ291bnQpXG4gICAgICA6IGZ1bmM7XG4gIH1cbiAgaWYgKGZ1bmMgPT0gbnVsbCkge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodHlwZSA9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBiYXNlTWF0Y2hlcyhmdW5jKTtcbiAgfVxuICByZXR1cm4gdHlwZW9mIHRoaXNBcmcgPT0gJ3VuZGVmaW5lZCdcbiAgICA/IGJhc2VQcm9wZXJ0eShmdW5jICsgJycpXG4gICAgOiBiYXNlTWF0Y2hlc1Byb3BlcnR5KGZ1bmMgKyAnJywgdGhpc0FyZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUNhbGxiYWNrO1xuIiwiLyoqXG4gKiBDb3BpZXMgdGhlIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBuYW1lcyB0byBjb3B5LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUNvcHkoc291cmNlLCBvYmplY3QsIHByb3BzKSB7XG4gIGlmICghcHJvcHMpIHtcbiAgICBwcm9wcyA9IG9iamVjdDtcbiAgICBvYmplY3QgPSB7fTtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgb2JqZWN0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDb3B5O1xuIiwidmFyIGJhc2VGb3JPd24gPSByZXF1aXJlKCcuL2Jhc2VGb3JPd24nKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICB0b09iamVjdCA9IHJlcXVpcmUoJy4vdG9PYmplY3QnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JFYWNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fHN0cmluZ30gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gIHZhciBsZW5ndGggPSBjb2xsZWN0aW9uID8gY29sbGVjdGlvbi5sZW5ndGggOiAwO1xuICBpZiAoIWlzTGVuZ3RoKGxlbmd0aCkpIHtcbiAgICByZXR1cm4gYmFzZUZvck93bihjb2xsZWN0aW9uLCBpdGVyYXRlZSk7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpdGVyYWJsZSA9IHRvT2JqZWN0KGNvbGxlY3Rpb24pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2luZGV4XSwgaW5kZXgsIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29sbGVjdGlvbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRWFjaDtcbiIsInZhciBiYXNlRWFjaCA9IHJlcXVpcmUoJy4vYmFzZUVhY2gnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5maWx0ZXJgIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgb3IgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fHN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZpbHRlcmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlRmlsdGVyKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSkge1xuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZpbHRlcjtcbiIsInZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mbGF0dGVuYCB3aXRoIGFkZGVkIHN1cHBvcnQgZm9yIHJlc3RyaWN0aW5nXG4gKiBmbGF0dGVuaW5nIGFuZCBzcGVjaWZ5aW5nIHRoZSBzdGFydCBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGZsYXR0ZW4uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGZsYXR0ZW4uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1N0cmljdF0gUmVzdHJpY3QgZmxhdHRlbmluZyB0byBhcnJheXMgYW5kIGBhcmd1bWVudHNgIG9iamVjdHMuXG4gKiBAcGFyYW0ge251bWJlcn0gW2Zyb21JbmRleD0wXSBUaGUgaW5kZXggdG8gc3RhcnQgZnJvbS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZsYXR0ZW5lZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZUZsYXR0ZW4oYXJyYXksIGlzRGVlcCwgaXNTdHJpY3QsIGZyb21JbmRleCkge1xuICB2YXIgaW5kZXggPSAoZnJvbUluZGV4IHx8IDApIC0gMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc0luZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcblxuICAgIGlmIChpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgKGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSkpIHtcbiAgICAgIGlmIChpc0RlZXApIHtcbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgZmxhdHRlbiBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgICAgdmFsdWUgPSBiYXNlRmxhdHRlbih2YWx1ZSwgaXNEZWVwLCBpc1N0cmljdCk7XG4gICAgICB9XG4gICAgICB2YXIgdmFsSW5kZXggPSAtMSxcbiAgICAgICAgICB2YWxMZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG5cbiAgICAgIHJlc3VsdC5sZW5ndGggKz0gdmFsTGVuZ3RoO1xuICAgICAgd2hpbGUgKCsrdmFsSW5kZXggPCB2YWxMZW5ndGgpIHtcbiAgICAgICAgcmVzdWx0WysrcmVzSW5kZXhdID0gdmFsdWVbdmFsSW5kZXhdO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIWlzU3RyaWN0KSB7XG4gICAgICByZXN1bHRbKytyZXNJbmRleF0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRmxhdHRlbjtcbiIsInZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vdG9PYmplY3QnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvckluYCBhbmQgYGJhc2VGb3JPd25gIHdoaWNoIGl0ZXJhdGVzXG4gKiBvdmVyIGBvYmplY3RgIHByb3BlcnRpZXMgcmV0dXJuZWQgYnkgYGtleXNGdW5jYCBpbnZva2luZyBgaXRlcmF0ZWVgIGZvclxuICogZWFjaCBwcm9wZXJ0eS4gSXRlcmF0b3IgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5XG4gKiByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGl0ZXJhYmxlID0gdG9PYmplY3Qob2JqZWN0KSxcbiAgICAgIHByb3BzID0ga2V5c0Z1bmMob2JqZWN0KSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvcjtcbiIsInZhciBiYXNlRm9yID0gcmVxdWlyZSgnLi9iYXNlRm9yJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvckluYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9ySW4ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzSW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3JJbjtcbiIsInZhciBiYXNlRm9yID0gcmVxdWlyZSgnLi9iYXNlRm9yJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIGFuZCBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlRm9yT3duKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZvck93bjtcbiIsInZhciBiYXNlSXNFcXVhbERlZXAgPSByZXF1aXJlKCcuL2Jhc2VJc0VxdWFsRGVlcCcpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRXF1YWxgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYHRoaXNgIGJpbmRpbmdcbiAqIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzV2hlcmVdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgY3VzdG9taXplciwgaXNXaGVyZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3IgaWRlbnRpY2FsIHZhbHVlcy5cbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIC8vIFRyZWF0IGArMGAgdnMuIGAtMGAgYXMgbm90IGVxdWFsLlxuICAgIHJldHVybiB2YWx1ZSAhPT0gMCB8fCAoMSAvIHZhbHVlID09IDEgLyBvdGhlcik7XG4gIH1cbiAgdmFyIHZhbFR5cGUgPSB0eXBlb2YgdmFsdWUsXG4gICAgICBvdGhUeXBlID0gdHlwZW9mIG90aGVyO1xuXG4gIC8vIEV4aXQgZWFybHkgZm9yIHVubGlrZSBwcmltaXRpdmUgdmFsdWVzLlxuICBpZiAoKHZhbFR5cGUgIT0gJ2Z1bmN0aW9uJyAmJiB2YWxUeXBlICE9ICdvYmplY3QnICYmIG90aFR5cGUgIT0gJ2Z1bmN0aW9uJyAmJiBvdGhUeXBlICE9ICdvYmplY3QnKSB8fFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fCBvdGhlciA9PSBudWxsKSB7XG4gICAgLy8gUmV0dXJuIGBmYWxzZWAgdW5sZXNzIGJvdGggdmFsdWVzIGFyZSBgTmFOYC5cbiAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gYmFzZUlzRXF1YWxEZWVwKHZhbHVlLCBvdGhlciwgYmFzZUlzRXF1YWwsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNFcXVhbDtcbiIsInZhciBlcXVhbEFycmF5cyA9IHJlcXVpcmUoJy4vZXF1YWxBcnJheXMnKSxcbiAgICBlcXVhbEJ5VGFnID0gcmVxdWlyZSgnLi9lcXVhbEJ5VGFnJyksXG4gICAgZXF1YWxPYmplY3RzID0gcmVxdWlyZSgnLi9lcXVhbE9iamVjdHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1R5cGVkQXJyYXknKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgY29tcGFyaXNvbnMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgY29tcGFyZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyBvYmplY3RzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNXaGVyZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0I9W11dIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsRGVlcChvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICBvYmpUYWcgPSBhcnJheVRhZyxcbiAgICAgIG90aFRhZyA9IGFycmF5VGFnO1xuXG4gIGlmICghb2JqSXNBcnIpIHtcbiAgICBvYmpUYWcgPSBvYmpUb1N0cmluZy5jYWxsKG9iamVjdCk7XG4gICAgaWYgKG9ialRhZyA9PSBhcmdzVGFnKSB7XG4gICAgICBvYmpUYWcgPSBvYmplY3RUYWc7XG4gICAgfSBlbHNlIGlmIChvYmpUYWcgIT0gb2JqZWN0VGFnKSB7XG4gICAgICBvYmpJc0FyciA9IGlzVHlwZWRBcnJheShvYmplY3QpO1xuICAgIH1cbiAgfVxuICBpZiAoIW90aElzQXJyKSB7XG4gICAgb3RoVGFnID0gb2JqVG9TdHJpbmcuY2FsbChvdGhlcik7XG4gICAgaWYgKG90aFRhZyA9PSBhcmdzVGFnKSB7XG4gICAgICBvdGhUYWcgPSBvYmplY3RUYWc7XG4gICAgfSBlbHNlIGlmIChvdGhUYWcgIT0gb2JqZWN0VGFnKSB7XG4gICAgICBvdGhJc0FyciA9IGlzVHlwZWRBcnJheShvdGhlcik7XG4gICAgfVxuICB9XG4gIHZhciBvYmpJc09iaiA9IG9ialRhZyA9PSBvYmplY3RUYWcsXG4gICAgICBvdGhJc09iaiA9IG90aFRhZyA9PSBvYmplY3RUYWcsXG4gICAgICBpc1NhbWVUYWcgPSBvYmpUYWcgPT0gb3RoVGFnO1xuXG4gIGlmIChpc1NhbWVUYWcgJiYgIShvYmpJc0FyciB8fCBvYmpJc09iaikpIHtcbiAgICByZXR1cm4gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCBvYmpUYWcpO1xuICB9XG4gIHZhciB2YWxXcmFwcGVkID0gb2JqSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdfX3dyYXBwZWRfXycpLFxuICAgICAgb3RoV3JhcHBlZCA9IG90aElzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsICdfX3dyYXBwZWRfXycpO1xuXG4gIGlmICh2YWxXcmFwcGVkIHx8IG90aFdyYXBwZWQpIHtcbiAgICByZXR1cm4gZXF1YWxGdW5jKHZhbFdyYXBwZWQgPyBvYmplY3QudmFsdWUoKSA6IG9iamVjdCwgb3RoV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlciwgY3VzdG9taXplciwgaXNXaGVyZSwgc3RhY2tBLCBzdGFja0IpO1xuICB9XG4gIGlmICghaXNTYW1lVGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gZGV0ZWN0aW5nIGNpcmN1bGFyIHJlZmVyZW5jZXMgc2VlIGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jSk8uXG4gIHN0YWNrQSB8fCAoc3RhY2tBID0gW10pO1xuICBzdGFja0IgfHwgKHN0YWNrQiA9IFtdKTtcblxuICB2YXIgbGVuZ3RoID0gc3RhY2tBLmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKHN0YWNrQVtsZW5ndGhdID09IG9iamVjdCkge1xuICAgICAgcmV0dXJuIHN0YWNrQltsZW5ndGhdID09IG90aGVyO1xuICAgIH1cbiAgfVxuICAvLyBBZGQgYG9iamVjdGAgYW5kIGBvdGhlcmAgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICBzdGFja0EucHVzaChvYmplY3QpO1xuICBzdGFja0IucHVzaChvdGhlcik7XG5cbiAgdmFyIHJlc3VsdCA9IChvYmpJc0FyciA/IGVxdWFsQXJyYXlzIDogZXF1YWxPYmplY3RzKShvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcblxuICBzdGFja0EucG9wKCk7XG4gIHN0YWNrQi5wb3AoKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0VxdWFsRGVlcDtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNGdW5jdGlvbmAgd2l0aG91dCBzdXBwb3J0IGZvciBlbnZpcm9ubWVudHNcbiAqIHdpdGggaW5jb3JyZWN0IGB0eXBlb2ZgIHJlc3VsdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBDaGFrcmEgSklUIGJ1ZyBpbiBjb21wYXRpYmlsaXR5IG1vZGVzIG9mIElFIDExLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy91bmRlcnNjb3JlL2lzc3Vlcy8xNjIxIGZvciBtb3JlIGRldGFpbHMuXG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJyB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNGdW5jdGlvbjtcbiIsInZhciBiYXNlSXNFcXVhbCA9IHJlcXVpcmUoJy4vYmFzZUlzRXF1YWwnKTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNNYXRjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBvciBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgc291cmNlIHByb3BlcnR5IG5hbWVzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSBzb3VyY2UgdmFsdWVzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtBcnJheX0gc3RyaWN0Q29tcGFyZUZsYWdzIFN0cmljdCBjb21wYXJpc29uIGZsYWdzIGZvciBzb3VyY2UgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYG9iamVjdGAgaXMgYSBtYXRjaCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNNYXRjaChvYmplY3QsIHByb3BzLCB2YWx1ZXMsIHN0cmljdENvbXBhcmVGbGFncywgY3VzdG9taXplcikge1xuICB2YXIgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gIWxlbmd0aDtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIG5vQ3VzdG9taXplciA9ICFjdXN0b21pemVyO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKChub0N1c3RvbWl6ZXIgJiYgc3RyaWN0Q29tcGFyZUZsYWdzW2luZGV4XSlcbiAgICAgICAgICA/IHZhbHVlc1tpbmRleF0gIT09IG9iamVjdFtwcm9wc1tpbmRleF1dXG4gICAgICAgICAgOiAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BzW2luZGV4XSlcbiAgICAgICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGluZGV4ID0gLTE7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBpZiAobm9DdXN0b21pemVyICYmIHN0cmljdENvbXBhcmVGbGFnc1tpbmRleF0pIHtcbiAgICAgIHZhciByZXN1bHQgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgICAgc3JjVmFsdWUgPSB2YWx1ZXNbaW5kZXhdO1xuXG4gICAgICByZXN1bHQgPSBjdXN0b21pemVyID8gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUsIGtleSkgOiB1bmRlZmluZWQ7XG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXN1bHQgPSBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIGN1c3RvbWl6ZXIsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNNYXRjaDtcbiIsInZhciBiYXNlSXNNYXRjaCA9IHJlcXVpcmUoJy4vYmFzZUlzTWF0Y2gnKSxcbiAgICBpc1N0cmljdENvbXBhcmFibGUgPSByZXF1aXJlKCcuL2lzU3RyaWN0Q29tcGFyYWJsZScpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5cycpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzYCB3aGljaCBkb2VzIG5vdCBjbG9uZSBgc291cmNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBtYXRjaC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlcyhzb3VyY2UpIHtcbiAgdmFyIHByb3BzID0ga2V5cyhzb3VyY2UpLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIGlmIChsZW5ndGggPT0gMSkge1xuICAgIHZhciBrZXkgPSBwcm9wc1swXSxcbiAgICAgICAgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICAgIGlmIChpc1N0cmljdENvbXBhcmFibGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBvYmplY3Rba2V5XSA9PT0gdmFsdWUgJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuICB2YXIgdmFsdWVzID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgIHN0cmljdENvbXBhcmVGbGFncyA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgdmFsdWUgPSBzb3VyY2VbcHJvcHNbbGVuZ3RoXV07XG4gICAgdmFsdWVzW2xlbmd0aF0gPSB2YWx1ZTtcbiAgICBzdHJpY3RDb21wYXJlRmxhZ3NbbGVuZ3RoXSA9IGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBiYXNlSXNNYXRjaChvYmplY3QsIHByb3BzLCB2YWx1ZXMsIHN0cmljdENvbXBhcmVGbGFncyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1hdGNoZXM7XG4iLCJ2YXIgYmFzZUlzRXF1YWwgPSByZXF1aXJlKCcuL2Jhc2VJc0VxdWFsJyksXG4gICAgaXNTdHJpY3RDb21wYXJhYmxlID0gcmVxdWlyZSgnLi9pc1N0cmljdENvbXBhcmFibGUnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzUHJvcGVydHlgIHdoaWNoIGRvZXMgbm90IGNvZXJjZSBga2V5YFxuICogdG8gYSBzdHJpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlc1Byb3BlcnR5KGtleSwgdmFsdWUpIHtcbiAgaWYgKGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgb2JqZWN0W2tleV0gPT09IHZhbHVlO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBiYXNlSXNFcXVhbCh2YWx1ZSwgb2JqZWN0W2tleV0sIG51bGwsIHRydWUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VNYXRjaGVzUHJvcGVydHk7XG4iLCJ2YXIgYXJyYXlFYWNoID0gcmVxdWlyZSgnLi9hcnJheUVhY2gnKSxcbiAgICBiYXNlRm9yT3duID0gcmVxdWlyZSgnLi9iYXNlRm9yT3duJyksXG4gICAgYmFzZU1lcmdlRGVlcCA9IHJlcXVpcmUoJy4vYmFzZU1lcmdlRGVlcCcpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNUeXBlZEFycmF5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWVyZ2VgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXJndW1lbnQganVnZ2xpbmcsXG4gKiBtdWx0aXBsZSBzb3VyY2VzLCBhbmQgYHRoaXNgIGJpbmRpbmcgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdpbmcgcHJvcGVydGllcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0E9W11dIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBBc3NvY2lhdGVzIHZhbHVlcyB3aXRoIHNvdXJjZSBjb3VudGVycGFydHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgY3VzdG9taXplciwgc3RhY2tBLCBzdGFja0IpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICB2YXIgaXNTcmNBcnIgPSBpc0xlbmd0aChzb3VyY2UubGVuZ3RoKSAmJiAoaXNBcnJheShzb3VyY2UpIHx8IGlzVHlwZWRBcnJheShzb3VyY2UpKTtcbiAgKGlzU3JjQXJyID8gYXJyYXlFYWNoIDogYmFzZUZvck93bikoc291cmNlLCBmdW5jdGlvbihzcmNWYWx1ZSwga2V5LCBzb3VyY2UpIHtcbiAgICBpZiAoaXNPYmplY3RMaWtlKHNyY1ZhbHVlKSkge1xuICAgICAgc3RhY2tBIHx8IChzdGFja0EgPSBbXSk7XG4gICAgICBzdGFja0IgfHwgKHN0YWNrQiA9IFtdKTtcbiAgICAgIHJldHVybiBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIGJhc2VNZXJnZSwgY3VzdG9taXplciwgc3RhY2tBLCBzdGFja0IpO1xuICAgIH1cbiAgICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIodmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgaXNDb21tb24gPSB0eXBlb2YgcmVzdWx0ID09ICd1bmRlZmluZWQnO1xuXG4gICAgaWYgKGlzQ29tbW9uKSB7XG4gICAgICByZXN1bHQgPSBzcmNWYWx1ZTtcbiAgICB9XG4gICAgaWYgKChpc1NyY0FyciB8fCB0eXBlb2YgcmVzdWx0ICE9ICd1bmRlZmluZWQnKSAmJlxuICAgICAgICAoaXNDb21tb24gfHwgKHJlc3VsdCA9PT0gcmVzdWx0ID8gcmVzdWx0ICE9PSB2YWx1ZSA6IHZhbHVlID09PSB2YWx1ZSkpKSB7XG4gICAgICBvYmplY3Rba2V5XSA9IHJlc3VsdDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VNZXJnZTtcbiIsInZhciBhcnJheUNvcHkgPSByZXF1aXJlKCcuL2FycmF5Q29weScpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICBpc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1BsYWluT2JqZWN0JyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc1R5cGVkQXJyYXknKSxcbiAgICB0b1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy90b1BsYWluT2JqZWN0Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlTWVyZ2VgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgbWVyZ2VzIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIG1lcmdlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gbWVyZ2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXJnZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1lcmdlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdpbmcgcHJvcGVydGllcy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0E9W11dIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBBc3NvY2lhdGVzIHZhbHVlcyB3aXRoIHNvdXJjZSBjb3VudGVycGFydHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBtZXJnZUZ1bmMsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBsZW5ndGggPSBzdGFja0EubGVuZ3RoLFxuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoc3RhY2tBW2xlbmd0aF0gPT0gc3JjVmFsdWUpIHtcbiAgICAgIG9iamVjdFtrZXldID0gc3RhY2tCW2xlbmd0aF07XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIodmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKSA6IHVuZGVmaW5lZCxcbiAgICAgIGlzQ29tbW9uID0gdHlwZW9mIHJlc3VsdCA9PSAndW5kZWZpbmVkJztcblxuICBpZiAoaXNDb21tb24pIHtcbiAgICByZXN1bHQgPSBzcmNWYWx1ZTtcbiAgICBpZiAoaXNMZW5ndGgoc3JjVmFsdWUubGVuZ3RoKSAmJiAoaXNBcnJheShzcmNWYWx1ZSkgfHwgaXNUeXBlZEFycmF5KHNyY1ZhbHVlKSkpIHtcbiAgICAgIHJlc3VsdCA9IGlzQXJyYXkodmFsdWUpXG4gICAgICAgID8gdmFsdWVcbiAgICAgICAgOiAodmFsdWUgPyBhcnJheUNvcHkodmFsdWUpIDogW10pO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHNyY1ZhbHVlKSB8fCBpc0FyZ3VtZW50cyhzcmNWYWx1ZSkpIHtcbiAgICAgIHJlc3VsdCA9IGlzQXJndW1lbnRzKHZhbHVlKVxuICAgICAgICA/IHRvUGxhaW5PYmplY3QodmFsdWUpXG4gICAgICAgIDogKGlzUGxhaW5PYmplY3QodmFsdWUpID8gdmFsdWUgOiB7fSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLy8gQWRkIHRoZSBzb3VyY2UgdmFsdWUgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzIGFuZCBhc3NvY2lhdGVcbiAgLy8gaXQgd2l0aCBpdHMgbWVyZ2VkIHZhbHVlLlxuICBzdGFja0EucHVzaChzcmNWYWx1ZSk7XG4gIHN0YWNrQi5wdXNoKHJlc3VsdCk7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgbWVyZ2Ugb2JqZWN0cyBhbmQgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgb2JqZWN0W2tleV0gPSBtZXJnZUZ1bmMocmVzdWx0LCBzcmNWYWx1ZSwgY3VzdG9taXplciwgc3RhY2tBLCBzdGFja0IpO1xuICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gcmVzdWx0ID8gcmVzdWx0ICE9PSB2YWx1ZSA6IHZhbHVlID09PSB2YWx1ZSkge1xuICAgIG9iamVjdFtrZXldID0gcmVzdWx0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZU1lcmdlRGVlcDtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdoaWNoIGRvZXMgbm90IGNvZXJjZSBga2V5YCB0byBhIHN0cmluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVByb3BlcnR5O1xuIiwidmFyIGlkZW50aXR5ID0gcmVxdWlyZSgnLi4vdXRpbGl0eS9pZGVudGl0eScpLFxuICAgIG1ldGFNYXAgPSByZXF1aXJlKCcuL21ldGFNYXAnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgc2V0RGF0YWAgd2l0aG91dCBzdXBwb3J0IGZvciBob3QgbG9vcCBkZXRlY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFzc29jaWF0ZSBtZXRhZGF0YSB3aXRoLlxuICogQHBhcmFtIHsqfSBkYXRhIFRoZSBtZXRhZGF0YS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBgZnVuY2AuXG4gKi9cbnZhciBiYXNlU2V0RGF0YSA9ICFtZXRhTWFwID8gaWRlbnRpdHkgOiBmdW5jdGlvbihmdW5jLCBkYXRhKSB7XG4gIG1ldGFNYXAuc2V0KGZ1bmMsIGRhdGEpO1xuICByZXR1cm4gZnVuYztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVNldERhdGE7XG4iLCIvKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgaWYgaXQgaXMgbm90IG9uZS4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkXG4gKiBmb3IgYG51bGxgIG9yIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6ICh2YWx1ZSArICcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVG9TdHJpbmc7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnZhbHVlc2AgYW5kIGBfLnZhbHVlc0luYCB3aGljaCBjcmVhdGVzIGFuXG4gKiBhcnJheSBvZiBgb2JqZWN0YCBwcm9wZXJ0eSB2YWx1ZXMgY29ycmVzcG9uZGluZyB0byB0aGUgcHJvcGVydHkgbmFtZXNcbiAqIHJldHVybmVkIGJ5IGBrZXlzRnVuY2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBuYW1lcyB0byBnZXQgdmFsdWVzIGZvci5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gYmFzZVZhbHVlcyhvYmplY3QsIHByb3BzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBvYmplY3RbcHJvcHNbaW5kZXhdXTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VWYWx1ZXM7XG4iLCJ2YXIgaWRlbnRpdHkgPSByZXF1aXJlKCcuLi91dGlsaXR5L2lkZW50aXR5Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlQ2FsbGJhY2tgIHdoaWNoIG9ubHkgc3VwcG9ydHMgYHRoaXNgIGJpbmRpbmdcbiAqIGFuZCBzcGVjaWZ5aW5nIHRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBiaW5kLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge251bWJlcn0gW2FyZ0NvdW50XSBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY2FsbGJhY2suXG4gKi9cbmZ1bmN0aW9uIGJpbmRDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudCkge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodHlwZW9mIHRoaXNBcmcgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZnVuYztcbiAgfVxuICBzd2l0Y2ggKGFyZ0NvdW50KSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfTtcbiAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA1OiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyLCBrZXksIG9iamVjdCwgc291cmNlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kQ2FsbGJhY2s7XG4iLCJ2YXIgYmluZENhbGxiYWNrID0gcmVxdWlyZSgnLi9iaW5kQ2FsbGJhY2snKSxcbiAgICBpc0l0ZXJhdGVlQ2FsbCA9IHJlcXVpcmUoJy4vaXNJdGVyYXRlZUNhbGwnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBhc3NpZ25zIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdChzKSB0byBhIGdpdmVuXG4gKiBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFzc2lnbmVyIFRoZSBmdW5jdGlvbiB0byBhc3NpZ24gdmFsdWVzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYXNzaWduZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFzc2lnbmVyKGFzc2lnbmVyKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcbiAgICAgICAgb2JqZWN0ID0gYXJndW1lbnRzWzBdO1xuXG4gICAgaWYgKGxlbmd0aCA8IDIgfHwgb2JqZWN0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuICAgIGlmIChsZW5ndGggPiAzICYmIGlzSXRlcmF0ZWVDYWxsKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10pKSB7XG4gICAgICBsZW5ndGggPSAyO1xuICAgIH1cbiAgICAvLyBKdWdnbGUgYXJndW1lbnRzLlxuICAgIGlmIChsZW5ndGggPiAzICYmIHR5cGVvZiBhcmd1bWVudHNbbGVuZ3RoIC0gMl0gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIGN1c3RvbWl6ZXIgPSBiaW5kQ2FsbGJhY2soYXJndW1lbnRzWy0tbGVuZ3RoIC0gMV0sIGFyZ3VtZW50c1tsZW5ndGgtLV0sIDUpO1xuICAgIH0gZWxzZSBpZiAobGVuZ3RoID4gMiAmJiB0eXBlb2YgYXJndW1lbnRzW2xlbmd0aCAtIDFdID09ICdmdW5jdGlvbicpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBhcmd1bWVudHNbLS1sZW5ndGhdO1xuICAgIH1cbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFzc2lnbmVyO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGFycmF5cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgYXJyYXlzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNXaGVyZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgYXJyTGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoZXIubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gdHJ1ZTtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzV2hlcmUgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBEZWVwIGNvbXBhcmUgdGhlIGNvbnRlbnRzLCBpZ25vcmluZyBub24tbnVtZXJpYyBwcm9wZXJ0aWVzLlxuICB3aGlsZSAocmVzdWx0ICYmICsraW5kZXggPCBhcnJMZW5ndGgpIHtcbiAgICB2YXIgYXJyVmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJbaW5kZXhdO1xuXG4gICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICByZXN1bHQgPSBpc1doZXJlXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgYXJyVmFsdWUsIGluZGV4KVxuICAgICAgICA6IGN1c3RvbWl6ZXIoYXJyVmFsdWUsIG90aFZhbHVlLCBpbmRleCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgaWYgKGlzV2hlcmUpIHtcbiAgICAgICAgdmFyIG90aEluZGV4ID0gb3RoTGVuZ3RoO1xuICAgICAgICB3aGlsZSAob3RoSW5kZXgtLSkge1xuICAgICAgICAgIG90aFZhbHVlID0gb3RoZXJbb3RoSW5kZXhdO1xuICAgICAgICAgIHJlc3VsdCA9IChhcnJWYWx1ZSAmJiBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUpIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IChhcnJWYWx1ZSAmJiBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUpIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuICEhcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsQXJyYXlzO1xuIiwiLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBjb21wYXJpbmcgb2JqZWN0cyBvZlxuICogdGhlIHNhbWUgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNvbXBhcmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlIFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3RzIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCB0YWcpIHtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1iZXJzLCBkYXRlcyB0byBtaWxsaXNlY29uZHMgYW5kIGJvb2xlYW5zXG4gICAgICAvLyB0byBgMWAgb3IgYDBgIHRyZWF0aW5nIGludmFsaWQgZGF0ZXMgY29lcmNlZCB0byBgTmFOYCBhcyBub3QgZXF1YWwuXG4gICAgICByZXR1cm4gK29iamVjdCA9PSArb3RoZXI7XG5cbiAgICBjYXNlIGVycm9yVGFnOlxuICAgICAgcmV0dXJuIG9iamVjdC5uYW1lID09IG90aGVyLm5hbWUgJiYgb2JqZWN0Lm1lc3NhZ2UgPT0gb3RoZXIubWVzc2FnZTtcblxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgICAgLy8gVHJlYXQgYE5hTmAgdnMuIGBOYU5gIGFzIGVxdWFsLlxuICAgICAgcmV0dXJuIChvYmplY3QgIT0gK29iamVjdClcbiAgICAgICAgPyBvdGhlciAhPSArb3RoZXJcbiAgICAgICAgLy8gQnV0LCB0cmVhdCBgLTBgIHZzLiBgKzBgIGFzIG5vdCBlcXVhbC5cbiAgICAgICAgOiAob2JqZWN0ID09IDAgPyAoKDEgLyBvYmplY3QpID09ICgxIC8gb3RoZXIpKSA6IG9iamVjdCA9PSArb3RoZXIpO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICAvLyBDb2VyY2UgcmVnZXhlcyB0byBzdHJpbmdzIGFuZCB0cmVhdCBzdHJpbmdzIHByaW1pdGl2ZXMgYW5kIHN0cmluZ1xuICAgICAgLy8gb2JqZWN0cyBhcyBlcXVhbC4gU2VlIGh0dHBzOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjEwLjYuNCBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAgcmV0dXJuIG9iamVjdCA9PSAob3RoZXIgKyAnJyk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsQnlUYWc7XG4iLCJ2YXIga2V5cyA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzJyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3Igb2JqZWN0cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1doZXJlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0FdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQl0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgaXNXaGVyZSwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIG9ialByb3BzID0ga2V5cyhvYmplY3QpLFxuICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgb3RoUHJvcHMgPSBrZXlzKG90aGVyKSxcbiAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNXaGVyZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgaGFzQ3RvcixcbiAgICAgIGluZGV4ID0gLTE7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBvYmpMZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdLFxuICAgICAgICByZXN1bHQgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCBrZXkpO1xuXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltrZXldO1xuXG4gICAgICByZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgICByZXN1bHQgPSBpc1doZXJlXG4gICAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBvYmpWYWx1ZSwga2V5KVxuICAgICAgICAgIDogY3VzdG9taXplcihvYmpWYWx1ZSwgb3RoVmFsdWUsIGtleSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgICAgcmVzdWx0ID0gKG9ialZhbHVlICYmIG9ialZhbHVlID09PSBvdGhWYWx1ZSkgfHwgZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgaXNXaGVyZSwgc3RhY2tBLCBzdGFja0IpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBoYXNDdG9yIHx8IChoYXNDdG9yID0ga2V5ID09ICdjb25zdHJ1Y3RvcicpO1xuICB9XG4gIGlmICghaGFzQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiYgdHlwZW9mIG90aEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvdGhDdG9yIGluc3RhbmNlb2Ygb3RoQ3RvcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXF1YWxPYmplY3RzO1xuIiwidmFyIGJhc2VTZXREYXRhID0gcmVxdWlyZSgnLi9iYXNlU2V0RGF0YScpLFxuICAgIGlzTmF0aXZlID0gcmVxdWlyZSgnLi4vbGFuZy9pc05hdGl2ZScpLFxuICAgIHN1cHBvcnQgPSByZXF1aXJlKCcuLi9zdXBwb3J0Jyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBuYW1lZCBmdW5jdGlvbnMuICovXG52YXIgcmVGdW5jTmFtZSA9IC9eXFxzKmZ1bmN0aW9uWyBcXG5cXHJcXHRdK1xcdy87XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBmdW5jdGlvbnMgY29udGFpbmluZyBhIGB0aGlzYCByZWZlcmVuY2UuICovXG52YXIgcmVUaGlzID0gL1xcYnRoaXNcXGIvO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZm5Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGlzIGVsaWdpYmxlIGZvciBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIGVsaWdpYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzQmluZGFibGUoZnVuYykge1xuICB2YXIgcmVzdWx0ID0gIShzdXBwb3J0LmZ1bmNOYW1lcyA/IGZ1bmMubmFtZSA6IHN1cHBvcnQuZnVuY0RlY29tcCk7XG5cbiAgaWYgKCFyZXN1bHQpIHtcbiAgICB2YXIgc291cmNlID0gZm5Ub1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIGlmICghc3VwcG9ydC5mdW5jTmFtZXMpIHtcbiAgICAgIHJlc3VsdCA9ICFyZUZ1bmNOYW1lLnRlc3Qoc291cmNlKTtcbiAgICB9XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIC8vIENoZWNrIGlmIGBmdW5jYCByZWZlcmVuY2VzIHRoZSBgdGhpc2Aga2V5d29yZCBhbmQgc3RvcmUgdGhlIHJlc3VsdC5cbiAgICAgIHJlc3VsdCA9IHJlVGhpcy50ZXN0KHNvdXJjZSkgfHwgaXNOYXRpdmUoZnVuYyk7XG4gICAgICBiYXNlU2V0RGF0YShmdW5jLCByZXN1bHQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQmluZGFibGU7XG4iLCIvKipcbiAqIFVzZWQgYXMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhbHVlID0gK3ZhbHVlO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW5kZXg7XG4iLCJ2YXIgaXNJbmRleCA9IHJlcXVpcmUoJy4vaXNJbmRleCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgcHJvdmlkZWQgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSB2YWx1ZSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gaW5kZXggVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBpbmRleCBvciBrZXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIG9iamVjdCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJykge1xuICAgIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoLFxuICAgICAgICBwcmVyZXEgPSBpc0xlbmd0aChsZW5ndGgpICYmIGlzSW5kZXgoaW5kZXgsIGxlbmd0aCk7XG4gIH0gZWxzZSB7XG4gICAgcHJlcmVxID0gdHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3Q7XG4gIH1cbiAgaWYgKHByZXJlcSkge1xuICAgIHZhciBvdGhlciA9IG9iamVjdFtpbmRleF07XG4gICAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/IHZhbHVlID09PSBvdGhlciA6IG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG4iLCIvKipcbiAqIFVzZWQgYXMgdGhlIG1heGltdW0gbGVuZ3RoIG9mIGFuIGFycmF5LWxpa2UgdmFsdWUuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtbnVtYmVyLm1heF9zYWZlX2ludGVnZXIpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBiYXNlZCBvbiBFUyBgVG9MZW5ndGhgLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0xlbmd0aDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0Jyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpZiBzdWl0YWJsZSBmb3Igc3RyaWN0XG4gKiAgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgJiYgKHZhbHVlID09PSAwID8gKCgxIC8gdmFsdWUpID4gMCkgOiAhaXNPYmplY3QodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N0cmljdENvbXBhcmFibGU7XG4iLCJ2YXIgaXNOYXRpdmUgPSByZXF1aXJlKCcuLi9sYW5nL2lzTmF0aXZlJyk7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgV2Vha01hcCA9IGlzTmF0aXZlKFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcCkgJiYgV2Vha01hcDtcblxuLyoqIFVzZWQgdG8gc3RvcmUgZnVuY3Rpb24gbWV0YWRhdGEuICovXG52YXIgbWV0YU1hcCA9IFdlYWtNYXAgJiYgbmV3IFdlYWtNYXA7XG5cbm1vZHVsZS5leHBvcnRzID0gbWV0YU1hcDtcbiIsInZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vdG9PYmplY3QnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ucGlja2AgdGhhdCBwaWNrcyBgb2JqZWN0YCBwcm9wZXJ0aWVzIHNwZWNpZmllZFxuICogYnkgdGhlIGBwcm9wc2AgYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gcGljay5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHBpY2tCeUFycmF5KG9iamVjdCwgcHJvcHMpIHtcbiAgb2JqZWN0ID0gdG9PYmplY3Qob2JqZWN0KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IHt9O1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgcmVzdWx0W2tleV0gPSBvYmplY3Rba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwaWNrQnlBcnJheTtcbiIsInZhciBiYXNlRm9ySW4gPSByZXF1aXJlKCcuL2Jhc2VGb3JJbicpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5waWNrYCB0aGF0IHBpY2tzIGBvYmplY3RgIHByb3BlcnRpZXMgYHByZWRpY2F0ZWBcbiAqIHJldHVybnMgdHJ1dGh5IGZvci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gcGlja0J5Q2FsbGJhY2sob2JqZWN0LCBwcmVkaWNhdGUpIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBiYXNlRm9ySW4ob2JqZWN0LCBmdW5jdGlvbih2YWx1ZSwga2V5LCBvYmplY3QpIHtcbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBrZXksIG9iamVjdCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwaWNrQnlDYWxsYmFjaztcbiIsInZhciBiYXNlRm9ySW4gPSByZXF1aXJlKCcuL2Jhc2VGb3JJbicpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQSBmYWxsYmFjayBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1BsYWluT2JqZWN0YCB3aGljaCBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIGhhcyBhIGBbW1Byb3RvdHlwZV1dYFxuICogb2YgYG51bGxgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHNoaW1Jc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHZhciBDdG9yO1xuXG4gIC8vIEV4aXQgZWFybHkgZm9yIG5vbiBgT2JqZWN0YCBvYmplY3RzLlxuICBpZiAoIShpc09iamVjdExpa2UodmFsdWUpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IG9iamVjdFRhZykgfHxcbiAgICAgICghaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NvbnN0cnVjdG9yJykgJiZcbiAgICAgICAgKEN0b3IgPSB2YWx1ZS5jb25zdHJ1Y3RvciwgdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiAhKEN0b3IgaW5zdGFuY2VvZiBDdG9yKSkpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIElFIDwgOSBpdGVyYXRlcyBpbmhlcml0ZWQgcHJvcGVydGllcyBiZWZvcmUgb3duIHByb3BlcnRpZXMuIElmIHRoZSBmaXJzdFxuICAvLyBpdGVyYXRlZCBwcm9wZXJ0eSBpcyBhbiBvYmplY3QncyBvd24gcHJvcGVydHkgdGhlbiB0aGVyZSBhcmUgbm8gaW5oZXJpdGVkXG4gIC8vIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAgdmFyIHJlc3VsdDtcbiAgLy8gSW4gbW9zdCBlbnZpcm9ubWVudHMgYW4gb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMgYXJlIGl0ZXJhdGVkIGJlZm9yZVxuICAvLyBpdHMgaW5oZXJpdGVkIHByb3BlcnRpZXMuIElmIHRoZSBsYXN0IGl0ZXJhdGVkIHByb3BlcnR5IGlzIGFuIG9iamVjdCdzXG4gIC8vIG93biBwcm9wZXJ0eSB0aGVuIHRoZXJlIGFyZSBubyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICBiYXNlRm9ySW4odmFsdWUsIGZ1bmN0aW9uKHN1YlZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHQgPSBrZXk7XG4gIH0pO1xuICByZXR1cm4gdHlwZW9mIHJlc3VsdCA9PSAndW5kZWZpbmVkJyB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCByZXN1bHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoaW1Jc1BsYWluT2JqZWN0O1xuIiwidmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAga2V5c0luID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXNJbicpLFxuICAgIHN1cHBvcnQgPSByZXF1aXJlKCcuLi9zdXBwb3J0Jyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgZmFsbGJhY2sgaW1wbGVtZW50YXRpb24gb2YgYE9iamVjdC5rZXlzYCB3aGljaCBjcmVhdGVzIGFuIGFycmF5IG9mIHRoZVxuICogb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gc2hpbUtleXMob2JqZWN0KSB7XG4gIHZhciBwcm9wcyA9IGtleXNJbihvYmplY3QpLFxuICAgICAgcHJvcHNMZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBwcm9wc0xlbmd0aCAmJiBvYmplY3QubGVuZ3RoO1xuXG4gIHZhciBhbGxvd0luZGV4ZXMgPSBsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgKHN1cHBvcnQubm9uRW51bUFyZ3MgJiYgaXNBcmd1bWVudHMob2JqZWN0KSkpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBwcm9wc0xlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKChhbGxvd0luZGV4ZXMgJiYgaXNJbmRleChrZXksIGxlbmd0aCkpIHx8IGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoaW1LZXlzO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYW4gb2JqZWN0IGlmIGl0IGlzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWx1ZSkgPyB2YWx1ZSA6IE9iamVjdCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9PYmplY3Q7XG4iLCJ2YXIgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICB2YXIgbGVuZ3RoID0gaXNPYmplY3RMaWtlKHZhbHVlKSA/IHZhbHVlLmxlbmd0aCA6IHVuZGVmaW5lZDtcbiAgcmV0dXJuIChpc0xlbmd0aChsZW5ndGgpICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJndW1lbnRzO1xuIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc05hdGl2ZSA9IHJlcXVpcmUoJy4vaXNOYXRpdmUnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNBcnJheSA9IGlzTmF0aXZlKG5hdGl2ZUlzQXJyYXkgPSBBcnJheS5pc0FycmF5KSAmJiBuYXRpdmVJc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gbmF0aXZlSXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcnJheVRhZykgfHwgZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXk7XG4iLCJ2YXIgYmFzZUlzRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlSXNGdW5jdGlvbicpLFxuICAgIGlzTmF0aXZlID0gcmVxdWlyZSgnLi9pc05hdGl2ZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIFVpbnQ4QXJyYXkgPSBpc05hdGl2ZShVaW50OEFycmF5ID0gZ2xvYmFsLlVpbnQ4QXJyYXkpICYmIFVpbnQ4QXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0Z1bmN0aW9uID0gIShiYXNlSXNGdW5jdGlvbigveC8pIHx8IChVaW50OEFycmF5ICYmICFiYXNlSXNGdW5jdGlvbihVaW50OEFycmF5KSkpID8gYmFzZUlzRnVuY3Rpb24gOiBmdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gb2xkZXIgdmVyc2lvbnMgb2YgQ2hyb21lIGFuZCBTYWZhcmkgd2hpY2ggcmV0dXJuICdmdW5jdGlvbicgZm9yIHJlZ2V4ZXNcbiAgLy8gYW5kIFNhZmFyaSA4IGVxdWl2YWxlbnRzIHdoaWNoIHJldHVybiAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgY29uc3RydWN0b3JzLlxuICByZXR1cm4gb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY1RhZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsInZhciBlc2NhcGVSZWdFeHAgPSByZXF1aXJlKCcuLi9zdHJpbmcvZXNjYXBlUmVnRXhwJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkgPiA1KS4gKi9cbnZhciByZUhvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGVzY2FwZVJlZ0V4cChvYmpUb1N0cmluZylcbiAgLnJlcGxhY2UoL3RvU3RyaW5nfChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTmF0aXZlKEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTmF0aXZlKF8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWcpIHtcbiAgICByZXR1cm4gcmVOYXRpdmUudGVzdChmblRvU3RyaW5nLmNhbGwodmFsdWUpKTtcbiAgfVxuICByZXR1cm4gKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgcmVIb3N0Q3Rvci50ZXN0KHZhbHVlKSkgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNOYXRpdmU7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBsYW5ndWFnZSB0eXBlIG9mIGBPYmplY3RgLlxuICogKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogKipOb3RlOioqIFNlZSB0aGUgW0VTNSBzcGVjXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAvLyBBdm9pZCBhIFY4IEpJVCBidWcgaW4gQ2hyb21lIDE5LTIwLlxuICAvLyBTZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTIyOTEgZm9yIG1vcmUgZGV0YWlscy5cbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdmdW5jdGlvbicgfHwgKHZhbHVlICYmIHR5cGUgPT0gJ29iamVjdCcpIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwidmFyIGlzTmF0aXZlID0gcmVxdWlyZSgnLi9pc05hdGl2ZScpLFxuICAgIHNoaW1Jc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvc2hpbUlzUGxhaW5PYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRQcm90b3R5cGVPZiA9IGlzTmF0aXZlKGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKSAmJiBnZXRQcm90b3R5cGVPZjtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGFzc3VtZXMgb2JqZWN0cyBjcmVhdGVkIGJ5IHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3RvclxuICogaGF2ZSBubyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG52YXIgaXNQbGFpbk9iamVjdCA9ICFnZXRQcm90b3R5cGVPZiA/IHNoaW1Jc1BsYWluT2JqZWN0IDogZnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKCEodmFsdWUgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gb2JqZWN0VGFnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdmFsdWVPZiA9IHZhbHVlLnZhbHVlT2YsXG4gICAgICBvYmpQcm90byA9IGlzTmF0aXZlKHZhbHVlT2YpICYmIChvYmpQcm90byA9IGdldFByb3RvdHlwZU9mKHZhbHVlT2YpKSAmJiBnZXRQcm90b3R5cGVPZihvYmpQcm90byk7XG5cbiAgcmV0dXJuIG9ialByb3RvXG4gICAgPyAodmFsdWUgPT0gb2JqUHJvdG8gfHwgZ2V0UHJvdG90eXBlT2YodmFsdWUpID09IG9ialByb3RvKVxuICAgIDogc2hpbUlzUGxhaW5PYmplY3QodmFsdWUpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc1BsYWluT2JqZWN0O1xuIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPSB0eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPSB0eXBlZEFycmF5VGFnc1ttYXBUYWddID1cbnR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID1cbnR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzZXRUYWddID1cbnR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPSB0eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgdHlwZWRBcnJheVRhZ3Nbb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSldKSB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1R5cGVkQXJyYXk7XG4iLCJ2YXIgYmFzZUNvcHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlQ29weScpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzSW4nKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgcGxhaW4gb2JqZWN0IGZsYXR0ZW5pbmcgaW5oZXJpdGVkIGVudW1lcmFibGVcbiAqIHByb3BlcnRpZXMgb2YgYHZhbHVlYCB0byBvd24gcHJvcGVydGllcyBvZiB0aGUgcGxhaW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBwbGFpbiBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIG5ldyBGb28pO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiB9XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgXy50b1BsYWluT2JqZWN0KG5ldyBGb28pKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMyB9XG4gKi9cbmZ1bmN0aW9uIHRvUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGJhc2VDb3B5KHZhbHVlLCBrZXlzSW4odmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b1BsYWluT2JqZWN0O1xuIiwidmFyIGJhc2VBc3NpZ24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlQXNzaWduJyksXG4gICAgY3JlYXRlQXNzaWduZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9jcmVhdGVBc3NpZ25lcicpO1xuXG4vKipcbiAqIEFzc2lnbnMgb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0KHMpIHRvIHRoZSBkZXN0aW5hdGlvblxuICogb2JqZWN0LiBTdWJzZXF1ZW50IHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKiBJZiBgY3VzdG9taXplcmAgaXMgcHJvdmlkZWQgaXQgaXMgaW52b2tlZCB0byBwcm9kdWNlIHRoZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBUaGUgYGN1c3RvbWl6ZXJgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIGZpdmUgYXJndW1lbnRzO1xuICogKG9iamVjdFZhbHVlLCBzb3VyY2VWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyBleHRlbmRcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduaW5nIHZhbHVlcy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY3VzdG9taXplcmAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmFzc2lnbih7ICd1c2VyJzogJ2Jhcm5leScgfSwgeyAnYWdlJzogNDAgfSwgeyAndXNlcic6ICdmcmVkJyB9KTtcbiAqIC8vID0+IHsgJ3VzZXInOiAnZnJlZCcsICdhZ2UnOiA0MCB9XG4gKlxuICogLy8gdXNpbmcgYSBjdXN0b21pemVyIGNhbGxiYWNrXG4gKiB2YXIgZGVmYXVsdHMgPSBfLnBhcnRpYWxSaWdodChfLmFzc2lnbiwgZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gKiAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCcgPyBvdGhlciA6IHZhbHVlO1xuICogfSk7XG4gKlxuICogZGVmYXVsdHMoeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ2FnZSc6IDM2IH0sIHsgJ3VzZXInOiAnZnJlZCcgfSk7XG4gKiAvLyA9PiB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9XG4gKi9cbnZhciBhc3NpZ24gPSBjcmVhdGVBc3NpZ25lcihiYXNlQXNzaWduKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ247XG4iLCJ2YXIgYXJyYXlDb3B5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYXJyYXlDb3B5JyksXG4gICAgYXNzaWduID0gcmVxdWlyZSgnLi9hc3NpZ24nKSxcbiAgICBhc3NpZ25EZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Fzc2lnbkRlZmF1bHRzJyk7XG5cbi8qKlxuICogQXNzaWducyBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3QocykgdG8gdGhlIGRlc3RpbmF0aW9uXG4gKiBvYmplY3QgZm9yIGFsbCBkZXN0aW5hdGlvbiBwcm9wZXJ0aWVzIHRoYXQgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYC4gT25jZSBhXG4gKiBwcm9wZXJ0eSBpcyBzZXQsIGFkZGl0aW9uYWwgZGVmYXVsdHMgb2YgdGhlIHNhbWUgcHJvcGVydHkgYXJlIGlnbm9yZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZhdWx0cyh7ICd1c2VyJzogJ2Jhcm5leScgfSwgeyAnYWdlJzogMzYgfSwgeyAndXNlcic6ICdmcmVkJyB9KTtcbiAqIC8vID0+IHsgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM2IH1cbiAqL1xuZnVuY3Rpb24gZGVmYXVsdHMob2JqZWN0KSB7XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgdmFyIGFyZ3MgPSBhcnJheUNvcHkoYXJndW1lbnRzKTtcbiAgYXJncy5wdXNoKGFzc2lnbkRlZmF1bHRzKTtcbiAgcmV0dXJuIGFzc2lnbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc05hdGl2ZSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNOYXRpdmUnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKSxcbiAgICBzaGltS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3NoaW1LZXlzJyk7XG5cbi8qIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IGlzTmF0aXZlKG5hdGl2ZUtleXMgPSBPYmplY3Qua2V5cykgJiYgbmF0aXZlS2V5cztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xudmFyIGtleXMgPSAhbmF0aXZlS2V5cyA/IHNoaW1LZXlzIDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIGlmIChvYmplY3QpIHtcbiAgICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDtcbiAgfVxuICBpZiAoKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCkgfHxcbiAgICAgKHR5cGVvZiBvYmplY3QgIT0gJ2Z1bmN0aW9uJyAmJiAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkpKSkge1xuICAgIHJldHVybiBzaGltS2V5cyhvYmplY3QpO1xuICB9XG4gIHJldHVybiBpc09iamVjdChvYmplY3QpID8gbmF0aXZlS2V5cyhvYmplY3QpIDogW107XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXM7XG4iLCJ2YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0luZGV4JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpLFxuICAgIHN1cHBvcnQgPSByZXF1aXJlKCcuLi9zdXBwb3J0Jyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gIGxlbmd0aCA9IChsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgKHN1cHBvcnQubm9uRW51bUFyZ3MgJiYgaXNBcmd1bWVudHMob2JqZWN0KSkpICYmIGxlbmd0aCkgfHwgMDtcblxuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBpc1Byb3RvID0gdHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0LFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgIHNraXBJbmRleGVzID0gbGVuZ3RoID4gMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSAoaW5kZXggKyAnJyk7XG4gIH1cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKHNraXBJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSAmJlxuICAgICAgICAhKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNJbjtcbiIsInZhciBiYXNlTWVyZ2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlTWVyZ2UnKSxcbiAgICBjcmVhdGVBc3NpZ25lciA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NyZWF0ZUFzc2lnbmVyJyk7XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgbWVyZ2VzIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgdGhlIHNvdXJjZSBvYmplY3QocyksIHRoYXRcbiAqIGRvbid0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAgaW50byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LiBTdWJzZXF1ZW50IHNvdXJjZXNcbiAqIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLiBJZiBgY3VzdG9taXplcmAgaXNcbiAqIHByb3ZpZGVkIGl0IGlzIGludm9rZWQgdG8gcHJvZHVjZSB0aGUgbWVyZ2VkIHZhbHVlcyBvZiB0aGUgZGVzdGluYXRpb24gYW5kXG4gKiBzb3VyY2UgcHJvcGVydGllcy4gSWYgYGN1c3RvbWl6ZXJgIHJldHVybnMgYHVuZGVmaW5lZGAgbWVyZ2luZyBpcyBoYW5kbGVkXG4gKiBieSB0aGUgbWV0aG9kIGluc3RlYWQuIFRoZSBgY3VzdG9taXplcmAgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkXG4gKiB3aXRoIGZpdmUgYXJndW1lbnRzOyAob2JqZWN0VmFsdWUsIHNvdXJjZVZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnaW5nIHByb3BlcnRpZXMuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGN1c3RvbWl6ZXJgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIHVzZXJzID0ge1xuICogICAnZGF0YSc6IFt7ICd1c2VyJzogJ2Jhcm5leScgfSwgeyAndXNlcic6ICdmcmVkJyB9XVxuICogfTtcbiAqXG4gKiB2YXIgYWdlcyA9IHtcbiAqICAgJ2RhdGEnOiBbeyAnYWdlJzogMzYgfSwgeyAnYWdlJzogNDAgfV1cbiAqIH07XG4gKlxuICogXy5tZXJnZSh1c2VycywgYWdlcyk7XG4gKiAvLyA9PiB7ICdkYXRhJzogW3sgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM2IH0sIHsgJ3VzZXInOiAnZnJlZCcsICdhZ2UnOiA0MCB9XSB9XG4gKlxuICogLy8gdXNpbmcgYSBjdXN0b21pemVyIGNhbGxiYWNrXG4gKiB2YXIgb2JqZWN0ID0ge1xuICogICAnZnJ1aXRzJzogWydhcHBsZSddLFxuICogICAndmVnZXRhYmxlcyc6IFsnYmVldCddXG4gKiB9O1xuICpcbiAqIHZhciBvdGhlciA9IHtcbiAqICAgJ2ZydWl0cyc6IFsnYmFuYW5hJ10sXG4gKiAgICd2ZWdldGFibGVzJzogWydjYXJyb3QnXVxuICogfTtcbiAqXG4gKiBfLm1lcmdlKG9iamVjdCwgb3RoZXIsIGZ1bmN0aW9uKGEsIGIpIHtcbiAqICAgaWYgKF8uaXNBcnJheShhKSkge1xuICogICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAqICAgfVxuICogfSk7XG4gKiAvLyA9PiB7ICdmcnVpdHMnOiBbJ2FwcGxlJywgJ2JhbmFuYSddLCAndmVnZXRhYmxlcyc6IFsnYmVldCcsICdjYXJyb3QnXSB9XG4gKi9cbnZhciBtZXJnZSA9IGNyZWF0ZUFzc2lnbmVyKGJhc2VNZXJnZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbWVyZ2U7XG4iLCJ2YXIgYmFzZUZsYXR0ZW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlRmxhdHRlbicpLFxuICAgIGJpbmRDYWxsYmFjayA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2JpbmRDYWxsYmFjaycpLFxuICAgIHBpY2tCeUFycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcGlja0J5QXJyYXknKSxcbiAgICBwaWNrQnlDYWxsYmFjayA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3BpY2tCeUNhbGxiYWNrJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBvYmplY3QgY29tcG9zZWQgb2YgdGhlIHBpY2tlZCBgb2JqZWN0YCBwcm9wZXJ0aWVzLiBQcm9wZXJ0eVxuICogbmFtZXMgbWF5IGJlIHNwZWNpZmllZCBhcyBpbmRpdmlkdWFsIGFyZ3VtZW50cyBvciBhcyBhcnJheXMgb2YgcHJvcGVydHlcbiAqIG5hbWVzLiBJZiBgcHJlZGljYXRlYCBpcyBwcm92aWRlZCBpdCBpcyBpbnZva2VkIGZvciBlYWNoIHByb3BlcnR5IG9mIGBvYmplY3RgXG4gKiBwaWNraW5nIHRoZSBwcm9wZXJ0aWVzIGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvci4gVGhlIHByZWRpY2F0ZSBpc1xuICogYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGtleSwgb2JqZWN0KS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb258Li4uKHN0cmluZ3xzdHJpbmdbXSl9IFtwcmVkaWNhdGVdIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlclxuICogIGl0ZXJhdGlvbiBvciBwcm9wZXJ0eSBuYW1lcyB0byBwaWNrLCBzcGVjaWZpZWQgYXMgaW5kaXZpZHVhbCBwcm9wZXJ0eVxuICogIG5hbWVzIG9yIGFycmF5cyBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgcHJlZGljYXRlYC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnLCAnYWdlJzogNDAgfTtcbiAqXG4gKiBfLnBpY2sob2JqZWN0LCAndXNlcicpO1xuICogLy8gPT4geyAndXNlcic6ICdmcmVkJyB9XG4gKlxuICogXy5waWNrKG9iamVjdCwgXy5pc1N0cmluZyk7XG4gKiAvLyA9PiB7ICd1c2VyJzogJ2ZyZWQnIH1cbiAqL1xuZnVuY3Rpb24gcGljayhvYmplY3QsIHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4ge307XG4gIH1cbiAgcmV0dXJuIHR5cGVvZiBwcmVkaWNhdGUgPT0gJ2Z1bmN0aW9uJ1xuICAgID8gcGlja0J5Q2FsbGJhY2sob2JqZWN0LCBiaW5kQ2FsbGJhY2socHJlZGljYXRlLCB0aGlzQXJnLCAzKSlcbiAgICA6IHBpY2tCeUFycmF5KG9iamVjdCwgYmFzZUZsYXR0ZW4oYXJndW1lbnRzLCBmYWxzZSwgZmFsc2UsIDEpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwaWNrO1xuIiwidmFyIGJhc2VWYWx1ZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlVmFsdWVzJyksXG4gICAga2V5cyA9IHJlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IHZhbHVlcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8udmFsdWVzKG5ldyBGb28pO1xuICogLy8gPT4gWzEsIDJdIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy52YWx1ZXMoJ2hpJyk7XG4gKiAvLyA9PiBbJ2gnLCAnaSddXG4gKi9cbmZ1bmN0aW9uIHZhbHVlcyhvYmplY3QpIHtcbiAgcmV0dXJuIGJhc2VWYWx1ZXMob2JqZWN0LCBrZXlzKG9iamVjdCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZhbHVlcztcbiIsInZhciBiYXNlVG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iYXNlVG9TdHJpbmcnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycy5cbiAqIFNlZSB0aGlzIFthcnRpY2xlIG9uIGBSZWdFeHBgIGNoYXJhY3RlcnNdKGh0dHA6Ly93d3cucmVndWxhci1leHByZXNzaW9ucy5pbmZvL2NoYXJhY3RlcnMuaHRtbCNzcGVjaWFsKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhcnMgPSAvWy4qKz9eJHt9KCl8W1xcXVxcL1xcXFxdL2csXG4gICAgcmVIYXNSZWdFeHBDaGFycyA9IFJlZ0V4cChyZVJlZ0V4cENoYXJzLnNvdXJjZSk7XG5cbi8qKlxuICogRXNjYXBlcyB0aGUgYFJlZ0V4cGAgc3BlY2lhbCBjaGFyYWN0ZXJzIFwiXFxcIiwgXCJeXCIsIFwiJFwiLCBcIi5cIiwgXCJ8XCIsIFwiP1wiLCBcIipcIixcbiAqIFwiK1wiLCBcIihcIiwgXCIpXCIsIFwiW1wiLCBcIl1cIiwgXCJ7XCIgYW5kIFwifVwiIGluIGBzdHJpbmdgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5lc2NhcGVSZWdFeHAoJ1tsb2Rhc2hdKGh0dHBzOi8vbG9kYXNoLmNvbS8pJyk7XG4gKiAvLyA9PiAnXFxbbG9kYXNoXFxdXFwoaHR0cHM6Ly9sb2Rhc2hcXC5jb20vXFwpJ1xuICovXG5mdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gIHN0cmluZyA9IGJhc2VUb1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gKHN0cmluZyAmJiByZUhhc1JlZ0V4cENoYXJzLnRlc3Qoc3RyaW5nKSlcbiAgICA/IHN0cmluZy5yZXBsYWNlKHJlUmVnRXhwQ2hhcnMsICdcXFxcJCYnKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVzY2FwZVJlZ0V4cDtcbiIsInZhciBpc05hdGl2ZSA9IHJlcXVpcmUoJy4vbGFuZy9pc05hdGl2ZScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgZnVuY3Rpb25zIGNvbnRhaW5pbmcgYSBgdGhpc2AgcmVmZXJlbmNlLiAqL1xudmFyIHJlVGhpcyA9IC9cXGJ0aGlzXFxiLztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBET00gc3VwcG9ydC4gKi9cbnZhciBkb2N1bWVudCA9IChkb2N1bWVudCA9IGdsb2JhbC53aW5kb3cpICYmIGRvY3VtZW50LmRvY3VtZW50O1xuXG4vKiogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQW4gb2JqZWN0IGVudmlyb25tZW50IGZlYXR1cmUgZmxhZ3MuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEB0eXBlIE9iamVjdFxuICovXG52YXIgc3VwcG9ydCA9IHt9O1xuXG4oZnVuY3Rpb24oeCkge1xuXG4gIC8qKlxuICAgKiBEZXRlY3QgaWYgZnVuY3Rpb25zIGNhbiBiZSBkZWNvbXBpbGVkIGJ5IGBGdW5jdGlvbiN0b1N0cmluZ2BcbiAgICogKGFsbCBidXQgRmlyZWZveCBPUyBjZXJ0aWZpZWQgYXBwcywgb2xkZXIgT3BlcmEgbW9iaWxlIGJyb3dzZXJzLCBhbmRcbiAgICogdGhlIFBsYXlTdGF0aW9uIDM7IGZvcmNlZCBgZmFsc2VgIGZvciBXaW5kb3dzIDggYXBwcykuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnN1cHBvcnRcbiAgICogQHR5cGUgYm9vbGVhblxuICAgKi9cbiAgc3VwcG9ydC5mdW5jRGVjb21wID0gIWlzTmF0aXZlKGdsb2JhbC5XaW5SVEVycm9yKSAmJiByZVRoaXMudGVzdChmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pO1xuXG4gIC8qKlxuICAgKiBEZXRlY3QgaWYgYEZ1bmN0aW9uI25hbWVgIGlzIHN1cHBvcnRlZCAoYWxsIGJ1dCBJRSkuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnN1cHBvcnRcbiAgICogQHR5cGUgYm9vbGVhblxuICAgKi9cbiAgc3VwcG9ydC5mdW5jTmFtZXMgPSB0eXBlb2YgRnVuY3Rpb24ubmFtZSA9PSAnc3RyaW5nJztcblxuICAvKipcbiAgICogRGV0ZWN0IGlmIHRoZSBET00gaXMgc3VwcG9ydGVkLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy5zdXBwb3J0XG4gICAqIEB0eXBlIGJvb2xlYW5cbiAgICovXG4gIHRyeSB7XG4gICAgc3VwcG9ydC5kb20gPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkubm9kZVR5cGUgPT09IDExO1xuICB9IGNhdGNoKGUpIHtcbiAgICBzdXBwb3J0LmRvbSA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVjdCBpZiBgYXJndW1lbnRzYCBvYmplY3QgaW5kZXhlcyBhcmUgbm9uLWVudW1lcmFibGUuXG4gICAqXG4gICAqIEluIEZpcmVmb3ggPCA0LCBJRSA8IDksIFBoYW50b21KUywgYW5kIFNhZmFyaSA8IDUuMSBgYXJndW1lbnRzYCBvYmplY3RcbiAgICogaW5kZXhlcyBhcmUgbm9uLWVudW1lcmFibGUuIENocm9tZSA8IDI1IGFuZCBOb2RlLmpzIDwgMC4xMS4wIHRyZWF0XG4gICAqIGBhcmd1bWVudHNgIG9iamVjdCBpbmRleGVzIGFzIG5vbi1lbnVtZXJhYmxlIGFuZCBmYWlsIGBoYXNPd25Qcm9wZXJ0eWBcbiAgICogY2hlY2tzIGZvciBpbmRleGVzIHRoYXQgZXhjZWVkIHRoZWlyIGZ1bmN0aW9uJ3MgZm9ybWFsIHBhcmFtZXRlcnMgd2l0aFxuICAgKiBhc3NvY2lhdGVkIHZhbHVlcyBvZiBgMGAuXG4gICAqXG4gICAqIEBtZW1iZXJPZiBfLnN1cHBvcnRcbiAgICogQHR5cGUgYm9vbGVhblxuICAgKi9cbiAgdHJ5IHtcbiAgICBzdXBwb3J0Lm5vbkVudW1BcmdzID0gIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgfSBjYXRjaChlKSB7XG4gICAgc3VwcG9ydC5ub25FbnVtQXJncyA9IHRydWU7XG4gIH1cbn0oMCwgMCkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN1cHBvcnQ7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IHByb3ZpZGVkIHRvIGl0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbGl0eVxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJyB9O1xuICpcbiAqIF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0O1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7XG4iLCIvKiBSaW90IHYyLjAuMTIsIEBsaWNlbnNlIE1JVCwgKGMpIDIwMTUgTXV1dCBJbmMuICsgY29udHJpYnV0b3JzICovXG5cbjsoZnVuY3Rpb24oKSB7XG5cbiAgdmFyIHJpb3QgPSB7IHZlcnNpb246ICd2Mi4wLjEyJywgc2V0dGluZ3M6IHt9IH1cblxuICAndXNlIHN0cmljdCdcblxucmlvdC5vYnNlcnZhYmxlID0gZnVuY3Rpb24oZWwpIHtcblxuICBlbCA9IGVsIHx8IHt9XG5cbiAgdmFyIGNhbGxiYWNrcyA9IHt9LFxuICAgICAgX2lkID0gMFxuXG4gIGVsLm9uID0gZnVuY3Rpb24oZXZlbnRzLCBmbikge1xuICAgIGlmICh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZm4uX2lkID0gdHlwZW9mIGZuLl9pZCA9PSAndW5kZWZpbmVkJyA/IF9pZCsrIDogZm4uX2lkXG5cbiAgICAgIGV2ZW50cy5yZXBsYWNlKC9cXFMrL2csIGZ1bmN0aW9uKG5hbWUsIHBvcykge1xuICAgICAgICAoY2FsbGJhY2tzW25hbWVdID0gY2FsbGJhY2tzW25hbWVdIHx8IFtdKS5wdXNoKGZuKVxuICAgICAgICBmbi50eXBlZCA9IHBvcyA+IDBcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgZWwub2ZmID0gZnVuY3Rpb24oZXZlbnRzLCBmbikge1xuICAgIGlmIChldmVudHMgPT0gJyonKSBjYWxsYmFja3MgPSB7fVxuICAgIGVsc2Uge1xuICAgICAgZXZlbnRzLnJlcGxhY2UoL1xcUysvZywgZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICB2YXIgYXJyID0gY2FsbGJhY2tzW25hbWVdXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGNiOyAoY2IgPSBhcnIgJiYgYXJyW2ldKTsgKytpKSB7XG4gICAgICAgICAgICBpZiAoY2IuX2lkID09IGZuLl9pZCkgeyBhcnIuc3BsaWNlKGksIDEpOyBpLS0gfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFja3NbbmFtZV0gPSBbXVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIC8vIG9ubHkgc2luZ2xlIGV2ZW50IHN1cHBvcnRlZFxuICBlbC5vbmUgPSBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgIGlmIChmbikgZm4ub25lID0gMVxuICAgIHJldHVybiBlbC5vbihuYW1lLCBmbilcbiAgfVxuXG4gIGVsLnRyaWdnZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgIGZucyA9IGNhbGxiYWNrc1tuYW1lXSB8fCBbXVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGZuOyAoZm4gPSBmbnNbaV0pOyArK2kpIHtcbiAgICAgIGlmICghZm4uYnVzeSkge1xuICAgICAgICBmbi5idXN5ID0gMVxuICAgICAgICBmbi5hcHBseShlbCwgZm4udHlwZWQgPyBbbmFtZV0uY29uY2F0KGFyZ3MpIDogYXJncylcbiAgICAgICAgaWYgKGZuLm9uZSkgeyBmbnMuc3BsaWNlKGksIDEpOyBpLS0gfVxuICAgICAgICAgZWxzZSBpZiAoZm5zW2ldICE9PSBmbikgeyBpLS0gfSAvLyBNYWtlcyBzZWxmLXJlbW92YWwgcG9zc2libGUgZHVyaW5nIGl0ZXJhdGlvblxuICAgICAgICBmbi5idXN5ID0gMFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgcmV0dXJuIGVsXG5cbn1cbjsoZnVuY3Rpb24ocmlvdCwgZXZ0KSB7XG5cbiAgLy8gYnJvd3NlcnMgb25seVxuICBpZiAoIXRoaXMudG9wKSByZXR1cm5cblxuICB2YXIgbG9jID0gbG9jYXRpb24sXG4gICAgICBmbnMgPSByaW90Lm9ic2VydmFibGUoKSxcbiAgICAgIHdpbiA9IHdpbmRvdyxcbiAgICAgIGN1cnJlbnRcblxuICBmdW5jdGlvbiBoYXNoKCkge1xuICAgIHJldHVybiBsb2MuaGFzaC5zbGljZSgxKVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VyKHBhdGgpIHtcbiAgICByZXR1cm4gcGF0aC5zcGxpdCgnLycpXG4gIH1cblxuICBmdW5jdGlvbiBlbWl0KHBhdGgpIHtcbiAgICBpZiAocGF0aC50eXBlKSBwYXRoID0gaGFzaCgpXG5cbiAgICBpZiAocGF0aCAhPSBjdXJyZW50KSB7XG4gICAgICBmbnMudHJpZ2dlci5hcHBseShudWxsLCBbJ0gnXS5jb25jYXQocGFyc2VyKHBhdGgpKSlcbiAgICAgIGN1cnJlbnQgPSBwYXRoXG4gICAgfVxuICB9XG5cbiAgdmFyIHIgPSByaW90LnJvdXRlID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgLy8gc3RyaW5nXG4gICAgaWYgKGFyZ1swXSkge1xuICAgICAgbG9jLmhhc2ggPSBhcmdcbiAgICAgIGVtaXQoYXJnKVxuXG4gICAgLy8gZnVuY3Rpb25cbiAgICB9IGVsc2Uge1xuICAgICAgZm5zLm9uKCdIJywgYXJnKVxuICAgIH1cbiAgfVxuXG4gIHIuZXhlYyA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgZm4uYXBwbHkobnVsbCwgcGFyc2VyKGhhc2goKSkpXG4gIH1cblxuICByLnBhcnNlciA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgcGFyc2VyID0gZm5cbiAgfVxuXG4gIHdpbi5hZGRFdmVudExpc3RlbmVyID8gd2luLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBlbWl0LCBmYWxzZSkgOiB3aW4uYXR0YWNoRXZlbnQoJ29uJyArIGV2dCwgZW1pdClcblxufSkocmlvdCwgJ2hhc2hjaGFuZ2UnKVxuLypcblxuLy8vLyBIb3cgaXQgd29ya3M/XG5cblxuVGhyZWUgd2F5czpcblxuMS4gRXhwcmVzc2lvbnM6IHRtcGwoJ3sgdmFsdWUgfScsIGRhdGEpLlxuICAgUmV0dXJucyB0aGUgcmVzdWx0IG9mIGV2YWx1YXRlZCBleHByZXNzaW9uIGFzIGEgcmF3IG9iamVjdC5cblxuMi4gVGVtcGxhdGVzOiB0bXBsKCdIaSB7IG5hbWUgfSB7IHN1cm5hbWUgfScsIGRhdGEpLlxuICAgUmV0dXJucyBhIHN0cmluZyB3aXRoIGV2YWx1YXRlZCBleHByZXNzaW9ucy5cblxuMy4gRmlsdGVyczogdG1wbCgneyBzaG93OiAhZG9uZSwgaGlnaGxpZ2h0OiBhY3RpdmUgfScsIGRhdGEpLlxuICAgUmV0dXJucyBhIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIHRydWVpc2gga2V5cyAobWFpbmx5XG4gICB1c2VkIGZvciBzZXR0aW5nIGh0bWwgY2xhc3NlcyksIGUuZy4gXCJzaG93IGhpZ2hsaWdodFwiLlxuXG5cbi8vIFRlbXBsYXRlIGV4YW1wbGVzXG5cbnRtcGwoJ3sgdGl0bGUgfHwgXCJVbnRpdGxlZFwiIH0nLCBkYXRhKVxudG1wbCgnUmVzdWx0cyBhcmUgeyByZXN1bHRzID8gXCJyZWFkeVwiIDogXCJsb2FkaW5nXCIgfScsIGRhdGEpXG50bXBsKCdUb2RheSBpcyB7IG5ldyBEYXRlKCkgfScsIGRhdGEpXG50bXBsKCd7IG1lc3NhZ2UubGVuZ3RoID4gMTQwICYmIFwiTWVzc2FnZSBpcyB0b28gbG9uZ1wiIH0nLCBkYXRhKVxudG1wbCgnVGhpcyBpdGVtIGdvdCB7IE1hdGgucm91bmQocmF0aW5nKSB9IHN0YXJzJywgZGF0YSlcbnRtcGwoJzxoMT57IHRpdGxlIH08L2gxPnsgYm9keSB9JywgZGF0YSlcblxuXG4vLyBGYWxzeSBleHByZXNzaW9ucyBpbiB0ZW1wbGF0ZXNcblxuSW4gdGVtcGxhdGVzIChhcyBvcHBvc2VkIHRvIHNpbmdsZSBleHByZXNzaW9ucykgYWxsIGZhbHN5IHZhbHVlc1xuZXhjZXB0IHplcm8gKHVuZGVmaW5lZC9udWxsL2ZhbHNlKSB3aWxsIGRlZmF1bHQgdG8gZW1wdHkgc3RyaW5nOlxuXG50bXBsKCd7IHVuZGVmaW5lZCB9IC0geyBmYWxzZSB9IC0geyBudWxsIH0gLSB7IDAgfScsIHt9KVxuLy8gd2lsbCByZXR1cm46IFwiIC0gLSAtIDBcIlxuXG4qL1xuXG5cbnZhciBicmFja2V0cyA9IChmdW5jdGlvbihvcmlnLCBzLCBiKSB7XG4gIHJldHVybiBmdW5jdGlvbih4KSB7XG5cbiAgICAvLyBtYWtlIHN1cmUgd2UgdXNlIHRoZSBjdXJyZW50IHNldHRpbmdcbiAgICBzID0gcmlvdC5zZXR0aW5ncy5icmFja2V0cyB8fCBvcmlnXG4gICAgaWYgKGIgIT0gcykgYiA9IHMuc3BsaXQoJyAnKVxuXG4gICAgLy8gaWYgcmVnZXhwIGdpdmVuLCByZXdyaXRlIGl0IHdpdGggY3VycmVudCBicmFja2V0cyAob25seSBpZiBkaWZmZXIgZnJvbSBkZWZhdWx0KVxuICAgIC8vIGVsc2UsIGdldCBicmFja2V0c1xuICAgIHJldHVybiB4ICYmIHgudGVzdFxuICAgICAgPyBzID09IG9yaWdcbiAgICAgICAgPyB4IDogUmVnRXhwKHguc291cmNlXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcey9nLCBiWzBdLnJlcGxhY2UoLyg/PS4pL2csICdcXFxcJykpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcfS9nLCBiWzFdLnJlcGxhY2UoLyg/PS4pL2csICdcXFxcJykpLFxuICAgICAgICAgICAgICAgICAgICB4Lmdsb2JhbCA/ICdnJyA6ICcnKVxuICAgICAgOiBiW3hdXG5cbiAgfVxufSkoJ3sgfScpXG5cblxudmFyIHRtcGwgPSAoZnVuY3Rpb24oKSB7XG5cbiAgdmFyIGNhY2hlID0ge30sXG4gICAgICByZV92YXJzID0gLyhbJ1wiXFwvXSkuKj9bXlxcXFxdXFwxfFxcLlxcdyp8XFx3Kjp8XFxiKD86KD86bmV3fHR5cGVvZnxpbnxpbnN0YW5jZW9mKSB8KD86dGhpc3x0cnVlfGZhbHNlfG51bGx8dW5kZWZpbmVkKVxcYnxmdW5jdGlvbiAqXFwoKXwoW2Etel8kXVxcdyopL2dpXG4gICAgICAgICAgICAgIC8vIFsgMSAgICAgICAgICAgICAgIF1bIDIgIF1bIDMgXVsgNCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdWyA1ICAgICAgIF1cbiAgICAgICAgICAgICAgLy8gZmluZCB2YXJpYWJsZSBuYW1lczpcbiAgICAgICAgICAgICAgLy8gMS4gc2tpcCBxdW90ZWQgc3RyaW5ncyBhbmQgcmVnZXhwczogXCJhIGJcIiwgJ2EgYicsICdhIFxcJ2JcXCcnLCAvYSBiL1xuICAgICAgICAgICAgICAvLyAyLiBza2lwIG9iamVjdCBwcm9wZXJ0aWVzOiAubmFtZVxuICAgICAgICAgICAgICAvLyAzLiBza2lwIG9iamVjdCBsaXRlcmFsczogbmFtZTpcbiAgICAgICAgICAgICAgLy8gNC4gc2tpcCBqYXZhc2NyaXB0IGtleXdvcmRzXG4gICAgICAgICAgICAgIC8vIDUuIG1hdGNoIHZhciBuYW1lXG5cbiAgLy8gYnVpbGQgYSB0ZW1wbGF0ZSAob3IgZ2V0IGl0IGZyb20gY2FjaGUpLCByZW5kZXIgd2l0aCBkYXRhXG4gIHJldHVybiBmdW5jdGlvbihzdHIsIGRhdGEpIHtcbiAgICByZXR1cm4gc3RyICYmIChjYWNoZVtzdHJdID0gY2FjaGVbc3RyXSB8fCB0bXBsKHN0cikpKGRhdGEpXG4gIH1cblxuXG4gIC8vIGNyZWF0ZSBhIHRlbXBsYXRlIGluc3RhbmNlXG5cbiAgZnVuY3Rpb24gdG1wbChzLCBwKSB7XG5cbiAgICAvLyBkZWZhdWx0IHRlbXBsYXRlIHN0cmluZyB0byB7fVxuICAgIHMgPSAocyB8fCAoYnJhY2tldHMoMCkgKyBicmFja2V0cygxKSkpXG5cbiAgICAgIC8vIHRlbXBvcmFyaWx5IGNvbnZlcnQgXFx7IGFuZCBcXH0gdG8gYSBub24tY2hhcmFjdGVyXG4gICAgICAucmVwbGFjZShicmFja2V0cygvXFxcXHsvZyksICdcXHVGRkYwJylcbiAgICAgIC5yZXBsYWNlKGJyYWNrZXRzKC9cXFxcfS9nKSwgJ1xcdUZGRjEnKVxuXG4gICAgLy8gc3BsaXQgc3RyaW5nIHRvIGV4cHJlc3Npb24gYW5kIG5vbi1leHByZXNpb24gcGFydHNcbiAgICBwID0gc3BsaXQocywgYnJhY2tldHMoL3tbXFxzXFxTXSo/fS9nKSlcblxuICAgIHJldHVybiBuZXcgRnVuY3Rpb24oJ2QnLCAncmV0dXJuICcgKyAoXG5cbiAgICAgIC8vIGlzIGl0IGEgc2luZ2xlIGV4cHJlc3Npb24gb3IgYSB0ZW1wbGF0ZT8gaS5lLiB7eH0gb3IgPGI+e3h9PC9iPlxuICAgICAgIXBbMF0gJiYgIXBbMl0gJiYgIXBbM11cblxuICAgICAgICAvLyBpZiBleHByZXNzaW9uLCBldmFsdWF0ZSBpdFxuICAgICAgICA/IGV4cHIocFsxXSlcblxuICAgICAgICAvLyBpZiB0ZW1wbGF0ZSwgZXZhbHVhdGUgYWxsIGV4cHJlc3Npb25zIGluIGl0XG4gICAgICAgIDogJ1snICsgcC5tYXAoZnVuY3Rpb24ocywgaSkge1xuXG4gICAgICAgICAgICAvLyBpcyBpdCBhbiBleHByZXNzaW9uIG9yIGEgc3RyaW5nIChldmVyeSBzZWNvbmQgcGFydCBpcyBhbiBleHByZXNzaW9uKVxuICAgICAgICAgIHJldHVybiBpICUgMlxuXG4gICAgICAgICAgICAgIC8vIGV2YWx1YXRlIHRoZSBleHByZXNzaW9uc1xuICAgICAgICAgICAgICA/IGV4cHIocywgdHJ1ZSlcblxuICAgICAgICAgICAgICAvLyBwcm9jZXNzIHN0cmluZyBwYXJ0cyBvZiB0aGUgdGVtcGxhdGU6XG4gICAgICAgICAgICAgIDogJ1wiJyArIHNcblxuICAgICAgICAgICAgICAgICAgLy8gcHJlc2VydmUgbmV3IGxpbmVzXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxuL2csICdcXFxcbicpXG5cbiAgICAgICAgICAgICAgICAgIC8vIGVzY2FwZSBxdW90ZXNcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJylcblxuICAgICAgICAgICAgICAgICsgJ1wiJ1xuXG4gICAgICAgIH0pLmpvaW4oJywnKSArICddLmpvaW4oXCJcIiknXG4gICAgICApXG5cbiAgICAgIC8vIGJyaW5nIGVzY2FwZWQgeyBhbmQgfSBiYWNrXG4gICAgICAucmVwbGFjZSgvXFx1RkZGMC9nLCBicmFja2V0cygwKSlcbiAgICAgIC5yZXBsYWNlKC9cXHVGRkYxL2csIGJyYWNrZXRzKDEpKVxuXG4gICAgKyAnOycpXG5cbiAgfVxuXG5cbiAgLy8gcGFyc2UgeyAuLi4gfSBleHByZXNzaW9uXG5cbiAgZnVuY3Rpb24gZXhwcihzLCBuKSB7XG4gICAgcyA9IHNcblxuICAgICAgLy8gY29udmVydCBuZXcgbGluZXMgdG8gc3BhY2VzXG4gICAgICAucmVwbGFjZSgvXFxuL2csICcgJylcblxuICAgICAgLy8gdHJpbSB3aGl0ZXNwYWNlLCBjdXJseSBicmFja2V0cywgc3RyaXAgY29tbWVudHNcbiAgICAgIC5yZXBsYWNlKGJyYWNrZXRzKC9eW3sgXSt8WyB9XSskfFxcL1xcKi4rP1xcKlxcLy9nKSwgJycpXG5cbiAgICAvLyBpcyBpdCBhbiBvYmplY3QgbGl0ZXJhbD8gaS5lLiB7IGtleSA6IHZhbHVlIH1cbiAgICByZXR1cm4gL15cXHMqW1xcdy0gXCInXSsgKjovLnRlc3QocylcblxuICAgICAgLy8gaWYgb2JqZWN0IGxpdGVyYWwsIHJldHVybiB0cnVlaXNoIGtleXNcbiAgICAgIC8vIGUuZy46IHsgc2hvdzogaXNPcGVuKCksIGRvbmU6IGl0ZW0uZG9uZSB9IC0+IFwic2hvdyBkb25lXCJcbiAgICAgID8gJ1snICsgcy5yZXBsYWNlKC9cXFcqKFtcXHctIF0rKVxcVyo6KFteLF0rKS9nLCBmdW5jdGlvbihfLCBrLCB2KSB7XG5cbiAgICAgICAgcmV0dXJuIHYucmVwbGFjZSgvW14mfD0hPjxdKy9nLCB3cmFwKSArICc/XCInICsgay50cmltKCkgKyAnXCI6XCJcIiwnXG5cbiAgICAgIH0pICsgJ10uam9pbihcIiBcIikudHJpbSgpJ1xuXG4gICAgICAvLyBpZiBqcyBleHByZXNzaW9uLCBldmFsdWF0ZSBhcyBqYXZhc2NyaXB0XG4gICAgICA6IHdyYXAocywgbilcblxuICB9XG5cblxuICAvLyBleGVjdXRlIGpzIHcvbyBicmVha2luZyBvbiBlcnJvcnMgb3IgdW5kZWZpbmVkIHZhcnNcblxuICBmdW5jdGlvbiB3cmFwKHMsIG5vbnVsbCkge1xuICAgIHMgPSBzLnRyaW0oKVxuICAgIHJldHVybiAhcyA/ICcnIDogJyhmdW5jdGlvbih2KXt0cnl7dj0nXG5cbiAgICAgICAgLy8gcHJlZml4IHZhcnMgKG5hbWUgPT4gZGF0YS5uYW1lKVxuICAgICAgICArIChzLnJlcGxhY2UocmVfdmFycywgZnVuY3Rpb24ocywgXywgdikgeyByZXR1cm4gdiA/ICcoZC4nK3YrJz09PXVuZGVmaW5lZD93aW5kb3cuJyt2Kyc6ZC4nK3YrJyknIDogcyB9KVxuXG4gICAgICAgICAgLy8gYnJlYWsgdGhlIGV4cHJlc3Npb24gaWYgaXRzIGVtcHR5IChyZXN1bHRpbmcgaW4gdW5kZWZpbmVkIHZhbHVlKVxuICAgICAgICAgIHx8ICd4JylcblxuICAgICAgKyAnfWZpbmFsbHl7cmV0dXJuICdcblxuICAgICAgICAvLyBkZWZhdWx0IHRvIGVtcHR5IHN0cmluZyBmb3IgZmFsc3kgdmFsdWVzIGV4Y2VwdCB6ZXJvXG4gICAgICAgICsgKG5vbnVsbCA9PT0gdHJ1ZSA/ICchdiYmdiE9PTA/XCJcIjp2JyA6ICd2JylcblxuICAgICAgKyAnfX0pLmNhbGwoZCknXG4gIH1cblxuXG4gIC8vIGEgc3Vic3RpdHV0ZSBmb3Igc3RyLnNwbGl0KHJlKSBmb3IgSUU4XG4gIC8vIGJlY2F1c2UgSUU4IGRvZXNuJ3Qgc3VwcG9ydCBjYXB0dXJpbmcgcGFyZW50aGVzaXMgaW4gaXRcblxuICBmdW5jdGlvbiBzcGxpdChzLCByZSkge1xuICAgIHZhciBwYXJ0cyA9IFtdLCBsYXN0ID0gMFxuICAgIHMucmVwbGFjZShyZSwgZnVuY3Rpb24obSwgaSkge1xuICAgICAgLy8gcHVzaCBtYXRjaGVkIGV4cHJlc3Npb24gYW5kIHBhcnQgYmVmb3JlIGl0XG4gICAgICBwYXJ0cy5wdXNoKHMuc2xpY2UobGFzdCwgaSksIG0pXG4gICAgICBsYXN0ID0gaSArIG0ubGVuZ3RoXG4gICAgfSlcbiAgICAvLyBwdXNoIHRoZSByZW1haW5pbmcgcGFydFxuICAgIHJldHVybiBwYXJ0cy5jb25jYXQocy5zbGljZShsYXN0KSlcbiAgfVxuXG59KSgpXG5cbi8vIHsga2V5LCBpIGluIGl0ZW1zfSAtPiB7IGtleSwgaSwgaXRlbXMgfVxuZnVuY3Rpb24gbG9vcEtleXMoZXhwcikge1xuICB2YXIgcmV0ID0geyB2YWw6IGV4cHIgfSxcbiAgICAgIGVscyA9IGV4cHIuc3BsaXQoL1xccytpblxccysvKVxuXG4gIGlmIChlbHNbMV0pIHtcbiAgICByZXQudmFsID0gYnJhY2tldHMoMCkgKyBlbHNbMV1cbiAgICBlbHMgPSBlbHNbMF0uc2xpY2UoYnJhY2tldHMoMCkubGVuZ3RoKS50cmltKCkuc3BsaXQoLyxcXHMqLylcbiAgICByZXQua2V5ID0gZWxzWzBdXG4gICAgcmV0LnBvcyA9IGVsc1sxXVxuICB9XG5cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBta2l0ZW0oZXhwciwga2V5LCB2YWwpIHtcbiAgdmFyIGl0ZW0gPSB7fVxuICBpdGVtW2V4cHIua2V5XSA9IGtleVxuICBpZiAoZXhwci5wb3MpIGl0ZW1bZXhwci5wb3NdID0gdmFsXG4gIHJldHVybiBpdGVtXG59XG5cblxuLyogQmV3YXJlOiBoZWF2eSBzdHVmZiAqL1xuZnVuY3Rpb24gX2VhY2goZG9tLCBwYXJlbnQsIGV4cHIpIHtcblxuICByZW1BdHRyKGRvbSwgJ2VhY2gnKVxuXG4gIHZhciB0ZW1wbGF0ZSA9IGRvbS5vdXRlckhUTUwsXG4gICAgICBwcmV2ID0gZG9tLnByZXZpb3VzU2libGluZyxcbiAgICAgIHJvb3QgPSBkb20ucGFyZW50Tm9kZSxcbiAgICAgIHJlbmRlcmVkID0gW10sXG4gICAgICB0YWdzID0gW10sXG4gICAgICBjaGVja3N1bVxuXG4gIGV4cHIgPSBsb29wS2V5cyhleHByKVxuXG4gIGZ1bmN0aW9uIGFkZChwb3MsIGl0ZW0sIHRhZykge1xuICAgIHJlbmRlcmVkLnNwbGljZShwb3MsIDAsIGl0ZW0pXG4gICAgdGFncy5zcGxpY2UocG9zLCAwLCB0YWcpXG4gIH1cblxuICAvLyBjbGVhbiB0ZW1wbGF0ZSBjb2RlXG4gIHBhcmVudC5vbmUoJ3VwZGF0ZScsIGZ1bmN0aW9uKCkge1xuICAgIHJvb3QucmVtb3ZlQ2hpbGQoZG9tKVxuXG4gIH0pLm9uZSgncHJlbW91bnQnLCBmdW5jdGlvbigpIHtcbiAgICBpZiAocm9vdC5zdHViKSByb290ID0gcGFyZW50LnJvb3RcblxuICB9KS5vbigndXBkYXRlJywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgaXRlbXMgPSB0bXBsKGV4cHIudmFsLCBwYXJlbnQpXG4gICAgaWYgKCFpdGVtcykgcmV0dXJuXG5cbiAgICAvLyBvYmplY3QgbG9vcC4gYW55IGNoYW5nZXMgY2F1c2UgZnVsbCByZWRyYXdcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICB2YXIgdGVzdHN1bSA9IEpTT04uc3RyaW5naWZ5KGl0ZW1zKVxuICAgICAgaWYgKHRlc3RzdW0gPT0gY2hlY2tzdW0pIHJldHVyblxuICAgICAgY2hlY2tzdW0gPSB0ZXN0c3VtXG5cbiAgICAgIC8vIGNsZWFyIG9sZCBpdGVtc1xuICAgICAgZWFjaCh0YWdzLCBmdW5jdGlvbih0YWcpIHsgdGFnLnVubW91bnQoKSB9KVxuICAgICAgcmVuZGVyZWQgPSBbXVxuICAgICAgdGFncyA9IFtdXG5cbiAgICAgIGl0ZW1zID0gT2JqZWN0LmtleXMoaXRlbXMpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgcmV0dXJuIG1raXRlbShleHByLCBrZXksIGl0ZW1zW2tleV0pXG4gICAgICB9KVxuXG4gICAgfVxuXG4gICAgLy8gdW5tb3VudCByZWR1bmRhbnRcbiAgICBlYWNoKGFyckRpZmYocmVuZGVyZWQsIGl0ZW1zKSwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgdmFyIHBvcyA9IHJlbmRlcmVkLmluZGV4T2YoaXRlbSksXG4gICAgICAgICAgdGFnID0gdGFnc1twb3NdXG5cbiAgICAgIGlmICh0YWcpIHtcbiAgICAgICAgdGFnLnVubW91bnQoKVxuICAgICAgICByZW5kZXJlZC5zcGxpY2UocG9zLCAxKVxuICAgICAgICB0YWdzLnNwbGljZShwb3MsIDEpXG4gICAgICB9XG5cbiAgICB9KVxuXG4gICAgLy8gbW91bnQgbmV3IC8gcmVvcmRlclxuICAgIHZhciBub2RlcyA9IHJvb3QuY2hpbGROb2RlcyxcbiAgICAgICAgcHJldl9pbmRleCA9IFtdLmluZGV4T2YuY2FsbChub2RlcywgcHJldilcblxuICAgIGVhY2goaXRlbXMsIGZ1bmN0aW9uKGl0ZW0sIGkpIHtcblxuICAgICAgLy8gc3RhcnQgaW5kZXggc2VhcmNoIGZyb20gcG9zaXRpb24gYmFzZWQgb24gdGhlIGN1cnJlbnQgaVxuICAgICAgdmFyIHBvcyA9IGl0ZW1zLmluZGV4T2YoaXRlbSwgaSksXG4gICAgICAgICAgb2xkUG9zID0gcmVuZGVyZWQuaW5kZXhPZihpdGVtLCBpKVxuXG4gICAgICAvLyBpZiBub3QgZm91bmQsIHNlYXJjaCBiYWNrd2FyZHMgZnJvbSBjdXJyZW50IGkgcG9zaXRpb25cbiAgICAgIHBvcyA8IDAgJiYgKHBvcyA9IGl0ZW1zLmxhc3RJbmRleE9mKGl0ZW0sIGkpKVxuICAgICAgb2xkUG9zIDwgMCAmJiAob2xkUG9zID0gcmVuZGVyZWQubGFzdEluZGV4T2YoaXRlbSwgaSkpXG5cbiAgICAgIC8vIG1vdW50IG5ld1xuICAgICAgaWYgKG9sZFBvcyA8IDApIHtcbiAgICAgICAgaWYgKCFjaGVja3N1bSAmJiBleHByLmtleSkgaXRlbSA9IG1raXRlbShleHByLCBpdGVtLCBwb3MpXG5cbiAgICAgICAgdmFyIHRhZyA9IG5ldyBUYWcoeyB0bXBsOiB0ZW1wbGF0ZSB9LCB7XG4gICAgICAgICAgYmVmb3JlOiBub2Rlc1twcmV2X2luZGV4ICsgMSArIHBvc10sXG4gICAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgICAgcm9vdDogcm9vdCxcbiAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGFnLm1vdW50KClcblxuICAgICAgICByZXR1cm4gYWRkKHBvcywgaXRlbSwgdGFnKVxuICAgICAgfVxuXG4gICAgICAvLyBjaGFuZ2UgcG9zIHZhbHVlXG4gICAgICBpZiAoZXhwci5wb3MgJiYgdGFnc1tvbGRQb3NdW2V4cHIucG9zXSAhPSBwb3MpIHtcbiAgICAgICAgdGFnc1tvbGRQb3NdLm9uZSgndXBkYXRlJywgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIGl0ZW1bZXhwci5wb3NdID0gcG9zXG4gICAgICAgIH0pXG4gICAgICAgIHRhZ3Nbb2xkUG9zXS51cGRhdGUoKVxuICAgICAgfVxuXG4gICAgICAvLyByZW9yZGVyXG4gICAgICBpZiAocG9zICE9IG9sZFBvcykge1xuICAgICAgICByb290Lmluc2VydEJlZm9yZShub2Rlc1twcmV2X2luZGV4ICsgb2xkUG9zICsgMV0sIG5vZGVzW3ByZXZfaW5kZXggKyBwb3MgKyAxXSlcbiAgICAgICAgcmV0dXJuIGFkZChwb3MsIHJlbmRlcmVkLnNwbGljZShvbGRQb3MsIDEpWzBdLCB0YWdzLnNwbGljZShvbGRQb3MsIDEpWzBdKVxuICAgICAgfVxuXG4gICAgfSlcblxuICAgIHJlbmRlcmVkID0gaXRlbXMuc2xpY2UoKVxuXG4gIH0pXG5cbn1cblxuXG5mdW5jdGlvbiBwYXJzZU5hbWVkRWxlbWVudHMocm9vdCwgcGFyZW50LCBjaGlsZF90YWdzKSB7XG5cbiAgd2Fsayhyb290LCBmdW5jdGlvbihkb20pIHtcbiAgICBpZiAoZG9tLm5vZGVUeXBlID09IDEpIHtcblxuICAgICAgLy8gY3VzdG9tIGNoaWxkIHRhZ1xuICAgICAgdmFyIGNoaWxkID0gZ2V0VGFnKGRvbSlcblxuICAgICAgaWYgKGNoaWxkICYmICFkb20uZ2V0QXR0cmlidXRlKCdlYWNoJykpIHtcbiAgICAgICAgdmFyIHRhZyA9IG5ldyBUYWcoY2hpbGQsIHsgcm9vdDogZG9tLCBwYXJlbnQ6IHBhcmVudCB9KVxuICAgICAgICBwYXJlbnQudGFnc1tkb20uZ2V0QXR0cmlidXRlKCduYW1lJykgfHwgY2hpbGQubmFtZV0gPSB0YWdcbiAgICAgICAgY2hpbGRfdGFncy5wdXNoKHRhZylcbiAgICAgIH1cblxuICAgICAgZWFjaChkb20uYXR0cmlidXRlcywgZnVuY3Rpb24oYXR0cikge1xuICAgICAgICBpZiAoL14obmFtZXxpZCkkLy50ZXN0KGF0dHIubmFtZSkpIHBhcmVudFthdHRyLnZhbHVlXSA9IGRvbVxuICAgICAgfSlcbiAgICB9XG5cbiAgfSlcblxufVxuXG5mdW5jdGlvbiBwYXJzZUV4cHJlc3Npb25zKHJvb3QsIHRhZywgZXhwcmVzc2lvbnMpIHtcblxuICBmdW5jdGlvbiBhZGRFeHByKGRvbSwgdmFsLCBleHRyYSkge1xuICAgIGlmICh2YWwuaW5kZXhPZihicmFja2V0cygwKSkgPj0gMCkge1xuICAgICAgdmFyIGV4cHIgPSB7IGRvbTogZG9tLCBleHByOiB2YWwgfVxuICAgICAgZXhwcmVzc2lvbnMucHVzaChleHRlbmQoZXhwciwgZXh0cmEpKVxuICAgIH1cbiAgfVxuXG4gIHdhbGsocm9vdCwgZnVuY3Rpb24oZG9tKSB7XG4gICAgdmFyIHR5cGUgPSBkb20ubm9kZVR5cGVcblxuICAgIC8vIHRleHQgbm9kZVxuICAgIGlmICh0eXBlID09IDMgJiYgZG9tLnBhcmVudE5vZGUudGFnTmFtZSAhPSAnU1RZTEUnKSBhZGRFeHByKGRvbSwgZG9tLm5vZGVWYWx1ZSlcbiAgICBpZiAodHlwZSAhPSAxKSByZXR1cm5cblxuICAgIC8qIGVsZW1lbnQgKi9cblxuICAgIC8vIGxvb3BcbiAgICB2YXIgYXR0ciA9IGRvbS5nZXRBdHRyaWJ1dGUoJ2VhY2gnKVxuICAgIGlmIChhdHRyKSB7IF9lYWNoKGRvbSwgdGFnLCBhdHRyKTsgcmV0dXJuIGZhbHNlIH1cblxuICAgIC8vIGF0dHJpYnV0ZSBleHByZXNzaW9uc1xuICAgIGVhY2goZG9tLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGF0dHIpIHtcbiAgICAgIHZhciBuYW1lID0gYXR0ci5uYW1lLFxuICAgICAgICAgIGJvb2wgPSBuYW1lLnNwbGl0KCdfXycpWzFdXG5cbiAgICAgIGFkZEV4cHIoZG9tLCBhdHRyLnZhbHVlLCB7IGF0dHI6IGJvb2wgfHwgbmFtZSwgYm9vbDogYm9vbCB9KVxuICAgICAgaWYgKGJvb2wpIHsgcmVtQXR0cihkb20sIG5hbWUpOyByZXR1cm4gZmFsc2UgfVxuXG4gICAgfSlcblxuICAgIC8vIHNraXAgY3VzdG9tIHRhZ3NcbiAgICBpZiAoZ2V0VGFnKGRvbSkpIHJldHVybiBmYWxzZVxuXG4gIH0pXG5cbn1cblxuZnVuY3Rpb24gVGFnKGltcGwsIGNvbmYpIHtcblxuICB2YXIgc2VsZiA9IHJpb3Qub2JzZXJ2YWJsZSh0aGlzKSxcbiAgICAgIG9wdHMgPSBpbmhlcml0KGNvbmYub3B0cykgfHwge30sXG4gICAgICBkb20gPSBta2RvbShpbXBsLnRtcGwpLFxuICAgICAgcGFyZW50ID0gY29uZi5wYXJlbnQsXG4gICAgICBleHByZXNzaW9ucyA9IFtdLFxuICAgICAgY2hpbGRfdGFncyA9IFtdLFxuICAgICAgcm9vdCA9IGNvbmYucm9vdCxcbiAgICAgIGl0ZW0gPSBjb25mLml0ZW0sXG4gICAgICBmbiA9IGltcGwuZm4sXG4gICAgICBhdHRyID0ge30sXG4gICAgICBsb29wX2RvbVxuXG4gIGlmIChmbiAmJiByb290LnJpb3QpIHJldHVyblxuICByb290LnJpb3QgPSB0cnVlXG5cbiAgZXh0ZW5kKHRoaXMsIHsgcGFyZW50OiBwYXJlbnQsIHJvb3Q6IHJvb3QsIG9wdHM6IG9wdHMsIHRhZ3M6IHt9IH0sIGl0ZW0pXG5cbiAgLy8gZ3JhYiBhdHRyaWJ1dGVzXG4gIGVhY2gocm9vdC5hdHRyaWJ1dGVzLCBmdW5jdGlvbihlbCkge1xuICAgIGF0dHJbZWwubmFtZV0gPSBlbC52YWx1ZVxuICB9KVxuXG4gIC8vIG9wdGlvbnNcbiAgZnVuY3Rpb24gdXBkYXRlT3B0cyhyZW1fYXR0cikge1xuICAgIGVhY2goT2JqZWN0LmtleXMoYXR0ciksIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIG9wdHNbbmFtZV0gPSB0bXBsKGF0dHJbbmFtZV0sIHBhcmVudCB8fCBzZWxmKVxuICAgIH0pXG4gIH1cblxuICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKGRhdGEsIGluaXQpIHtcbiAgICBleHRlbmQoc2VsZiwgZGF0YSwgaXRlbSlcbiAgICB1cGRhdGVPcHRzKClcbiAgICBzZWxmLnRyaWdnZXIoJ3VwZGF0ZScsIGl0ZW0pXG4gICAgdXBkYXRlKGV4cHJlc3Npb25zLCBzZWxmLCBpdGVtKVxuICAgIHNlbGYudHJpZ2dlcigndXBkYXRlZCcpXG4gIH1cblxuICB0aGlzLm1vdW50ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB1cGRhdGVPcHRzKClcblxuICAgIC8vIGluaXRpYWxpYXRpb25cbiAgICBmbiAmJiBmbi5jYWxsKHNlbGYsIG9wdHMpXG5cbiAgICB0b2dnbGUodHJ1ZSlcblxuICAgIC8vIHBhcnNlIGxheW91dCBhZnRlciBpbml0LiBmbiBtYXkgY2FsY3VsYXRlIGFyZ3MgZm9yIG5lc3RlZCBjdXN0b20gdGFnc1xuICAgIHBhcnNlRXhwcmVzc2lvbnMoZG9tLCBzZWxmLCBleHByZXNzaW9ucylcblxuICAgIHNlbGYudXBkYXRlKClcblxuICAgIC8vIGludGVybmFsIHVzZSBvbmx5LCBmaXhlcyAjNDAzXG4gICAgc2VsZi50cmlnZ2VyKCdwcmVtb3VudCcpXG5cbiAgICBpZiAoZm4pIHtcbiAgICAgIHdoaWxlIChkb20uZmlyc3RDaGlsZCkgcm9vdC5hcHBlbmRDaGlsZChkb20uZmlyc3RDaGlsZClcblxuICAgIH0gZWxzZSB7XG4gICAgICBsb29wX2RvbSA9IGRvbS5maXJzdENoaWxkXG4gICAgICByb290Lmluc2VydEJlZm9yZShsb29wX2RvbSwgY29uZi5iZWZvcmUgfHwgbnVsbCkgLy8gbnVsbCBuZWVkZWQgZm9yIElFOFxuICAgIH1cblxuICAgIGlmIChyb290LnN0dWIpIHNlbGYucm9vdCA9IHJvb3QgPSBwYXJlbnQucm9vdFxuICAgIHNlbGYudHJpZ2dlcignbW91bnQnKVxuXG4gIH1cblxuXG4gIHRoaXMudW5tb3VudCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IGZuID8gcm9vdCA6IGxvb3BfZG9tLFxuICAgICAgICBwID0gZWwucGFyZW50Tm9kZVxuXG4gICAgaWYgKHApIHtcbiAgICAgIGlmIChwYXJlbnQpIHAucmVtb3ZlQ2hpbGQoZWwpXG4gICAgICBlbHNlIHdoaWxlIChyb290LmZpcnN0Q2hpbGQpIHJvb3QucmVtb3ZlQ2hpbGQocm9vdC5maXJzdENoaWxkKVxuICAgICAgdG9nZ2xlKClcbiAgICAgIHNlbGYudHJpZ2dlcigndW5tb3VudCcpXG4gICAgICBzZWxmLm9mZignKicpXG4gICAgICBkZWxldGUgcm9vdC5yaW90XG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGUoaXNfbW91bnQpIHtcblxuICAgIC8vIG1vdW50L3VubW91bnQgY2hpbGRyZW5cbiAgICBlYWNoKGNoaWxkX3RhZ3MsIGZ1bmN0aW9uKGNoaWxkKSB7IGNoaWxkW2lzX21vdW50ID8gJ21vdW50JyA6ICd1bm1vdW50J10oKSB9KVxuXG4gICAgLy8gbGlzdGVuL3VubGlzdGVuIHBhcmVudCAoZXZlbnRzIGZsb3cgb25lIHdheSBmcm9tIHBhcmVudCB0byBjaGlsZHJlbilcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICB2YXIgZXZ0ID0gaXNfbW91bnQgPyAnb24nIDogJ29mZidcbiAgICAgIHBhcmVudFtldnRdKCd1cGRhdGUnLCBzZWxmLnVwZGF0ZSlbZXZ0XSgndW5tb3VudCcsIHNlbGYudW5tb3VudClcbiAgICB9XG4gIH1cblxuICAvLyBuYW1lZCBlbGVtZW50cyBhdmFpbGFibGUgZm9yIGZuXG4gIHBhcnNlTmFtZWRFbGVtZW50cyhkb20sIHRoaXMsIGNoaWxkX3RhZ3MpXG5cblxufVxuXG5mdW5jdGlvbiBzZXRFdmVudEhhbmRsZXIobmFtZSwgaGFuZGxlciwgZG9tLCB0YWcsIGl0ZW0pIHtcblxuICBkb21bbmFtZV0gPSBmdW5jdGlvbihlKSB7XG5cbiAgICAvLyBjcm9zcyBicm93c2VyIGV2ZW50IGZpeFxuICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudFxuICAgIGUud2hpY2ggPSBlLndoaWNoIHx8IGUuY2hhckNvZGUgfHwgZS5rZXlDb2RlXG4gICAgZS50YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnRcbiAgICBlLmN1cnJlbnRUYXJnZXQgPSBkb21cbiAgICBlLml0ZW0gPSBpdGVtXG5cbiAgICAvLyBwcmV2ZW50IGRlZmF1bHQgYmVoYXZpb3VyIChieSBkZWZhdWx0KVxuICAgIGlmIChoYW5kbGVyLmNhbGwodGFnLCBlKSAhPT0gdHJ1ZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCAmJiBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZVxuICAgIH1cblxuICAgIHZhciBlbCA9IGl0ZW0gPyB0YWcucGFyZW50IDogdGFnXG4gICAgZWwudXBkYXRlKClcblxuICB9XG5cbn1cblxuLy8gdXNlZCBieSBpZi0gYXR0cmlidXRlXG5mdW5jdGlvbiBpbnNlcnRUbyhyb290LCBub2RlLCBiZWZvcmUpIHtcbiAgaWYgKHJvb3QpIHtcbiAgICByb290Lmluc2VydEJlZm9yZShiZWZvcmUsIG5vZGUpXG4gICAgcm9vdC5yZW1vdmVDaGlsZChub2RlKVxuICB9XG59XG5cbi8vIGl0ZW0gPSBjdXJyZW50bHkgbG9vcGVkIGl0ZW1cbmZ1bmN0aW9uIHVwZGF0ZShleHByZXNzaW9ucywgdGFnLCBpdGVtKSB7XG5cbiAgZWFjaChleHByZXNzaW9ucywgZnVuY3Rpb24oZXhwcikge1xuXG4gICAgdmFyIGRvbSA9IGV4cHIuZG9tLFxuICAgICAgICBhdHRyX25hbWUgPSBleHByLmF0dHIsXG4gICAgICAgIHZhbHVlID0gdG1wbChleHByLmV4cHIsIHRhZyksXG4gICAgICAgIHBhcmVudCA9IGV4cHIuZG9tLnBhcmVudE5vZGVcblxuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9ICcnXG5cbiAgICAvLyBsZWF2ZSBvdXQgcmlvdC0gcHJlZml4ZXMgZnJvbSBzdHJpbmdzIGluc2lkZSB0ZXh0YXJlYVxuICAgIGlmIChwYXJlbnQgJiYgcGFyZW50LnRhZ05hbWUgPT0gJ1RFWFRBUkVBJykgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9yaW90LS9nLCAnJylcblxuICAgIC8vIG5vIGNoYW5nZVxuICAgIGlmIChleHByLnZhbHVlID09PSB2YWx1ZSkgcmV0dXJuXG4gICAgZXhwci52YWx1ZSA9IHZhbHVlXG5cbiAgICAvLyB0ZXh0IG5vZGVcbiAgICBpZiAoIWF0dHJfbmFtZSkgcmV0dXJuIGRvbS5ub2RlVmFsdWUgPSB2YWx1ZVxuXG4gICAgLy8gcmVtb3ZlIG9yaWdpbmFsIGF0dHJpYnV0ZVxuICAgIHJlbUF0dHIoZG9tLCBhdHRyX25hbWUpXG5cbiAgICAvLyBldmVudCBoYW5kbGVyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBzZXRFdmVudEhhbmRsZXIoYXR0cl9uYW1lLCB2YWx1ZSwgZG9tLCB0YWcsIGl0ZW0pXG5cbiAgICAvLyBpZi0gY29uZGl0aW9uYWxcbiAgICB9IGVsc2UgaWYgKGF0dHJfbmFtZSA9PSAnaWYnKSB7XG4gICAgICB2YXIgc3R1YiA9IGV4cHIuc3R1YlxuXG4gICAgICAvLyBhZGQgdG8gRE9NXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgc3R1YiAmJiBpbnNlcnRUbyhzdHViLnBhcmVudE5vZGUsIHN0dWIsIGRvbSlcblxuICAgICAgLy8gcmVtb3ZlIGZyb20gRE9NXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHViID0gZXhwci5zdHViID0gc3R1YiB8fCBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJylcbiAgICAgICAgaW5zZXJ0VG8oZG9tLnBhcmVudE5vZGUsIGRvbSwgc3R1YilcbiAgICAgIH1cblxuICAgIC8vIHNob3cgLyBoaWRlXG4gICAgfSBlbHNlIGlmICgvXihzaG93fGhpZGUpJC8udGVzdChhdHRyX25hbWUpKSB7XG4gICAgICBpZiAoYXR0cl9uYW1lID09ICdoaWRlJykgdmFsdWUgPSAhdmFsdWVcbiAgICAgIGRvbS5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnJyA6ICdub25lJ1xuXG4gICAgLy8gZmllbGQgdmFsdWVcbiAgICB9IGVsc2UgaWYgKGF0dHJfbmFtZSA9PSAndmFsdWUnKSB7XG4gICAgICBkb20udmFsdWUgPSB2YWx1ZVxuXG4gICAgLy8gPGltZyBzcmM9XCJ7IGV4cHIgfVwiPlxuICAgIH0gZWxzZSBpZiAoYXR0cl9uYW1lLnNsaWNlKDAsIDUpID09ICdyaW90LScpIHtcbiAgICAgIGF0dHJfbmFtZSA9IGF0dHJfbmFtZS5zbGljZSg1KVxuICAgICAgdmFsdWUgPyBkb20uc2V0QXR0cmlidXRlKGF0dHJfbmFtZSwgdmFsdWUpIDogcmVtQXR0cihkb20sIGF0dHJfbmFtZSlcblxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZXhwci5ib29sKSB7XG4gICAgICAgIGRvbVthdHRyX25hbWVdID0gdmFsdWVcbiAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuXG4gICAgICAgIHZhbHVlID0gYXR0cl9uYW1lXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT0gJ29iamVjdCcpIGRvbS5zZXRBdHRyaWJ1dGUoYXR0cl9uYW1lLCB2YWx1ZSlcblxuICAgIH1cblxuICB9KVxuXG59XG5mdW5jdGlvbiBlYWNoKGVscywgZm4pIHtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IChlbHMgfHwgW10pLmxlbmd0aCwgZWw7IGkgPCBsZW47IGkrKykge1xuICAgIGVsID0gZWxzW2ldXG4gICAgLy8gcmV0dXJuIGZhbHNlIC0+IHJlb212ZSBjdXJyZW50IGl0ZW0gZHVyaW5nIGxvb3BcbiAgICBpZiAoZWwgIT0gbnVsbCAmJiBmbihlbCwgaSkgPT09IGZhbHNlKSBpLS1cbiAgfVxuICByZXR1cm4gZWxzXG59XG5cbmZ1bmN0aW9uIHJlbUF0dHIoZG9tLCBuYW1lKSB7XG4gIGRvbS5yZW1vdmVBdHRyaWJ1dGUobmFtZSlcbn1cblxuLy8gbWF4IDIgZnJvbSBvYmplY3RzIGFsbG93ZWRcbmZ1bmN0aW9uIGV4dGVuZChvYmosIGZyb20sIGZyb20yKSB7XG4gIGZyb20gJiYgZWFjaChPYmplY3Qua2V5cyhmcm9tKSwgZnVuY3Rpb24oa2V5KSB7XG4gICAgb2JqW2tleV0gPSBmcm9tW2tleV1cbiAgfSlcbiAgcmV0dXJuIGZyb20yID8gZXh0ZW5kKG9iaiwgZnJvbTIpIDogb2JqXG59XG5cbmZ1bmN0aW9uIG1rZG9tKHRlbXBsYXRlKSB7XG4gIHZhciB0YWdfbmFtZSA9IHRlbXBsYXRlLnRyaW0oKS5zbGljZSgxLCAzKS50b0xvd2VyQ2FzZSgpLFxuICAgICAgcm9vdF90YWcgPSAvdGR8dGgvLnRlc3QodGFnX25hbWUpID8gJ3RyJyA6IHRhZ19uYW1lID09ICd0cicgPyAndGJvZHknIDogJ2RpdicsXG4gICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQocm9vdF90YWcpXG5cbiAgZWwuc3R1YiA9IHRydWVcbiAgZWwuaW5uZXJIVE1MID0gdGVtcGxhdGVcbiAgcmV0dXJuIGVsXG59XG5cbmZ1bmN0aW9uIHdhbGsoZG9tLCBmbikge1xuICBpZiAoZG9tKSB7XG4gICAgaWYgKGZuKGRvbSkgPT09IGZhbHNlKSB3YWxrKGRvbS5uZXh0U2libGluZywgZm4pXG4gICAgZWxzZSB7XG4gICAgICBkb20gPSBkb20uZmlyc3RDaGlsZFxuXG4gICAgICB3aGlsZSAoZG9tKSB7XG4gICAgICAgIHdhbGsoZG9tLCBmbilcbiAgICAgICAgZG9tID0gZG9tLm5leHRTaWJsaW5nXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFyckRpZmYoYXJyMSwgYXJyMikge1xuICByZXR1cm4gYXJyMS5maWx0ZXIoZnVuY3Rpb24oZWwpIHtcbiAgICByZXR1cm4gYXJyMi5pbmRleE9mKGVsKSA8IDBcbiAgfSlcbn1cblxuZnVuY3Rpb24gaW5oZXJpdChwYXJlbnQpIHtcbiAgZnVuY3Rpb24gQ2hpbGQoKSB7fVxuICBDaGlsZC5wcm90b3R5cGUgPSBwYXJlbnRcbiAgcmV0dXJuIG5ldyBDaGlsZCgpXG59XG5cblxuXG4vKlxuIFZpcnR1YWwgZG9tIGlzIGFuIGFycmF5IG9mIGN1c3RvbSB0YWdzIG9uIHRoZSBkb2N1bWVudC5cbiBVcGRhdGVzIGFuZCB1bm1vdW50cyBwcm9wYWdhdGUgZG93bndhcmRzIGZyb20gcGFyZW50IHRvIGNoaWxkcmVuLlxuKi9cblxudmFyIHZpcnR1YWxfZG9tID0gW10sXG4gICAgdGFnX2ltcGwgPSB7fVxuXG5cbmZ1bmN0aW9uIGdldFRhZyhkb20pIHtcbiAgcmV0dXJuIHRhZ19pbXBsW2RvbS50YWdOYW1lLnRvTG93ZXJDYXNlKCldXG59XG5cbmZ1bmN0aW9uIGluamVjdFN0eWxlKGNzcykge1xuICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgbm9kZS5pbm5lckhUTUwgPSBjc3NcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChub2RlKVxufVxuXG5mdW5jdGlvbiBtb3VudFRvKHJvb3QsIHRhZ05hbWUsIG9wdHMpIHtcbiAgdmFyIHRhZyA9IHRhZ19pbXBsW3RhZ05hbWVdXG5cbiAgaWYgKHRhZyAmJiByb290KSB0YWcgPSBuZXcgVGFnKHRhZywgeyByb290OiByb290LCBvcHRzOiBvcHRzIH0pXG5cbiAgaWYgKHRhZyAmJiB0YWcubW91bnQpIHtcbiAgICB0YWcubW91bnQoKVxuICAgIHZpcnR1YWxfZG9tLnB1c2godGFnKVxuICAgIHJldHVybiB0YWcub24oJ3VubW91bnQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHZpcnR1YWxfZG9tLnNwbGljZSh2aXJ0dWFsX2RvbS5pbmRleE9mKHRhZyksIDEpXG4gICAgfSlcbiAgfVxuXG59XG5cbnJpb3QudGFnID0gZnVuY3Rpb24obmFtZSwgaHRtbCwgY3NzLCBmbikge1xuICBpZiAodHlwZW9mIGNzcyA9PSAnZnVuY3Rpb24nKSBmbiA9IGNzc1xuICBlbHNlIGlmIChjc3MpIGluamVjdFN0eWxlKGNzcylcbiAgdGFnX2ltcGxbbmFtZV0gPSB7IG5hbWU6IG5hbWUsIHRtcGw6IGh0bWwsIGZuOiBmbiB9XG59XG5cbnJpb3QubW91bnQgPSBmdW5jdGlvbihzZWxlY3RvciwgdGFnTmFtZSwgb3B0cykge1xuICBpZiAoc2VsZWN0b3IgPT0gJyonKSBzZWxlY3RvciA9IE9iamVjdC5rZXlzKHRhZ19pbXBsKS5qb2luKCcsICcpXG4gIGlmICh0eXBlb2YgdGFnTmFtZSA9PSAnb2JqZWN0JykgeyBvcHRzID0gdGFnTmFtZTsgdGFnTmFtZSA9IDAgfVxuXG4gIHZhciB0YWdzID0gW11cblxuICBmdW5jdGlvbiBwdXNoKHJvb3QpIHtcbiAgICB2YXIgbmFtZSA9IHRhZ05hbWUgfHwgcm9vdC50YWdOYW1lLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIHRhZyA9IG1vdW50VG8ocm9vdCwgbmFtZSwgb3B0cylcblxuICAgIGlmICh0YWcpIHRhZ3MucHVzaCh0YWcpXG4gIH1cblxuICAvLyBET00gbm9kZVxuICBpZiAoc2VsZWN0b3IudGFnTmFtZSkge1xuICAgIHB1c2goc2VsZWN0b3IpXG4gICAgcmV0dXJuIHRhZ3NbMF1cblxuICAvLyBzZWxlY3RvclxuICB9IGVsc2Uge1xuICAgIGVhY2goZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciksIHB1c2gpXG4gICAgcmV0dXJuIHRhZ3NcbiAgfVxuXG59XG5cbi8vIHVwZGF0ZSBldmVyeXRoaW5nXG5yaW90LnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZWFjaCh2aXJ0dWFsX2RvbSwgZnVuY3Rpb24odGFnKSB7XG4gICAgdGFnLnVwZGF0ZSgpXG4gIH0pXG59XG5cbi8vIEBkZXByZWNhdGVkXG5yaW90Lm1vdW50VG8gPSByaW90Lm1vdW50XG5cblxuICBcbiAgLy8gc2hhcmUgbWV0aG9kcyBmb3Igb3RoZXIgcmlvdCBwYXJ0cywgZS5nLiBjb21waWxlclxuICByaW90LnV0aWwgPSB7IGJyYWNrZXRzOiBicmFja2V0cywgdG1wbDogdG1wbCB9XG5cbiAgLy8gc3VwcG9ydCBDb21tb25KU1xuICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuICAgIG1vZHVsZS5leHBvcnRzID0gcmlvdFxuXG4gIC8vIHN1cHBvcnQgQU1EXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiByaW90IH0pXG5cbiAgLy8gc3VwcG9ydCBicm93c2VyXG4gIGVsc2VcbiAgICB0aGlzLnJpb3QgPSByaW90XG5cbn0pKCk7XG4iLCIvKlxuICogV2hlbiBmaXJzdCBjcmVhdGVkIGEgUG9zdCBvYmplY3QgaXMganVzdCBhIGhvbGRlciBmb3IgUG9zdCBhdHRyaWJ1dGVzXG4gKiB3aXRoIHNvbWUgY29udmVuaWVuY2UgbWV0aG9kcyBmb3IgdXBkYXRpbmcgYXR0cmlidXRlcywgdmFsaWRhdGluZywgZXRjLlxuICpcbiAqIEVYQU1QTEU6XG4gKlxuICogICAgIHZhciBQb3N0ID0gcmVxdWlyZSgnYXBwL3Bvc3QnKVxuICpcbiAqICAgICB2YXIgcG9zdCA9IG5ldyBQb3N0KHsgdGl0bGU6ICdTb21lIHRpdGxlJyB9KVxuICpcbiAqICAgICBpZiAocG9zdC52YWxpZGF0aW9uKCkuaXNWYWxpZCgpKSB7IFBvc3QucGVyc2lzdChwb3N0KSB9XG4gKlxuICogSW5zdGVhZCBvZiB1c2luZyBjYWxsYmFja3Mgb3IgcHJvbWlzZXMsIHRoZSBQb3N0IGZ1bmN0aW9uIGlzIG9ic2VydmFibGU6XG4gKlxuICogICAgIFBvc3Qub24oJ3Bvc3RzOmRpZDpwZXJzaXN0JywgZnVuY3Rpb24ocG9zdCkge1xuICogICAgICAgY29uc29sZS5sb2coJ3Bvc3QgJyArIHBvc3QgKyAnIHdhcyBzdWNjZXNzZnVsbHkgY3JlYXRlZCcpXG4gKiAgICAgfSlcbiAqXG4gKi9cblxudmFyIF8gPSB7XG4gIGRlZmF1bHRzIDogcmVxdWlyZSgnbG9kYXNoL29iamVjdC9kZWZhdWx0cycpLFxuICBtZXJnZSAgICA6IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvbWVyZ2UnKSxcbiAgcGljayAgICAgOiByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L3BpY2snKSxcbiAgcmVqZWN0ICAgOiByZXF1aXJlKCdsb2Rhc2gvY29sbGVjdGlvbi9yZWplY3QnKVxufVxuXG52YXJcbiAgZmJyZWYgPSBuZXcgRmlyZWJhc2UoJ2h0dHBzOi8vbXVzaWZhdnMuZmlyZWJhc2Vpby5jb20nKSxcbiAgdGltZWFnbyA9IHJlcXVpcmUoJy4uL2xpYi9mcm9tbm93JyksXG4gIHl0ID0gcmVxdWlyZSgnLi4vbGliL3lvdXR1YmUnKVxuXG5mdW5jdGlvbiBQb3N0KG9wdHMsIGtleSkge1xuICB0aGlzLnNldGF0dHIoXy5kZWZhdWx0cyh7fSwgb3B0cywge2tleToga2V5fSwgUG9zdC5kZWZhdWx0cykpXG59XG5cblBvc3QuZGVmYXVsdHMgPSB7XG4gIGRhdGU6IHVuZGVmaW5lZCxcbiAgZGVzYzogJycsXG4gIGVtYmVkOiB7fSxcbiAgZmF2ZXJzOiB7fSxcbiAga2V5OiBudWxsLFxuICBzdG9yZWQ6IGZhbHNlLFxuICB0aXRsZTogJycsXG4gIHVpZDogdW5kZWZpbmVkLFxuICB1c2VyTmFtZTogdW5kZWZpbmVkXG59XG5cbi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogSW5zdGFuY2UgTWV0aG9kc1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqL1xuXG5Qb3N0LnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbihvdGhlcikge1xuICByZXR1cm4gdGhpcy5rZXkgPT09IG90aGVyLmtleVxufVxuXG5Qb3N0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoXy5waWNrKHRoaXMuZ2V0YXR0cigpLCBbJ3RpdGxlJywgJ2tleSddKSlcbn1cblxuLy8gUmV0dXJucyBvbmx5IFBvc3QgKmRhdGEqIGF0dHJpYnV0ZXNcblBvc3QucHJvdG90eXBlLmdldGF0dHIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIF8ucGljayh0aGlzLCBPYmplY3Qua2V5cyhQb3N0LmRlZmF1bHRzKSlcbn1cblxuLy8gU2V0cyBhdHRyaWJ1dGVzIGFuZCBkZXJpdmVkL2NvbXB1dGVkIGF0dHJpYnV0ZXNcblBvc3QucHJvdG90eXBlLnNldGF0dHIgPSBmdW5jdGlvbihvcHRzKSB7XG4gIF8ubWVyZ2UodGhpcywgb3B0cylcblxuICB2YXIgcCA9IHRoaXNcblxuICB0aGlzLnN0b3JlZCA9ICghIXAua2V5KSAmJiAocC5rZXkgIT0gJ25ldycpXG4gIHRoaXMuZGF0ZSA9IHAuZGF0ZSA/IG5ldyBEYXRlKHAuZGF0ZSkgOiBuZXcgRGF0ZSgpXG5cbiAgaWYgKHAuZW1iZWQgJiYgKCFwLmVtYmVkLnR5cGUgfHwgcC5lbWJlZC50eXBlID09ICd1bmtub3duJykpIHtcbiAgICAvLyBUT0RPOiBwYXJzZSBvdGhlciBzZXJ2aWNlcyAoc291bmRjbG91ZCwgYmFuZGNhbXAsIGV0Yy4pXG4gICAgdGhpcy5lbWJlZCA9IHl0LmV4dHJhY3RFbWJlZChwLmVtYmVkLnVybClcbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIHJldHVybnMgYW4gb2JqZWN0IHdpdGggdmFsaWRhdGlvbiByZXN1bHRzXG5Qb3N0LnByb3RvdHlwZS52YWxpZGF0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHZhciBwID0gdGhpcywgciA9IHsgZXJyb3JzOiBbXSwgaXNWYWxpZDogdHJ1ZSB9XG5cbiAgaWYgKCFwLmRhdGUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgci5lcnJvcnMuZGF0ZSA9ICdkYXRlIGlzIGludmFsaWQnXG4gICAgci5pc1ZhbGlkID0gZmFsc2VcbiAgfVxuXG4gIGlmICghcC50aXRsZSB8fCBwLnRpdGxlLmxlbmd0aCA9PSAwKSB7XG4gICAgci5lcnJvcnMudGl0bGUgPSAndGl0bGUgY2FuXFwndCBiZSBibGFuaydcbiAgICByLmlzVmFsaWQgPSBmYWxzZVxuICB9XG5cbiAgaWYgKCFwLmVtYmVkIHx8ICFwLmVtYmVkLnR5cGUgfHwgcC5lbWJlZC50eXBlID09ICd1bmtub3duJykge1xuICAgIHIuZXJyb3JzLnVybCA9ICd0aGUgZW1iZWQgdXJsIGlzIGludmFsaWQnXG4gICAgci5pc1ZhbGlkID0gZmFsc2VcbiAgfVxuXG4gIHJldHVybiByXG59XG5cbi8vIFJldHVybnMgYSBTdHJpbmcgZm9ybWF0dGVkIGRhdGUuXG5Qb3N0LnByb3RvdHlwZS50aW1lYWdvID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aW1lYWdvKHRoaXMuZGF0ZSlcbn1cblxuUG9zdC5wcm90b3R5cGUuZmF2b3JpdGVkQnkgPSBmdW5jdGlvbih1aWQpIHtcbiAgcmV0dXJuICEhdGhpcy5mYXZlcnNbdWlkXVxufVxuXG4vLyBGaXJlYmFzZSByb290IG9mIGFsbCB1c2VyIHBvc3RzXG5Qb3N0LnByb3RvdHlwZS5mYnJvb3RyZWYgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZicmVmLmNoaWxkKCd1c2VyX3Bvc3RzLycgKyB0aGlzLnVpZClcbn1cblxuLy8gRmlyZWJhc2Ugcm9vdCBvZiB0aGUgc3BlY2lmaWMgdXNlciBwb3N0XG5Qb3N0LnByb3RvdHlwZS5mYnBvc3RyZWYgPSBmdW5jdGlvbihwb3N0Zml4KSB7XG4gIHJldHVybiB0aGlzLmZicm9vdHJlZigpLmNoaWxkKCcvJyArIHRoaXMua2V5ICsgKHBvc3RmaXggPyAnLycgKyBwb3N0Zml4IDogJycpKVxufVxuXG4vKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIFwiU3RhdGljXCIgTWV0aG9kc1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqL1xuXG4vLyBFeHRlbmQgdGhlIFBvc3QgRnVuY3Rpb24gKG5vdCB0aGUgaW5zdGFuY2VzKSB3aXRoIHB1Yi9zdWIgcHJvcGVydGllcy5cbnJlcXVpcmUoJ3Jpb3QnKS5vYnNlcnZhYmxlKFBvc3QpXG5cblBvc3QuZGVzdHJveSA9IGZ1bmN0aW9uKHBvc3QpIHtcbiAgcG9zdC5mYnBvc3RyZWYoKS5yZW1vdmUoZnVuY3Rpb24oZXJyb3Ipe1xuICAgIGlmICghZXJyb3IpIHtcbiAgICAgIHBvc3QuZGVzdHJveWVkID0gdHJ1ZVxuICAgICAgUG9zdC50cmlnZ2VyKCdzdG9yZTpwb3N0czpkaWQ6ZGVzdHJveScsIHBvc3QpXG4gICAgfVxuICB9KVxufVxuXG5cbnZhciBsaXN0ZW5lcnMgPSB7fVxuXG4vLyBXaGVuIGNhbGxlZCwgc3RvcmU6cG9zdHM6ZGlkOnJldHJpZXZlIGV2ZW50cyB3aWxsIGJlIHRyaWdnZXJlZFxuLy8gYWZ0ZXIgZmlyZWJhc2UgY2hpbGRfYWRkZWQgZXZlbnRzLlxuUG9zdC5yZXRyaWV2ZSA9IGZ1bmN0aW9uIHJldHJpZXZlKGNvbGxlY3Rpb24pIHtcbiAgaWYgKGxpc3RlbmVyc1tjb2xsZWN0aW9uXSkgeyByZXR1cm4gfVxuXG4gIHZhciByZWYgPSBmYnJlZi5jaGlsZChjb2xsZWN0aW9uKS5vcmRlckJ5UHJpb3JpdHkoKVxuXG4gIGxpc3RlbmVyc1tjb2xsZWN0aW9uXSA9IHJlZi5vbignY2hpbGRfYWRkZWQnLCBmdW5jdGlvbihzbmFwc2hvdCkge1xuICAgIHZhciBwb3N0ID0gbmV3IFBvc3Qoc25hcHNob3QudmFsKCksIHNuYXBzaG90LmtleSgpKVxuICAgIFBvc3QudHJpZ2dlcignc3RvcmU6cG9zdHM6ZGlkOnJldHJpZXZlJywgY29sbGVjdGlvbiwgcG9zdClcbiAgfSlcbn1cblxuUG9zdC5zdG9wUmV0cmlldmUgPSBmdW5jdGlvbihjb2xsZWN0aW9uKSB7XG4gIGlmICghbGlzdGVuZXJzW2NvbGxlY3Rpb25dKSB7IHJldHVybiB9XG5cbiAgZmJyZWYub2ZmKCdjaGlsZF9hZGRlZCcsIGxpc3RlbmVyc1tjb2xsZWN0aW9uXSlcbiAgZGVsZXRlIGxpc3RlbmVyc1tjb2xsZWN0aW9uXVxufVxuXG4vKlxuICogUmV0dXJucyBsYXRlc3QgMTAgaXRlbXMgZnJvbSBvbmUgb2YgdGhlc2UgY29sbGVjdGlvbnM6XG4gKiBwb3N0c1xuICogZmF2b3JpdGVkXG4gKiB1c2VyX2Zhdm9yaXRlcy91aWRcbiAqIHVzZXJfcG9zdHMvdWlkXG4gKi9cblBvc3QubGF0ZXN0ID0gZnVuY3Rpb24oY29sbGVjdGlvbikge1xuICB2YXIgciA9IGZicmVmLmNoaWxkKGNvbGxlY3Rpb24pLm9yZGVyQnlQcmlvcml0eSgpLmxpbWl0VG9GaXJzdCgxMClcblxuICByLm9uY2UoJ3ZhbHVlJywgZnVuY3Rpb24oc25hcHNob3QpIHtcbiAgICB2YXIgZGF0YSA9IHNuYXBzaG90LnZhbCgpXG5cbiAgICBpZiAoIWRhdGEpIHsgcmV0dXJuIH0gLy8gbm90aGluZyBhdmFpbGFibGU/XG5cbiAgICB2YXIgbGF0ZXN0ID0gT2JqZWN0LmtleXMoZGF0YSkucmVkdWNlKGZ1bmN0aW9uKGFjYywga2V5KSB7XG4gICAgICBhY2MucHVzaChuZXcgUG9zdChkYXRhW2tleV0sIGtleSkpXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSwgW10pLnNvcnQoZnVuY3Rpb24ocG9zdDEsIHBvc3QyKSB7XG4gICAgICByZXR1cm4gcG9zdDIuZGF0ZSAtIHBvc3QxLmRhdGVcbiAgICB9KVxuXG4gICAgUG9zdC50cmlnZ2VyKCdzdG9yZTpwb3N0czpkaWQ6bGF0ZXN0JywgY29sbGVjdGlvbiwgbGF0ZXN0KVxuICB9KVxufVxuXG4vLyBJbml0aWFsIGNyZWF0aW9uIG9mIGEgcG9zdC4gVXNlIHVwZGF0ZSBpbnN0ZWFkIGlmIHRoZSBwb3N0IGFscmVhZHkgZXhpc3RzLlxuUG9zdC5wZXJzaXN0ID0gZnVuY3Rpb24gcGVyc2lzdChwb3N0KSB7XG4gIHZhciBkYXRlID0gbmV3IERhdGUoKVxuICB2YXIgYXR0cnMgPSBfLm1lcmdlKHBvc3QuZ2V0YXR0cigpLCB7ZGF0ZTogZGF0ZS52YWx1ZU9mKCksIHVpZDogcG9zdC51aWR9KVxuXG4gIHZhciByID0gcG9zdC5mYnJvb3RyZWYoKS5wdXNoKGF0dHJzLCBmdW5jdGlvbihlcnJvcikge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgUG9zdC50cmlnZ2VyKCdzdG9yZTpwb3N0czpmYWlsZWQ6cGVyc2lzdCcsIHBvc3QsIGVycm9yKVxuICAgIH0gZWxzZSB7XG4gICAgICBwb3N0LnNldGF0dHIoeyBrZXk6IHIua2V5KCksIGRhdGU6IGRhdGV9KVxuICAgICAgUG9zdC50cmlnZ2VyKCdzdG9yZTpwb3N0czpkaWQ6cGVyc2lzdCcsIHBvc3QpXG4gICAgICByLnNldFByaW9yaXR5KGRhdGUudmFsdWVPZigpKVxuICAgIH1cbiAgfSlcbn1cblxuUG9zdC51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUocG9zdCkge1xuICBwb3N0LmZicG9zdHJlZigpLnVwZGF0ZShwb3N0LmdldGF0dHIoKSwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgIGlmIChlcnJvcikge1xuICAgICAgUG9zdC50cmlnZ2VyKCdzdG9yZTpwb3N0czpmYWlsZWQ6dXBkYXRlJywgcG9zdCwgZXJyb3IpXG4gICAgfSBlbHNlIHtcbiAgICAgIFBvc3QudHJpZ2dlcignc3RvcmU6cG9zdHM6ZGlkOnVwZGF0ZScsIHBvc3QpXG4gICAgfVxuICB9KVxufVxuXG5Qb3N0LnRvZ2dsZUZhdiA9IGZ1bmN0aW9uKHBvc3QsIHVpZCkge1xuICB2YXIgZmF2ZXJzID0gXy5tZXJnZSh7fSwgcG9zdC5mYXZlcnMpIC8vIFwiY2xvbmVcIlxuXG4gIGlmIChwb3N0LmZhdm9yaXRlZEJ5KHVpZCkpIHsgLy8gdG9nZ2xlLlxuICAgIGRlbGV0ZSBmYXZlcnNbdWlkXVxuICB9IGVsc2Uge1xuICAgIGZhdmVyc1t1aWRdID0gdHJ1ZVxuICB9XG5cbiAgcG9zdC5mYnBvc3RyZWYoJ2ZhdmVycycpLnVwZGF0ZShmYXZlcnMsIGZ1bmN0aW9uKGVycm9yKXtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIFBvc3QudHJpZ2dlcignc3RvcmU6cG9zdHM6ZmFpbGVkOnRvZ2dsZWZhdicsIHBvc3QsIGVycm9yKVxuICAgIH0gZWxzZSB7XG4gICAgICBwb3N0LmZhdmVycyA9IGZhdmVyc1xuXG4gICAgICAvLyB1cGRhdGUgdGhlIHJlZnMgZm9yIHRoZSBvd25lciBvZiB0aGUgcG9zdCAobm90ZSB1c2Ugb2YgcG9zdC51aWQgaW5zdGVhZFxuICAgICAgLy8gb2YganVzdCB1aWQgb2YgdGhlIHVzZXIgdG9nZ2xpbmcgdGhlIGZhdilcbiAgICAgIHZhclxuICAgICAgICB1cHN0cmVmID0gZmJyZWYuY2hpbGQoJ3VzZXJfcG9zdHMvJyArIHBvc3QudWlkICsgJy8nICsgcG9zdC5rZXkpLFxuICAgICAgICB1ZmF2cmVmID0gZmJyZWYuY2hpbGQoJ3VzZXJfZmF2b3JpdGVzLycgKyBwb3N0LnVpZCArICcvJyArIHBvc3Qua2V5KVxuXG4gICAgICB1cHN0cmVmLnVwZGF0ZShwb3N0LmdldGF0dHIoKSlcblxuICAgICAgaWYgKHBvc3QuZmF2b3JpdGVkQnkocG9zdC51aWQpKSB7XG4gICAgICAgIHVmYXZyZWYudXBkYXRlKHBvc3QuZ2V0YXR0cigpKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdWZhdnJlZi5yZW1vdmUoKSAvLyBtYXkgbmVlZCB0byByZW1vdmUgaWYgbm8gbG9uZ2VyIGZhdmVkXG4gICAgICB9XG5cbiAgICAgIC8vIHVwZGF0ZSB0aGUgZ2VuZXJhbCBsaXN0IG9mIGFsbCBmYXZvcml0ZXNcbiAgICAgIHZhciBmYXZzcmVmID0gZmJyZWYuY2hpbGQoJ2Zhdm9yaXRlZC8nICsgcG9zdC5rZXkpXG5cbiAgICAgIGlmIChPYmplY3Qua2V5cyhwb3N0LmZhdmVycykubGVuZ3RoID4gMCkge1xuICAgICAgICBmYXZzcmVmLnVwZGF0ZShwb3N0LmdldGF0dHIoKSkgLy8gc29tZW9uZSBzdGlsbCBsaWtlcyBpdCFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZhdnNyZWYucmVtb3ZlKCkgLy8gbm9ib2R5IGxpa2VzIHRoaXMgYW55bW9yZS5cbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRlIGFsbCBvdGhlciBmYXZlcnMgKG1heSByZXR1cm4gZW1wdHkgYXJyYXkpXG4gICAgICBvdGhlclVpZHMgPSBfLnJlamVjdChPYmplY3Qua2V5cyhmYXZlcnMpLmNvbmNhdCh1aWQpLCBmdW5jdGlvbihfdWlkKSB7IHJldHVybiBfdWlkID09IHBvc3QudWlkIH0pXG5cbiAgICAgIG90aGVyVWlkcy5mb3JFYWNoKGZ1bmN0aW9uKHVpZCl7XG4gICAgICAgIHZhciBvdGhlcmZhdiA9IGZicmVmLmNoaWxkKCd1c2VyX2Zhdm9yaXRlcy8nICsgdWlkICsgJy8nICsgcG9zdC5rZXkpXG5cbiAgICAgICAgaWYgKHBvc3QuZmF2b3JpdGVkQnkodWlkKSkge1xuICAgICAgICAgIG90aGVyZmF2LnVwZGF0ZShwb3N0LmdldGF0dHIoKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvdGhlcmZhdi5yZW1vdmUoKVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBQb3N0LnRyaWdnZXIoJ3N0b3JlOnBvc3RzOmRpZDp0b2dnbGVmYXYnLCBwb3N0LCB1aWQpXG4gICAgfVxuICB9KVxufVxuXG4vLyB1cGRhdGUgdGhlIHZhcmlvdXMgcG9zdCByZWZlcmVuY2VzIChsaWtlIGxhdGVzdCBwb3N0cywgZmF2b3JpdGVkLCBldGMuKVxuZnVuY3Rpb24gdXBkYXRlUG9zdFJlZmVyZW5jZXMocG9zdCkge1xuICB2YXJcbiAgICBmID0gZmJyZWYsIHVzZixcbiAgICBwc3QgPSAncG9zdHMvJyArIHBvc3Qua2V5LFxuICAgIGZhdiA9ICdmYXZvcml0ZWQvJyArIHBvc3Qua2V5LFxuICAgIGF0ciA9IF8ubWVyZ2UocG9zdC5nZXRhdHRyKCksIHtkYXRlOiBwb3N0LmRhdGUudmFsdWVPZigpfSlcbiAgICBmYXZVaWRzID0gT2JqZWN0LmtleXMocG9zdC5mYXZlcnMpXG5cbiAgaWYgKHBvc3QuZGVzdHJveWVkKSB7XG4gICAgZi5jaGlsZChmYXYpLnJlbW92ZSgpXG4gICAgZi5jaGlsZChwc3QpLnJlbW92ZSgpXG4gICAgZmF2VWlkcy5mb3JFYWNoKGZ1bmN0aW9uKHVpZCl7XG4gICAgICBmLmNoaWxkKCd1c2VyX2Zhdm9yaXRlcy8nICsgdWlkICsgJy8nICsgcG9zdC5rZXkpLnJlbW92ZSgpXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBmLmNoaWxkKHBzdCkuc2V0KGF0cilcbiAgICAvLyBmYXYgYWRkaXRpb24gaXMgaGFuZGxlZCBpbiB0b2dnbGVGYXZcbiAgfVxufVxuXG5Qb3N0Lm9uKCdzdG9yZTpwb3N0czpkaWQ6cGVyc2lzdCcsIHVwZGF0ZVBvc3RSZWZlcmVuY2VzKVxuUG9zdC5vbignc3RvcmU6cG9zdHM6ZGlkOnVwZGF0ZScsIHVwZGF0ZVBvc3RSZWZlcmVuY2VzKVxuUG9zdC5vbignc3RvcmU6cG9zdHM6ZGlkOmRlc3Ryb3knLCB1cGRhdGVQb3N0UmVmZXJlbmNlcylcblBvc3Qub24oJ3N0b3JlOnBvc3RzOmRpZDp0b2dnbGVmYXYnLCB1cGRhdGVQb3N0UmVmZXJlbmNlcylcblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0XG4iLCIvKlxuICogV2hlbiBmaXJzdCBjcmVhdGVkIGEgVXNlciBvYmplY3QgaXMganVzdCBhIGhvbGRlciBmb3IgVXNlciBhdHRyaWJ1dGVzXG4gKiB3aXRoIHNvbWUgY29udmVuaWVuY2UgbWV0aG9kcyBmb3IgdXBkYXRpbmcgYXR0cmlidXRlcywgdmFsaWRhdGluZywgZXRjLlxuICpcbiAqIFRoZSBVc2VyIGZ1bmN0aW9uIGlzIGFsc28gb2JzZXJ2YWJsZS4gUHVibGlzaGluZyBhbmQgc3Vic2NyaWJpbmdcbiAqIHRvIFVzZXIgaXMgdGhlIG9ubHkgd2F5IHRvIGludGVyYWN0IHdpdGggdGhlIGFic3RyYWN0ICd1c2VycyBzdG9yZScuXG4gKlxuICogVXNlci5jdXJyZW50IGhvbGRzIGEgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHVzZXIsIHdoaWNoIG1heSBvciBtYXkgbm90IGJlXG4gKiBhdXRoZW50aWNhdGVkLlxuICpcbiAqIEVYQU1QTEU6XG4gKlxuICogdmFyIFVzZXIgPSByZXF1aXJlKCdhcHAvdXNlcicpXG4gKlxuICogdmFyIGN1cnJlbnQgPSBVc2VyLmN1cnJlbnRcbiAqXG4gKiBOT1RFOlxuICpcbiAqIFVsdGltYXRlbHkgdGhlIG1haW4gRmlyZWJhc2UgcGF0aCBmb3IgcG9zdHMgaXMgYnVpbHQgbGlrZSB0aGlzOlxuICogdXNlcnMvdWlkIDogeyAuLi51c2VyIGRhdGEuLi4gfVxuICovXG5cbnZhciBfID0ge1xuICBkZWZhdWx0cyA6IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvZGVmYXVsdHMnKSxcbiAgcGljayAgICAgOiByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L3BpY2snKVxufVxuXG52YXIgZmJyZWYgPSBuZXcgRmlyZWJhc2UoJ2h0dHBzOi8vbXVzaWZhdnMuZmlyZWJhc2Vpby5jb20nKVxuXG5mdW5jdGlvbiBVc2VyKG9wdHMsIHVpZCkge1xuICBfLmRlZmF1bHRzKHRoaXMsIG9wdHMsIFVzZXIuZGVmYXVsdHMpXG5cbiAgLy8gaWYgY3VycmVudCB1c2VyIHdhcyBpbnN0YW50aWF0ZWQgbW9yZSB0aGFuIG9uY2UuXG4gIGlmIChVc2VyLmN1cnJlbnQgJiYgVXNlci5jdXJyZW50LnVpZCA9PT0gdWlkKSB7XG4gICAgXy5kZWZhdWx0cyh0aGlzLCBVc2VyLmN1cnJlbnQpXG4gIH1cbn1cblxuVXNlci5kZWZhdWx0cyA9IHtcbiAgJ2F2YXRhclVybCcgICA6ICcvYXNzZXRzL3Byb2ZpbGUucG5nJyxcbiAgJ2Rlc2NyaXB0aW9uJyA6ICdNdXNpRmF2cyEgdXNlcicsXG4gICdkaXNwbGF5TmFtZScgOiAndXNlcicsXG4gICdsb2NhdGlvbicgICAgOiAnVW5pdmVyc2UnLFxuICAnbG9nZ2VkJyAgICAgIDogZmFsc2UsXG4gICdwcm92aWRlcicgICAgOiAndW5rbm93bicsXG4gICd1cmwnICAgICAgICAgOiAnaHR0cHM6Ly9tdXNpZmF2cy5jb20nXG59XG5cbi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogSW5zdGFuY2UgTWV0aG9kc1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqL1xuXG4vLyBSZXR1cm5zIG9ubHkgKmRhdGEqIGF0dHJpYnV0ZXNcblVzZXIucHJvdG90eXBlLmdldGF0dHIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIF8ucGljayh0aGlzLCBPYmplY3Qua2V5cyhVc2VyLmRlZmF1bHRzKSlcbn1cblxuVXNlci5wcm90b3R5cGUubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXV0aERhdGEgPSBudWxsXG4gIHRoaXMubG9nZ2VkID0gZmFsc2VcbiAgdGhpcy5wcm92aWRlciA9ICd1bmtub3duJ1xuICB0aGlzLnVpZCA9IG51bGxcbn1cblxuLy8gdXBkYXRlIGZiIGRhdGFcblVzZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdXNlciA9IHRoaXNcbiAgaWYgKCF1c2VyLnVpZCkgeyByZXR1cm4gfVxuICBmYnJlZi5jaGlsZCgndXNlcnMnICsgJy8nICsgdXNlci51aWQpLnNldCh1c2VyLmdldGF0dHIoKSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIFVzZXIudHJpZ2dlcignc3RvcmU6dXNlcnM6ZmFpbGVkOnVwZGF0ZScsIHVzZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIFVzZXIudHJpZ2dlcignc3RvcmU6dXNlcnM6ZGlkOnVwZGF0ZScsIHVzZXIpXG4gICAgfVxuICB9KVxufVxuXG5Vc2VyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoXy5waWNrKHRoaXMuZ2V0YXR0cigpLCBbJ2Rpc3BsYXlOYW1lJywgJ2xvZ2dlZCddKSlcbn1cblxuLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBcIlN0YXRpY1wiIE1ldGhvZHNcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKi9cblxuLy8gRXh0ZW5kIHRoZSBVc2VyICpmdW5jdGlvbiogKG5vdCB0aGUgaW5zdGFuY2VzKSB3aXRoIHB1Yi9zdWIgYXR0cmlidXRlcy5cbnJlcXVpcmUoJ3Jpb3QnKS5vYnNlcnZhYmxlKFVzZXIpXG5cbi8vIFVwZGF0ZXMgYSB1c2VyIHdpdGggdGhlIHByb3ZpZGVkIGF1dGggZGF0YS5cbmZ1bmN0aW9uIHVwZGF0ZUF1dGgoYXV0aERhdGEpIHtcbiAgaWYgKCFhdXRoRGF0YSkgeyByZXR1cm4gfVxuXG4gIHZhciB1ID0gVXNlci5jdXJyZW50XG5cbiAgdS51aWQgPSBhdXRoRGF0YS51aWRcbiAgdS5hdXRoRGF0YSA9IGF1dGhEYXRhXG4gIHUucHJvdmlkZXIgPSBhdXRoRGF0YS5wcm92aWRlclxuICB1LmxvZ2dlZCA9IHRydWVcblxuICBpZiAoYXV0aERhdGEucHJvdmlkZXIgPT0gJ3R3aXR0ZXInKSB7XG4gICAgdS5kaXNwbGF5TmFtZSA9IGF1dGhEYXRhLnR3aXR0ZXIuZGlzcGxheU5hbWVcblxuICAgIHZhciBwID0gYXV0aERhdGEudHdpdHRlci5jYWNoZWRVc2VyUHJvZmlsZVxuXG4gICAgaWYgKHApIHtcbiAgICAgIHUuYXZhdGFyVXJsID0gcC5wcm9maWxlX2ltYWdlX3VybF9odHRwc1xuICAgICAgdS5kZXNjcmlwdGlvbiA9IHAuZGVzY3JpcHRpb25cbiAgICAgIHUubG9jYXRpb24gPSBwLmxvY2F0aW9uXG4gICAgICB1LnVybCA9IHAudXJsXG4gICAgfVxuICB9IGVsc2UgaWYgKGF1dGhEYXRhLnByb3ZpZGVyID09ICdnb29nbGUnKSB7XG4gICAgdS5kaXNwbGF5TmFtZSA9IGF1dGhEYXRhLmdvb2dsZS5kaXNwbGF5TmFtZVxuXG4gICAgdmFyIHAgPSBhdXRoRGF0YS5nb29nbGUuY2FjaGVkVXNlclByb2ZpbGVcblxuICAgIGlmIChwKSB7XG4gICAgICB1LmF2YXRhclVybCA9IHAucGljdHVyZVxuICAgICAgdS5kZXNjcmlwdGlvbiA9ICdHKyBVc2VyJ1xuICAgICAgdS5sb2NhdGlvbiA9ICdQbGFuZXQgRWFydGgnXG4gICAgICB1LnVybCA9IHAubGlua1xuICAgIH1cbiAgfVxuXG4gIF8uZGVmYXVsdHModGhpcywgdS5kZWZhdWx0cykgLy8gaW4gY2FzZSB3ZSBwaWNrZWQgdXAgc29tZSBudWxsc1xuXG4gIHUudXBkYXRlKClcbn1cblxuVXNlci5sb2dpbiA9IGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gIGZicmVmLmF1dGhXaXRoT0F1dGhQb3B1cChwcm92aWRlciwgZnVuY3Rpb24oZXJyb3IsIGF1dGhEYXRhKSB7XG4gICAgaWYgKGVycm9yIHx8ICFhdXRoRGF0YSkge1xuICAgICAgVXNlci50cmlnZ2VyKCdzdG9yZTp1c2VyczpmYWlsZWQ6bG9naW4nLCBlcnJvciB8fCB7Y29kZTogJ3Vua25vd24nfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlQXV0aChhdXRoRGF0YSlcbiAgICB9XG4gIH0pXG59XG5cblVzZXIubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gIGlmIChVc2VyLmN1cnJlbnQgJiYgVXNlci5jdXJyZW50LmxvZ2dlZCkge1xuICAgIFVzZXIuY3VycmVudC5sb2dvdXQoKVxuICAgIGZicmVmLnVuYXV0aCgpXG4gIH1cbn1cblxuVXNlci5sb29rdXAgPSBmdW5jdGlvbih1aWQpIHtcbiAgZmJyZWYuY2hpbGQoJ3VzZXJzJykuY2hpbGQodWlkKS5vbmNlKCd2YWx1ZScsIGZ1bmN0aW9uKHNuYXBzaG90KXtcbiAgICB2YXIgZGF0YSA9IHNuYXBzaG90LnZhbCgpXG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIFVzZXIudHJpZ2dlcignc3RvcmU6dXNlcnM6ZGlkOmxvb2t1cCcsIHVpZCwgbmV3IFVzZXIoZGF0YSwgdWlkKSlcbiAgICB9IGVsc2Uge1xuICAgICAgVXNlci50cmlnZ2VyKCdzdG9yZTp1c2VyczpmYWlsZWQ6bG9va3VwJywgdWlkKVxuICAgIH1cbiAgfSlcbn1cblxuLy8gY3JlYXRlcyB0aGUgVXNlci5jdXJyZW50IGluc3RhbmNlLlxuVXNlci5zZXR1cEN1cnJlbnQgPSBmdW5jdGlvbigpIHtcbiAgVXNlci5jdXJyZW50ID0gbmV3IFVzZXIoKVxuXG4gIGZicmVmLm9uQXV0aChmdW5jdGlvbihhdXRoRGF0YSkge1xuICAgIGlmIChhdXRoRGF0YSkge1xuICAgICAgdXBkYXRlQXV0aChhdXRoRGF0YSlcbiAgICAgIFVzZXIudHJpZ2dlcignc3RvcmU6dXNlcnM6ZGlkOmxvZ2luJywgVXNlci5jdXJyZW50LCBhdXRoRGF0YSlcbiAgICB9IGVsc2Uge1xuICAgICAgVXNlci5jdXJyZW50LmxvZ291dCgpXG4gICAgICBVc2VyLnRyaWdnZXIoJ3N0b3JlOnVzZXJzOmRpZDpsb2dvdXQnLCBVc2VyLmN1cnJlbnQpXG4gICAgfVxuICB9KVxuICAvLyB1cGRhdGVBdXRoKGZicmVmLmdldEF1dGgoKSkgLy8gTk9URTogcmVtb3ZlZCB0byBhdm9pZCBmYidzIHN5bmMuIGF1dGggY2hlY2tcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBVc2VyXG4iLCJ2YXIgXyA9IHtcbiAgaXNGdW5jdGlvbiA6IHJlcXVpcmUoJ2xvZGFzaC9sYW5nL2lzRnVuY3Rpb24nKVxufVxuXG4vKlxuICogRGVmaW5lcyBhIGNvbW1vbiBBUEkgYXJvdW5kIERPTSBub2RlIGhhbmRsaW5nLiBUaGUgQVBJIGlzIGluc3BpcmVkIGJ5XG4gKiBjZXJ0YWluIGxpYiB5b3UgbWF5IGhhdmUgaGVhcmQgYWJvdXQuLi4gOnBcbiAqL1xuZnVuY3Rpb24gRG9tV3JhcChub2RlLCBzZWxlY3Rvcikge1xuICB0aGlzWzBdID0gdGhpcy5ub2RlID0gbm9kZVxuICB0aGlzLmlkID0gbm9kZS5pZFxuXG4gIGlmIChzZWxlY3Rvcikge1xuICAgIHRoaXMubm9kZSA9IG5vZGUucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgfVxuXG4gIHRoaXMubGlzdGVuZXJzID0gW10gLy8gc2F2ZSBldmVudCBsaXN0ZW5lcnMgc28gd2UgY2FuIHVucmVnaXN0ZXIgZWFzaWx5LlxufVxuXG5Eb21XcmFwLnByb3RvdHlwZS5odG1sID0gZnVuY3Rpb24oaHRtbCkge1xuICB0aGlzLm5vZGUuaW5uZXJIVE1MID0gaHRtbFxuICByZXR1cm4gdGhpc1xufVxuXG5Eb21XcmFwLnByb3RvdHlwZS5wcmVwZW5kID0gZnVuY3Rpb24obm9kZSkge1xuICB0aGlzLm5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIHRoaXMubm9kZS5maXJzdENoaWxkKVxuICByZXR1cm4gdGhpc1xufVxuXG5Eb21XcmFwLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihub2RlKSB7XG4gIHRoaXMubm9kZS5hcHBlbmRDaGlsZChub2RlKVxuICByZXR1cm4gdGhpc1xufVxuXG5Eb21XcmFwLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihub2RlKSB7XG4gIHRoaXMubm9kZS5yZW1vdmVDaGlsZChub2RlKVxuICByZXR1cm4gdGhpc1xufVxuXG5Eb21XcmFwLnByb3RvdHlwZS50ZXh0ID0gZnVuY3Rpb24odGV4dCkge1xuICB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSB0ZXh0XG4gIHJldHVybiB0aGlzXG59XG5cbkRvbVdyYXAucHJvdG90eXBlLnZhbCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCkgeyB0aGlzLm5vZGUudmFsdWUgPSBhcmd1bWVudHNbMF0gfVxuICByZXR1cm4gdGhpcy5ub2RlLnZhbHVlXG59XG5cbkRvbVdyYXAucHJvdG90eXBlLmFkZENsYXNzID0gZnVuY3Rpb24oY2xhc3NuYW1lKSB7XG4gIHRoaXMubm9kZS5jbGFzc0xpc3QuYWRkKGNsYXNzbmFtZSlcbiAgcmV0dXJuIHRoaXNcbn1cblxuRG9tV3JhcC5wcm90b3R5cGUucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihjbGFzc25hbWUpIHtcbiAgdGhpcy5ub2RlLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NuYW1lKVxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBSZXR1cm4gZmlyc3QgcGFyZW50IGVsZW1lbnQgbWF0Y2hpbmcgc2VsZWN0b3JcbkRvbVdyYXAucHJvdG90eXBlLnBhcmVudCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHZhciB0ID0gdGhpcy5ub2RlLnBhcmVudEVsZW1lbnRcbiAgd2hpbGUgKHQpIHtcbiAgICBpZiAodC5tYXRjaGVzKHNlbGVjdG9yKSkgeyByZXR1cm4gbmV3IERvbVdyYXAodCkgfVxuICAgIHQgPSB0LnBhcmVudEVsZW1lbnRcbiAgfVxufVxuXG5Eb21XcmFwLnByb3RvdHlwZS5tYXRjaGVzID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHRoaXMubm9kZS5tYXRjaGVzKHNlbGVjdG9yKVxufVxuXG5Eb21XcmFwLnByb3RvdHlwZS5kYXRhID0gZnVuY3Rpb24obmFtZSkge1xuICByZXR1cm4gdGhpcy5ub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS0nICsgbmFtZSlcbn1cblxuLyogVGhpcyBldmVudCBoYW5kbGVyIHByZXZlbnRzIHRoZSBldmVudCBkZWZhdWx0IGFjdGlvblxuICogYW5kIHJldHVybnMgYSB3cmFwcGVkIGV2ZW50IHRhcmdldCBpbnN0ZWFkIGluIGFkZGl0aW9uXG4gKiB0byB0aGUgb3JpZ2luYWwgZXZlbnQuXG4gKlxuICogbm9kZS5vbignZXZlbnQnLCBmdW4pXG4gKiBub2RlLm9uKCdldmVudCcsICcuZGVsZWdhdGUtc2VsZWN0b3InLCBmdW4pXG4gKi9cbkRvbVdyYXAucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oZXZlbnRuYW1lLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgdmFyIGZuLCBuID0gdGhpcy5ub2RlXG5cbiAgaWYgKF8uaXNGdW5jdGlvbihzZWxlY3RvcikpIHtcbiAgICBjYWxsYmFjayA9IHNlbGVjdG9yXG4gICAgZm4gPSBmdW5jdGlvbihldikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKVxuICAgICAgY2FsbGJhY2sobmV3IERvbVdyYXAoZXYudGFyZ2V0KSwgZXYpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZuID0gZnVuY3Rpb24oZXYpIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICAgIHZhciBuID0gbmV3IERvbVdyYXAoZXYudGFyZ2V0KSxcbiAgICAgICAgciA9IG4ubWF0Y2hlcyhzZWxlY3RvcikgPyBuIDogbi5wYXJlbnQoc2VsZWN0b3IpXG4gICAgICBpZiAocikgeyBjYWxsYmFjayhyLCBldikgfVxuICAgIH1cbiAgfVxuXG4gIG4uYWRkRXZlbnRMaXN0ZW5lcihldmVudG5hbWUsIGZuKVxuXG4gIHRoaXMubGlzdGVuZXJzLnB1c2goe2V2ZW50bmFtZTogZXZlbnRuYW1lLCBmbjogZm59KVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIGNhbGwgd2l0aG91dCBwYXJhbWV0ZXJzIGZvciByZW1vdmluZyBhbGwgbGlzdGVuZXJzLlxuRG9tV3JhcC5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24oZXZlbnRuYW1lLCBjYWxsYmFjaykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZG9uJ3Qgd29ycnkgYWJvdXQgcmVtb3ZpbmcgZnJvbSB0aGlzLmxpc3RlbmVycywgcmVtb3ZpbmcgdHdpY2UgaXNcbiAgICAgIC8vIGhhcm1sZXNzIGFuZCB0aGlzIG9iamVjdCBzaG91bGQgYmUgc2hvcnQgbGl2ZWQuXG4gICAgICB0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudG5hbWUsIGNhbGxiYWNrKVxuICB9IGVsc2Uge1xuICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZGF0YS5ldmVudG5hbWUsIGRhdGEuZm4pXG4gICAgfSwgdGhpcylcbiAgICB0aGlzLmxpc3RlbmVycyA9IFtdXG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5vZGUsIHNlbGVjdG9yKSB7XG4gIHJldHVybiBuZXcgRG9tV3JhcChub2RlLCBzZWxlY3Rvcilcbn1cbiIsIi8qXG4gKiBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3R4Y2hlbi9yaW90LWhuL2Jsb2IvZ2gtcGFnZXMvc3JjL2ZpbHRlcnMuanNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkYXRlKSB7XG4gIHZhciBiZXR3ZWVuID0gKERhdGUubm93KCkgLSBkYXRlKSAvIDEwMDBcblxuICBpZiAoYmV0d2VlbiA8IDApIHtcbiAgICByZXR1cm4gJ3JlY2VudGx5JyAvLyBPTUcgaXQgY29tZXMgZm9ybSB0aGUgZnV0dXJlISA6LXBcblxuICB9IGlmIChiZXR3ZWVuIDwgMzYwMCkge1xuICAgIHJldHVybiB+fihiZXR3ZWVuIC8gNjApICsgJyBtaW51dGVzIGFnbydcblxuICB9IGVsc2UgaWYgKGJldHdlZW4gPCA4NjQwMCkge1xuICAgIHJldHVybiB+fihiZXR3ZWVuIC8gMzYwMCkgKyAnIGhvdXJzIGFnbydcbiAgfVxuXG4gIHJldHVybiB+fihiZXR3ZWVuIC8gODY0MDApICsgJyBkYXlzIGFnbydcbn07XG4iLCJ2YXIgdXJscmVnZXggPSAveW91dHViZS5jb20uK1xcP3Y9KFthLXpBLXowLTlcXC1fXSspL2lcblxuZXhwb3J0cy5leHRyYWN0RW1iZWQgPSBmdW5jdGlvbih1cmwpIHtcbiAgdmFyIG1hdGNoID0gdXJscmVnZXguZXhlYyh1cmwpXG5cbiAgaWYgKG1hdGNoICYmIG1hdGNoLmxlbmd0aCkge1xuICAgIHJldHVybiB7dHlwZTogJ3lvdXR1YmUnLCB1cmw6IHVybCwgdmlkZW9JZDogbWF0Y2hbMV19XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHt0eXBlOiAndW5rbm93bicsIHVybDogdXJsfVxuICB9XG59XG4iLCJyZXF1aXJlKCcuL2FwcC91c2VyJykuc2V0dXBDdXJyZW50KCkgLy8gQ3JlYXRlIGluc3RhbmNlIG9mIGN1cnJlbnQgdXNlci5cblxuLy8gTW9kdWxlcyBkaXNwbGF5ZWQgYWxsIHRoZSB0aW1lOlxudmFyXG4gIE1lc3NhZ2UgPSByZXF1aXJlKCcuL21vZHVsZXMvbWVzc2FnZS9tZXNzYWdlJyksXG4gIE5hdmlnYXRpb24gPSByZXF1aXJlKCcuL21vZHVsZXMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uJyksXG4gIE1haW4gPSByZXF1aXJlKCcuL21vZHVsZXMvbWFpbi9tYWluJylcblxudmFyXG4gIG1haW4gPSBuZXcgTWFpbihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwLW1haW4nKSksXG4gIG1zZyA9IG5ldyBNZXNzYWdlKG1haW4sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAtbWVzc2FnZScpKSxcbiAgbmF2ID0gbmV3IE5hdmlnYXRpb24obWFpbiwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcC1uYXZpZ2F0aW9uJykpXG5cbnZhciByaW90ID0gcmVxdWlyZSgncmlvdCcpXG5cbnZhciByb3V0ZXIgPSBtYWluLnJvdXRlci5iaW5kKG1haW4pIC8vIHJpb3QgbWlzc2VzIHRoZSBjb250ZXh0IG90aGVyd2lzZS5cblxucmlvdC5yb3V0ZShyb3V0ZXIpIC8vIFNldHVwIGEgcm91dGVyIGhhbmRsZXIgKGhhc2hjaGFuZ2UgZXZlbnQpXG5yaW90LnJvdXRlLmV4ZWMocm91dGVyKSAvLyBDYWxsIHRoZSByb3V0ZXIgdy9vIHdhaXRpbmcgZm9yIGEgaGFzaGNoYW5nZSAoc3RhcnRzIHRoZSBhcHAhKVxuIiwidmFyIF8gPSB7ZXNjYXBlOiByZXF1aXJlKFwibG9kYXNoLmVzY2FwZVwiKX07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iail7XG52YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4scHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcbndpdGgob2JqfHx7fSl7XG5fX3ArPSc8bWFpbiBjbGFzcz1cIm1haW4gYXBwLWZyb250XCIgcm9sZT1cIm1haW5cIj48aW1nIGNsYXNzPVwicmVzcG9uc2l2ZS13aWR0aFwiIHNyYz1cIi9hc3NldHMvbXVzaWMuanBnXCI+PGRpdiBjbGFzcz1cImZyb250LWNvcHlcIj48aDE+QSBtaWNybyBCbG9nIGZvciB5b3VyIGZhdm9yaXRlIE11c2ljITwvaDE+PHA+U2hhcmUgeW91ciBmYXZvcml0ZSBtdXNpYyBhbmQgdmlkZW9zIHdpdGggeW91ciBmcmllbmRzLjxicj5XaXRoIE11c2lGYXZzIHlvdSBjYW4gZW1iZWQgY29udGVudCBmcm9tIFlvdVR1YmUsIFNvdW5kQ2xvdWQsIGFuZCBtb3JlLCBpbiBhIHNpbmdsZSBwbGFjZSE8L3A+PGgyPkxhdGVzdCBQb3N0czwvaDI+PHVsIGNsYXNzPVwicG9zdC1saXN0IGxhdGVzdC1wb3N0c1wiPjwvdWw+PGgyPkxhdGVzdCBGYXZvcml0ZWQ8L2gyPjx1bCBjbGFzcz1cInBvc3QtbGlzdCBsYXRlc3QtZmF2c1wiPjwvdWw+PC9kaXY+PC9tYWluPic7XG59XG5yZXR1cm4gX19wO1xufTtcbiIsInZhclxuICAkID0gcmVxdWlyZSgnLi4vLi4vbGliL2RvbVdyYXAnKSxcbiAgUG9zdCA9IHJlcXVpcmUoJy4uLy4uL2FwcC9wb3N0JyksXG4gIGl0ZW1zdHBsID0gcmVxdWlyZSgnLi9wb3N0LWl0ZW1zLmh0bWwnKSxcbiAgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2Zyb250Lmh0bWwnKVxuXG5mdW5jdGlvbiBGcm9udChwYXJlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgbm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZShvcHRpb25zKVxuXG4gIHRoaXMucGFyZW50ID0gcGFyZW50XG5cbiAgdGhpcy5ub2RlcyA9IHtcbiAgICByb290ICAgICAgOiAkKG5vZGUpLFxuICAgIHBvc3RzICAgICA6ICQobm9kZSwgJy5sYXRlc3QtcG9zdHMnKSxcbiAgICBmYXZvcml0ZWQgOiAkKG5vZGUsICcubGF0ZXN0LWZhdnMnKVxuICB9XG5cbiAgdGhpcy5oYW5kbGVQb3N0cyA9IGZ1bmN0aW9uKGNvbGxlY3Rpb24sIHBvc3RzKSB7XG4gICAgdGhpcy5ub2Rlc1tjb2xsZWN0aW9uXS5odG1sKGl0ZW1zdHBsKHsgcG9zdHM6IHBvc3RzIH0pKVxuICB9LmJpbmQodGhpcylcblxuICBQb3N0Lm9uKCdzdG9yZTpwb3N0czpkaWQ6bGF0ZXN0JywgdGhpcy5oYW5kbGVQb3N0cylcblxuICBQb3N0LmxhdGVzdCgncG9zdHMnKVxuICBQb3N0LmxhdGVzdCgnZmF2b3JpdGVkJylcbn1cblxuRnJvbnQucHJvdG90eXBlLnVubG9hZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm5vZGVzLnJvb3QuaHRtbCgnJylcbiAgUG9zdC5vZmYoJ3N0b3JlOnBvc3RzOmRpZDpsYXRlc3QnLCB0aGlzLmhhbmRsZVBvc3RzKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZyb250XG4iLCJ2YXIgXyA9IHtlc2NhcGU6IHJlcXVpcmUoXCJsb2Rhc2guZXNjYXBlXCIpfTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKXtcbnZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xud2l0aChvYmp8fHt9KXtcbl9fcCs9Jyc7XG4gcG9zdHMuZm9yRWFjaChmdW5jdGlvbihwb3N0KSB7IFxuX19wKz0nPGxpPjxpIGNsYXNzPVwiZmEgZmEtcGxheVwiPjwvaT4mbmJzcDsnK1xuKChfX3Q9KCBwb3N0LnRpdGxlICkpPT1udWxsPycnOl9fdCkrXG4nIHBvc3RlZCBieSZuYnNwOyA8YSBocmVmPVwiIycrXG4oKF9fdD0oIHBvc3QudWlkICkpPT1udWxsPycnOl9fdCkrXG4nL3Bvc3RzXCI+JytcbigoX190PSggcG9zdC51c2VyTmFtZSApKT09bnVsbD8nJzpfX3QpK1xuJyZuYnNwOzxpIGNsYXNzPVwiZmEgZmEtY2hpbGRcIj48L2k+PC9hPiAmbmJzcDsgPHNwYW4gY2xhc3M9XCJ0aW1lYWdvXCI+KCcrXG4oKF9fdD0oIHBvc3QudGltZWFnbygpICkpPT1udWxsPycnOl9fdCkrXG4nKTwvc3Bhbj48L2xpPic7XG4gfSkgXG5fX3ArPScnO1xufVxucmV0dXJuIF9fcDtcbn07XG4iLCJ2YXIgXyA9IHtlc2NhcGU6IHJlcXVpcmUoXCJsb2Rhc2guZXNjYXBlXCIpfTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKXtcbnZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xud2l0aChvYmp8fHt9KXtcbl9fcCs9JzxtYWluIGNsYXNzPVwibWFpblwiIHJvbGU9XCJtYWluXCI+PGRpdiBjbGFzcz1cImZyb250LWNvcHlcIj48aDE+TG9nIEluPC9oMT48cD5JbiBvcmRlciB0byBpbnRlcmFjdCB3aXRoIE11c2lGYXZzISB5b3VcXCdsbCBuZWVkIHRvIGxvZyBpbiBmaXJzdC48L3A+PHA+UGxlYXNlIHNlbGVjdCBvbmUgb2YgdGhlIHNlcnZpY2VzIGJlbG93IHRvIGxvZyBpbjo8L3A+PHVsIGNsYXNzPVwibG9naW4tbGlua3MgZmEtdWwgZmEtMnhcIj48bGk+PGkgY2xhc3M9XCJmYS1saSBmYSBmYS1nb29nbGUtcGx1cy1zcXVhcmVcIj48L2k+IDxhIGhyZWY9XCIjXCIgaWQ9XCJnb29nbGUtbG9naW5cIj5Hb29nbGU8L2E+PC9saT48bGk+PGkgY2xhc3M9XCJmYS1saSBmYSBmYS10d2l0dGVyLXNxdWFyZVwiPjwvaT4gPGEgaHJlZj1cIiNcIiBpZD1cInR3aXR0ZXItbG9naW5cIj5Ud2l0dGVyPC9hPjwvbGk+PGxpPjxpIGNsYXNzPVwiZmEtbGkgZmEgZmEtZmFjZWJvb2stc3F1YXJlXCI+PC9pPiA8YSBocmVmPVwiI1wiIGlkPVwiZmFjZWJvb2stbG9naW5cIj5GYWNlYm9vazwvYT4gPHNtYWxsPihTb3JyeSwgdW5hdmFpbGFibGUgYXQgdGhlIG1vbWVudCk8L3NtYWxsPjwvbGk+PC91bD48L2Rpdj48L21haW4+Jztcbn1cbnJldHVybiBfX3A7XG59O1xuIiwidmFyXG4gICQgPSByZXF1aXJlKCcuLi8uLi9saWIvZG9tV3JhcCcpLFxuICBVc2VyID0gcmVxdWlyZSgnLi4vLi4vYXBwL3VzZXInKSxcbiAgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2xvZ2luLmh0bWwnKVxuXG5mdW5jdGlvbiBMb2dpbihwYXJlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgbm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZShvcHRpb25zKVxuXG4gIHRoaXMucGFyZW50ID0gcGFyZW50XG5cbiAgdGhpcy5ub2RlcyA9IHtcbiAgICByb290OiAkKG5vZGUpLFxuICAgIGxpc3Q6ICQobm9kZSwgJy5sb2dpbi1saW5rcycpXG4gIH1cblxuICB0aGlzLmxvZ2luTGlzdGVuZXIgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LmlkID09ICd0d2l0dGVyLWxvZ2luJykge1xuICAgICAgVXNlci5sb2dpbigndHdpdHRlcicpXG4gICAgfSBlbHNlIGlmICh0YXJnZXQuaWQgPT0gJ2dvb2dsZS1sb2dpbicpIHtcbiAgICAgIFVzZXIubG9naW4oJ2dvb2dsZScpXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwID0gdGhpcy5wYXJlbnRcbiAgICAgIHAubWVzc2FnZSgnU29ycnksIGF1dGhlbnRpY2F0aW5nIHdpdGggdGhpcyBwcm92aWRlciBpcyBub3QgYXZhaWxhYmxlIHlldC4nKVxuICAgIH1cbiAgfS5iaW5kKHRoaXMpXG5cbiAgdGhpcy5ub2Rlcy5saXN0Lm9uKCdjbGljaycsIHRoaXMubG9naW5MaXN0ZW5lcilcbn1cblxuTG9naW4ucHJvdG90eXBlLnVubG9hZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm5vZGVzLmxpc3Qub2ZmKCdjbGljaycsIHRoaXMubG9naW5MaXN0ZW5lcilcbiAgdGhpcy5ub2Rlcy5yb290Lmh0bWwoJycpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTG9naW5cbiIsInZhclxuICBVc2VyID0gcmVxdWlyZSgnLi4vLi4vYXBwL3VzZXInKSxcbiAgcmlvdCA9IHJlcXVpcmUoJ3Jpb3QnKVxuXG5yZXF1aXJlKCcuLi9mcm9udC9mcm9udCcpXG5yZXF1aXJlKCcuLi9sb2dpbi9sb2dpbicpXG5yZXF1aXJlKCcuLi91c2VyL3VzZXInKVxuXG5mdW5jdGlvbiBNYWluKHJvb3ROb2RlKSB7XG4gIHJpb3Qub2JzZXJ2YWJsZSh0aGlzKSAvLyBtYWluIGNhbiBsaXN0ZW4gdG8gZXZlbnRzLlxuXG4gIHZhciBtID0gdGhpc1xuXG4gIG0ucm9vdE5vZGUgPSByb290Tm9kZVxuXG4gIG0ub24oJ21vZHVsZTp1c2VyOmZhaWxlZDpsb29rdXAnLCBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJycgLy8gXCJyZWRpcmVjdFwiIGhvbWUuXG4gICAgbS5tZXNzYWdlKCdTb3JyeSwgd2UgY291bGQgbm90IGZpbmQgdGhhdCB1c2VyLicpXG4gIH0pXG5cbiAgbS5vbignbW9kdWxlOm5hdmlnYXRpb246ZGlkOm5ld3Bvc3QnLCBmdW5jdGlvbih1c2VyKXtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2ggIT0gJyNtZS9wb3N0cycpIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJ21lL3Bvc3RzJ1xuICAgICAgbS5zaG93TmV3UG9zdCA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgbS5sYXN0bW9kLnNob3dOZXdQb3N0KClcbiAgICB9XG4gIH0pXG5cbiAgbS5vbignbW9kdWxlOnVzZXI6ZGlkOmxvb2t1cCcsIGZ1bmN0aW9uKHVpZCwgdXNlcikge1xuICAgIGlmIChtLnNob3dOZXdQb3N0KSB7XG4gICAgICBtLmxhc3Rtb2Quc2hvd05ld1Bvc3QoKVxuICAgICAgbS5zaG93TmV3UG9zdCA9IGZhbHNlXG4gICAgfVxuICB9KVxuXG4gIFVzZXIub24oJ3N0b3JlOnVzZXJzOmRpZDpsb2dpbicsIGZ1bmN0aW9uKHVzZXIpIHtcbiAgICB1c2VyLnVwZGF0ZSgpXG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnJyAvLyBcInJlZGlyZWN0XCIgaG9tZS5cbiAgICBtLm1lc3NhZ2UoJ1RoYW5rIHlvdSEgWW91IGhhdmUgYmVlbiBsb2dnZWQgaW4uJylcbiAgfSlcblxuICBVc2VyLm9uKCdzdG9yZTp1c2VyczpkaWQ6bG9nb3V0JywgZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnIC8vIFwicmVkaXJlY3RcIiBob21lLlxuICAgIG0ubWVzc2FnZSgnWW91XFwndmUgYmVlbiBsb2dnZWQgb3V0LicpXG4gIH0pXG59XG5cbk1haW4ucHJvdG90eXBlLm1lc3NhZ2UgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHRoaXMudHJpZ2dlcignbW9kdWxlOm1lc3NhZ2U6ZG86bWVzc2FnZScsIHRleHQpXG59XG5cbk1haW4ucHJvdG90eXBlLmxvYWRtb2QgPSBmdW5jdGlvbihuYW1lLCBvcHRpb25zKSB7XG4gIHZhciBtID0gdGhpcywgQ3RvciA9IHJlcXVpcmUoJy4uLycgKyBuYW1lICsgJy8nICsgbmFtZSlcbiAgaWYgKG0ubGFzdG1vZCkgeyBtLmxhc3Rtb2QudW5sb2FkKCkgfVxuICBtLmxhc3Rtb2QgPSBuZXcgQ3RvcihtLCBtLnJvb3ROb2RlLCBvcHRpb25zKVxufVxuXG4vKlxuICogUGFyYW1ldGVycyB0byB0aGlzIGZ1bmN0aW9uIGNvbWUgZnJvbSB0aGUgcm91dGVyIChyaW90LnJvdXRlKSxcbiAqIHBhcnNlZCBmcm9tIHRoZSBsb2NhdGlvbiBoYXNoLlxuICovXG5NYWluLnByb3RvdHlwZS5yb3V0ZXIgPSBmdW5jdGlvbihfdWlkLCBhY3Rpb24sIHBvc3RpZCkge1xuICB0aGlzLnRyaWdnZXIoJ21vZHVsZTptYWluOmRpZDpyb3V0ZXInKVxuXG4gIHZhciBtID0gdGhpcywgdXNlciA9IFVzZXIuY3VycmVudFxuICB2YXIgdWlkID0gKF91aWQgPT0gJ21lJykgPyB1c2VyLnVpZCA6IF91aWRcblxuICBzd2l0Y2goYWN0aW9uKSB7XG4gIGNhc2UgJ3Bvc3RzJzpcbiAgY2FzZSAnZmF2b3JpdGVzJzpcblxuICAgIGlmIChfdWlkID09ICdtZScgJiYgIXVzZXIubG9nZ2VkKSB7XG4gICAgICBtLmxvYWRtb2QoJ2xvZ2luJylcbiAgICAgIG0ubWVzc2FnZSgnUGxlYXNlIGxvZ2luIHRvIGFjY2VzcyB5b3VyIHBvc3RzLicpXG5cbiAgICB9IGVsc2Uge1xuICAgICAgbS5sb2FkbW9kKCd1c2VyJywge3VpZDogdWlkLCBhY3Rpb246IGFjdGlvbn0pXG4gICAgfVxuXG4gIGJyZWFrXG4gIGNhc2UgJ2xvZ291dCc6XG5cbiAgICBpZiAodXNlci5sb2dnZWQpIHsgdXNlci5sb2dvdXQoKSB9XG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnJ1xuXG4gIGJyZWFrXG4gIGRlZmF1bHQ6XG4gICAgbS5sb2FkbW9kKCdmcm9udCcpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNYWluXG4iLCJ2YXIgXyA9IHtlc2NhcGU6IHJlcXVpcmUoXCJsb2Rhc2guZXNjYXBlXCIpfTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKXtcbnZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xud2l0aChvYmp8fHt9KXtcbl9fcCs9JzxzcGFuIGNsYXNzPVwiYXBwLW1lc3NhZ2UtdGV4dFwiPjwvc3Bhbj48ZGl2IGNsYXNzPVwiYXBwLW1lc3NhZ2UtZGlzbWlzc1wiPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJhcHAtbWVzc2FnZS1kaXNtaXNzXCI+RGlzbWlzczwvYT48L2Rpdj4nO1xufVxucmV0dXJuIF9fcDtcbn07XG4iLCJ2YXJcbiAgJCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9kb21XcmFwJyksXG4gIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9tZXNzYWdlLmh0bWwnKVxuXG5mdW5jdGlvbiBNZXNzYWdlKHBhcmVudCwgbm9kZSwgb3B0aW9ucykge1xuICBub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKG9wdGlvbnMpXG5cbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnRcblxuICB0aGlzLm5vZGVzID0ge1xuICAgIHJvb3QgOiAkKG5vZGUpLFxuICAgIHRleHQgOiAkKG5vZGUsICcuYXBwLW1lc3NhZ2UtdGV4dCcpLFxuICAgIGRpc20gOiAkKG5vZGUsICcuYXBwLW1lc3NhZ2UtZGlzbWlzcycpXG4gIH1cblxuICB0aGlzLm1haW5Eb01lc3NhZ2VMaXN0ZW5lciA9IGZ1bmN0aW9uKHRleHQpe1xuICAgIHRoaXMuc2hvdyh0ZXh0KVxuICB9LmJpbmQodGhpcylcblxuICB0aGlzLnBhcmVudC5vbignbW9kdWxlOm1lc3NhZ2U6ZG86bWVzc2FnZScsIHRoaXMubWFpbkRvTWVzc2FnZUxpc3RlbmVyKVxuXG4gIHRoaXMubm9kZXMuZGlzbS5vbignY2xpY2snLCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICB0aGlzLmRpc21pc3MoKVxuICB9LmJpbmQodGhpcykpXG59XG5cbk1lc3NhZ2UucHJvdG90eXBlLnVubG9hZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBhcmVudC5vZmYoJ21vZHVsZTptYWluOmRvOm1lc3NhZ2UnLCB0aGlzLm1haW5Eb01lc3NhZ2VMaXN0ZW5lcilcbiAgdGhpcy5ub2Rlcy5kaXNtLm9mZigpXG4gIHRoaXMubm9kZXMucm9vdC5odG1sKCcnKVxufVxuXG5NZXNzYWdlLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICB0aGlzLm5vZGVzLnJvb3QucmVtb3ZlQ2xhc3MoJ2FwcC1oaWRkZW4nKVxuICB0aGlzLm5vZGVzLnRleHQudGV4dChtZXNzYWdlKVxufVxuXG5NZXNzYWdlLnByb3RvdHlwZS5kaXNtaXNzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubm9kZXMucm9vdC5hZGRDbGFzcygnYXBwLWhpZGRlbicpXG4gIHRoaXMubm9kZXMudGV4dC50ZXh0KCcnKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1lc3NhZ2VcbiIsInZhciBfID0ge2VzY2FwZTogcmVxdWlyZShcImxvZGFzaC5lc2NhcGVcIil9O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmope1xudmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLHByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XG53aXRoKG9ianx8e30pe1xuX19wKz0nPG5hdiBjbGFzcz1cIm5hdmlnYXRpb25cIj48dWwgY2xhc3M9XCJuYXYtYWN0aW9uc1wiIHJvbGU9XCJuYXZpZ2F0aW9uXCI+PGxpPjxhIGlkPVwibmF2LW5ld3Bvc3RcIiBocmVmPVwiI1wiPk5ldyBQb3N0PC9hPjwvbGk+PGxpPjxhIGhyZWY9XCIjbWUvcG9zdHNcIj5NeSBQb3N0czwvYT48L2xpPjxsaT48YSBocmVmPVwiI21lL2Zhdm9yaXRlc1wiPk15IEZhdm9yaXRlczwvYT48L2xpPjxsaT48YSBpZD1cIm5hdi1sb2dvdXRcIiBocmVmPVwiI21lL2xvZ291dFwiPkxvZyBPdXQ8L2E+PC9saT48L3VsPjwvbmF2Pic7XG59XG5yZXR1cm4gX19wO1xufTtcbiIsInZhclxuICAkID0gcmVxdWlyZSgnLi4vLi4vbGliL2RvbVdyYXAnKSxcbiAgVXNlciA9IHJlcXVpcmUoJy4uLy4uL2FwcC91c2VyJyksXG4gIHJpb3QgPSByZXF1aXJlKCdyaW90JyksXG4gIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9uYXZpZ2F0aW9uLmh0bWwnKVxuXG5mdW5jdGlvbiBOYXZpZ2F0aW9uKHBhcmVudCwgbm9kZSwgb3B0aW9ucykge1xuICBub2RlLmlubmVySFRNTCA9IHRlbXBsYXRlKG9wdGlvbnMpXG5cbiAgdmFyIG4gPSB0aGlzXG5cbiAgbi5wYXJlbnQgPSBwYXJlbnRcblxuICBuLm5vZGVzID0ge1xuICAgIHJvb3QgICAgOiAkKG5vZGUpLFxuICAgIGxvZ291dCAgOiAkKG5vZGUsICcjbmF2LWxvZ291dCcpLFxuICAgIG5ld3Bvc3QgOiAkKG5vZGUsICcjbmF2LW5ld3Bvc3QnKVxuICB9XG5cbiAgbi51cGRhdGVMb2dvdXQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoVXNlci5jdXJyZW50LmxvZ2dlZCkgeyBuLnNob3dMb2dvdXQoKSB9IGVsc2UgeyBuLmhpZGVMb2dvdXQoKSB9XG4gIH1cblxuICBuLm5ld3Bvc3RMaXN0ZW5lciA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIG4ucGFyZW50LnRyaWdnZXIoJ21vZHVsZTpuYXZpZ2F0aW9uOmRpZDpuZXdwb3N0JylcbiAgfVxuXG4gIG4ucGFyZW50Lm9uKCdtb2R1bGU6bWFpbjpkaWQ6cm91dGVyJywgbi51cGRhdGVMb2dvdXQpXG4gIG4ubm9kZXMubmV3cG9zdC5vbignY2xpY2snLCBuLm5ld3Bvc3RMaXN0ZW5lcilcbn1cblxuTmF2aWdhdGlvbi5wcm90b3R5cGUudW5sb2FkID0gZnVuY3Rpb24oKSB7XG4gIHZhciBuID0gdGhpc1xuICBuLnBhcmVudC5vZmYoJ21vZHVsZTptYWluOmRpZDpyb3V0ZXInLCBuLnVwZGF0ZUxvZ291dClcbiAgbi5ub2Rlcy5uZXdwb3N0Lm9uKCdjbGljaycsIG4ubmV3cG9zdExpc3RlbmVyKVxuICBuLm5vZGVzLnJvb3QuaHRtbCgnJylcbn1cblxuTmF2aWdhdGlvbi5wcm90b3R5cGUuc2hvd0xvZ291dCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm5vZGVzLmxvZ291dC5yZW1vdmVDbGFzcygnYXBwLWhpZGRlbicpXG59XG5cbk5hdmlnYXRpb24ucHJvdG90eXBlLmhpZGVMb2dvdXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5ub2Rlcy5sb2dvdXQuYWRkQ2xhc3MoJ2FwcC1oaWRkZW4nKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5hdmlnYXRpb25cbiIsInZhciBfID0ge2VzY2FwZTogcmVxdWlyZShcImxvZGFzaC5lc2NhcGVcIil9O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmope1xudmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLHByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XG53aXRoKG9ianx8e30pe1xuX19wKz0nPGgyPicrXG4oKF9fdD0oIHN0b3JlZCA/ICdFZGl0aW5nIFBvc3QnIDogJ05ldyBQb3N0JyApKT09bnVsbD8nJzpfX3QpK1xuJzwvaDI+PHA+UGxlYXNlIHByb3ZpZGUgdGhlIHJlc291cmNlIHVybCB0byBzaGFyZSwgYSB0aXRsZSBhbmQgYSBkZXNjcmlwdGlvbi48L3A+PGRpdiBjbGFzcz1cInBvc3QtZm9ybS1lbWJlZFwiPjxsYWJlbD5FbWJlZCBVcmwgKGUuZy4gWW91VHViZSBVcmwpPC9sYWJlbD48aW5wdXQgbmFtZT1cInVybFwiIHR5cGU9XCJ1cmxcIiBwbGFjZWhvbGRlcj1cImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9UDlKNXRZU2hOWThcIj48L2Rpdj48ZGl2IGNsYXNzPVwicG9zdC1mb3JtLWRhdGFcIj48aW5wdXQgbmFtZT1cInRpdGxlXCIgdGl0bGU9XCJQb3N0IFRpdGxlXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlRpdGxlXCI+PHRleHRhcmVhIHRpdGxlPVwiUG9zdCBEZXNjcmlwdGlvblwiIHBsYWNlaG9sZGVyPVwiRGVzY3JpcHRpb25cIj48L3RleHRhcmVhPjwvZGl2PjxkaXYgY2xhc3M9XCJwb3N0LWFjdGlvbnNcIiBkYXRhLXBvc3Qta2V5PVwiJytcbigoX190PSggcG9zdEtleSApKT09bnVsbD8nJzpfX3QpK1xuJ1wiPjxhIGNsYXNzPVwidW5kb1wiIHRpdGxlPVwiVW5kb1wiIGhyZWY9XCIjXCI+PGkgY2xhc3M9XCJmYSBmYS10aW1lcy1jaXJjbGVcIj48L2k+Jm5ic3A7Q2FuY2VsPC9hPiA8YSBjbGFzcz1cInNhdmVcIiB0aXRsZT1cIlNhdmUgYW5kIFB1Ymxpc2hcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmEgZmEtc2F2ZVwiPjwvaT4mbmJzcDtTYXZlPC9hPiA8c3BhbiBjbGFzcz1cInBvc3QtZWRpdC1tZXNzYWdlXCI+PC9zcGFuPjwvZGl2Pic7XG59XG5yZXR1cm4gX19wO1xufTtcbiIsInZhciBfID0ge1xuICBtZXJnZSAgOiByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21lcmdlJyksXG4gIHZhbHVlcyA6IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvdmFsdWVzJylcbn1cblxudmFyXG4gICQgPSByZXF1aXJlKCcuLi8uLi9saWIvZG9tV3JhcCcpLFxuICBQb3N0ID0gcmVxdWlyZSgnLi4vLi4vYXBwL3Bvc3QnKSxcbiAgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2Zvcm0uaHRtbCcpXG5cbmZ1bmN0aW9uIFBvc3RGb3JtKHBhcmVudCwgbm9kZSwgb3B0aW9ucykge1xuICB0aGlzLnBhcmVudCA9IHBhcmVudFxuICB0aGlzLnBvc3QgPSBuZXcgUG9zdChvcHRpb25zLnBvc3QpXG5cbiAgdmFyIHIgPSAkKG5vZGUpLmh0bWwodGVtcGxhdGUoXy5tZXJnZSh7XG4gICAgcG9zdEtleTogdGhpcy5wb3N0LmtleSB8fCAnbmV3J1xuICB9LCB0aGlzLnBvc3QpKSlcblxuICB0aGlzLm5vZGVzID0ge1xuICAgIHJvb3Q6IHIsXG4gICAgZm9ybU1lc3NhZ2U6ICQobm9kZSwgJy5wb3N0LWVkaXQtbWVzc2FnZScpLFxuICAgIGlucHV0VGl0bGU6ICQobm9kZSwgJ2lucHV0W25hbWU9dGl0bGVdJyksXG4gICAgaW5wdXRVcmw6ICQobm9kZSwgJ2lucHV0W25hbWU9dXJsXScpLFxuICAgIGlucHV0RGVzYzogJChub2RlLCAndGV4dGFyZWEnKVxuICB9XG5cbiAgci5hZGRDbGFzcygnYXBwLXBvc3QtZm9ybScpXG5cbiAgdGhpcy51cGRhdGVGb3JtKClcbn1cblxuUG9zdEZvcm0ucHJvdG90eXBlLnVubG9hZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm5vZGVzLnJvb3QucmVtb3ZlQ2xhc3MoJ2FwcC1wb3N0LWZvcm0nKS5odG1sKCcnKVxufVxuXG5Qb3N0Rm9ybS5wcm90b3R5cGUudXBkYXRlRm9ybSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbiA9IHRoaXMubm9kZXMsIHAgPSB0aGlzLnBvc3RcbiAgbi5pbnB1dFRpdGxlLnZhbChwLnRpdGxlKVxuICBuLmlucHV0VXJsLnZhbChwLmVtYmVkLnVybCB8fCAnJylcbiAgbi5pbnB1dERlc2MudmFsKHAuZGVzYylcbn1cblxuUG9zdEZvcm0ucHJvdG90eXBlLnVwZGF0ZVBvc3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG4gPSB0aGlzLm5vZGVzXG4gIHRoaXMucG9zdC5zZXRhdHRyKHtcbiAgICB0aXRsZTogbi5pbnB1dFRpdGxlLnZhbCgpLFxuICAgIGVtYmVkOiB7dXJsOiBuLmlucHV0VXJsLnZhbCgpIH0sXG4gICAgZGVzYzogbi5pbnB1dERlc2MudmFsKClcbiAgfSlcbn1cblxuUG9zdEZvcm0ucHJvdG90eXBlLmlzVmFsaWQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc3VsdCA9IHRoaXMucG9zdC52YWxpZGF0aW9uKCksIG4gPSB0aGlzLm5vZGVzXG5cbiAgbi5pbnB1dFVybC5yZW1vdmVDbGFzcygnaW52YWxpZCcpXG4gIG4uaW5wdXRUaXRsZS5yZW1vdmVDbGFzcygnaW52YWxpZCcpXG5cbiAgaWYgKHJlc3VsdC5pc1ZhbGlkKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIHtcbiAgICBpZiAocmVzdWx0LmVycm9ycy51cmwpIHsgbi5pbnB1dFVybC5hZGRDbGFzcygnaW52YWxpZCcpIH1cbiAgICBpZiAocmVzdWx0LmVycm9ycy50aXRsZSkgeyBuLmlucHV0VGl0bGUuYWRkQ2xhc3MoJ2ludmFsaWQnKSB9XG5cbiAgICB2YXIgbXNnID0gXy52YWx1ZXMocmVzdWx0LmVycm9ycykuam9pbignLCAnKVxuICAgIG4uZm9ybU1lc3NhZ2UudGV4dCgnU29ycnksIHRoZSBwb3N0IGNhblxcJ3QgYmUgc2F2ZWQ6ICcgKyBtc2cgKyAnLicpXG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RGb3JtXG4iLCJ2YXIgXyA9IHtlc2NhcGU6IHJlcXVpcmUoXCJsb2Rhc2guZXNjYXBlXCIpfTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKXtcbnZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xud2l0aChvYmp8fHt9KXtcbl9fcCs9JzxwIGNsYXNzPVwidGltZWFnb1wiPnBvc3RlZCBieSZuYnNwOycrXG4oKF9fdD0oIHVzZXJOYW1lICkpPT1udWxsPycnOl9fdCkrXG4nJm5ic3A7JytcbigoX190PSggdGltZWFnbyApKT09bnVsbD8nJzpfX3QpK1xuJzwvcD48aDI+PGkgY2xhc3M9XCJmYSBmYS1wbGF5XCI+PC9pPiZuYnNwOycrXG4oKF9fdD0oIHRpdGxlICkpPT1udWxsPycnOl9fdCkrXG4nPC9oMj48ZGl2IGNsYXNzPVwicG9zdC1zaG93LWVtYmVkXCI+PGlmcmFtZSB0eXBlPVwidGV4dC9odG1sXCIgd2lkdGg9XCI2NDBcIiBoZWlnaHQ9XCIyNjBcIiBzcmM9XCJodHRwOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLycrXG4oKF9fdD0oIGVtYmVkLnZpZGVvSWQgKSk9PW51bGw/Jyc6X190KStcbidcIiBmcmFtZWJvcmRlcj1cIjBcIj48L2lmcmFtZT48L2Rpdj48cCBjbGFzcz1cInBvc3Qtc2hvdy1kZXNjcmlwdGlvblwiPjxpIGNsYXNzPVwiZmEgZmEtY2hpbGQgZmEtMnhcIj48L2k+Jm5ic3A7JytcbigoX190PSggZGVzYyApKT09bnVsbD8nJzpfX3QpK1xuJzwvcD48ZGl2IGNsYXNzPVwicG9zdC1hY3Rpb25zXCIgZGF0YS1wb3N0LWtleT1cIicrXG4oKF9fdD0oIHBvc3RLZXkgKSk9PW51bGw/Jyc6X190KStcbidcIj48YSBjbGFzcz1cImZhdlwiIHRpdGxlPVwiRmF2b3JpdGVcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmEgZmEtaGVhcnRcIj48L2k+Jm5ic3A7RmF2b3JpdGU8L2E+JztcbiBpZiAob3duZWQpIHsgXG5fX3ArPScgPGEgY2xhc3M9XCJlZGl0XCIgdGl0bGU9XCJFZGl0XCIgaHJlZj1cIiNcIj48aSBjbGFzcz1cImZhIGZhLWVkaXRcIj48L2k+Jm5ic3A7RWRpdDwvYT4gPGEgY2xhc3M9XCJyZW1vdmVcIiB0aXRsZT1cIlJlbW92ZVwiIGhyZWY9XCIjXCI+PGkgY2xhc3M9XCJmYSBmYS10cmFzaFwiPjwvaT4mbmJzcDtSZW1vdmU8L2E+JztcbiB9IFxuX19wKz0nPC9kaXY+Jztcbn1cbnJldHVybiBfX3A7XG59O1xuIiwidmFyXG4gICQgPSByZXF1aXJlKCcuLi8uLi9saWIvZG9tV3JhcCcpLFxuICB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vc2hvdy5odG1sJyksXG4gIFVzZXIgPSByZXF1aXJlKCcuLi8uLi9hcHAvdXNlcicpXG5cbnZhciBfID0ge1xuICBtZXJnZSA6IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvbWVyZ2UnKVxufVxuXG5mdW5jdGlvbiBQb3N0U2hvdyhwYXJlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnRcblxuICB2YXIgcCA9IHRoaXMucG9zdCA9IG9wdGlvbnMucG9zdFxuXG4gIG5vZGUuaW5uZXJIVE1MID0gdGVtcGxhdGUoXy5tZXJnZShwLmdldGF0dHIoKSwge1xuICAgIHBvc3RLZXk6IHAua2V5IHx8ICduZXcnLFxuICAgIHRpbWVhZ286IHAudGltZWFnbygpLFxuICAgIG93bmVkOiBwLnVpZCA9PSBVc2VyLmN1cnJlbnQudWlkXG4gIH0pKVxuXG4gIHRoaXMubm9kZXMgPSB7XG4gICAgcm9vdDogJChub2RlKS5hZGRDbGFzcygnYXBwLXBvc3Qtc2hvdycpLFxuICAgIGZhdjogJChub2RlLCAnLmZhdicpXG4gIH1cblxuICB0aGlzLnVwZGF0ZUZhdigpXG59XG5cblBvc3RTaG93LnByb3RvdHlwZS51cGRhdGVGYXYgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHAgPSB0aGlzLnBvc3QsIGYgPSB0aGlzLm5vZGVzLmZhdlxuXG4gIGlmIChwLmZhdm9yaXRlZEJ5KFVzZXIuY3VycmVudC51aWQpKSB7XG4gICAgZi5hZGRDbGFzcygncG9zdC1mYXZvcml0ZWQnKVxuICB9IGVsc2Uge1xuICAgIGYucmVtb3ZlQ2xhc3MoJ3Bvc3QtZmF2b3JpdGVkJylcbiAgfVxufVxuXG5Qb3N0U2hvdy5wcm90b3R5cGUudW5sb2FkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubm9kZXMucm9vdC5yZW1vdmVDbGFzcygnYXBwLXBvc3Qtc2hvdycpLmh0bWwoJycpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gUG9zdFNob3dcbiIsInZhciBfID0ge2VzY2FwZTogcmVxdWlyZShcImxvZGFzaC5lc2NhcGVcIil9O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmope1xudmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLHByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XG53aXRoKG9ianx8e30pe1xuX19wKz0nPGRpdiBjbGFzcz1cInByb2ZpbGUtaW5mb1wiPjx1bCBjbGFzcz1cImZhLXVsXCI+PGxpIGNsYXNzPVwicHJvZmlsZS1waWNcIj48aW1nIHNyYz1cIicrXG4oKF9fdD0odXNlci5hdmF0YXJVcmwpKT09bnVsbD8nJzpfX3QpK1xuJ1wiPjwvbGk+PGxpPjxpIGNsYXNzPVwiZmEtbGkgZmEgZmEtdXNlclwiPjwvaT4nK1xuKChfX3Q9KHVzZXIuZGlzcGxheU5hbWUpKT09bnVsbD8nJzpfX3QpK1xuJzwvbGk+PGxpPjxpIGNsYXNzPVwiZmEtbGkgZmEgZmEtYXN0ZXJpc2tcIj48L2k+JytcbigoX190PSh1c2VyLmRlc2NyaXB0aW9uKSk9PW51bGw/Jyc6X190KStcbic8L2xpPjxsaT48aSBjbGFzcz1cImZhLWxpIGZhIGZhLW1hcC1tYXJrZXJcIj48L2k+JytcbigoX190PSh1c2VyLmxvY2F0aW9uKSk9PW51bGw/Jyc6X190KStcbic8L2xpPic7XG4gaWYgKHVzZXIucHJvdmlkZXIgPT0gJ3R3aXR0ZXInKSB7IFxuX19wKz0nPGxpPjxpIGNsYXNzPVwiZmEtbGkgZmEgZmEtdHdpdHRlci1zcXVhcmVcIj48L2k+IDxhIGhyZWY9XCJodHRwczovL3R3aXR0ZXIuY29tLycrXG4oKF9fdD0odXNlci5kaXNwbGF5TmFtZSkpPT1udWxsPycnOl9fdCkrXG4nXCI+QCcrXG4oKF9fdD0odXNlci5kaXNwbGF5TmFtZSkpPT1udWxsPycnOl9fdCkrXG4nPC9hPjwvbGk+JztcbiB9IFxuX19wKz0nJztcbiBpZiAodXNlci5wcm92aWRlciA9PSAnZ29vZ2xlJykgeyBcbl9fcCs9JzxsaT48aSBjbGFzcz1cImZhLWxpIGZhIGZhLWdvb2dsZS1wbHVzXCI+PC9pPiA8YSBocmVmPVwiJytcbigoX190PSh1c2VyLnVybCkpPT1udWxsPycnOl9fdCkrXG4nXCI+JytcbigoX190PSh1c2VyLmRpc3BsYXlOYW1lKSk9PW51bGw/Jyc6X190KStcbic8L2E+PGJyPjwvbGk+JztcbiB9IFxuX19wKz0nPC91bD48L2Rpdj4nO1xufVxucmV0dXJuIF9fcDtcbn07XG4iLCJ2YXIgXyA9IHtlc2NhcGU6IHJlcXVpcmUoXCJsb2Rhc2guZXNjYXBlXCIpfTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKXtcbnZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xud2l0aChvYmp8fHt9KXtcbl9fcCs9Jzxhc2lkZSBjbGFzcz1cInByb2ZpbGVcIj48L2FzaWRlPjxtYWluIGNsYXNzPVwibWFpblwiIHJvbGU9XCJtYWluXCI+PGRpdiBjbGFzcz1cImFwcC1uZXctcG9zdFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJhcHAtcG9zdC1wbGFjZWhvbGRlclwiPjxoMT5IZXkhJm5ic3A7PGkgY2xhc3M9XCJmYSBmYS1jaGlsZFwiPjwvaT4mbmJzcDs8aSBjbGFzcz1cImZhIGZhLXBsYXlcIj48L2k+PC9oMT48cD5UaGlzIHVzZXIgaGFzIG5vdCcrXG4oKF9fdD0oIChhY3Rpb24gPT0gJ3Bvc3RzJykgPyAnIHBvc3RlZCBhbnl0aGluZyAnIDogJyBmYXZvcml0ZWQgYW55IHBvc3QgJyApKT09bnVsbD8nJzpfX3QpK1xuJ3lldC4gUGxlYXNlIGNoZWNrIGJhY2sgbGF0ZXIhPC9wPjwvZGl2PjxkaXYgY2xhc3M9XCJhcHAtcG9zdHNcIj48L2Rpdj48L21haW4+Jztcbn1cbnJldHVybiBfX3A7XG59O1xuIiwidmFyXG4gICQgPSByZXF1aXJlKCcuLi8uLi9saWIvZG9tV3JhcCcpLFxuICBQb3N0ID0gcmVxdWlyZSgnLi4vLi4vYXBwL3Bvc3QnKSxcbiAgVXNlciA9IHJlcXVpcmUoJy4uLy4uL2FwcC91c2VyJyksXG4gIFBvc3RGb3JtID0gcmVxdWlyZSgnLi4vcG9zdC9mb3JtJyksXG4gIFBvc3RTaG93ID0gcmVxdWlyZSgnLi4vcG9zdC9zaG93JyksXG4gIHByb2Z0cGwgPSByZXF1aXJlKCcuL3Byb2ZpbGUuaHRtbCcpLFxuICB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdXNlci5odG1sJylcblxuZnVuY3Rpb24gVXNlck1vZChwYXJlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnRcblxuICB2YXIgdSA9IHRoaXNcblxuICB1Lm1vZHMgPSB7fSAvLyBzdG9yZSBQb3N0U2hvdyBhbmQgUG9zdEZvcm0gbW9kdWxlcy5cblxuICB1LmFjdGlvbiA9IG9wdGlvbnMuYWN0aW9uXG4gIHUudWlkID0gb3B0aW9ucy51aWRcbiAgdS5maXJlYmFzZXBhdGggPSAndXNlcl8nICsgdS5hY3Rpb24gKyAnLycgKyB1LnVpZFxuXG4gIHZhciByID0gJChub2RlKS5odG1sKHRlbXBsYXRlKHUpKVxuXG4gIHUubm9kZXMgPSB7XG4gICAgcm9vdCAgICAgIDogcixcbiAgICBuZXdwb3N0ICAgOiAkKG5vZGUsICcuYXBwLW5ldy1wb3N0JyksXG4gICAgcGxhY2Vob2xkIDogJChub2RlLCAnLmFwcC1wb3N0LXBsYWNlaG9sZGVyJyksXG4gICAgcG9zdHMgICAgIDogJChub2RlLCAnLmFwcC1wb3N0cycpLFxuICAgIHByb2YgICAgICA6ICQobm9kZSwgJy5wcm9maWxlJylcbiAgfVxuXG4gIHUudXNlckRpZExvb2t1cCA9IGZ1bmN0aW9uKHVpZCwgdXNlcikge1xuICAgIHUudXNlciA9IHVzZXJcbiAgICB1LnJlZHJhd1Byb2ZpbGUoKVxuICAgIFBvc3QucmV0cmlldmUodS5maXJlYmFzZXBhdGgpXG4gICAgdS5wYXJlbnQudHJpZ2dlcignbW9kdWxlOnVzZXI6ZGlkOmxvb2t1cCcsIHVpZCwgdXNlcilcbiAgfVxuXG4gIHUudXNlckZhaWxlZExvb2t1cCA9IGZ1bmN0aW9uICh1aWQpIHtcbiAgICB1LnBhcmVudC50cmlnZ2VyKCdtb2R1bGU6dXNlcjpmYWlsZWQ6bG9va3VwJywgdWlkKVxuICB9XG5cbiAgdS5wb3N0c0RpZFJldHJpZXZlID0gZnVuY3Rpb24oZmlyZWJhc2VwYXRoLCBwb3N0KXtcbiAgICB2YXIgbSA9IHUubW9kc1twb3N0LmtleV1cbiAgICBpZiAobSkgeyB1LnNob3dtb2QobSkgfSBlbHNlIHsgdS5hZGRQb3N0KHBvc3QpIH1cbiAgfVxuXG4gIHUucG9zdHNEaWRVcGRhdGUgPSBmdW5jdGlvbihwb3N0KXtcbiAgICB2YXIgbSA9IHUubW9kc1twb3N0LmtleV1cbiAgICBpZiAobSkgeyB1LnNob3dtb2QobSkgfVxuICB9XG5cbiAgdmFyIGFjdGlvbk1vZCA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIHZhciBrZXkgPSB0YXJnZXQucGFyZW50KCcucG9zdC1hY3Rpb25zJykuZGF0YSgncG9zdC1rZXknKVxuICAgIHJldHVybiB1Lm1vZHNba2V5XVxuICB9XG5cbiAgci5vbignY2xpY2snLCAnLmZhdicsIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIHZhciBtb2QgPSBhY3Rpb25Nb2QodGFyZ2V0KVxuICAgIFBvc3QudG9nZ2xlRmF2KG1vZC5wb3N0LCBVc2VyLmN1cnJlbnQudWlkKVxuICB9KVxuXG4gIHIub24oJ2NsaWNrJywgJy5lZGl0JywgZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgdS5lZGl0UG9zdChhY3Rpb25Nb2QodGFyZ2V0KSlcbiAgfSlcblxuICByLm9uKCdjbGljaycsICcucmVtb3ZlJywgZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgdS5yZW1vdmVQb3N0KGFjdGlvbk1vZCh0YXJnZXQpKVxuICB9KVxuXG4gIHIub24oJ2NsaWNrJywgJy51bmRvJywgZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgdmFyIG1vZCA9IGFjdGlvbk1vZCh0YXJnZXQpXG4gICAgaWYgKG1vZC5wb3N0LnN0b3JlZCkge1xuICAgICAgdS5zaG93bW9kKG1vZClcbiAgICB9IGVsc2Uge1xuICAgICAgdS5oaWRlTmV3UG9zdCgpXG4gICAgfVxuICB9KVxuXG4gIHIub24oJ2NsaWNrJywgJy5zYXZlJywgZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgdmFyIG1vZCA9IGFjdGlvbk1vZCh0YXJnZXQpXG4gICAgbW9kLnVwZGF0ZVBvc3QoKVxuXG4gICAgaWYgKCFtb2QuaXNWYWxpZCgpKSB7XG4gICAgICAvLyBkbyBub3RoaW5nLCB0aGUgZm9ybSB3aWxsIHNob3cgYW4gZXJyb3IgbWVzc2FnZS5cbiAgICB9IGVsc2UgaWYgKG1vZC5wb3N0LnN0b3JlZCkge1xuICAgICAgUG9zdC51cGRhdGUobW9kLnBvc3QpXG4gICAgfSBlbHNlIHtcbiAgICAgIFBvc3QucGVyc2lzdChtb2QucG9zdClcbiAgICAgIHUuaGlkZU5ld1Bvc3QoKVxuICAgIH1cbiAgfSlcblxuICBVc2VyLm9uKCdzdG9yZTp1c2VyczpmYWlsZWQ6bG9va3VwJyAsIHUudXNlckZhaWxlZExvb2t1cClcbiAgVXNlci5vbignc3RvcmU6dXNlcnM6ZGlkOmxvb2t1cCcgICAgLCB1LnVzZXJEaWRMb29rdXApXG4gIFBvc3Qub24oJ3N0b3JlOnBvc3RzOmRpZDpyZXRyaWV2ZScgICwgdS5wb3N0c0RpZFJldHJpZXZlKVxuICBQb3N0Lm9uKCdzdG9yZTpwb3N0czpkaWQ6dXBkYXRlJyAgICAsIHUucG9zdHNEaWRVcGRhdGUpXG4gIFBvc3Qub24oJ3N0b3JlOnBvc3RzOmRpZDp0b2dnbGVmYXYnICwgdS5wb3N0c0RpZFVwZGF0ZSlcblxuICBVc2VyLmxvb2t1cCh1LnVpZClcbn1cblxuVXNlck1vZC5wcm90b3R5cGUudW5sb2FkID0gZnVuY3Rpb24oKSB7XG4gIHZhciB1ID0gdGhpc1xuXG4gIHUubm9kZXMucm9vdC5vZmYoKS5odG1sKCcnKSAvLyB1bnJlZ2lzdGVyIGFsbCBldmVudCBoYW5kbGVycy5cblxuICBVc2VyLm9mZignc3RvcmU6dXNlcnM6ZmFpbGVkOmxvb2t1cCcgLCB1LnVzZXJGYWlsZWRMb29rdXApXG4gIFVzZXIub2ZmKCdzdG9yZTp1c2VyczpkaWQ6bG9va3VwJyAgICAsIHUudXNlckRpZExvb2t1cClcbiAgUG9zdC5vZmYoJ3N0b3JlOnBvc3RzOmRpZDpyZXRyaWV2ZScgICwgdS5wb3N0c0RpZFJldHJpZXZlKVxuICBQb3N0Lm9mZignc3RvcmU6cG9zdHM6ZGlkOnVwZGF0ZScgICAgLCB1LnBvc3RzRGlkVXBkYXRlKVxuICBQb3N0Lm9mZignc3RvcmU6cG9zdHM6ZGlkOnRvZ2dsZWZhdicgLCB1LnBvc3RzRGlkVXBkYXRlKVxuXG4gIFBvc3Quc3RvcFJldHJpZXZlKHUuZmlyZWJhc2VwYXRoKVxufVxuXG5Vc2VyTW9kLnByb3RvdHlwZS51cGRhdGVQbGFjZWhvbGRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbW9ka2V5cyA9IE9iamVjdC5rZXlzKHRoaXMubW9kcyksIHAgPSB0aGlzLm5vZGVzLnBsYWNlaG9sZFxuXG4gIGlmIChtb2RrZXlzLmxlbmd0aCA+IDAgfHwgdGhpcy5tb2RzWyduZXcnXSkge1xuICAgIHAuYWRkQ2xhc3MoJ2FwcC1oaWRkZW4nKVxuICB9IGVsc2Uge1xuICAgIHAucmVtb3ZlQ2xhc3MoJ2FwcC1oaWRkZW4nKVxuICB9XG59XG5cblVzZXJNb2QucHJvdG90eXBlLnJlZHJhd1Byb2ZpbGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5ub2Rlcy5wcm9mLmh0bWwocHJvZnRwbCh0aGlzKSlcbn1cblxuVXNlck1vZC5wcm90b3R5cGUuaGlkZU5ld1Bvc3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHUgPSB0aGlzLCBtID0gdS5tb2RzLm5ldywgbiA9IHUubm9kZXMubmV3cG9zdFxuICBpZiAobSkge1xuICAgIG0udW5sb2FkKClcbiAgICBuLmh0bWwoJycpXG4gICAgZGVsZXRlIHUubW9kc1snbmV3J11cbiAgfVxuICB1LnVwZGF0ZVBsYWNlaG9sZGVyKClcbn1cblxuVXNlck1vZC5wcm90b3R5cGUuc2hvd05ld1Bvc3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHUgPSB0aGlzLCBlbCwgcG9zdFxuICBpZiAoIXUubW9kcy5uZXcpIHtcbiAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgcG9zdCA9IG5ldyBQb3N0KHt1aWQgOiB1LnVpZCwgdXNlck5hbWUgOiB1LnVzZXIuZGlzcGxheU5hbWV9KVxuICAgIHUubW9kc1snbmV3J10gPSBuZXcgUG9zdEZvcm0odSwgZWwsIHtwb3N0IDogcG9zdH0pXG4gICAgdS5ub2Rlcy5uZXdwb3N0LmFwcGVuZChlbClcbiAgfVxuICB1LnVwZGF0ZVBsYWNlaG9sZGVyKClcbn1cblxuVXNlck1vZC5wcm90b3R5cGUuZWRpdFBvc3QgPSBmdW5jdGlvbihtb2QpIHtcbiAgdmFyIHUgPSB0aGlzLCBlbCA9IG1vZC5ub2Rlcy5yb290WzBdXG4gIG1vZC51bmxvYWQoKVxuICB1Lm1vZHNbbW9kLnBvc3Qua2V5XSA9IG5ldyBQb3N0Rm9ybSh1LCBlbCwge3Bvc3QgOiBtb2QucG9zdH0pXG59XG5cblVzZXJNb2QucHJvdG90eXBlLmFkZFBvc3QgPSBmdW5jdGlvbihwb3N0KSB7XG4gIHZhciB1ID0gdGhpcywgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICBwbW9kID0gbmV3IFBvc3RTaG93KHUsIGVsLCB7cG9zdCA6IHBvc3R9KVxuICB1Lm1vZHNbcG9zdC5rZXldID0gcG1vZFxuICB1Lm5vZGVzLnBvc3RzLnByZXBlbmQocG1vZC5ub2Rlcy5yb290WzBdKVxuICB1LnVwZGF0ZVBsYWNlaG9sZGVyKClcbn1cblxuLy8gU2hvdyBhIHBvc3QgdGhhdCB3YXMgcHJldmlvdXNseSBiZWluZyBlZGl0ZWQsIG9yIHVwZGF0ZSBpdCBpZiB0aGUgZGF0YSBjaGFuZ2VkLlxuVXNlck1vZC5wcm90b3R5cGUuc2hvd21vZCA9IGZ1bmN0aW9uKG1vZCkge1xuICB2YXIgdSA9IHRoaXNcbiAgaWYgKG1vZCBpbnN0YW5jZW9mIFBvc3RGb3JtKSB7XG4gICAgbW9kLnVubG9hZCgpXG4gICAgdmFyIHBtb2QgPSBuZXcgUG9zdFNob3codSwgbW9kLm5vZGVzLnJvb3RbMF0sIHtwb3N0IDogbW9kLnBvc3R9KVxuICAgIHUubW9kc1ttb2QucG9zdC5rZXldID0gcG1vZFxuICB9IGVsc2Uge1xuICAgIG1vZC51cGRhdGVGYXYoKSAvLyB1cGRhdGUganVzdCBmYXYgZmxhZyBmb3Igbm93IChjb3VsZCBoYW5kbGUgbGl2ZSB1ZHBhdGVzIElURilcbiAgfVxufVxuXG5Vc2VyTW9kLnByb3RvdHlwZS5yZW1vdmVQb3N0ID0gZnVuY3Rpb24obW9kKSB7XG4gIHZhciB1ID0gdGhpc1xuICBtb2QudW5sb2FkKClcbiAgUG9zdC5kZXN0cm95KG1vZC5wb3N0KVxuICB1Lm5vZGVzLnBvc3RzLnJlbW92ZShtb2Qubm9kZXMucm9vdFswXSlcbiAgZGVsZXRlIHUubW9kc1ttb2QucG9zdC5rZXldXG4gIHUudXBkYXRlUGxhY2Vob2xkZXIoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJNb2RcbiJdfQ==

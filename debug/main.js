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

  if (!p.title || p.title.length === 0) {
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

  var p, u = User.current

  u.uid = authData.uid
  u.authData = authData
  u.provider = authData.provider
  u.logged = true

  if (authData.provider == 'twitter') {
    u.displayName = authData.twitter.displayName

    p = authData.twitter.cachedUserProfile

    if (p) {
      // apparently twitter doesn't serve the image to the 'wrong' referer :(
      // u.avatarUrl = p.profile_image_url_https
      u.description = p.description
      u.location = p.location
      u.url = p.url
    }
  } else if (authData.provider == 'google') {
    u.displayName = authData.google.displayName

    p = authData.google.cachedUserProfile

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

DomWrap.prototype.select = function(selector) {
  return new DomWrap(this.node.querySelector(selector))
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
  this.parent = parent

  var f = this, r = $(node).html(template(options))

  this.nodes = {
    root      : r,
    posts     : r.select('.latest-posts'),
    favorited : r.select('.latest-favs')
  }

  f.handlePosts = function(collection, posts) {
    f.nodes[collection].html(itemstpl({ posts: posts }))
  }

  Post.on('store:posts:did:latest', f.handlePosts)

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
__p+='<main class="main app-login" role="main"><div class="filler"></div><div class="front-copy"><h1>Log In</h1><p>In order to interact with MusiFavs! you\'ll need to log in first.</p><p>Please select one of the services below to log in:</p><ul class="login-links fa-ul fa-2x"><li><i class="fa-li fa fa-google-plus-square"></i> <a href="#" id="google-login">Google</a></li><li><i class="fa-li fa fa-twitter-square"></i> <a href="#" id="twitter-login">Twitter</a></li></ul></div></main>';
}
return __p;
};

},{"lodash.escape":1}],75:[function(require,module,exports){
var
  $ = require('../../lib/domWrap'),
  User = require('../../app/user'),
  template = require('./login.html')

function Login(parent, node, options) {
  this.parent = parent

  var l = this, r = $(node).html(template(options))

  l.nodes = { root: r, list: r.select('.login-links') }

  l.loginListener = function(target) {
    if (target.id == 'twitter-login') {
      User.login('twitter')

    } else if (target.id == 'google-login') {
      User.login('google')

    } else {
      l.parent.message('Sorry, authenticating with this provider is not available yet.')
    }
  }

  l.nodes.list.on('click', l.loginListener)
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
  this.parent = parent

  var m = this, r = $(node).html(template(options))

  m.nodes = {
    root : r,
    text : r.select('.app-message-text'),
    dism : r.select('.app-message-dismiss')
  }

  m.mainDoMessageListener = function(text){
    m.show(text)
  }.bind(this)

  m.parent.on('module:message:do:message', m.mainDoMessageListener)

  m.nodes.dism.on('click', function(target) { m.dismiss() })
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
  this.parent = parent

  var n = this, r = $(node).html(template(options))

  n.nodes = {
    root    : r,
    logout  : r.select('#nav-logout'),
    newpost : r.select('#nav-newpost')
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

  var attr = _.merge({ postKey: this.post.key || 'new'}, this.post),
      r = $(node).html(template(attr)).addClass('app-post-form')

  this.nodes = {
    root: r,
    formMessage : r.select('.post-edit-message'),
    inputTitle  : r.select('input[name=title]'),
    inputUrl    : r.select('input[name=url]'),
    inputDesc   : r.select('textarea')
  }

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
'</h2><div class="post-show-embed"><iframe type="text/html" width="640" height="260" src="https://www.youtube.com/embed/'+
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

  var p = this.post = options.post,
    attr = _.merge(p.getattr(), {
      postKey: p.key || 'new',
      timeago: p.timeago(),
      owned: p.uid == User.current.uid
    })

  var r = $(node).addClass('app-post-show').html(template(attr))

  this.nodes = {
    root: r,
    fav: r.select('.fav')
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
__p+='<div class="profile-info"><ul class="fa-ul"><li><i class="fa-li fa fa-user"></i>'+
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
    newpost   : r.select('.app-new-post'),
    placehold : r.select('.app-post-placeholder'),
    posts     : r.select('.app-posts'),
    prof      : r.select('.profile')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmVzY2FwZS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guZXNjYXBlL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2V0b3N0cmluZy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvY29sbGVjdGlvbi9yZWplY3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2FycmF5Q29weS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYXJyYXlFYWNoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9hcnJheUZpbHRlci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYXNzaWduRGVmYXVsdHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VBc3NpZ24uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VDYWxsYmFjay5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUNvcHkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VFYWNoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlRmlsdGVyLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlRmxhdHRlbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZvci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUZvckluLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlRm9yT3duLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlSXNFcXVhbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUlzRXF1YWxEZWVwLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlSXNGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZUlzTWF0Y2guanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VNYXRjaGVzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlTWF0Y2hlc1Byb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9iYXNlTWVyZ2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VNZXJnZURlZXAuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZVNldERhdGEuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2Jhc2VUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmFzZVZhbHVlcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvYmluZENhbGxiYWNrLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9jcmVhdGVBc3NpZ25lci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvZXF1YWxBcnJheXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2VxdWFsQnlUYWcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2VxdWFsT2JqZWN0cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvaXNCaW5kYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvaXNJbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvaXNJdGVyYXRlZUNhbGwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2lzTGVuZ3RoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9pc09iamVjdExpa2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL2lzU3RyaWN0Q29tcGFyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvbWV0YU1hcC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvcGlja0J5QXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL3BpY2tCeUNhbGxiYWNrLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pbnRlcm5hbC9zaGltSXNQbGFpbk9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaW50ZXJuYWwvc2hpbUtleXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2ludGVybmFsL3RvT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9sYW5nL2lzQXJndW1lbnRzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9sYW5nL2lzQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2xhbmcvaXNGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9pc05hdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy9pc1BsYWluT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9sYW5nL2lzVHlwZWRBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbGFuZy90b1BsYWluT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvZGVmYXVsdHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3Qva2V5c0luLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvbWVyZ2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL29iamVjdC9waWNrLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9vYmplY3QvdmFsdWVzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9zdHJpbmcvZXNjYXBlUmVnRXhwLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9zdXBwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC91dGlsaXR5L2lkZW50aXR5LmpzIiwibm9kZV9tb2R1bGVzL3Jpb3QvcmlvdC5qcyIsInNyYy9hcHAvcG9zdC5qcyIsInNyYy9hcHAvdXNlci5qcyIsInNyYy9saWIvZG9tV3JhcC5qcyIsInNyYy9saWIvZnJvbW5vdy5qcyIsInNyYy9saWIveW91dHViZS5qcyIsInNyYy9tYWluLmpzIiwic3JjL21vZHVsZXMvZnJvbnQvZnJvbnQuaHRtbCIsInNyYy9tb2R1bGVzL2Zyb250L2Zyb250LmpzIiwic3JjL21vZHVsZXMvZnJvbnQvcG9zdC1pdGVtcy5odG1sIiwic3JjL21vZHVsZXMvbG9naW4vbG9naW4uaHRtbCIsInNyYy9tb2R1bGVzL2xvZ2luL2xvZ2luLmpzIiwic3JjL21vZHVsZXMvbWFpbi9tYWluLmpzIiwic3JjL21vZHVsZXMvbWVzc2FnZS9tZXNzYWdlLmh0bWwiLCJzcmMvbW9kdWxlcy9tZXNzYWdlL21lc3NhZ2UuanMiLCJzcmMvbW9kdWxlcy9uYXZpZ2F0aW9uL25hdmlnYXRpb24uaHRtbCIsInNyYy9tb2R1bGVzL25hdmlnYXRpb24vbmF2aWdhdGlvbi5qcyIsInNyYy9tb2R1bGVzL3Bvc3QvZm9ybS5odG1sIiwic3JjL21vZHVsZXMvcG9zdC9mb3JtLmpzIiwic3JjL21vZHVsZXMvcG9zdC9zaG93Lmh0bWwiLCJzcmMvbW9kdWxlcy9wb3N0L3Nob3cuanMiLCJzcmMvbW9kdWxlcy91c2VyL3Byb2ZpbGUuaHRtbCIsInNyYy9tb2R1bGVzL3VzZXIvdXNlci5odG1sIiwic3JjL21vZHVsZXMvdXNlci91c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzMyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIGxvZGFzaCAzLjAuMCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZGVybiBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTUgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNy4wIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VUb1N0cmluZyA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZXRvc3RyaW5nJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIEhUTUwgZW50aXRpZXMgYW5kIEhUTUwgY2hhcmFjdGVycy4gKi9cbnZhciByZVVuZXNjYXBlZEh0bWwgPSAvWyY8PlwiJ2BdL2csXG4gICAgcmVIYXNVbmVzY2FwZWRIdG1sID0gUmVnRXhwKHJlVW5lc2NhcGVkSHRtbC5zb3VyY2UpO1xuXG4vKiogVXNlZCB0byBtYXAgY2hhcmFjdGVycyB0byBIVE1MIGVudGl0aWVzLiAqL1xudmFyIGh0bWxFc2NhcGVzID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90OycsXG4gIFwiJ1wiOiAnJiMzOTsnLFxuICAnYCc6ICcmIzk2Oydcbn07XG5cbi8qKlxuICogVXNlZCBieSBgXy5lc2NhcGVgIHRvIGNvbnZlcnQgY2hhcmFjdGVycyB0byBIVE1MIGVudGl0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hyIFRoZSBtYXRjaGVkIGNoYXJhY3RlciB0byBlc2NhcGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIGNoYXJhY3Rlci5cbiAqL1xuZnVuY3Rpb24gZXNjYXBlSHRtbENoYXIoY2hyKSB7XG4gIHJldHVybiBodG1sRXNjYXBlc1tjaHJdO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBjaGFyYWN0ZXJzIFwiJlwiLCBcIjxcIiwgXCI+XCIsICdcIicsIFwiJ1wiLCBhbmQgJ2AnLCBpbiBgc3RyaW5nYCB0b1xuICogdGhlaXIgY29ycmVzcG9uZGluZyBIVE1MIGVudGl0aWVzLlxuICpcbiAqICoqTm90ZToqKiBObyBvdGhlciBjaGFyYWN0ZXJzIGFyZSBlc2NhcGVkLiBUbyBlc2NhcGUgYWRkaXRpb25hbCBjaGFyYWN0ZXJzXG4gKiB1c2UgYSB0aGlyZC1wYXJ0eSBsaWJyYXJ5IGxpa2UgW19oZV9dKGh0dHBzOi8vbXRocy5iZS9oZSkuXG4gKlxuICogVGhvdWdoIHRoZSBcIj5cIiBjaGFyYWN0ZXIgaXMgZXNjYXBlZCBmb3Igc3ltbWV0cnksIGNoYXJhY3RlcnMgbGlrZVxuICogXCI+XCIgYW5kIFwiL1wiIGRvbid0IHJlcXVpcmUgZXNjYXBpbmcgaW4gSFRNTCBhbmQgaGF2ZSBubyBzcGVjaWFsIG1lYW5pbmdcbiAqIHVubGVzcyB0aGV5J3JlIHBhcnQgb2YgYSB0YWcgb3IgdW5xdW90ZWQgYXR0cmlidXRlIHZhbHVlLlxuICogU2VlIFtNYXRoaWFzIEJ5bmVucydzIGFydGljbGVdKGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9hbWJpZ3VvdXMtYW1wZXJzYW5kcylcbiAqICh1bmRlciBcInNlbWktcmVsYXRlZCBmdW4gZmFjdFwiKSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEJhY2t0aWNrcyBhcmUgZXNjYXBlZCBiZWNhdXNlIGluIEludGVybmV0IEV4cGxvcmVyIDwgOSwgdGhleSBjYW4gYnJlYWsgb3V0XG4gKiBvZiBhdHRyaWJ1dGUgdmFsdWVzIG9yIEhUTUwgY29tbWVudHMuIFNlZSBbIzEwMl0oaHR0cHM6Ly9odG1sNXNlYy5vcmcvIzEwMiksXG4gKiBbIzEwOF0oaHR0cHM6Ly9odG1sNXNlYy5vcmcvIzEwOCksIGFuZCBbIzEzM10oaHR0cHM6Ly9odG1sNXNlYy5vcmcvIzEzMykgb2ZcbiAqIHRoZSBbSFRNTDUgU2VjdXJpdHkgQ2hlYXRzaGVldF0oaHR0cHM6Ly9odG1sNXNlYy5vcmcvKSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFdoZW4gd29ya2luZyB3aXRoIEhUTUwgeW91IHNob3VsZCBhbHdheXMgcXVvdGUgYXR0cmlidXRlIHZhbHVlcyB0byByZWR1Y2VcbiAqIFhTUyB2ZWN0b3JzLiBTZWUgW1J5YW4gR3JvdmUncyBhcnRpY2xlXShodHRwOi8vd29ua28uY29tL3Bvc3QvaHRtbC1lc2NhcGluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGVzY2FwZS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmVzY2FwZSgnZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnKTtcbiAqIC8vID0+ICdmcmVkLCBiYXJuZXksICZhbXA7IHBlYmJsZXMnXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZShzdHJpbmcpIHtcbiAgLy8gUmVzZXQgYGxhc3RJbmRleGAgYmVjYXVzZSBpbiBJRSA8IDkgYFN0cmluZyNyZXBsYWNlYCBkb2VzIG5vdC5cbiAgc3RyaW5nID0gYmFzZVRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiAoc3RyaW5nICYmIHJlSGFzVW5lc2NhcGVkSHRtbC50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVVuZXNjYXBlZEh0bWwsIGVzY2FwZUh0bWxDaGFyKVxuICAgIDogc3RyaW5nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVzY2FwZTtcbiIsIi8qKlxuICogbG9kYXNoIDMuMC4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNSBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS43LjAgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE1IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBpZiBpdCBpcyBub3Qgb25lLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWRcbiAqIGZvciBgbnVsbGAgb3IgYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogKHZhbHVlICsgJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VUb1N0cmluZztcbiIsInZhciBhcnJheUZpbHRlciA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2FycmF5RmlsdGVyJyksXG4gICAgYmFzZUNhbGxiYWNrID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUNhbGxiYWNrJyksXG4gICAgYmFzZUZpbHRlciA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2Jhc2VGaWx0ZXInKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5Jyk7XG5cbi8qKlxuICogVGhlIG9wcG9zaXRlIG9mIGBfLmZpbHRlcmA7IHRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGVsZW1lbnRzIG9mIGBjb2xsZWN0aW9uYFxuICogdGhhdCBgcHJlZGljYXRlYCBkb2VzICoqbm90KiogcmV0dXJuIHRydXRoeSBmb3IuXG4gKlxuICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHByb3ZpZGVkIGZvciBgcHJlZGljYXRlYCB0aGUgY3JlYXRlZCBgXy5wcm9wZXJ0eWBcbiAqIHN0eWxlIGNhbGxiYWNrIHJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICpcbiAqIElmIGEgdmFsdWUgaXMgYWxzbyBwcm92aWRlZCBmb3IgYHRoaXNBcmdgIHRoZSBjcmVhdGVkIGBfLm1hdGNoZXNQcm9wZXJ0eWBcbiAqIHN0eWxlIGNhbGxiYWNrIHJldHVybnMgYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgYSBtYXRjaGluZyBwcm9wZXJ0eVxuICogdmFsdWUsIGVsc2UgYGZhbHNlYC5cbiAqXG4gKiBJZiBhbiBvYmplY3QgaXMgcHJvdmlkZWQgZm9yIGBwcmVkaWNhdGVgIHRoZSBjcmVhdGVkIGBfLm1hdGNoZXNgIHN0eWxlXG4gKiBjYWxsYmFjayByZXR1cm5zIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBnaXZlblxuICogb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8c3RyaW5nfSBbcHJlZGljYXRlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkXG4gKiAgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgcHJlZGljYXRlYC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZpbHRlcmVkIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnJlamVjdChbMSwgMiwgMywgNF0sIGZ1bmN0aW9uKG4pIHtcbiAqICAgcmV0dXJuIG4gJSAyID09IDA7XG4gKiB9KTtcbiAqIC8vID0+IFsxLCAzXVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYsICdhY3RpdmUnOiBmYWxzZSB9LFxuICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICdhZ2UnOiA0MCwgJ2FjdGl2ZSc6IHRydWUgfVxuICogXTtcbiAqXG4gKiAvLyB1c2luZyB0aGUgYF8ubWF0Y2hlc2AgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLnBsdWNrKF8ucmVqZWN0KHVzZXJzLCB7ICdhZ2UnOiA0MCwgJ2FjdGl2ZSc6IHRydWUgfSksICd1c2VyJyk7XG4gKiAvLyA9PiBbJ2Jhcm5leSddXG4gKlxuICogLy8gdXNpbmcgdGhlIGBfLm1hdGNoZXNQcm9wZXJ0eWAgY2FsbGJhY2sgc2hvcnRoYW5kXG4gKiBfLnBsdWNrKF8ucmVqZWN0KHVzZXJzLCAnYWN0aXZlJywgZmFsc2UpLCAndXNlcicpO1xuICogLy8gPT4gWydmcmVkJ11cbiAqXG4gKiAvLyB1c2luZyB0aGUgYF8ucHJvcGVydHlgIGNhbGxiYWNrIHNob3J0aGFuZFxuICogXy5wbHVjayhfLnJlamVjdCh1c2VycywgJ2FjdGl2ZScpLCAndXNlcicpO1xuICogLy8gPT4gWydiYXJuZXknXVxuICovXG5mdW5jdGlvbiByZWplY3QoY29sbGVjdGlvbiwgcHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gIHZhciBmdW5jID0gaXNBcnJheShjb2xsZWN0aW9uKSA/IGFycmF5RmlsdGVyIDogYmFzZUZpbHRlcjtcbiAgcHJlZGljYXRlID0gYmFzZUNhbGxiYWNrKHByZWRpY2F0ZSwgdGhpc0FyZywgMyk7XG4gIHJldHVybiBmdW5jKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgIHJldHVybiAhcHJlZGljYXRlKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlamVjdDtcbiIsIi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlDb3B5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5Q29weTtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBvciBgdGhpc2AgYmluZGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlFYWNoKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5RWFjaDtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZpbHRlcmAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIG9yIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmaWx0ZXJlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlGaWx0ZXIoYXJyYXksIHByZWRpY2F0ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc0luZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXN1bHRbKytyZXNJbmRleF0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUZpbHRlcjtcbiIsIi8qKlxuICogVXNlZCBieSBgXy5kZWZhdWx0c2AgdG8gY3VzdG9taXplIGl0cyBgXy5hc3NpZ25gIHVzZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSBvYmplY3RWYWx1ZSBUaGUgZGVzdGluYXRpb24gb2JqZWN0IHByb3BlcnR5IHZhbHVlLlxuICogQHBhcmFtIHsqfSBzb3VyY2VWYWx1ZSBUaGUgc291cmNlIG9iamVjdCBwcm9wZXJ0eSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSB2YWx1ZSB0byBhc3NpZ24gdG8gdGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYXNzaWduRGVmYXVsdHMob2JqZWN0VmFsdWUsIHNvdXJjZVZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0VmFsdWUgPT0gJ3VuZGVmaW5lZCcgPyBzb3VyY2VWYWx1ZSA6IG9iamVjdFZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnbkRlZmF1bHRzO1xuIiwidmFyIGJhc2VDb3B5ID0gcmVxdWlyZSgnLi9iYXNlQ29weScpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5cycpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmFzc2lnbmAgd2l0aG91dCBzdXBwb3J0IGZvciBhcmd1bWVudCBqdWdnbGluZyxcbiAqIG11bHRpcGxlIHNvdXJjZXMsIGFuZCBgdGhpc2AgYmluZGluZyBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduaW5nIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZUFzc2lnbihvYmplY3QsIHNvdXJjZSwgY3VzdG9taXplcikge1xuICB2YXIgcHJvcHMgPSBrZXlzKHNvdXJjZSk7XG4gIGlmICghY3VzdG9taXplcikge1xuICAgIHJldHVybiBiYXNlQ29weShzb3VyY2UsIG9iamVjdCwgcHJvcHMpO1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XSxcbiAgICAgICAgdmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgcmVzdWx0ID0gY3VzdG9taXplcih2YWx1ZSwgc291cmNlW2tleV0sIGtleSwgb2JqZWN0LCBzb3VyY2UpO1xuXG4gICAgaWYgKChyZXN1bHQgPT09IHJlc3VsdCA/IHJlc3VsdCAhPT0gdmFsdWUgOiB2YWx1ZSA9PT0gdmFsdWUpIHx8XG4gICAgICAgICh0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCcgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICAgIG9iamVjdFtrZXldID0gcmVzdWx0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VBc3NpZ247XG4iLCJ2YXIgYmFzZU1hdGNoZXMgPSByZXF1aXJlKCcuL2Jhc2VNYXRjaGVzJyksXG4gICAgYmFzZU1hdGNoZXNQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vYmFzZU1hdGNoZXNQcm9wZXJ0eScpLFxuICAgIGJhc2VQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vYmFzZVByb3BlcnR5JyksXG4gICAgYmluZENhbGxiYWNrID0gcmVxdWlyZSgnLi9iaW5kQ2FsbGJhY2snKSxcbiAgICBpZGVudGl0eSA9IHJlcXVpcmUoJy4uL3V0aWxpdHkvaWRlbnRpdHknKSxcbiAgICBpc0JpbmRhYmxlID0gcmVxdWlyZSgnLi9pc0JpbmRhYmxlJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uY2FsbGJhY2tgIHdoaWNoIHN1cHBvcnRzIHNwZWNpZnlpbmcgdGhlXG4gKiBudW1iZXIgb2YgYXJndW1lbnRzIHRvIHByb3ZpZGUgdG8gYGZ1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IFtmdW5jPV8uaWRlbnRpdHldIFRoZSB2YWx1ZSB0byBjb252ZXJ0IHRvIGEgY2FsbGJhY2suXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtudW1iZXJ9IFthcmdDb3VudF0gVGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhbGxiYWNrLlxuICovXG5mdW5jdGlvbiBiYXNlQ2FsbGJhY2soZnVuYywgdGhpc0FyZywgYXJnQ291bnQpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgZnVuYztcbiAgaWYgKHR5cGUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiAodHlwZW9mIHRoaXNBcmcgIT0gJ3VuZGVmaW5lZCcgJiYgaXNCaW5kYWJsZShmdW5jKSlcbiAgICAgID8gYmluZENhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KVxuICAgICAgOiBmdW5jO1xuICB9XG4gIGlmIChmdW5jID09IG51bGwpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHR5cGUgPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gYmFzZU1hdGNoZXMoZnVuYyk7XG4gIH1cbiAgcmV0dXJuIHR5cGVvZiB0aGlzQXJnID09ICd1bmRlZmluZWQnXG4gICAgPyBiYXNlUHJvcGVydHkoZnVuYyArICcnKVxuICAgIDogYmFzZU1hdGNoZXNQcm9wZXJ0eShmdW5jICsgJycsIHRoaXNBcmcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDYWxsYmFjaztcbiIsIi8qKlxuICogQ29waWVzIHRoZSBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gY29weS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDb3B5KHNvdXJjZSwgb2JqZWN0LCBwcm9wcykge1xuICBpZiAoIXByb3BzKSB7XG4gICAgcHJvcHMgPSBvYmplY3Q7XG4gICAgb2JqZWN0ID0ge307XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIG9iamVjdFtrZXldID0gc291cmNlW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlQ29weTtcbiIsInZhciBiYXNlRm9yT3duID0gcmVxdWlyZSgnLi9iYXNlRm9yT3duJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgdG9PYmplY3QgPSByZXF1aXJlKCcuL3RvT2JqZWN0Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yRWFjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fHN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fE9iamVjdHxzdHJpbmd9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICovXG5mdW5jdGlvbiBiYXNlRWFjaChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICB2YXIgbGVuZ3RoID0gY29sbGVjdGlvbiA/IGNvbGxlY3Rpb24ubGVuZ3RoIDogMDtcbiAgaWYgKCFpc0xlbmd0aChsZW5ndGgpKSB7XG4gICAgcmV0dXJuIGJhc2VGb3JPd24oY29sbGVjdGlvbiwgaXRlcmF0ZWUpO1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaXRlcmFibGUgPSB0b09iamVjdChjb2xsZWN0aW9uKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtpbmRleF0sIGluZGV4LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbGxlY3Rpb247XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUVhY2g7XG4iLCJ2YXIgYmFzZUVhY2ggPSByZXF1aXJlKCcuL2Jhc2VFYWNoJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmlsdGVyYCB3aXRob3V0IHN1cHBvcnQgZm9yIGNhbGxiYWNrXG4gKiBzaG9ydGhhbmRzIG9yIGB0aGlzYCBiaW5kaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdHxzdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmaWx0ZXJlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZUZpbHRlcihjb2xsZWN0aW9uLCBwcmVkaWNhdGUpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBiYXNlRWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGaWx0ZXI7XG4iLCJ2YXIgaXNBcmd1bWVudHMgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJndW1lbnRzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmxhdHRlbmAgd2l0aCBhZGRlZCBzdXBwb3J0IGZvciByZXN0cmljdGluZ1xuICogZmxhdHRlbmluZyBhbmQgc3BlY2lmeWluZyB0aGUgc3RhcnQgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBmbGF0dGVuLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBmbGF0dGVuLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNTdHJpY3RdIFJlc3RyaWN0IGZsYXR0ZW5pbmcgdG8gYXJyYXlzIGFuZCBgYXJndW1lbnRzYCBvYmplY3RzLlxuICogQHBhcmFtIHtudW1iZXJ9IFtmcm9tSW5kZXg9MF0gVGhlIGluZGV4IHRvIHN0YXJ0IGZyb20uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmbGF0dGVuZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGbGF0dGVuKGFycmF5LCBpc0RlZXAsIGlzU3RyaWN0LCBmcm9tSW5kZXgpIHtcbiAgdmFyIGluZGV4ID0gKGZyb21JbmRleCB8fCAwKSAtIDEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXNJbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG5cbiAgICBpZiAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmIChpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpKSB7XG4gICAgICBpZiAoaXNEZWVwKSB7XG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGZsYXR0ZW4gYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICAgIHZhbHVlID0gYmFzZUZsYXR0ZW4odmFsdWUsIGlzRGVlcCwgaXNTdHJpY3QpO1xuICAgICAgfVxuICAgICAgdmFyIHZhbEluZGV4ID0gLTEsXG4gICAgICAgICAgdmFsTGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuXG4gICAgICByZXN1bHQubGVuZ3RoICs9IHZhbExlbmd0aDtcbiAgICAgIHdoaWxlICgrK3ZhbEluZGV4IDwgdmFsTGVuZ3RoKSB7XG4gICAgICAgIHJlc3VsdFsrK3Jlc0luZGV4XSA9IHZhbHVlW3ZhbEluZGV4XTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFpc1N0cmljdCkge1xuICAgICAgcmVzdWx0WysrcmVzSW5kZXhdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUZsYXR0ZW47XG4iLCJ2YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL3RvT2JqZWN0Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGJhc2VGb3JJbmAgYW5kIGBiYXNlRm9yT3duYCB3aGljaCBpdGVyYXRlc1xuICogb3ZlciBgb2JqZWN0YCBwcm9wZXJ0aWVzIHJldHVybmVkIGJ5IGBrZXlzRnVuY2AgaW52b2tpbmcgYGl0ZXJhdGVlYCBmb3JcbiAqIGVhY2ggcHJvcGVydHkuIEl0ZXJhdG9yIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseVxuICogcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5c0Z1bmMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBpdGVyYWJsZSA9IHRvT2JqZWN0KG9iamVjdCksXG4gICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3I7XG4iLCJ2YXIgYmFzZUZvciA9IHJlcXVpcmUoJy4vYmFzZUZvcicpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzSW4nKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JJbmAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvckluKG9iamVjdCwgaXRlcmF0ZWUpIHtcbiAgcmV0dXJuIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5c0luKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRm9ySW47XG4iLCJ2YXIgYmFzZUZvciA9IHJlcXVpcmUoJy4vYmFzZUZvcicpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5cycpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvck93bmAgd2l0aG91dCBzdXBwb3J0IGZvciBjYWxsYmFja1xuICogc2hvcnRoYW5kcyBhbmQgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvck93bihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBiYXNlRm9yKG9iamVjdCwgaXRlcmF0ZWUsIGtleXMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3JPd247XG4iLCJ2YXIgYmFzZUlzRXF1YWxEZWVwID0gcmVxdWlyZSgnLi9iYXNlSXNFcXVhbERlZXAnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0VxdWFsYCB3aXRob3V0IHN1cHBvcnQgZm9yIGB0aGlzYCBiaW5kaW5nXG4gKiBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1doZXJlXSBTcGVjaWZ5IHBlcmZvcm1pbmcgcGFydGlhbCBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0FdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQl0gVHJhY2tzIHRyYXZlcnNlZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIGlkZW50aWNhbCB2YWx1ZXMuXG4gIGlmICh2YWx1ZSA9PT0gb3RoZXIpIHtcbiAgICAvLyBUcmVhdCBgKzBgIHZzLiBgLTBgIGFzIG5vdCBlcXVhbC5cbiAgICByZXR1cm4gdmFsdWUgIT09IDAgfHwgKDEgLyB2YWx1ZSA9PSAxIC8gb3RoZXIpO1xuICB9XG4gIHZhciB2YWxUeXBlID0gdHlwZW9mIHZhbHVlLFxuICAgICAgb3RoVHlwZSA9IHR5cGVvZiBvdGhlcjtcblxuICAvLyBFeGl0IGVhcmx5IGZvciB1bmxpa2UgcHJpbWl0aXZlIHZhbHVlcy5cbiAgaWYgKCh2YWxUeXBlICE9ICdmdW5jdGlvbicgJiYgdmFsVHlwZSAhPSAnb2JqZWN0JyAmJiBvdGhUeXBlICE9ICdmdW5jdGlvbicgJiYgb3RoVHlwZSAhPSAnb2JqZWN0JykgfHxcbiAgICAgIHZhbHVlID09IG51bGwgfHwgb3RoZXIgPT0gbnVsbCkge1xuICAgIC8vIFJldHVybiBgZmFsc2VgIHVubGVzcyBib3RoIHZhbHVlcyBhcmUgYE5hTmAuXG4gICAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXI7XG4gIH1cbiAgcmV0dXJuIGJhc2VJc0VxdWFsRGVlcCh2YWx1ZSwgb3RoZXIsIGJhc2VJc0VxdWFsLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzRXF1YWw7XG4iLCJ2YXIgZXF1YWxBcnJheXMgPSByZXF1aXJlKCcuL2VxdWFsQXJyYXlzJyksXG4gICAgZXF1YWxCeVRhZyA9IHJlcXVpcmUoJy4vZXF1YWxCeVRhZycpLFxuICAgIGVxdWFsT2JqZWN0cyA9IHJlcXVpcmUoJy4vZXF1YWxPYmplY3RzJyksXG4gICAgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcnJheScpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNUeXBlZEFycmF5Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIGNvbXBhcmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgb2JqZWN0cy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzV2hlcmVdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQT1bXV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCPVtdXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgb2JqSXNBcnIgPSBpc0FycmF5KG9iamVjdCksXG4gICAgICBvdGhJc0FyciA9IGlzQXJyYXkob3RoZXIpLFxuICAgICAgb2JqVGFnID0gYXJyYXlUYWcsXG4gICAgICBvdGhUYWcgPSBhcnJheVRhZztcblxuICBpZiAoIW9iaklzQXJyKSB7XG4gICAgb2JqVGFnID0gb2JqVG9TdHJpbmcuY2FsbChvYmplY3QpO1xuICAgIGlmIChvYmpUYWcgPT0gYXJnc1RhZykge1xuICAgICAgb2JqVGFnID0gb2JqZWN0VGFnO1xuICAgIH0gZWxzZSBpZiAob2JqVGFnICE9IG9iamVjdFRhZykge1xuICAgICAgb2JqSXNBcnIgPSBpc1R5cGVkQXJyYXkob2JqZWN0KTtcbiAgICB9XG4gIH1cbiAgaWYgKCFvdGhJc0Fycikge1xuICAgIG90aFRhZyA9IG9ialRvU3RyaW5nLmNhbGwob3RoZXIpO1xuICAgIGlmIChvdGhUYWcgPT0gYXJnc1RhZykge1xuICAgICAgb3RoVGFnID0gb2JqZWN0VGFnO1xuICAgIH0gZWxzZSBpZiAob3RoVGFnICE9IG9iamVjdFRhZykge1xuICAgICAgb3RoSXNBcnIgPSBpc1R5cGVkQXJyYXkob3RoZXIpO1xuICAgIH1cbiAgfVxuICB2YXIgb2JqSXNPYmogPSBvYmpUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgaXNTYW1lVGFnID0gb2JqVGFnID09IG90aFRhZztcblxuICBpZiAoaXNTYW1lVGFnICYmICEob2JqSXNBcnIgfHwgb2JqSXNPYmopKSB7XG4gICAgcmV0dXJuIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnKTtcbiAgfVxuICB2YXIgdmFsV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgIG90aFdyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICBpZiAodmFsV3JhcHBlZCB8fCBvdGhXcmFwcGVkKSB7XG4gICAgcmV0dXJuIGVxdWFsRnVuYyh2YWxXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsIG90aFdyYXBwZWQgPyBvdGhlci52YWx1ZSgpIDogb3RoZXIsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbiAgfVxuICBpZiAoIWlzU2FtZVRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIC8vIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIGRldGVjdGluZyBjaXJjdWxhciByZWZlcmVuY2VzIHNlZSBodHRwczovL2VzNS5naXRodWIuaW8vI0pPLlxuICBzdGFja0EgfHwgKHN0YWNrQSA9IFtdKTtcbiAgc3RhY2tCIHx8IChzdGFja0IgPSBbXSk7XG5cbiAgdmFyIGxlbmd0aCA9IHN0YWNrQS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChzdGFja0FbbGVuZ3RoXSA9PSBvYmplY3QpIHtcbiAgICAgIHJldHVybiBzdGFja0JbbGVuZ3RoXSA9PSBvdGhlcjtcbiAgICB9XG4gIH1cbiAgLy8gQWRkIGBvYmplY3RgIGFuZCBgb3RoZXJgIHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgc3RhY2tBLnB1c2gob2JqZWN0KTtcbiAgc3RhY2tCLnB1c2gob3RoZXIpO1xuXG4gIHZhciByZXN1bHQgPSAob2JqSXNBcnIgPyBlcXVhbEFycmF5cyA6IGVxdWFsT2JqZWN0cykob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQik7XG5cbiAgc3RhY2tBLnBvcCgpO1xuICBzdGFja0IucG9wKCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNFcXVhbERlZXA7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRnVuY3Rpb25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgZW52aXJvbm1lbnRzXG4gKiB3aXRoIGluY29ycmVjdCBgdHlwZW9mYCByZXN1bHRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIEF2b2lkIGEgQ2hha3JhIEpJVCBidWcgaW4gY29tcGF0aWJpbGl0eSBtb2RlcyBvZiBJRSAxMS5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZS9pc3N1ZXMvMTYyMSBmb3IgbW9yZSBkZXRhaWxzLlxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzRnVuY3Rpb247XG4iLCJ2YXIgYmFzZUlzRXF1YWwgPSByZXF1aXJlKCcuL2Jhc2VJc0VxdWFsJyk7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTWF0Y2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgY2FsbGJhY2tcbiAqIHNob3J0aGFuZHMgb3IgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHNvdXJjZSBwcm9wZXJ0eSBuYW1lcyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgc291cmNlIHZhbHVlcyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXl9IHN0cmljdENvbXBhcmVGbGFncyBTdHJpY3QgY29tcGFyaXNvbiBmbGFncyBmb3Igc291cmNlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBvYmplY3RgIGlzIGEgbWF0Y2gsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTWF0Y2gob2JqZWN0LCBwcm9wcywgdmFsdWVzLCBzdHJpY3RDb21wYXJlRmxhZ3MsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuICFsZW5ndGg7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBub0N1c3RvbWl6ZXIgPSAhY3VzdG9taXplcjtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmICgobm9DdXN0b21pemVyICYmIHN0cmljdENvbXBhcmVGbGFnc1tpbmRleF0pXG4gICAgICAgICAgPyB2YWx1ZXNbaW5kZXhdICE9PSBvYmplY3RbcHJvcHNbaW5kZXhdXVxuICAgICAgICAgIDogIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wc1tpbmRleF0pXG4gICAgICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBpbmRleCA9IC0xO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKG5vQ3VzdG9taXplciAmJiBzdHJpY3RDb21wYXJlRmxhZ3NbaW5kZXhdKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgIHNyY1ZhbHVlID0gdmFsdWVzW2luZGV4XTtcblxuICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXkpIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmVzdWx0ID0gYmFzZUlzRXF1YWwoc3JjVmFsdWUsIG9ialZhbHVlLCBjdXN0b21pemVyLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzTWF0Y2g7XG4iLCJ2YXIgYmFzZUlzTWF0Y2ggPSByZXF1aXJlKCcuL2Jhc2VJc01hdGNoJyksXG4gICAgaXNTdHJpY3RDb21wYXJhYmxlID0gcmVxdWlyZSgnLi9pc1N0cmljdENvbXBhcmFibGUnKSxcbiAgICBrZXlzID0gcmVxdWlyZSgnLi4vb2JqZWN0L2tleXMnKTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc2Agd2hpY2ggZG9lcyBub3QgY2xvbmUgYHNvdXJjZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXMoc291cmNlKSB7XG4gIHZhciBwcm9wcyA9IGtleXMoc291cmNlKSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICBpZiAobGVuZ3RoID09IDEpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbMF0sXG4gICAgICAgIHZhbHVlID0gc291cmNlW2tleV07XG5cbiAgICBpZiAoaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgb2JqZWN0W2tleV0gPT09IHZhbHVlICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgdmFyIHZhbHVlcyA9IEFycmF5KGxlbmd0aCksXG4gICAgICBzdHJpY3RDb21wYXJlRmxhZ3MgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHZhbHVlID0gc291cmNlW3Byb3BzW2xlbmd0aF1dO1xuICAgIHZhbHVlc1tsZW5ndGhdID0gdmFsdWU7XG4gICAgc3RyaWN0Q29tcGFyZUZsYWdzW2xlbmd0aF0gPSBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gYmFzZUlzTWF0Y2gob2JqZWN0LCBwcm9wcywgdmFsdWVzLCBzdHJpY3RDb21wYXJlRmxhZ3MpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VNYXRjaGVzO1xuIiwidmFyIGJhc2VJc0VxdWFsID0gcmVxdWlyZSgnLi9iYXNlSXNFcXVhbCcpLFxuICAgIGlzU3RyaWN0Q29tcGFyYWJsZSA9IHJlcXVpcmUoJy4vaXNTdHJpY3RDb21wYXJhYmxlJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc1Byb3BlcnR5YCB3aGljaCBkb2VzIG5vdCBjb2VyY2UgYGtleWBcbiAqIHRvIGEgc3RyaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXNQcm9wZXJ0eShrZXksIHZhbHVlKSB7XG4gIGlmIChpc1N0cmljdENvbXBhcmFibGUodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgICAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIG9iamVjdFtrZXldID09PSB2YWx1ZTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgYmFzZUlzRXF1YWwodmFsdWUsIG9iamVjdFtrZXldLCBudWxsLCB0cnVlKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWF0Y2hlc1Byb3BlcnR5O1xuIiwidmFyIGFycmF5RWFjaCA9IHJlcXVpcmUoJy4vYXJyYXlFYWNoJyksXG4gICAgYmFzZUZvck93biA9IHJlcXVpcmUoJy4vYmFzZUZvck93bicpLFxuICAgIGJhc2VNZXJnZURlZXAgPSByZXF1aXJlKCcuL2Jhc2VNZXJnZURlZXAnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0JyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzVHlwZWRBcnJheScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1lcmdlYCB3aXRob3V0IHN1cHBvcnQgZm9yIGFyZ3VtZW50IGp1Z2dsaW5nLFxuICogbXVsdGlwbGUgc291cmNlcywgYW5kIGB0aGlzYCBiaW5kaW5nIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnaW5nIHByb3BlcnRpZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gQXNzb2NpYXRlcyB2YWx1ZXMgd2l0aCBzb3VyY2UgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbiAgdmFyIGlzU3JjQXJyID0gaXNMZW5ndGgoc291cmNlLmxlbmd0aCkgJiYgKGlzQXJyYXkoc291cmNlKSB8fCBpc1R5cGVkQXJyYXkoc291cmNlKSk7XG4gIChpc1NyY0FyciA/IGFycmF5RWFjaCA6IGJhc2VGb3JPd24pKHNvdXJjZSwgZnVuY3Rpb24oc3JjVmFsdWUsIGtleSwgc291cmNlKSB7XG4gICAgaWYgKGlzT2JqZWN0TGlrZShzcmNWYWx1ZSkpIHtcbiAgICAgIHN0YWNrQSB8fCAoc3RhY2tBID0gW10pO1xuICAgICAgc3RhY2tCIHx8IChzdGFja0IgPSBbXSk7XG4gICAgICByZXR1cm4gYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBiYXNlTWVyZ2UsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICB9XG4gICAgdmFyIHZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkgOiB1bmRlZmluZWQsXG4gICAgICAgIGlzQ29tbW9uID0gdHlwZW9mIHJlc3VsdCA9PSAndW5kZWZpbmVkJztcblxuICAgIGlmIChpc0NvbW1vbikge1xuICAgICAgcmVzdWx0ID0gc3JjVmFsdWU7XG4gICAgfVxuICAgIGlmICgoaXNTcmNBcnIgfHwgdHlwZW9mIHJlc3VsdCAhPSAndW5kZWZpbmVkJykgJiZcbiAgICAgICAgKGlzQ29tbW9uIHx8IChyZXN1bHQgPT09IHJlc3VsdCA/IHJlc3VsdCAhPT0gdmFsdWUgOiB2YWx1ZSA9PT0gdmFsdWUpKSkge1xuICAgICAgb2JqZWN0W2tleV0gPSByZXN1bHQ7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlTWVyZ2U7XG4iLCJ2YXIgYXJyYXlDb3B5ID0gcmVxdWlyZSgnLi9hcnJheUNvcHknKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNQbGFpbk9iamVjdCcpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNUeXBlZEFycmF5JyksXG4gICAgdG9QbGFpbk9iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvdG9QbGFpbk9iamVjdCcpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZU1lcmdlYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIG1lcmdlcyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBtZXJnZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIG1lcmdlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWVyZ2VGdW5jIFRoZSBmdW5jdGlvbiB0byBtZXJnZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnaW5nIHByb3BlcnRpZXMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBPVtdXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQj1bXV0gQXNzb2NpYXRlcyB2YWx1ZXMgd2l0aCBzb3VyY2UgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgbWVyZ2VGdW5jLCBjdXN0b21pemVyLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgbGVuZ3RoID0gc3RhY2tBLmxlbmd0aCxcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV07XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKHN0YWNrQVtsZW5ndGhdID09IHNyY1ZhbHVlKSB7XG4gICAgICBvYmplY3Rba2V5XSA9IHN0YWNrQltsZW5ndGhdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgIHJlc3VsdCA9IGN1c3RvbWl6ZXIgPyBjdXN0b21pemVyKHZhbHVlLCBzcmNWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkgOiB1bmRlZmluZWQsXG4gICAgICBpc0NvbW1vbiA9IHR5cGVvZiByZXN1bHQgPT0gJ3VuZGVmaW5lZCc7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgcmVzdWx0ID0gc3JjVmFsdWU7XG4gICAgaWYgKGlzTGVuZ3RoKHNyY1ZhbHVlLmxlbmd0aCkgJiYgKGlzQXJyYXkoc3JjVmFsdWUpIHx8IGlzVHlwZWRBcnJheShzcmNWYWx1ZSkpKSB7XG4gICAgICByZXN1bHQgPSBpc0FycmF5KHZhbHVlKVxuICAgICAgICA/IHZhbHVlXG4gICAgICAgIDogKHZhbHVlID8gYXJyYXlDb3B5KHZhbHVlKSA6IFtdKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChzcmNWYWx1ZSkgfHwgaXNBcmd1bWVudHMoc3JjVmFsdWUpKSB7XG4gICAgICByZXN1bHQgPSBpc0FyZ3VtZW50cyh2YWx1ZSlcbiAgICAgICAgPyB0b1BsYWluT2JqZWN0KHZhbHVlKVxuICAgICAgICA6IChpc1BsYWluT2JqZWN0KHZhbHVlKSA/IHZhbHVlIDoge30pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIEFkZCB0aGUgc291cmNlIHZhbHVlIHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cyBhbmQgYXNzb2NpYXRlXG4gIC8vIGl0IHdpdGggaXRzIG1lcmdlZCB2YWx1ZS5cbiAgc3RhY2tBLnB1c2goc3JjVmFsdWUpO1xuICBzdGFja0IucHVzaChyZXN1bHQpO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IG1lcmdlIG9iamVjdHMgYW5kIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIG9iamVjdFtrZXldID0gbWVyZ2VGdW5jKHJlc3VsdCwgc3JjVmFsdWUsIGN1c3RvbWl6ZXIsIHN0YWNrQSwgc3RhY2tCKTtcbiAgfSBlbHNlIGlmIChyZXN1bHQgPT09IHJlc3VsdCA/IHJlc3VsdCAhPT0gdmFsdWUgOiB2YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICBvYmplY3Rba2V5XSA9IHJlc3VsdDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VNZXJnZURlZXA7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aGljaCBkb2VzIG5vdCBjb2VyY2UgYGtleWAgdG8gYSBzdHJpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VQcm9wZXJ0eTtcbiIsInZhciBpZGVudGl0eSA9IHJlcXVpcmUoJy4uL3V0aWxpdHkvaWRlbnRpdHknKSxcbiAgICBtZXRhTWFwID0gcmVxdWlyZSgnLi9tZXRhTWFwJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYHNldERhdGFgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaG90IGxvb3AgZGV0ZWN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhc3NvY2lhdGUgbWV0YWRhdGEgd2l0aC5cbiAqIEBwYXJhbSB7Kn0gZGF0YSBUaGUgbWV0YWRhdGEuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYGZ1bmNgLlxuICovXG52YXIgYmFzZVNldERhdGEgPSAhbWV0YU1hcCA/IGlkZW50aXR5IDogZnVuY3Rpb24oZnVuYywgZGF0YSkge1xuICBtZXRhTWFwLnNldChmdW5jLCBkYXRhKTtcbiAgcmV0dXJuIGZ1bmM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VTZXREYXRhO1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIGlmIGl0IGlzIG5vdCBvbmUuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZFxuICogZm9yIGBudWxsYCBvciBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiAodmFsdWUgKyAnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVRvU3RyaW5nO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy52YWx1ZXNgIGFuZCBgXy52YWx1ZXNJbmAgd2hpY2ggY3JlYXRlcyBhblxuICogYXJyYXkgb2YgYG9iamVjdGAgcHJvcGVydHkgdmFsdWVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHByb3BlcnR5IG5hbWVzXG4gKiByZXR1cm5lZCBieSBga2V5c0Z1bmNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gZ2V0IHZhbHVlcyBmb3IuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VWYWx1ZXMob2JqZWN0LCBwcm9wcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gb2JqZWN0W3Byb3BzW2luZGV4XV07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVmFsdWVzO1xuIiwidmFyIGlkZW50aXR5ID0gcmVxdWlyZSgnLi4vdXRpbGl0eS9pZGVudGl0eScpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUNhbGxiYWNrYCB3aGljaCBvbmx5IHN1cHBvcnRzIGB0aGlzYCBiaW5kaW5nXG4gKiBhbmQgc3BlY2lmeWluZyB0aGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0byBwcm92aWRlIHRvIGBmdW5jYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYmluZC5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtudW1iZXJ9IFthcmdDb3VudF0gVGhlIG51bWJlciBvZiBhcmd1bWVudHMgdG8gcHJvdmlkZSB0byBgZnVuY2AuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGNhbGxiYWNrLlxuICovXG5mdW5jdGlvbiBiaW5kQ2FsbGJhY2soZnVuYywgdGhpc0FyZywgYXJnQ291bnQpIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHR5cGVvZiB0aGlzQXJnID09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH1cbiAgc3dpdGNoIChhcmdDb3VudCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIHZhbHVlKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH07XG4gICAgY2FzZSA0OiByZXR1cm4gZnVuY3Rpb24oYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9O1xuICAgIGNhc2UgNTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBvdGhlciwga2V5LCBvYmplY3QsIHNvdXJjZSkge1xuICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgb3RoZXIsIGtleSwgb2JqZWN0LCBzb3VyY2UpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmluZENhbGxiYWNrO1xuIiwidmFyIGJpbmRDYWxsYmFjayA9IHJlcXVpcmUoJy4vYmluZENhbGxiYWNrJyksXG4gICAgaXNJdGVyYXRlZUNhbGwgPSByZXF1aXJlKCcuL2lzSXRlcmF0ZWVDYWxsJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgYXNzaWducyBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3QocykgdG8gYSBnaXZlblxuICogZGVzdGluYXRpb24gb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhc3NpZ25lciBUaGUgZnVuY3Rpb24gdG8gYXNzaWduIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVBc3NpZ25lcihhc3NpZ25lcikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG4gICAgICAgIG9iamVjdCA9IGFyZ3VtZW50c1swXTtcblxuICAgIGlmIChsZW5ndGggPCAyIHx8IG9iamVjdCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgICBpZiAobGVuZ3RoID4gMyAmJiBpc0l0ZXJhdGVlQ2FsbChhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSwgYXJndW1lbnRzWzNdKSkge1xuICAgICAgbGVuZ3RoID0gMjtcbiAgICB9XG4gICAgLy8gSnVnZ2xlIGFyZ3VtZW50cy5cbiAgICBpZiAobGVuZ3RoID4gMyAmJiB0eXBlb2YgYXJndW1lbnRzW2xlbmd0aCAtIDJdID09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciBjdXN0b21pemVyID0gYmluZENhbGxiYWNrKGFyZ3VtZW50c1stLWxlbmd0aCAtIDFdLCBhcmd1bWVudHNbbGVuZ3RoLS1dLCA1KTtcbiAgICB9IGVsc2UgaWYgKGxlbmd0aCA+IDIgJiYgdHlwZW9mIGFyZ3VtZW50c1tsZW5ndGggLSAxXSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjdXN0b21pemVyID0gYXJndW1lbnRzWy0tbGVuZ3RoXTtcbiAgICB9XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGFzc2lnbmVyKG9iamVjdCwgc291cmNlLCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVBc3NpZ25lcjtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBhcnJheXMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7QXJyYXl9IG90aGVyIFRoZSBvdGhlciBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIGFycmF5cy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzV2hlcmVdIFNwZWNpZnkgcGVyZm9ybWluZyBwYXJ0aWFsIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtBcnJheX0gW3N0YWNrQV0gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tCXSBUcmFja3MgdHJhdmVyc2VkIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJyYXlzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQXJyYXlzKGFycmF5LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGFyckxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIG90aExlbmd0aCA9IG90aGVyLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IHRydWU7XG5cbiAgaWYgKGFyckxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIShpc1doZXJlICYmIG90aExlbmd0aCA+IGFyckxlbmd0aCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gRGVlcCBjb21wYXJlIHRoZSBjb250ZW50cywgaWdub3Jpbmcgbm9uLW51bWVyaWMgcHJvcGVydGllcy5cbiAgd2hpbGUgKHJlc3VsdCAmJiArK2luZGV4IDwgYXJyTGVuZ3RoKSB7XG4gICAgdmFyIGFyclZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XTtcblxuICAgIHJlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgcmVzdWx0ID0gaXNXaGVyZVxuICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIGFyclZhbHVlLCBpbmRleClcbiAgICAgICAgOiBjdXN0b21pemVyKGFyclZhbHVlLCBvdGhWYWx1ZSwgaW5kZXgpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICAgIGlmIChpc1doZXJlKSB7XG4gICAgICAgIHZhciBvdGhJbmRleCA9IG90aExlbmd0aDtcbiAgICAgICAgd2hpbGUgKG90aEluZGV4LS0pIHtcbiAgICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW290aEluZGV4XTtcbiAgICAgICAgICByZXN1bHQgPSAoYXJyVmFsdWUgJiYgYXJyVmFsdWUgPT09IG90aFZhbHVlKSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQik7XG4gICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSAoYXJyVmFsdWUgJiYgYXJyVmFsdWUgPT09IG90aFZhbHVlKSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBpc1doZXJlLCBzdGFja0EsIHN0YWNrQik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiAhIXJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcXVhbEFycmF5cztcbiIsIi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAqIHRoZSBzYW1lIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZSBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0cyB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgdGFnKSB7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICAgIC8vIENvZXJjZSBkYXRlcyBhbmQgYm9vbGVhbnMgdG8gbnVtYmVycywgZGF0ZXMgdG8gbWlsbGlzZWNvbmRzIGFuZCBib29sZWFuc1xuICAgICAgLy8gdG8gYDFgIG9yIGAwYCB0cmVhdGluZyBpbnZhbGlkIGRhdGVzIGNvZXJjZWQgdG8gYE5hTmAgYXMgbm90IGVxdWFsLlxuICAgICAgcmV0dXJuICtvYmplY3QgPT0gK290aGVyO1xuXG4gICAgY2FzZSBlcnJvclRhZzpcbiAgICAgIHJldHVybiBvYmplY3QubmFtZSA9PSBvdGhlci5uYW1lICYmIG9iamVjdC5tZXNzYWdlID09IG90aGVyLm1lc3NhZ2U7XG5cbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgIC8vIFRyZWF0IGBOYU5gIHZzLiBgTmFOYCBhcyBlcXVhbC5cbiAgICAgIHJldHVybiAob2JqZWN0ICE9ICtvYmplY3QpXG4gICAgICAgID8gb3RoZXIgIT0gK290aGVyXG4gICAgICAgIC8vIEJ1dCwgdHJlYXQgYC0wYCB2cy4gYCswYCBhcyBub3QgZXF1YWwuXG4gICAgICAgIDogKG9iamVjdCA9PSAwID8gKCgxIC8gb2JqZWN0KSA9PSAoMSAvIG90aGVyKSkgOiBvYmplY3QgPT0gK290aGVyKTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgLy8gQ29lcmNlIHJlZ2V4ZXMgdG8gc3RyaW5ncyBhbmQgdHJlYXQgc3RyaW5ncyBwcmltaXRpdmVzIGFuZCBzdHJpbmdcbiAgICAgIC8vIG9iamVjdHMgYXMgZXF1YWwuIFNlZSBodHRwczovL2VzNS5naXRodWIuaW8vI3gxNS4xMC42LjQgZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgIHJldHVybiBvYmplY3QgPT0gKG90aGVyICsgJycpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcXVhbEJ5VGFnO1xuIiwidmFyIGtleXMgPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5cycpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpbmcgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNXaGVyZV0gU3BlY2lmeSBwZXJmb3JtaW5nIHBhcnRpYWwgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBbc3RhY2tBXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgb2JqZWN0cy5cbiAqIEBwYXJhbSB7QXJyYXl9IFtzdGFja0JdIFRyYWNrcyB0cmF2ZXJzZWQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKSB7XG4gIHZhciBvYmpQcm9wcyA9IGtleXMob2JqZWN0KSxcbiAgICAgIG9iakxlbmd0aCA9IG9ialByb3BzLmxlbmd0aCxcbiAgICAgIG90aFByb3BzID0ga2V5cyhvdGhlciksXG4gICAgICBvdGhMZW5ndGggPSBvdGhQcm9wcy5sZW5ndGg7XG5cbiAgaWYgKG9iakxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIWlzV2hlcmUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGhhc0N0b3IsXG4gICAgICBpbmRleCA9IC0xO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IG9ialByb3BzW2luZGV4XSxcbiAgICAgICAgcmVzdWx0ID0gaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwga2V5KTtcblxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgIG90aFZhbHVlID0gb3RoZXJba2V5XTtcblxuICAgICAgcmVzdWx0ID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgICAgcmVzdWx0ID0gaXNXaGVyZVxuICAgICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSlcbiAgICAgICAgICA6IGN1c3RvbWl6ZXIob2JqVmFsdWUsIG90aFZhbHVlLCBrZXkpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICAgIHJlc3VsdCA9IChvYmpWYWx1ZSAmJiBvYmpWYWx1ZSA9PT0gb3RoVmFsdWUpIHx8IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGlzV2hlcmUsIHN0YWNrQSwgc3RhY2tCKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaGFzQ3RvciB8fCAoaGFzQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAoIWhhc0N0b3IpIHtcbiAgICB2YXIgb2JqQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgb3RoQ3RvciA9IG90aGVyLmNvbnN0cnVjdG9yO1xuXG4gICAgLy8gTm9uIGBPYmplY3RgIG9iamVjdCBpbnN0YW5jZXMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1YWwuXG4gICAgaWYgKG9iakN0b3IgIT0gb3RoQ3RvciAmJiAoJ2NvbnN0cnVjdG9yJyBpbiBvYmplY3QgJiYgJ2NvbnN0cnVjdG9yJyBpbiBvdGhlcikgJiZcbiAgICAgICAgISh0eXBlb2Ygb2JqQ3RvciA9PSAnZnVuY3Rpb24nICYmIG9iakN0b3IgaW5zdGFuY2VvZiBvYmpDdG9yICYmIHR5cGVvZiBvdGhDdG9yID09ICdmdW5jdGlvbicgJiYgb3RoQ3RvciBpbnN0YW5jZW9mIG90aEN0b3IpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsT2JqZWN0cztcbiIsInZhciBiYXNlU2V0RGF0YSA9IHJlcXVpcmUoJy4vYmFzZVNldERhdGEnKSxcbiAgICBpc05hdGl2ZSA9IHJlcXVpcmUoJy4uL2xhbmcvaXNOYXRpdmUnKSxcbiAgICBzdXBwb3J0ID0gcmVxdWlyZSgnLi4vc3VwcG9ydCcpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbmFtZWQgZnVuY3Rpb25zLiAqL1xudmFyIHJlRnVuY05hbWUgPSAvXlxccypmdW5jdGlvblsgXFxuXFxyXFx0XStcXHcvO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgZnVuY3Rpb25zIGNvbnRhaW5pbmcgYSBgdGhpc2AgcmVmZXJlbmNlLiAqL1xudmFyIHJlVGhpcyA9IC9cXGJ0aGlzXFxiLztcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZuVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBpcyBlbGlnaWJsZSBmb3IgYHRoaXNgIGJpbmRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBlbGlnaWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0JpbmRhYmxlKGZ1bmMpIHtcbiAgdmFyIHJlc3VsdCA9ICEoc3VwcG9ydC5mdW5jTmFtZXMgPyBmdW5jLm5hbWUgOiBzdXBwb3J0LmZ1bmNEZWNvbXApO1xuXG4gIGlmICghcmVzdWx0KSB7XG4gICAgdmFyIHNvdXJjZSA9IGZuVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICBpZiAoIXN1cHBvcnQuZnVuY05hbWVzKSB7XG4gICAgICByZXN1bHQgPSAhcmVGdW5jTmFtZS50ZXN0KHNvdXJjZSk7XG4gICAgfVxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAvLyBDaGVjayBpZiBgZnVuY2AgcmVmZXJlbmNlcyB0aGUgYHRoaXNgIGtleXdvcmQgYW5kIHN0b3JlIHRoZSByZXN1bHQuXG4gICAgICByZXN1bHQgPSByZVRoaXMudGVzdChzb3VyY2UpIHx8IGlzTmF0aXZlKGZ1bmMpO1xuICAgICAgYmFzZVNldERhdGEoZnVuYywgcmVzdWx0KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0JpbmRhYmxlO1xuIiwiLyoqXG4gKiBVc2VkIGFzIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YWx1ZSA9ICt2YWx1ZTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0luZGV4O1xuIiwidmFyIGlzSW5kZXggPSByZXF1aXJlKCcuL2lzSW5kZXgnKSxcbiAgICBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHByb3ZpZGVkIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcicpIHtcbiAgICB2YXIgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aCxcbiAgICAgICAgcHJlcmVxID0gaXNMZW5ndGgobGVuZ3RoKSAmJiBpc0luZGV4KGluZGV4LCBsZW5ndGgpO1xuICB9IGVsc2Uge1xuICAgIHByZXJlcSA9IHR5cGUgPT0gJ3N0cmluZycgJiYgaW5kZXggaW4gb2JqZWN0O1xuICB9XG4gIGlmIChwcmVyZXEpIHtcbiAgICB2YXIgb3RoZXIgPSBvYmplY3RbaW5kZXhdO1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgPyB2YWx1ZSA9PT0gb3RoZXIgOiBvdGhlciAhPT0gb3RoZXI7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSXRlcmF0ZWVDYWxsO1xuIiwiLyoqXG4gKiBVc2VkIGFzIHRoZSBtYXhpbXVtIGxlbmd0aCBvZiBhbiBhcnJheS1saWtlIHZhbHVlLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW51bWJlci5tYXhfc2FmZV9pbnRlZ2VyKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgYmFzZWQgb24gRVMgYFRvTGVuZ3RoYC4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNMZW5ndGg7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JykgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vbGFuZy9pc09iamVjdCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciBzdHJpY3QgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaWYgc3VpdGFibGUgZm9yIHN0cmljdFxuICogIGVxdWFsaXR5IGNvbXBhcmlzb25zLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IHZhbHVlICYmICh2YWx1ZSA9PT0gMCA/ICgoMSAvIHZhbHVlKSA+IDApIDogIWlzT2JqZWN0KHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTdHJpY3RDb21wYXJhYmxlO1xuIiwidmFyIGlzTmF0aXZlID0gcmVxdWlyZSgnLi4vbGFuZy9pc05hdGl2ZScpO1xuXG4vKiogTmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIFdlYWtNYXAgPSBpc05hdGl2ZShXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXApICYmIFdlYWtNYXA7XG5cbi8qKiBVc2VkIHRvIHN0b3JlIGZ1bmN0aW9uIG1ldGFkYXRhLiAqL1xudmFyIG1ldGFNYXAgPSBXZWFrTWFwICYmIG5ldyBXZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1ldGFNYXA7XG4iLCJ2YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL3RvT2JqZWN0Jyk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnBpY2tgIHRoYXQgcGlja3MgYG9iamVjdGAgcHJvcGVydGllcyBzcGVjaWZpZWRcbiAqIGJ5IHRoZSBgcHJvcHNgIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmdbXX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIHBpY2suXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBwaWNrQnlBcnJheShvYmplY3QsIHByb3BzKSB7XG4gIG9iamVjdCA9IHRvT2JqZWN0KG9iamVjdCk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICByZXN1bHQgPSB7fTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gb2JqZWN0W2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGlja0J5QXJyYXk7XG4iLCJ2YXIgYmFzZUZvckluID0gcmVxdWlyZSgnLi9iYXNlRm9ySW4nKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ucGlja2AgdGhhdCBwaWNrcyBgb2JqZWN0YCBwcm9wZXJ0aWVzIGBwcmVkaWNhdGVgXG4gKiByZXR1cm5zIHRydXRoeSBmb3IuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIHBpY2tCeUNhbGxiYWNrKG9iamVjdCwgcHJlZGljYXRlKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgYmFzZUZvckluKG9iamVjdCwgZnVuY3Rpb24odmFsdWUsIGtleSwgb2JqZWN0KSB7XG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwga2V5LCBvYmplY3QpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGlja0J5Q2FsbGJhY2s7XG4iLCJ2YXIgYmFzZUZvckluID0gcmVxdWlyZSgnLi9iYXNlRm9ySW4nKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIEEgZmFsbGJhY2sgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNQbGFpbk9iamVjdGAgd2hpY2ggY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBoYXMgYSBgW1tQcm90b3R5cGVdXWBcbiAqIG9mIGBudWxsYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzaGltSXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICB2YXIgQ3RvcjtcblxuICAvLyBFeGl0IGVhcmx5IGZvciBub24gYE9iamVjdGAgb2JqZWN0cy5cbiAgaWYgKCEoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBvYmplY3RUYWcpIHx8XG4gICAgICAoIWhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjb25zdHJ1Y3RvcicpICYmXG4gICAgICAgIChDdG9yID0gdmFsdWUuY29uc3RydWN0b3IsIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgIShDdG9yIGluc3RhbmNlb2YgQ3RvcikpKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBJRSA8IDkgaXRlcmF0ZXMgaW5oZXJpdGVkIHByb3BlcnRpZXMgYmVmb3JlIG93biBwcm9wZXJ0aWVzLiBJZiB0aGUgZmlyc3RcbiAgLy8gaXRlcmF0ZWQgcHJvcGVydHkgaXMgYW4gb2JqZWN0J3Mgb3duIHByb3BlcnR5IHRoZW4gdGhlcmUgYXJlIG5vIGluaGVyaXRlZFxuICAvLyBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gIHZhciByZXN1bHQ7XG4gIC8vIEluIG1vc3QgZW52aXJvbm1lbnRzIGFuIG9iamVjdCdzIG93biBwcm9wZXJ0aWVzIGFyZSBpdGVyYXRlZCBiZWZvcmVcbiAgLy8gaXRzIGluaGVyaXRlZCBwcm9wZXJ0aWVzLiBJZiB0aGUgbGFzdCBpdGVyYXRlZCBwcm9wZXJ0eSBpcyBhbiBvYmplY3Qnc1xuICAvLyBvd24gcHJvcGVydHkgdGhlbiB0aGVyZSBhcmUgbm8gaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAgYmFzZUZvckluKHZhbHVlLCBmdW5jdGlvbihzdWJWYWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0ID0ga2V5O1xuICB9KTtcbiAgcmV0dXJuIHR5cGVvZiByZXN1bHQgPT0gJ3VuZGVmaW5lZCcgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgcmVzdWx0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaGltSXNQbGFpbk9iamVjdDtcbiIsInZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4uL2xhbmcvaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FycmF5JyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vaXNJbmRleCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi9pc0xlbmd0aCcpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4uL29iamVjdC9rZXlzSW4nKSxcbiAgICBzdXBwb3J0ID0gcmVxdWlyZSgnLi4vc3VwcG9ydCcpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uIG9mIGBPYmplY3Qua2V5c2Agd2hpY2ggY3JlYXRlcyBhbiBhcnJheSBvZiB0aGVcbiAqIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIHNoaW1LZXlzKG9iamVjdCkge1xuICB2YXIgcHJvcHMgPSBrZXlzSW4ob2JqZWN0KSxcbiAgICAgIHByb3BzTGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgbGVuZ3RoID0gcHJvcHNMZW5ndGggJiYgb2JqZWN0Lmxlbmd0aDtcblxuICB2YXIgYWxsb3dJbmRleGVzID0gbGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IChzdXBwb3J0Lm5vbkVudW1BcmdzICYmIGlzQXJndW1lbnRzKG9iamVjdCkpKTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgcHJvcHNMZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgIGlmICgoYWxsb3dJbmRleGVzICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpKSB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaGltS2V5cztcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGFuIG9iamVjdCBpZiBpdCBpcyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgb2JqZWN0LlxuICovXG5mdW5jdGlvbiB0b09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3QodmFsdWUpID8gdmFsdWUgOiBPYmplY3QodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvT2JqZWN0O1xuIiwidmFyIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgdmFyIGxlbmd0aCA9IGlzT2JqZWN0TGlrZSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggOiB1bmRlZmluZWQ7XG4gIHJldHVybiAoaXNMZW5ndGgobGVuZ3RoKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKSB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FyZ3VtZW50cztcbiIsInZhciBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNOYXRpdmUgPSByZXF1aXJlKCcuL2lzTmF0aXZlJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XSc7XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgYHRvU3RyaW5nVGFnYCBvZiB2YWx1ZXMuXG4gKiBTZWUgdGhlIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciBvYmpUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQXJyYXkgPSBpc05hdGl2ZShuYXRpdmVJc0FycmF5ID0gQXJyYXkuaXNBcnJheSkgJiYgbmF0aXZlSXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IG5hdGl2ZUlzQXJyYXkgfHwgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJyYXlUYWcpIHx8IGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5O1xuIiwidmFyIGJhc2VJc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUlzRnVuY3Rpb24nKSxcbiAgICBpc05hdGl2ZSA9IHJlcXVpcmUoJy4vaXNOYXRpdmUnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBVaW50OEFycmF5ID0gaXNOYXRpdmUoVWludDhBcnJheSA9IGdsb2JhbC5VaW50OEFycmF5KSAmJiBVaW50OEFycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNGdW5jdGlvbiA9ICEoYmFzZUlzRnVuY3Rpb24oL3gvKSB8fCAoVWludDhBcnJheSAmJiAhYmFzZUlzRnVuY3Rpb24oVWludDhBcnJheSkpKSA/IGJhc2VJc0Z1bmN0aW9uIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIG9sZGVyIHZlcnNpb25zIG9mIENocm9tZSBhbmQgU2FmYXJpIHdoaWNoIHJldHVybiAnZnVuY3Rpb24nIGZvciByZWdleGVzXG4gIC8vIGFuZCBTYWZhcmkgOCBlcXVpdmFsZW50cyB3aGljaCByZXR1cm4gJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGNvbnN0cnVjdG9ycy5cbiAgcmV0dXJuIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IGZ1bmNUYWc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG4iLCJ2YXIgZXNjYXBlUmVnRXhwID0gcmVxdWlyZSgnLi4vc3RyaW5nL2VzY2FwZVJlZ0V4cCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZm5Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgdmFsdWVzLlxuICogU2VlIHRoZSBbRVMgc3BlY10oaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICovXG52YXIgb2JqVG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZU5hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBlc2NhcGVSZWdFeHAob2JqVG9TdHJpbmcpXG4gIC5yZXBsYWNlKC90b1N0cmluZ3woZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc05hdGl2ZShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc05hdGl2ZShfKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jVGFnKSB7XG4gICAgcmV0dXJuIHJlTmF0aXZlLnRlc3QoZm5Ub1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIChpc09iamVjdExpa2UodmFsdWUpICYmIHJlSG9zdEN0b3IudGVzdCh2YWx1ZSkpIHx8IGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTmF0aXZlO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgbGFuZ3VhZ2UgdHlwZSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqICoqTm90ZToqKiBTZWUgdGhlIFtFUzUgc3BlY10oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgLy8gQXZvaWQgYSBWOCBKSVQgYnVnIGluIENocm9tZSAxOS0yMC5cbiAgLy8gU2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxIGZvciBtb3JlIGRldGFpbHMuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdHlwZSA9PSAnZnVuY3Rpb24nIHx8ICh2YWx1ZSAmJiB0eXBlID09ICdvYmplY3QnKSB8fCBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsInZhciBpc05hdGl2ZSA9IHJlcXVpcmUoJy4vaXNOYXRpdmUnKSxcbiAgICBzaGltSXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3NoaW1Jc1BsYWluT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlT2YgPSBpc05hdGl2ZShnZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZikgJiYgZ2V0UHJvdG90eXBlT2Y7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBhc3N1bWVzIG9iamVjdHMgY3JlYXRlZCBieSB0aGUgYE9iamVjdGAgY29uc3RydWN0b3JcbiAqIGhhdmUgbm8gaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xudmFyIGlzUGxhaW5PYmplY3QgPSAhZ2V0UHJvdG90eXBlT2YgPyBzaGltSXNQbGFpbk9iamVjdCA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIGlmICghKHZhbHVlICYmIG9ialRvU3RyaW5nLmNhbGwodmFsdWUpID09IG9iamVjdFRhZykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHZhbHVlT2YgPSB2YWx1ZS52YWx1ZU9mLFxuICAgICAgb2JqUHJvdG8gPSBpc05hdGl2ZSh2YWx1ZU9mKSAmJiAob2JqUHJvdG8gPSBnZXRQcm90b3R5cGVPZih2YWx1ZU9mKSkgJiYgZ2V0UHJvdG90eXBlT2Yob2JqUHJvdG8pO1xuXG4gIHJldHVybiBvYmpQcm90b1xuICAgID8gKHZhbHVlID09IG9ialByb3RvIHx8IGdldFByb3RvdHlwZU9mKHZhbHVlKSA9PSBvYmpQcm90bylcbiAgICA6IHNoaW1Jc1BsYWluT2JqZWN0KHZhbHVlKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQbGFpbk9iamVjdDtcbiIsInZhciBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID0gdHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID0gdHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID0gdHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID0gdHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID0gdHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIFVzZWQgZm9yIG5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZSBgdG9TdHJpbmdUYWdgIG9mIHZhbHVlcy5cbiAqIFNlZSB0aGUgW0VTIHNwZWNdKGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqL1xudmFyIG9ialRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmIHR5cGVkQXJyYXlUYWdzW29ialRvU3RyaW5nLmNhbGwodmFsdWUpXSkgfHwgZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUeXBlZEFycmF5O1xuIiwidmFyIGJhc2VDb3B5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUNvcHknKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuLi9vYmplY3Qva2V5c0luJyk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHBsYWluIG9iamVjdCBmbGF0dGVuaW5nIGluaGVyaXRlZCBlbnVtZXJhYmxlXG4gKiBwcm9wZXJ0aWVzIG9mIGB2YWx1ZWAgdG8gb3duIHByb3BlcnRpZXMgb2YgdGhlIHBsYWluIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgcGxhaW4gb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBuZXcgRm9vKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIF8udG9QbGFpbk9iamVjdChuZXcgRm9vKSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDMgfVxuICovXG5mdW5jdGlvbiB0b1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBiYXNlQ29weSh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9QbGFpbk9iamVjdDtcbiIsInZhciBiYXNlQXNzaWduID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUFzc2lnbicpLFxuICAgIGNyZWF0ZUFzc2lnbmVyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvY3JlYXRlQXNzaWduZXInKTtcblxuLyoqXG4gKiBBc3NpZ25zIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdChzKSB0byB0aGUgZGVzdGluYXRpb25cbiAqIG9iamVjdC4gU3Vic2VxdWVudCBzb3VyY2VzIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLlxuICogSWYgYGN1c3RvbWl6ZXJgIGlzIHByb3ZpZGVkIGl0IGlzIGludm9rZWQgdG8gcHJvZHVjZSB0aGUgYXNzaWduZWQgdmFsdWVzLlxuICogVGhlIGBjdXN0b21pemVyYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCBmaXZlIGFyZ3VtZW50cztcbiAqIChvYmplY3RWYWx1ZSwgc291cmNlVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAYWxpYXMgZXh0ZW5kXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmluZyB2YWx1ZXMuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGN1c3RvbWl6ZXJgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5hc3NpZ24oeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ2FnZSc6IDQwIH0sIHsgJ3VzZXInOiAnZnJlZCcgfSk7XG4gKiAvLyA9PiB7ICd1c2VyJzogJ2ZyZWQnLCAnYWdlJzogNDAgfVxuICpcbiAqIC8vIHVzaW5nIGEgY3VzdG9taXplciBjYWxsYmFja1xuICogdmFyIGRlZmF1bHRzID0gXy5wYXJ0aWFsUmlnaHQoXy5hc3NpZ24sIGZ1bmN0aW9uKHZhbHVlLCBvdGhlcikge1xuICogICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICd1bmRlZmluZWQnID8gb3RoZXIgOiB2YWx1ZTtcbiAqIH0pO1xuICpcbiAqIGRlZmF1bHRzKHsgJ3VzZXInOiAnYmFybmV5JyB9LCB7ICdhZ2UnOiAzNiB9LCB7ICd1c2VyJzogJ2ZyZWQnIH0pO1xuICogLy8gPT4geyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYgfVxuICovXG52YXIgYXNzaWduID0gY3JlYXRlQXNzaWduZXIoYmFzZUFzc2lnbik7XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduO1xuIiwidmFyIGFycmF5Q29weSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2FycmF5Q29weScpLFxuICAgIGFzc2lnbiA9IHJlcXVpcmUoJy4vYXNzaWduJyksXG4gICAgYXNzaWduRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9hc3NpZ25EZWZhdWx0cycpO1xuXG4vKipcbiAqIEFzc2lnbnMgb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0KHMpIHRvIHRoZSBkZXN0aW5hdGlvblxuICogb2JqZWN0IGZvciBhbGwgZGVzdGluYXRpb24gcHJvcGVydGllcyB0aGF0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAuIE9uY2UgYVxuICogcHJvcGVydHkgaXMgc2V0LCBhZGRpdGlvbmFsIGRlZmF1bHRzIG9mIHRoZSBzYW1lIHByb3BlcnR5IGFyZSBpZ25vcmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmYXVsdHMoeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ2FnZSc6IDM2IH0sIHsgJ3VzZXInOiAnZnJlZCcgfSk7XG4gKiAvLyA9PiB7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9XG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRzKG9iamVjdCkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIHZhciBhcmdzID0gYXJyYXlDb3B5KGFyZ3VtZW50cyk7XG4gIGFyZ3MucHVzaChhc3NpZ25EZWZhdWx0cyk7XG4gIHJldHVybiBhc3NpZ24uYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsInZhciBpc0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lzTGVuZ3RoJyksXG4gICAgaXNOYXRpdmUgPSByZXF1aXJlKCcuLi9sYW5nL2lzTmF0aXZlJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9sYW5nL2lzT2JqZWN0JyksXG4gICAgc2hpbUtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9zaGltS2V5cycpO1xuXG4vKiBOYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBpc05hdGl2ZShuYXRpdmVLZXlzID0gT2JqZWN0LmtleXMpICYmIG5hdGl2ZUtleXM7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbnZhciBrZXlzID0gIW5hdGl2ZUtleXMgPyBzaGltS2V5cyA6IGZ1bmN0aW9uKG9iamVjdCkge1xuICBpZiAob2JqZWN0KSB7XG4gICAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7XG4gIH1cbiAgaWYgKCh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlID09PSBvYmplY3QpIHx8XG4gICAgICh0eXBlb2Ygb2JqZWN0ICE9ICdmdW5jdGlvbicgJiYgKGxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpKSkpIHtcbiAgICByZXR1cm4gc2hpbUtleXMob2JqZWN0KTtcbiAgfVxuICByZXR1cm4gaXNPYmplY3Qob2JqZWN0KSA/IG5hdGl2ZUtleXMob2JqZWN0KSA6IFtdO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzO1xuIiwidmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi4vbGFuZy9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9sYW5nL2lzQXJyYXknKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNJbmRleCcpLFxuICAgIGlzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2xhbmcvaXNPYmplY3QnKSxcbiAgICBzdXBwb3J0ID0gcmVxdWlyZSgnLi4vc3VwcG9ydCcpO1xuXG4vKiogVXNlZCBmb3IgbmF0aXZlIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB9XG4gIHZhciBsZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICBsZW5ndGggPSAobGVuZ3RoICYmIGlzTGVuZ3RoKGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IChzdXBwb3J0Lm5vbkVudW1BcmdzICYmIGlzQXJndW1lbnRzKG9iamVjdCkpKSAmJiBsZW5ndGgpIHx8IDA7XG5cbiAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgaXNQcm90byA9IHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUgPT09IG9iamVjdCxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCksXG4gICAgICBza2lwSW5kZXhlcyA9IGxlbmd0aCA+IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gKGluZGV4ICsgJycpO1xuICB9XG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShza2lwSW5kZXhlcyAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSkgJiZcbiAgICAgICAgIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzSW47XG4iLCJ2YXIgYmFzZU1lcmdlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZU1lcmdlJyksXG4gICAgY3JlYXRlQXNzaWduZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9jcmVhdGVBc3NpZ25lcicpO1xuXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IG1lcmdlcyBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHRoZSBzb3VyY2Ugb2JqZWN0KHMpLCB0aGF0XG4gKiBkb24ndCByZXNvbHZlIHRvIGB1bmRlZmluZWRgIGludG8gdGhlIGRlc3RpbmF0aW9uIG9iamVjdC4gU3Vic2VxdWVudCBzb3VyY2VzXG4gKiBvdmVyd3JpdGUgcHJvcGVydHkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy4gSWYgYGN1c3RvbWl6ZXJgIGlzXG4gKiBwcm92aWRlZCBpdCBpcyBpbnZva2VkIHRvIHByb2R1Y2UgdGhlIG1lcmdlZCB2YWx1ZXMgb2YgdGhlIGRlc3RpbmF0aW9uIGFuZFxuICogc291cmNlIHByb3BlcnRpZXMuIElmIGBjdXN0b21pemVyYCByZXR1cm5zIGB1bmRlZmluZWRgIG1lcmdpbmcgaXMgaGFuZGxlZFxuICogYnkgdGhlIG1ldGhvZCBpbnN0ZWFkLiBUaGUgYGN1c3RvbWl6ZXJgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZFxuICogd2l0aCBmaXZlIGFyZ3VtZW50czsgKG9iamVjdFZhbHVlLCBzb3VyY2VWYWx1ZSwga2V5LCBvYmplY3QsIHNvdXJjZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgbWVyZ2luZyBwcm9wZXJ0aWVzLlxuICogQHBhcmFtIHsqfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjdXN0b21pemVyYC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IHtcbiAqICAgJ2RhdGEnOiBbeyAndXNlcic6ICdiYXJuZXknIH0sIHsgJ3VzZXInOiAnZnJlZCcgfV1cbiAqIH07XG4gKlxuICogdmFyIGFnZXMgPSB7XG4gKiAgICdkYXRhJzogW3sgJ2FnZSc6IDM2IH0sIHsgJ2FnZSc6IDQwIH1dXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2UodXNlcnMsIGFnZXMpO1xuICogLy8gPT4geyAnZGF0YSc6IFt7ICd1c2VyJzogJ2Jhcm5leScsICdhZ2UnOiAzNiB9LCB7ICd1c2VyJzogJ2ZyZWQnLCAnYWdlJzogNDAgfV0gfVxuICpcbiAqIC8vIHVzaW5nIGEgY3VzdG9taXplciBjYWxsYmFja1xuICogdmFyIG9iamVjdCA9IHtcbiAqICAgJ2ZydWl0cyc6IFsnYXBwbGUnXSxcbiAqICAgJ3ZlZ2V0YWJsZXMnOiBbJ2JlZXQnXVxuICogfTtcbiAqXG4gKiB2YXIgb3RoZXIgPSB7XG4gKiAgICdmcnVpdHMnOiBbJ2JhbmFuYSddLFxuICogICAndmVnZXRhYmxlcyc6IFsnY2Fycm90J11cbiAqIH07XG4gKlxuICogXy5tZXJnZShvYmplY3QsIG90aGVyLCBmdW5jdGlvbihhLCBiKSB7XG4gKiAgIGlmIChfLmlzQXJyYXkoYSkpIHtcbiAqICAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gKiAgIH1cbiAqIH0pO1xuICogLy8gPT4geyAnZnJ1aXRzJzogWydhcHBsZScsICdiYW5hbmEnXSwgJ3ZlZ2V0YWJsZXMnOiBbJ2JlZXQnLCAnY2Fycm90J10gfVxuICovXG52YXIgbWVyZ2UgPSBjcmVhdGVBc3NpZ25lcihiYXNlTWVyZ2UpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1lcmdlO1xuIiwidmFyIGJhc2VGbGF0dGVuID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZUZsYXR0ZW4nKSxcbiAgICBiaW5kQ2FsbGJhY2sgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9iaW5kQ2FsbGJhY2snKSxcbiAgICBwaWNrQnlBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3BpY2tCeUFycmF5JyksXG4gICAgcGlja0J5Q2FsbGJhY2sgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9waWNrQnlDYWxsYmFjaycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBwaWNrZWQgYG9iamVjdGAgcHJvcGVydGllcy4gUHJvcGVydHlcbiAqIG5hbWVzIG1heSBiZSBzcGVjaWZpZWQgYXMgaW5kaXZpZHVhbCBhcmd1bWVudHMgb3IgYXMgYXJyYXlzIG9mIHByb3BlcnR5XG4gKiBuYW1lcy4gSWYgYHByZWRpY2F0ZWAgaXMgcHJvdmlkZWQgaXQgaXMgaW52b2tlZCBmb3IgZWFjaCBwcm9wZXJ0eSBvZiBgb2JqZWN0YFxuICogcGlja2luZyB0aGUgcHJvcGVydGllcyBgcHJlZGljYXRlYCByZXR1cm5zIHRydXRoeSBmb3IuIFRoZSBwcmVkaWNhdGUgaXNcbiAqIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBrZXksIG9iamVjdCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufC4uLihzdHJpbmd8c3RyaW5nW10pfSBbcHJlZGljYXRlXSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXJcbiAqICBpdGVyYXRpb24gb3IgcHJvcGVydHkgbmFtZXMgdG8gcGljaywgc3BlY2lmaWVkIGFzIGluZGl2aWR1YWwgcHJvcGVydHlcbiAqICBuYW1lcyBvciBhcnJheXMgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAcGFyYW0geyp9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYHByZWRpY2F0ZWAuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAndXNlcic6ICdmcmVkJywgJ2FnZSc6IDQwIH07XG4gKlxuICogXy5waWNrKG9iamVjdCwgJ3VzZXInKTtcbiAqIC8vID0+IHsgJ3VzZXInOiAnZnJlZCcgfVxuICpcbiAqIF8ucGljayhvYmplY3QsIF8uaXNTdHJpbmcpO1xuICogLy8gPT4geyAndXNlcic6ICdmcmVkJyB9XG4gKi9cbmZ1bmN0aW9uIHBpY2sob2JqZWN0LCBwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG4gIHJldHVybiB0eXBlb2YgcHJlZGljYXRlID09ICdmdW5jdGlvbidcbiAgICA/IHBpY2tCeUNhbGxiYWNrKG9iamVjdCwgYmluZENhbGxiYWNrKHByZWRpY2F0ZSwgdGhpc0FyZywgMykpXG4gICAgOiBwaWNrQnlBcnJheShvYmplY3QsIGJhc2VGbGF0dGVuKGFyZ3VtZW50cywgZmFsc2UsIGZhbHNlLCAxKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGljaztcbiIsInZhciBiYXNlVmFsdWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZVZhbHVlcycpLFxuICAgIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSB2YWx1ZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLnZhbHVlcyhuZXcgRm9vKTtcbiAqIC8vID0+IFsxLCAyXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8udmFsdWVzKCdoaScpO1xuICogLy8gPT4gWydoJywgJ2knXVxuICovXG5mdW5jdGlvbiB2YWx1ZXMob2JqZWN0KSB7XG4gIHJldHVybiBiYXNlVmFsdWVzKG9iamVjdCwga2V5cyhvYmplY3QpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2YWx1ZXM7XG4iLCJ2YXIgYmFzZVRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvYmFzZVRvU3RyaW5nJyk7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBzcGVjaWFsIGNoYXJhY3RlcnMuXG4gKiBTZWUgdGhpcyBbYXJ0aWNsZSBvbiBgUmVnRXhwYCBjaGFyYWN0ZXJzXShodHRwOi8vd3d3LnJlZ3VsYXItZXhwcmVzc2lvbnMuaW5mby9jaGFyYWN0ZXJzLmh0bWwjc3BlY2lhbClcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKi9cbnZhciByZVJlZ0V4cENoYXJzID0gL1suKis/XiR7fSgpfFtcXF1cXC9cXFxcXS9nLFxuICAgIHJlSGFzUmVnRXhwQ2hhcnMgPSBSZWdFeHAocmVSZWdFeHBDaGFycy5zb3VyY2UpO1xuXG4vKipcbiAqIEVzY2FwZXMgdGhlIGBSZWdFeHBgIHNwZWNpYWwgY2hhcmFjdGVycyBcIlxcXCIsIFwiXlwiLCBcIiRcIiwgXCIuXCIsIFwifFwiLCBcIj9cIiwgXCIqXCIsXG4gKiBcIitcIiwgXCIoXCIsIFwiKVwiLCBcIltcIiwgXCJdXCIsIFwie1wiIGFuZCBcIn1cIiBpbiBgc3RyaW5nYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZXNjYXBlUmVnRXhwKCdbbG9kYXNoXShodHRwczovL2xvZGFzaC5jb20vKScpO1xuICogLy8gPT4gJ1xcW2xvZGFzaFxcXVxcKGh0dHBzOi8vbG9kYXNoXFwuY29tL1xcKSdcbiAqL1xuZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICBzdHJpbmcgPSBiYXNlVG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIChzdHJpbmcgJiYgcmVIYXNSZWdFeHBDaGFycy50ZXN0KHN0cmluZykpXG4gICAgPyBzdHJpbmcucmVwbGFjZShyZVJlZ0V4cENoYXJzLCAnXFxcXCQmJylcbiAgICA6IHN0cmluZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlc2NhcGVSZWdFeHA7XG4iLCJ2YXIgaXNOYXRpdmUgPSByZXF1aXJlKCcuL2xhbmcvaXNOYXRpdmUnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGZ1bmN0aW9ucyBjb250YWluaW5nIGEgYHRoaXNgIHJlZmVyZW5jZS4gKi9cbnZhciByZVRoaXMgPSAvXFxidGhpc1xcYi87XG5cbi8qKiBVc2VkIGZvciBuYXRpdmUgbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgRE9NIHN1cHBvcnQuICovXG52YXIgZG9jdW1lbnQgPSAoZG9jdW1lbnQgPSBnbG9iYWwud2luZG93KSAmJiBkb2N1bWVudC5kb2N1bWVudDtcblxuLyoqIE5hdGl2ZSBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIEFuIG9iamVjdCBlbnZpcm9ubWVudCBmZWF0dXJlIGZsYWdzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAdHlwZSBPYmplY3RcbiAqL1xudmFyIHN1cHBvcnQgPSB7fTtcblxuKGZ1bmN0aW9uKHgpIHtcblxuICAvKipcbiAgICogRGV0ZWN0IGlmIGZ1bmN0aW9ucyBjYW4gYmUgZGVjb21waWxlZCBieSBgRnVuY3Rpb24jdG9TdHJpbmdgXG4gICAqIChhbGwgYnV0IEZpcmVmb3ggT1MgY2VydGlmaWVkIGFwcHMsIG9sZGVyIE9wZXJhIG1vYmlsZSBicm93c2VycywgYW5kXG4gICAqIHRoZSBQbGF5U3RhdGlvbiAzOyBmb3JjZWQgYGZhbHNlYCBmb3IgV2luZG93cyA4IGFwcHMpLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy5zdXBwb3J0XG4gICAqIEB0eXBlIGJvb2xlYW5cbiAgICovXG4gIHN1cHBvcnQuZnVuY0RlY29tcCA9ICFpc05hdGl2ZShnbG9iYWwuV2luUlRFcnJvcikgJiYgcmVUaGlzLnRlc3QoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KTtcblxuICAvKipcbiAgICogRGV0ZWN0IGlmIGBGdW5jdGlvbiNuYW1lYCBpcyBzdXBwb3J0ZWQgKGFsbCBidXQgSUUpLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy5zdXBwb3J0XG4gICAqIEB0eXBlIGJvb2xlYW5cbiAgICovXG4gIHN1cHBvcnQuZnVuY05hbWVzID0gdHlwZW9mIEZ1bmN0aW9uLm5hbWUgPT0gJ3N0cmluZyc7XG5cbiAgLyoqXG4gICAqIERldGVjdCBpZiB0aGUgRE9NIGlzIHN1cHBvcnRlZC5cbiAgICpcbiAgICogQG1lbWJlck9mIF8uc3VwcG9ydFxuICAgKiBAdHlwZSBib29sZWFuXG4gICAqL1xuICB0cnkge1xuICAgIHN1cHBvcnQuZG9tID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLm5vZGVUeXBlID09PSAxMTtcbiAgfSBjYXRjaChlKSB7XG4gICAgc3VwcG9ydC5kb20gPSBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlY3QgaWYgYGFyZ3VtZW50c2Agb2JqZWN0IGluZGV4ZXMgYXJlIG5vbi1lbnVtZXJhYmxlLlxuICAgKlxuICAgKiBJbiBGaXJlZm94IDwgNCwgSUUgPCA5LCBQaGFudG9tSlMsIGFuZCBTYWZhcmkgPCA1LjEgYGFyZ3VtZW50c2Agb2JqZWN0XG4gICAqIGluZGV4ZXMgYXJlIG5vbi1lbnVtZXJhYmxlLiBDaHJvbWUgPCAyNSBhbmQgTm9kZS5qcyA8IDAuMTEuMCB0cmVhdFxuICAgKiBgYXJndW1lbnRzYCBvYmplY3QgaW5kZXhlcyBhcyBub24tZW51bWVyYWJsZSBhbmQgZmFpbCBgaGFzT3duUHJvcGVydHlgXG4gICAqIGNoZWNrcyBmb3IgaW5kZXhlcyB0aGF0IGV4Y2VlZCB0aGVpciBmdW5jdGlvbidzIGZvcm1hbCBwYXJhbWV0ZXJzIHdpdGhcbiAgICogYXNzb2NpYXRlZCB2YWx1ZXMgb2YgYDBgLlxuICAgKlxuICAgKiBAbWVtYmVyT2YgXy5zdXBwb3J0XG4gICAqIEB0eXBlIGJvb2xlYW5cbiAgICovXG4gIHRyeSB7XG4gICAgc3VwcG9ydC5ub25FbnVtQXJncyA9ICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIH0gY2F0Y2goZSkge1xuICAgIHN1cHBvcnQubm9uRW51bUFyZ3MgPSB0cnVlO1xuICB9XG59KDAsIDApKTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0O1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBwcm92aWRlZCB0byBpdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxpdHlcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqXG4gKiBfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuIiwiLyogUmlvdCB2Mi4wLjEyLCBAbGljZW5zZSBNSVQsIChjKSAyMDE1IE11dXQgSW5jLiArIGNvbnRyaWJ1dG9ycyAqL1xuXG47KGZ1bmN0aW9uKCkge1xuXG4gIHZhciByaW90ID0geyB2ZXJzaW9uOiAndjIuMC4xMicsIHNldHRpbmdzOiB7fSB9XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbnJpb3Qub2JzZXJ2YWJsZSA9IGZ1bmN0aW9uKGVsKSB7XG5cbiAgZWwgPSBlbCB8fCB7fVxuXG4gIHZhciBjYWxsYmFja3MgPSB7fSxcbiAgICAgIF9pZCA9IDBcblxuICBlbC5vbiA9IGZ1bmN0aW9uKGV2ZW50cywgZm4pIHtcbiAgICBpZiAodHlwZW9mIGZuID09ICdmdW5jdGlvbicpIHtcbiAgICAgIGZuLl9pZCA9IHR5cGVvZiBmbi5faWQgPT0gJ3VuZGVmaW5lZCcgPyBfaWQrKyA6IGZuLl9pZFxuXG4gICAgICBldmVudHMucmVwbGFjZSgvXFxTKy9nLCBmdW5jdGlvbihuYW1lLCBwb3MpIHtcbiAgICAgICAgKGNhbGxiYWNrc1tuYW1lXSA9IGNhbGxiYWNrc1tuYW1lXSB8fCBbXSkucHVzaChmbilcbiAgICAgICAgZm4udHlwZWQgPSBwb3MgPiAwXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIGVsLm9mZiA9IGZ1bmN0aW9uKGV2ZW50cywgZm4pIHtcbiAgICBpZiAoZXZlbnRzID09ICcqJykgY2FsbGJhY2tzID0ge31cbiAgICBlbHNlIHtcbiAgICAgIGV2ZW50cy5yZXBsYWNlKC9cXFMrL2csIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgdmFyIGFyciA9IGNhbGxiYWNrc1tuYW1lXVxuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBjYjsgKGNiID0gYXJyICYmIGFycltpXSk7ICsraSkge1xuICAgICAgICAgICAgaWYgKGNiLl9pZCA9PSBmbi5faWQpIHsgYXJyLnNwbGljZShpLCAxKTsgaS0tIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FsbGJhY2tzW25hbWVdID0gW11cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIGVsXG4gIH1cblxuICAvLyBvbmx5IHNpbmdsZSBldmVudCBzdXBwb3J0ZWRcbiAgZWwub25lID0gZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICBpZiAoZm4pIGZuLm9uZSA9IDFcbiAgICByZXR1cm4gZWwub24obmFtZSwgZm4pXG4gIH1cblxuICBlbC50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICBmbnMgPSBjYWxsYmFja3NbbmFtZV0gfHwgW11cblxuICAgIGZvciAodmFyIGkgPSAwLCBmbjsgKGZuID0gZm5zW2ldKTsgKytpKSB7XG4gICAgICBpZiAoIWZuLmJ1c3kpIHtcbiAgICAgICAgZm4uYnVzeSA9IDFcbiAgICAgICAgZm4uYXBwbHkoZWwsIGZuLnR5cGVkID8gW25hbWVdLmNvbmNhdChhcmdzKSA6IGFyZ3MpXG4gICAgICAgIGlmIChmbi5vbmUpIHsgZm5zLnNwbGljZShpLCAxKTsgaS0tIH1cbiAgICAgICAgIGVsc2UgaWYgKGZuc1tpXSAhPT0gZm4pIHsgaS0tIH0gLy8gTWFrZXMgc2VsZi1yZW1vdmFsIHBvc3NpYmxlIGR1cmluZyBpdGVyYXRpb25cbiAgICAgICAgZm4uYnVzeSA9IDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIHJldHVybiBlbFxuXG59XG47KGZ1bmN0aW9uKHJpb3QsIGV2dCkge1xuXG4gIC8vIGJyb3dzZXJzIG9ubHlcbiAgaWYgKCF0aGlzLnRvcCkgcmV0dXJuXG5cbiAgdmFyIGxvYyA9IGxvY2F0aW9uLFxuICAgICAgZm5zID0gcmlvdC5vYnNlcnZhYmxlKCksXG4gICAgICB3aW4gPSB3aW5kb3csXG4gICAgICBjdXJyZW50XG5cbiAgZnVuY3Rpb24gaGFzaCgpIHtcbiAgICByZXR1cm4gbG9jLmhhc2guc2xpY2UoMSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlcihwYXRoKSB7XG4gICAgcmV0dXJuIHBhdGguc3BsaXQoJy8nKVxuICB9XG5cbiAgZnVuY3Rpb24gZW1pdChwYXRoKSB7XG4gICAgaWYgKHBhdGgudHlwZSkgcGF0aCA9IGhhc2goKVxuXG4gICAgaWYgKHBhdGggIT0gY3VycmVudCkge1xuICAgICAgZm5zLnRyaWdnZXIuYXBwbHkobnVsbCwgWydIJ10uY29uY2F0KHBhcnNlcihwYXRoKSkpXG4gICAgICBjdXJyZW50ID0gcGF0aFxuICAgIH1cbiAgfVxuXG4gIHZhciByID0gcmlvdC5yb3V0ZSA9IGZ1bmN0aW9uKGFyZykge1xuICAgIC8vIHN0cmluZ1xuICAgIGlmIChhcmdbMF0pIHtcbiAgICAgIGxvYy5oYXNoID0gYXJnXG4gICAgICBlbWl0KGFyZylcblxuICAgIC8vIGZ1bmN0aW9uXG4gICAgfSBlbHNlIHtcbiAgICAgIGZucy5vbignSCcsIGFyZylcbiAgICB9XG4gIH1cblxuICByLmV4ZWMgPSBmdW5jdGlvbihmbikge1xuICAgIGZuLmFwcGx5KG51bGwsIHBhcnNlcihoYXNoKCkpKVxuICB9XG5cbiAgci5wYXJzZXIgPSBmdW5jdGlvbihmbikge1xuICAgIHBhcnNlciA9IGZuXG4gIH1cblxuICB3aW4uYWRkRXZlbnRMaXN0ZW5lciA/IHdpbi5hZGRFdmVudExpc3RlbmVyKGV2dCwgZW1pdCwgZmFsc2UpIDogd2luLmF0dGFjaEV2ZW50KCdvbicgKyBldnQsIGVtaXQpXG5cbn0pKHJpb3QsICdoYXNoY2hhbmdlJylcbi8qXG5cbi8vLy8gSG93IGl0IHdvcmtzP1xuXG5cblRocmVlIHdheXM6XG5cbjEuIEV4cHJlc3Npb25zOiB0bXBsKCd7IHZhbHVlIH0nLCBkYXRhKS5cbiAgIFJldHVybnMgdGhlIHJlc3VsdCBvZiBldmFsdWF0ZWQgZXhwcmVzc2lvbiBhcyBhIHJhdyBvYmplY3QuXG5cbjIuIFRlbXBsYXRlczogdG1wbCgnSGkgeyBuYW1lIH0geyBzdXJuYW1lIH0nLCBkYXRhKS5cbiAgIFJldHVybnMgYSBzdHJpbmcgd2l0aCBldmFsdWF0ZWQgZXhwcmVzc2lvbnMuXG5cbjMuIEZpbHRlcnM6IHRtcGwoJ3sgc2hvdzogIWRvbmUsIGhpZ2hsaWdodDogYWN0aXZlIH0nLCBkYXRhKS5cbiAgIFJldHVybnMgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiB0cnVlaXNoIGtleXMgKG1haW5seVxuICAgdXNlZCBmb3Igc2V0dGluZyBodG1sIGNsYXNzZXMpLCBlLmcuIFwic2hvdyBoaWdobGlnaHRcIi5cblxuXG4vLyBUZW1wbGF0ZSBleGFtcGxlc1xuXG50bXBsKCd7IHRpdGxlIHx8IFwiVW50aXRsZWRcIiB9JywgZGF0YSlcbnRtcGwoJ1Jlc3VsdHMgYXJlIHsgcmVzdWx0cyA/IFwicmVhZHlcIiA6IFwibG9hZGluZ1wiIH0nLCBkYXRhKVxudG1wbCgnVG9kYXkgaXMgeyBuZXcgRGF0ZSgpIH0nLCBkYXRhKVxudG1wbCgneyBtZXNzYWdlLmxlbmd0aCA+IDE0MCAmJiBcIk1lc3NhZ2UgaXMgdG9vIGxvbmdcIiB9JywgZGF0YSlcbnRtcGwoJ1RoaXMgaXRlbSBnb3QgeyBNYXRoLnJvdW5kKHJhdGluZykgfSBzdGFycycsIGRhdGEpXG50bXBsKCc8aDE+eyB0aXRsZSB9PC9oMT57IGJvZHkgfScsIGRhdGEpXG5cblxuLy8gRmFsc3kgZXhwcmVzc2lvbnMgaW4gdGVtcGxhdGVzXG5cbkluIHRlbXBsYXRlcyAoYXMgb3Bwb3NlZCB0byBzaW5nbGUgZXhwcmVzc2lvbnMpIGFsbCBmYWxzeSB2YWx1ZXNcbmV4Y2VwdCB6ZXJvICh1bmRlZmluZWQvbnVsbC9mYWxzZSkgd2lsbCBkZWZhdWx0IHRvIGVtcHR5IHN0cmluZzpcblxudG1wbCgneyB1bmRlZmluZWQgfSAtIHsgZmFsc2UgfSAtIHsgbnVsbCB9IC0geyAwIH0nLCB7fSlcbi8vIHdpbGwgcmV0dXJuOiBcIiAtIC0gLSAwXCJcblxuKi9cblxuXG52YXIgYnJhY2tldHMgPSAoZnVuY3Rpb24ob3JpZywgcywgYikge1xuICByZXR1cm4gZnVuY3Rpb24oeCkge1xuXG4gICAgLy8gbWFrZSBzdXJlIHdlIHVzZSB0aGUgY3VycmVudCBzZXR0aW5nXG4gICAgcyA9IHJpb3Quc2V0dGluZ3MuYnJhY2tldHMgfHwgb3JpZ1xuICAgIGlmIChiICE9IHMpIGIgPSBzLnNwbGl0KCcgJylcblxuICAgIC8vIGlmIHJlZ2V4cCBnaXZlbiwgcmV3cml0ZSBpdCB3aXRoIGN1cnJlbnQgYnJhY2tldHMgKG9ubHkgaWYgZGlmZmVyIGZyb20gZGVmYXVsdClcbiAgICAvLyBlbHNlLCBnZXQgYnJhY2tldHNcbiAgICByZXR1cm4geCAmJiB4LnRlc3RcbiAgICAgID8gcyA9PSBvcmlnXG4gICAgICAgID8geCA6IFJlZ0V4cCh4LnNvdXJjZVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHsvZywgYlswXS5yZXBsYWNlKC8oPz0uKS9nLCAnXFxcXCcpKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXH0vZywgYlsxXS5yZXBsYWNlKC8oPz0uKS9nLCAnXFxcXCcpKSxcbiAgICAgICAgICAgICAgICAgICAgeC5nbG9iYWwgPyAnZycgOiAnJylcbiAgICAgIDogYlt4XVxuXG4gIH1cbn0pKCd7IH0nKVxuXG5cbnZhciB0bXBsID0gKGZ1bmN0aW9uKCkge1xuXG4gIHZhciBjYWNoZSA9IHt9LFxuICAgICAgcmVfdmFycyA9IC8oWydcIlxcL10pLio/W15cXFxcXVxcMXxcXC5cXHcqfFxcdyo6fFxcYig/Oig/Om5ld3x0eXBlb2Z8aW58aW5zdGFuY2VvZikgfCg/OnRoaXN8dHJ1ZXxmYWxzZXxudWxsfHVuZGVmaW5lZClcXGJ8ZnVuY3Rpb24gKlxcKCl8KFthLXpfJF1cXHcqKS9naVxuICAgICAgICAgICAgICAvLyBbIDEgICAgICAgICAgICAgICBdWyAyICBdWyAzIF1bIDQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVsgNSAgICAgICBdXG4gICAgICAgICAgICAgIC8vIGZpbmQgdmFyaWFibGUgbmFtZXM6XG4gICAgICAgICAgICAgIC8vIDEuIHNraXAgcXVvdGVkIHN0cmluZ3MgYW5kIHJlZ2V4cHM6IFwiYSBiXCIsICdhIGInLCAnYSBcXCdiXFwnJywgL2EgYi9cbiAgICAgICAgICAgICAgLy8gMi4gc2tpcCBvYmplY3QgcHJvcGVydGllczogLm5hbWVcbiAgICAgICAgICAgICAgLy8gMy4gc2tpcCBvYmplY3QgbGl0ZXJhbHM6IG5hbWU6XG4gICAgICAgICAgICAgIC8vIDQuIHNraXAgamF2YXNjcmlwdCBrZXl3b3Jkc1xuICAgICAgICAgICAgICAvLyA1LiBtYXRjaCB2YXIgbmFtZVxuXG4gIC8vIGJ1aWxkIGEgdGVtcGxhdGUgKG9yIGdldCBpdCBmcm9tIGNhY2hlKSwgcmVuZGVyIHdpdGggZGF0YVxuICByZXR1cm4gZnVuY3Rpb24oc3RyLCBkYXRhKSB7XG4gICAgcmV0dXJuIHN0ciAmJiAoY2FjaGVbc3RyXSA9IGNhY2hlW3N0cl0gfHwgdG1wbChzdHIpKShkYXRhKVxuICB9XG5cblxuICAvLyBjcmVhdGUgYSB0ZW1wbGF0ZSBpbnN0YW5jZVxuXG4gIGZ1bmN0aW9uIHRtcGwocywgcCkge1xuXG4gICAgLy8gZGVmYXVsdCB0ZW1wbGF0ZSBzdHJpbmcgdG8ge31cbiAgICBzID0gKHMgfHwgKGJyYWNrZXRzKDApICsgYnJhY2tldHMoMSkpKVxuXG4gICAgICAvLyB0ZW1wb3JhcmlseSBjb252ZXJ0IFxceyBhbmQgXFx9IHRvIGEgbm9uLWNoYXJhY3RlclxuICAgICAgLnJlcGxhY2UoYnJhY2tldHMoL1xcXFx7L2cpLCAnXFx1RkZGMCcpXG4gICAgICAucmVwbGFjZShicmFja2V0cygvXFxcXH0vZyksICdcXHVGRkYxJylcblxuICAgIC8vIHNwbGl0IHN0cmluZyB0byBleHByZXNzaW9uIGFuZCBub24tZXhwcmVzaW9uIHBhcnRzXG4gICAgcCA9IHNwbGl0KHMsIGJyYWNrZXRzKC97W1xcc1xcU10qP30vZykpXG5cbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdkJywgJ3JldHVybiAnICsgKFxuXG4gICAgICAvLyBpcyBpdCBhIHNpbmdsZSBleHByZXNzaW9uIG9yIGEgdGVtcGxhdGU/IGkuZS4ge3h9IG9yIDxiPnt4fTwvYj5cbiAgICAgICFwWzBdICYmICFwWzJdICYmICFwWzNdXG5cbiAgICAgICAgLy8gaWYgZXhwcmVzc2lvbiwgZXZhbHVhdGUgaXRcbiAgICAgICAgPyBleHByKHBbMV0pXG5cbiAgICAgICAgLy8gaWYgdGVtcGxhdGUsIGV2YWx1YXRlIGFsbCBleHByZXNzaW9ucyBpbiBpdFxuICAgICAgICA6ICdbJyArIHAubWFwKGZ1bmN0aW9uKHMsIGkpIHtcblxuICAgICAgICAgICAgLy8gaXMgaXQgYW4gZXhwcmVzc2lvbiBvciBhIHN0cmluZyAoZXZlcnkgc2Vjb25kIHBhcnQgaXMgYW4gZXhwcmVzc2lvbilcbiAgICAgICAgICByZXR1cm4gaSAlIDJcblxuICAgICAgICAgICAgICAvLyBldmFsdWF0ZSB0aGUgZXhwcmVzc2lvbnNcbiAgICAgICAgICAgICAgPyBleHByKHMsIHRydWUpXG5cbiAgICAgICAgICAgICAgLy8gcHJvY2VzcyBzdHJpbmcgcGFydHMgb2YgdGhlIHRlbXBsYXRlOlxuICAgICAgICAgICAgICA6ICdcIicgKyBzXG5cbiAgICAgICAgICAgICAgICAgIC8vIHByZXNlcnZlIG5ldyBsaW5lc1xuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKVxuXG4gICAgICAgICAgICAgICAgICAvLyBlc2NhcGUgcXVvdGVzXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpXG5cbiAgICAgICAgICAgICAgICArICdcIidcblxuICAgICAgICB9KS5qb2luKCcsJykgKyAnXS5qb2luKFwiXCIpJ1xuICAgICAgKVxuXG4gICAgICAvLyBicmluZyBlc2NhcGVkIHsgYW5kIH0gYmFja1xuICAgICAgLnJlcGxhY2UoL1xcdUZGRjAvZywgYnJhY2tldHMoMCkpXG4gICAgICAucmVwbGFjZSgvXFx1RkZGMS9nLCBicmFja2V0cygxKSlcblxuICAgICsgJzsnKVxuXG4gIH1cblxuXG4gIC8vIHBhcnNlIHsgLi4uIH0gZXhwcmVzc2lvblxuXG4gIGZ1bmN0aW9uIGV4cHIocywgbikge1xuICAgIHMgPSBzXG5cbiAgICAgIC8vIGNvbnZlcnQgbmV3IGxpbmVzIHRvIHNwYWNlc1xuICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnICcpXG5cbiAgICAgIC8vIHRyaW0gd2hpdGVzcGFjZSwgY3VybHkgYnJhY2tldHMsIHN0cmlwIGNvbW1lbnRzXG4gICAgICAucmVwbGFjZShicmFja2V0cygvXlt7IF0rfFsgfV0rJHxcXC9cXCouKz9cXCpcXC8vZyksICcnKVxuXG4gICAgLy8gaXMgaXQgYW4gb2JqZWN0IGxpdGVyYWw/IGkuZS4geyBrZXkgOiB2YWx1ZSB9XG4gICAgcmV0dXJuIC9eXFxzKltcXHctIFwiJ10rICo6Ly50ZXN0KHMpXG5cbiAgICAgIC8vIGlmIG9iamVjdCBsaXRlcmFsLCByZXR1cm4gdHJ1ZWlzaCBrZXlzXG4gICAgICAvLyBlLmcuOiB7IHNob3c6IGlzT3BlbigpLCBkb25lOiBpdGVtLmRvbmUgfSAtPiBcInNob3cgZG9uZVwiXG4gICAgICA/ICdbJyArIHMucmVwbGFjZSgvXFxXKihbXFx3LSBdKylcXFcqOihbXixdKykvZywgZnVuY3Rpb24oXywgaywgdikge1xuXG4gICAgICAgIHJldHVybiB2LnJlcGxhY2UoL1teJnw9IT48XSsvZywgd3JhcCkgKyAnP1wiJyArIGsudHJpbSgpICsgJ1wiOlwiXCIsJ1xuXG4gICAgICB9KSArICddLmpvaW4oXCIgXCIpLnRyaW0oKSdcblxuICAgICAgLy8gaWYganMgZXhwcmVzc2lvbiwgZXZhbHVhdGUgYXMgamF2YXNjcmlwdFxuICAgICAgOiB3cmFwKHMsIG4pXG5cbiAgfVxuXG5cbiAgLy8gZXhlY3V0ZSBqcyB3L28gYnJlYWtpbmcgb24gZXJyb3JzIG9yIHVuZGVmaW5lZCB2YXJzXG5cbiAgZnVuY3Rpb24gd3JhcChzLCBub251bGwpIHtcbiAgICBzID0gcy50cmltKClcbiAgICByZXR1cm4gIXMgPyAnJyA6ICcoZnVuY3Rpb24odil7dHJ5e3Y9J1xuXG4gICAgICAgIC8vIHByZWZpeCB2YXJzIChuYW1lID0+IGRhdGEubmFtZSlcbiAgICAgICAgKyAocy5yZXBsYWNlKHJlX3ZhcnMsIGZ1bmN0aW9uKHMsIF8sIHYpIHsgcmV0dXJuIHYgPyAnKGQuJyt2Kyc9PT11bmRlZmluZWQ/d2luZG93LicrdisnOmQuJyt2KycpJyA6IHMgfSlcblxuICAgICAgICAgIC8vIGJyZWFrIHRoZSBleHByZXNzaW9uIGlmIGl0cyBlbXB0eSAocmVzdWx0aW5nIGluIHVuZGVmaW5lZCB2YWx1ZSlcbiAgICAgICAgICB8fCAneCcpXG5cbiAgICAgICsgJ31maW5hbGx5e3JldHVybiAnXG5cbiAgICAgICAgLy8gZGVmYXVsdCB0byBlbXB0eSBzdHJpbmcgZm9yIGZhbHN5IHZhbHVlcyBleGNlcHQgemVyb1xuICAgICAgICArIChub251bGwgPT09IHRydWUgPyAnIXYmJnYhPT0wP1wiXCI6dicgOiAndicpXG5cbiAgICAgICsgJ319KS5jYWxsKGQpJ1xuICB9XG5cblxuICAvLyBhIHN1YnN0aXR1dGUgZm9yIHN0ci5zcGxpdChyZSkgZm9yIElFOFxuICAvLyBiZWNhdXNlIElFOCBkb2Vzbid0IHN1cHBvcnQgY2FwdHVyaW5nIHBhcmVudGhlc2lzIGluIGl0XG5cbiAgZnVuY3Rpb24gc3BsaXQocywgcmUpIHtcbiAgICB2YXIgcGFydHMgPSBbXSwgbGFzdCA9IDBcbiAgICBzLnJlcGxhY2UocmUsIGZ1bmN0aW9uKG0sIGkpIHtcbiAgICAgIC8vIHB1c2ggbWF0Y2hlZCBleHByZXNzaW9uIGFuZCBwYXJ0IGJlZm9yZSBpdFxuICAgICAgcGFydHMucHVzaChzLnNsaWNlKGxhc3QsIGkpLCBtKVxuICAgICAgbGFzdCA9IGkgKyBtLmxlbmd0aFxuICAgIH0pXG4gICAgLy8gcHVzaCB0aGUgcmVtYWluaW5nIHBhcnRcbiAgICByZXR1cm4gcGFydHMuY29uY2F0KHMuc2xpY2UobGFzdCkpXG4gIH1cblxufSkoKVxuXG4vLyB7IGtleSwgaSBpbiBpdGVtc30gLT4geyBrZXksIGksIGl0ZW1zIH1cbmZ1bmN0aW9uIGxvb3BLZXlzKGV4cHIpIHtcbiAgdmFyIHJldCA9IHsgdmFsOiBleHByIH0sXG4gICAgICBlbHMgPSBleHByLnNwbGl0KC9cXHMraW5cXHMrLylcblxuICBpZiAoZWxzWzFdKSB7XG4gICAgcmV0LnZhbCA9IGJyYWNrZXRzKDApICsgZWxzWzFdXG4gICAgZWxzID0gZWxzWzBdLnNsaWNlKGJyYWNrZXRzKDApLmxlbmd0aCkudHJpbSgpLnNwbGl0KC8sXFxzKi8pXG4gICAgcmV0LmtleSA9IGVsc1swXVxuICAgIHJldC5wb3MgPSBlbHNbMV1cbiAgfVxuXG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbWtpdGVtKGV4cHIsIGtleSwgdmFsKSB7XG4gIHZhciBpdGVtID0ge31cbiAgaXRlbVtleHByLmtleV0gPSBrZXlcbiAgaWYgKGV4cHIucG9zKSBpdGVtW2V4cHIucG9zXSA9IHZhbFxuICByZXR1cm4gaXRlbVxufVxuXG5cbi8qIEJld2FyZTogaGVhdnkgc3R1ZmYgKi9cbmZ1bmN0aW9uIF9lYWNoKGRvbSwgcGFyZW50LCBleHByKSB7XG5cbiAgcmVtQXR0cihkb20sICdlYWNoJylcblxuICB2YXIgdGVtcGxhdGUgPSBkb20ub3V0ZXJIVE1MLFxuICAgICAgcHJldiA9IGRvbS5wcmV2aW91c1NpYmxpbmcsXG4gICAgICByb290ID0gZG9tLnBhcmVudE5vZGUsXG4gICAgICByZW5kZXJlZCA9IFtdLFxuICAgICAgdGFncyA9IFtdLFxuICAgICAgY2hlY2tzdW1cblxuICBleHByID0gbG9vcEtleXMoZXhwcilcblxuICBmdW5jdGlvbiBhZGQocG9zLCBpdGVtLCB0YWcpIHtcbiAgICByZW5kZXJlZC5zcGxpY2UocG9zLCAwLCBpdGVtKVxuICAgIHRhZ3Muc3BsaWNlKHBvcywgMCwgdGFnKVxuICB9XG5cbiAgLy8gY2xlYW4gdGVtcGxhdGUgY29kZVxuICBwYXJlbnQub25lKCd1cGRhdGUnLCBmdW5jdGlvbigpIHtcbiAgICByb290LnJlbW92ZUNoaWxkKGRvbSlcblxuICB9KS5vbmUoJ3ByZW1vdW50JywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKHJvb3Quc3R1Yikgcm9vdCA9IHBhcmVudC5yb290XG5cbiAgfSkub24oJ3VwZGF0ZScsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGl0ZW1zID0gdG1wbChleHByLnZhbCwgcGFyZW50KVxuICAgIGlmICghaXRlbXMpIHJldHVyblxuXG4gICAgLy8gb2JqZWN0IGxvb3AuIGFueSBjaGFuZ2VzIGNhdXNlIGZ1bGwgcmVkcmF3XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGl0ZW1zKSkge1xuICAgICAgdmFyIHRlc3RzdW0gPSBKU09OLnN0cmluZ2lmeShpdGVtcylcbiAgICAgIGlmICh0ZXN0c3VtID09IGNoZWNrc3VtKSByZXR1cm5cbiAgICAgIGNoZWNrc3VtID0gdGVzdHN1bVxuXG4gICAgICAvLyBjbGVhciBvbGQgaXRlbXNcbiAgICAgIGVhY2godGFncywgZnVuY3Rpb24odGFnKSB7IHRhZy51bm1vdW50KCkgfSlcbiAgICAgIHJlbmRlcmVkID0gW11cbiAgICAgIHRhZ3MgPSBbXVxuXG4gICAgICBpdGVtcyA9IE9iamVjdC5rZXlzKGl0ZW1zKS5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHJldHVybiBta2l0ZW0oZXhwciwga2V5LCBpdGVtc1trZXldKVxuICAgICAgfSlcblxuICAgIH1cblxuICAgIC8vIHVubW91bnQgcmVkdW5kYW50XG4gICAgZWFjaChhcnJEaWZmKHJlbmRlcmVkLCBpdGVtcyksIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIHZhciBwb3MgPSByZW5kZXJlZC5pbmRleE9mKGl0ZW0pLFxuICAgICAgICAgIHRhZyA9IHRhZ3NbcG9zXVxuXG4gICAgICBpZiAodGFnKSB7XG4gICAgICAgIHRhZy51bm1vdW50KClcbiAgICAgICAgcmVuZGVyZWQuc3BsaWNlKHBvcywgMSlcbiAgICAgICAgdGFncy5zcGxpY2UocG9zLCAxKVxuICAgICAgfVxuXG4gICAgfSlcblxuICAgIC8vIG1vdW50IG5ldyAvIHJlb3JkZXJcbiAgICB2YXIgbm9kZXMgPSByb290LmNoaWxkTm9kZXMsXG4gICAgICAgIHByZXZfaW5kZXggPSBbXS5pbmRleE9mLmNhbGwobm9kZXMsIHByZXYpXG5cbiAgICBlYWNoKGl0ZW1zLCBmdW5jdGlvbihpdGVtLCBpKSB7XG5cbiAgICAgIC8vIHN0YXJ0IGluZGV4IHNlYXJjaCBmcm9tIHBvc2l0aW9uIGJhc2VkIG9uIHRoZSBjdXJyZW50IGlcbiAgICAgIHZhciBwb3MgPSBpdGVtcy5pbmRleE9mKGl0ZW0sIGkpLFxuICAgICAgICAgIG9sZFBvcyA9IHJlbmRlcmVkLmluZGV4T2YoaXRlbSwgaSlcblxuICAgICAgLy8gaWYgbm90IGZvdW5kLCBzZWFyY2ggYmFja3dhcmRzIGZyb20gY3VycmVudCBpIHBvc2l0aW9uXG4gICAgICBwb3MgPCAwICYmIChwb3MgPSBpdGVtcy5sYXN0SW5kZXhPZihpdGVtLCBpKSlcbiAgICAgIG9sZFBvcyA8IDAgJiYgKG9sZFBvcyA9IHJlbmRlcmVkLmxhc3RJbmRleE9mKGl0ZW0sIGkpKVxuXG4gICAgICAvLyBtb3VudCBuZXdcbiAgICAgIGlmIChvbGRQb3MgPCAwKSB7XG4gICAgICAgIGlmICghY2hlY2tzdW0gJiYgZXhwci5rZXkpIGl0ZW0gPSBta2l0ZW0oZXhwciwgaXRlbSwgcG9zKVxuXG4gICAgICAgIHZhciB0YWcgPSBuZXcgVGFnKHsgdG1wbDogdGVtcGxhdGUgfSwge1xuICAgICAgICAgIGJlZm9yZTogbm9kZXNbcHJldl9pbmRleCArIDEgKyBwb3NdLFxuICAgICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICAgIHJvb3Q6IHJvb3QsXG4gICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICB9KVxuXG4gICAgICAgIHRhZy5tb3VudCgpXG5cbiAgICAgICAgcmV0dXJuIGFkZChwb3MsIGl0ZW0sIHRhZylcbiAgICAgIH1cblxuICAgICAgLy8gY2hhbmdlIHBvcyB2YWx1ZVxuICAgICAgaWYgKGV4cHIucG9zICYmIHRhZ3Nbb2xkUG9zXVtleHByLnBvc10gIT0gcG9zKSB7XG4gICAgICAgIHRhZ3Nbb2xkUG9zXS5vbmUoJ3VwZGF0ZScsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBpdGVtW2V4cHIucG9zXSA9IHBvc1xuICAgICAgICB9KVxuICAgICAgICB0YWdzW29sZFBvc10udXBkYXRlKClcbiAgICAgIH1cblxuICAgICAgLy8gcmVvcmRlclxuICAgICAgaWYgKHBvcyAhPSBvbGRQb3MpIHtcbiAgICAgICAgcm9vdC5pbnNlcnRCZWZvcmUobm9kZXNbcHJldl9pbmRleCArIG9sZFBvcyArIDFdLCBub2Rlc1twcmV2X2luZGV4ICsgcG9zICsgMV0pXG4gICAgICAgIHJldHVybiBhZGQocG9zLCByZW5kZXJlZC5zcGxpY2Uob2xkUG9zLCAxKVswXSwgdGFncy5zcGxpY2Uob2xkUG9zLCAxKVswXSlcbiAgICAgIH1cblxuICAgIH0pXG5cbiAgICByZW5kZXJlZCA9IGl0ZW1zLnNsaWNlKClcblxuICB9KVxuXG59XG5cblxuZnVuY3Rpb24gcGFyc2VOYW1lZEVsZW1lbnRzKHJvb3QsIHBhcmVudCwgY2hpbGRfdGFncykge1xuXG4gIHdhbGsocm9vdCwgZnVuY3Rpb24oZG9tKSB7XG4gICAgaWYgKGRvbS5ub2RlVHlwZSA9PSAxKSB7XG5cbiAgICAgIC8vIGN1c3RvbSBjaGlsZCB0YWdcbiAgICAgIHZhciBjaGlsZCA9IGdldFRhZyhkb20pXG5cbiAgICAgIGlmIChjaGlsZCAmJiAhZG9tLmdldEF0dHJpYnV0ZSgnZWFjaCcpKSB7XG4gICAgICAgIHZhciB0YWcgPSBuZXcgVGFnKGNoaWxkLCB7IHJvb3Q6IGRvbSwgcGFyZW50OiBwYXJlbnQgfSlcbiAgICAgICAgcGFyZW50LnRhZ3NbZG9tLmdldEF0dHJpYnV0ZSgnbmFtZScpIHx8IGNoaWxkLm5hbWVdID0gdGFnXG4gICAgICAgIGNoaWxkX3RhZ3MucHVzaCh0YWcpXG4gICAgICB9XG5cbiAgICAgIGVhY2goZG9tLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGF0dHIpIHtcbiAgICAgICAgaWYgKC9eKG5hbWV8aWQpJC8udGVzdChhdHRyLm5hbWUpKSBwYXJlbnRbYXR0ci52YWx1ZV0gPSBkb21cbiAgICAgIH0pXG4gICAgfVxuXG4gIH0pXG5cbn1cblxuZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9ucyhyb290LCB0YWcsIGV4cHJlc3Npb25zKSB7XG5cbiAgZnVuY3Rpb24gYWRkRXhwcihkb20sIHZhbCwgZXh0cmEpIHtcbiAgICBpZiAodmFsLmluZGV4T2YoYnJhY2tldHMoMCkpID49IDApIHtcbiAgICAgIHZhciBleHByID0geyBkb206IGRvbSwgZXhwcjogdmFsIH1cbiAgICAgIGV4cHJlc3Npb25zLnB1c2goZXh0ZW5kKGV4cHIsIGV4dHJhKSlcbiAgICB9XG4gIH1cblxuICB3YWxrKHJvb3QsIGZ1bmN0aW9uKGRvbSkge1xuICAgIHZhciB0eXBlID0gZG9tLm5vZGVUeXBlXG5cbiAgICAvLyB0ZXh0IG5vZGVcbiAgICBpZiAodHlwZSA9PSAzICYmIGRvbS5wYXJlbnROb2RlLnRhZ05hbWUgIT0gJ1NUWUxFJykgYWRkRXhwcihkb20sIGRvbS5ub2RlVmFsdWUpXG4gICAgaWYgKHR5cGUgIT0gMSkgcmV0dXJuXG5cbiAgICAvKiBlbGVtZW50ICovXG5cbiAgICAvLyBsb29wXG4gICAgdmFyIGF0dHIgPSBkb20uZ2V0QXR0cmlidXRlKCdlYWNoJylcbiAgICBpZiAoYXR0cikgeyBfZWFjaChkb20sIHRhZywgYXR0cik7IHJldHVybiBmYWxzZSB9XG5cbiAgICAvLyBhdHRyaWJ1dGUgZXhwcmVzc2lvbnNcbiAgICBlYWNoKGRvbS5hdHRyaWJ1dGVzLCBmdW5jdGlvbihhdHRyKSB7XG4gICAgICB2YXIgbmFtZSA9IGF0dHIubmFtZSxcbiAgICAgICAgICBib29sID0gbmFtZS5zcGxpdCgnX18nKVsxXVxuXG4gICAgICBhZGRFeHByKGRvbSwgYXR0ci52YWx1ZSwgeyBhdHRyOiBib29sIHx8IG5hbWUsIGJvb2w6IGJvb2wgfSlcbiAgICAgIGlmIChib29sKSB7IHJlbUF0dHIoZG9tLCBuYW1lKTsgcmV0dXJuIGZhbHNlIH1cblxuICAgIH0pXG5cbiAgICAvLyBza2lwIGN1c3RvbSB0YWdzXG4gICAgaWYgKGdldFRhZyhkb20pKSByZXR1cm4gZmFsc2VcblxuICB9KVxuXG59XG5cbmZ1bmN0aW9uIFRhZyhpbXBsLCBjb25mKSB7XG5cbiAgdmFyIHNlbGYgPSByaW90Lm9ic2VydmFibGUodGhpcyksXG4gICAgICBvcHRzID0gaW5oZXJpdChjb25mLm9wdHMpIHx8IHt9LFxuICAgICAgZG9tID0gbWtkb20oaW1wbC50bXBsKSxcbiAgICAgIHBhcmVudCA9IGNvbmYucGFyZW50LFxuICAgICAgZXhwcmVzc2lvbnMgPSBbXSxcbiAgICAgIGNoaWxkX3RhZ3MgPSBbXSxcbiAgICAgIHJvb3QgPSBjb25mLnJvb3QsXG4gICAgICBpdGVtID0gY29uZi5pdGVtLFxuICAgICAgZm4gPSBpbXBsLmZuLFxuICAgICAgYXR0ciA9IHt9LFxuICAgICAgbG9vcF9kb21cblxuICBpZiAoZm4gJiYgcm9vdC5yaW90KSByZXR1cm5cbiAgcm9vdC5yaW90ID0gdHJ1ZVxuXG4gIGV4dGVuZCh0aGlzLCB7IHBhcmVudDogcGFyZW50LCByb290OiByb290LCBvcHRzOiBvcHRzLCB0YWdzOiB7fSB9LCBpdGVtKVxuXG4gIC8vIGdyYWIgYXR0cmlidXRlc1xuICBlYWNoKHJvb3QuYXR0cmlidXRlcywgZnVuY3Rpb24oZWwpIHtcbiAgICBhdHRyW2VsLm5hbWVdID0gZWwudmFsdWVcbiAgfSlcblxuICAvLyBvcHRpb25zXG4gIGZ1bmN0aW9uIHVwZGF0ZU9wdHMocmVtX2F0dHIpIHtcbiAgICBlYWNoKE9iamVjdC5rZXlzKGF0dHIpLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBvcHRzW25hbWVdID0gdG1wbChhdHRyW25hbWVdLCBwYXJlbnQgfHwgc2VsZilcbiAgICB9KVxuICB9XG5cbiAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbihkYXRhLCBpbml0KSB7XG4gICAgZXh0ZW5kKHNlbGYsIGRhdGEsIGl0ZW0pXG4gICAgdXBkYXRlT3B0cygpXG4gICAgc2VsZi50cmlnZ2VyKCd1cGRhdGUnLCBpdGVtKVxuICAgIHVwZGF0ZShleHByZXNzaW9ucywgc2VsZiwgaXRlbSlcbiAgICBzZWxmLnRyaWdnZXIoJ3VwZGF0ZWQnKVxuICB9XG5cbiAgdGhpcy5tb3VudCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdXBkYXRlT3B0cygpXG5cbiAgICAvLyBpbml0aWFsaWF0aW9uXG4gICAgZm4gJiYgZm4uY2FsbChzZWxmLCBvcHRzKVxuXG4gICAgdG9nZ2xlKHRydWUpXG5cbiAgICAvLyBwYXJzZSBsYXlvdXQgYWZ0ZXIgaW5pdC4gZm4gbWF5IGNhbGN1bGF0ZSBhcmdzIGZvciBuZXN0ZWQgY3VzdG9tIHRhZ3NcbiAgICBwYXJzZUV4cHJlc3Npb25zKGRvbSwgc2VsZiwgZXhwcmVzc2lvbnMpXG5cbiAgICBzZWxmLnVwZGF0ZSgpXG5cbiAgICAvLyBpbnRlcm5hbCB1c2Ugb25seSwgZml4ZXMgIzQwM1xuICAgIHNlbGYudHJpZ2dlcigncHJlbW91bnQnKVxuXG4gICAgaWYgKGZuKSB7XG4gICAgICB3aGlsZSAoZG9tLmZpcnN0Q2hpbGQpIHJvb3QuYXBwZW5kQ2hpbGQoZG9tLmZpcnN0Q2hpbGQpXG5cbiAgICB9IGVsc2Uge1xuICAgICAgbG9vcF9kb20gPSBkb20uZmlyc3RDaGlsZFxuICAgICAgcm9vdC5pbnNlcnRCZWZvcmUobG9vcF9kb20sIGNvbmYuYmVmb3JlIHx8IG51bGwpIC8vIG51bGwgbmVlZGVkIGZvciBJRThcbiAgICB9XG5cbiAgICBpZiAocm9vdC5zdHViKSBzZWxmLnJvb3QgPSByb290ID0gcGFyZW50LnJvb3RcbiAgICBzZWxmLnRyaWdnZXIoJ21vdW50JylcblxuICB9XG5cblxuICB0aGlzLnVubW91bnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWwgPSBmbiA/IHJvb3QgOiBsb29wX2RvbSxcbiAgICAgICAgcCA9IGVsLnBhcmVudE5vZGVcblxuICAgIGlmIChwKSB7XG4gICAgICBpZiAocGFyZW50KSBwLnJlbW92ZUNoaWxkKGVsKVxuICAgICAgZWxzZSB3aGlsZSAocm9vdC5maXJzdENoaWxkKSByb290LnJlbW92ZUNoaWxkKHJvb3QuZmlyc3RDaGlsZClcbiAgICAgIHRvZ2dsZSgpXG4gICAgICBzZWxmLnRyaWdnZXIoJ3VubW91bnQnKVxuICAgICAgc2VsZi5vZmYoJyonKVxuICAgICAgZGVsZXRlIHJvb3QucmlvdFxuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlKGlzX21vdW50KSB7XG5cbiAgICAvLyBtb3VudC91bm1vdW50IGNoaWxkcmVuXG4gICAgZWFjaChjaGlsZF90YWdzLCBmdW5jdGlvbihjaGlsZCkgeyBjaGlsZFtpc19tb3VudCA/ICdtb3VudCcgOiAndW5tb3VudCddKCkgfSlcblxuICAgIC8vIGxpc3Rlbi91bmxpc3RlbiBwYXJlbnQgKGV2ZW50cyBmbG93IG9uZSB3YXkgZnJvbSBwYXJlbnQgdG8gY2hpbGRyZW4pXG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgdmFyIGV2dCA9IGlzX21vdW50ID8gJ29uJyA6ICdvZmYnXG4gICAgICBwYXJlbnRbZXZ0XSgndXBkYXRlJywgc2VsZi51cGRhdGUpW2V2dF0oJ3VubW91bnQnLCBzZWxmLnVubW91bnQpXG4gICAgfVxuICB9XG5cbiAgLy8gbmFtZWQgZWxlbWVudHMgYXZhaWxhYmxlIGZvciBmblxuICBwYXJzZU5hbWVkRWxlbWVudHMoZG9tLCB0aGlzLCBjaGlsZF90YWdzKVxuXG5cbn1cblxuZnVuY3Rpb24gc2V0RXZlbnRIYW5kbGVyKG5hbWUsIGhhbmRsZXIsIGRvbSwgdGFnLCBpdGVtKSB7XG5cbiAgZG9tW25hbWVdID0gZnVuY3Rpb24oZSkge1xuXG4gICAgLy8gY3Jvc3MgYnJvd3NlciBldmVudCBmaXhcbiAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnRcbiAgICBlLndoaWNoID0gZS53aGljaCB8fCBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZVxuICAgIGUudGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50XG4gICAgZS5jdXJyZW50VGFyZ2V0ID0gZG9tXG4gICAgZS5pdGVtID0gaXRlbVxuXG4gICAgLy8gcHJldmVudCBkZWZhdWx0IGJlaGF2aW91ciAoYnkgZGVmYXVsdClcbiAgICBpZiAoaGFuZGxlci5jYWxsKHRhZywgZSkgIT09IHRydWUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQgJiYgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBlLnJldHVyblZhbHVlID0gZmFsc2VcbiAgICB9XG5cbiAgICB2YXIgZWwgPSBpdGVtID8gdGFnLnBhcmVudCA6IHRhZ1xuICAgIGVsLnVwZGF0ZSgpXG5cbiAgfVxuXG59XG5cbi8vIHVzZWQgYnkgaWYtIGF0dHJpYnV0ZVxuZnVuY3Rpb24gaW5zZXJ0VG8ocm9vdCwgbm9kZSwgYmVmb3JlKSB7XG4gIGlmIChyb290KSB7XG4gICAgcm9vdC5pbnNlcnRCZWZvcmUoYmVmb3JlLCBub2RlKVxuICAgIHJvb3QucmVtb3ZlQ2hpbGQobm9kZSlcbiAgfVxufVxuXG4vLyBpdGVtID0gY3VycmVudGx5IGxvb3BlZCBpdGVtXG5mdW5jdGlvbiB1cGRhdGUoZXhwcmVzc2lvbnMsIHRhZywgaXRlbSkge1xuXG4gIGVhY2goZXhwcmVzc2lvbnMsIGZ1bmN0aW9uKGV4cHIpIHtcblxuICAgIHZhciBkb20gPSBleHByLmRvbSxcbiAgICAgICAgYXR0cl9uYW1lID0gZXhwci5hdHRyLFxuICAgICAgICB2YWx1ZSA9IHRtcGwoZXhwci5leHByLCB0YWcpLFxuICAgICAgICBwYXJlbnQgPSBleHByLmRvbS5wYXJlbnROb2RlXG5cbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgdmFsdWUgPSAnJ1xuXG4gICAgLy8gbGVhdmUgb3V0IHJpb3QtIHByZWZpeGVzIGZyb20gc3RyaW5ncyBpbnNpZGUgdGV4dGFyZWFcbiAgICBpZiAocGFyZW50ICYmIHBhcmVudC50YWdOYW1lID09ICdURVhUQVJFQScpIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvcmlvdC0vZywgJycpXG5cbiAgICAvLyBubyBjaGFuZ2VcbiAgICBpZiAoZXhwci52YWx1ZSA9PT0gdmFsdWUpIHJldHVyblxuICAgIGV4cHIudmFsdWUgPSB2YWx1ZVxuXG4gICAgLy8gdGV4dCBub2RlXG4gICAgaWYgKCFhdHRyX25hbWUpIHJldHVybiBkb20ubm9kZVZhbHVlID0gdmFsdWVcblxuICAgIC8vIHJlbW92ZSBvcmlnaW5hbCBhdHRyaWJ1dGVcbiAgICByZW1BdHRyKGRvbSwgYXR0cl9uYW1lKVxuXG4gICAgLy8gZXZlbnQgaGFuZGxlclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgc2V0RXZlbnRIYW5kbGVyKGF0dHJfbmFtZSwgdmFsdWUsIGRvbSwgdGFnLCBpdGVtKVxuXG4gICAgLy8gaWYtIGNvbmRpdGlvbmFsXG4gICAgfSBlbHNlIGlmIChhdHRyX25hbWUgPT0gJ2lmJykge1xuICAgICAgdmFyIHN0dWIgPSBleHByLnN0dWJcblxuICAgICAgLy8gYWRkIHRvIERPTVxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHN0dWIgJiYgaW5zZXJ0VG8oc3R1Yi5wYXJlbnROb2RlLCBzdHViLCBkb20pXG5cbiAgICAgIC8vIHJlbW92ZSBmcm9tIERPTVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3R1YiA9IGV4cHIuc3R1YiA9IHN0dWIgfHwgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpXG4gICAgICAgIGluc2VydFRvKGRvbS5wYXJlbnROb2RlLCBkb20sIHN0dWIpXG4gICAgICB9XG5cbiAgICAvLyBzaG93IC8gaGlkZVxuICAgIH0gZWxzZSBpZiAoL14oc2hvd3xoaWRlKSQvLnRlc3QoYXR0cl9uYW1lKSkge1xuICAgICAgaWYgKGF0dHJfbmFtZSA9PSAnaGlkZScpIHZhbHVlID0gIXZhbHVlXG4gICAgICBkb20uc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJycgOiAnbm9uZSdcblxuICAgIC8vIGZpZWxkIHZhbHVlXG4gICAgfSBlbHNlIGlmIChhdHRyX25hbWUgPT0gJ3ZhbHVlJykge1xuICAgICAgZG9tLnZhbHVlID0gdmFsdWVcblxuICAgIC8vIDxpbWcgc3JjPVwieyBleHByIH1cIj5cbiAgICB9IGVsc2UgaWYgKGF0dHJfbmFtZS5zbGljZSgwLCA1KSA9PSAncmlvdC0nKSB7XG4gICAgICBhdHRyX25hbWUgPSBhdHRyX25hbWUuc2xpY2UoNSlcbiAgICAgIHZhbHVlID8gZG9tLnNldEF0dHJpYnV0ZShhdHRyX25hbWUsIHZhbHVlKSA6IHJlbUF0dHIoZG9tLCBhdHRyX25hbWUpXG5cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGV4cHIuYm9vbCkge1xuICAgICAgICBkb21bYXR0cl9uYW1lXSA9IHZhbHVlXG4gICAgICAgIGlmICghdmFsdWUpIHJldHVyblxuICAgICAgICB2YWx1ZSA9IGF0dHJfbmFtZVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9ICdvYmplY3QnKSBkb20uc2V0QXR0cmlidXRlKGF0dHJfbmFtZSwgdmFsdWUpXG5cbiAgICB9XG5cbiAgfSlcblxufVxuZnVuY3Rpb24gZWFjaChlbHMsIGZuKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSAoZWxzIHx8IFtdKS5sZW5ndGgsIGVsOyBpIDwgbGVuOyBpKyspIHtcbiAgICBlbCA9IGVsc1tpXVxuICAgIC8vIHJldHVybiBmYWxzZSAtPiByZW9tdmUgY3VycmVudCBpdGVtIGR1cmluZyBsb29wXG4gICAgaWYgKGVsICE9IG51bGwgJiYgZm4oZWwsIGkpID09PSBmYWxzZSkgaS0tXG4gIH1cbiAgcmV0dXJuIGVsc1xufVxuXG5mdW5jdGlvbiByZW1BdHRyKGRvbSwgbmFtZSkge1xuICBkb20ucmVtb3ZlQXR0cmlidXRlKG5hbWUpXG59XG5cbi8vIG1heCAyIGZyb20gb2JqZWN0cyBhbGxvd2VkXG5mdW5jdGlvbiBleHRlbmQob2JqLCBmcm9tLCBmcm9tMikge1xuICBmcm9tICYmIGVhY2goT2JqZWN0LmtleXMoZnJvbSksIGZ1bmN0aW9uKGtleSkge1xuICAgIG9ialtrZXldID0gZnJvbVtrZXldXG4gIH0pXG4gIHJldHVybiBmcm9tMiA/IGV4dGVuZChvYmosIGZyb20yKSA6IG9ialxufVxuXG5mdW5jdGlvbiBta2RvbSh0ZW1wbGF0ZSkge1xuICB2YXIgdGFnX25hbWUgPSB0ZW1wbGF0ZS50cmltKCkuc2xpY2UoMSwgMykudG9Mb3dlckNhc2UoKSxcbiAgICAgIHJvb3RfdGFnID0gL3RkfHRoLy50ZXN0KHRhZ19uYW1lKSA/ICd0cicgOiB0YWdfbmFtZSA9PSAndHInID8gJ3Rib2R5JyA6ICdkaXYnLFxuICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHJvb3RfdGFnKVxuXG4gIGVsLnN0dWIgPSB0cnVlXG4gIGVsLmlubmVySFRNTCA9IHRlbXBsYXRlXG4gIHJldHVybiBlbFxufVxuXG5mdW5jdGlvbiB3YWxrKGRvbSwgZm4pIHtcbiAgaWYgKGRvbSkge1xuICAgIGlmIChmbihkb20pID09PSBmYWxzZSkgd2Fsayhkb20ubmV4dFNpYmxpbmcsIGZuKVxuICAgIGVsc2Uge1xuICAgICAgZG9tID0gZG9tLmZpcnN0Q2hpbGRcblxuICAgICAgd2hpbGUgKGRvbSkge1xuICAgICAgICB3YWxrKGRvbSwgZm4pXG4gICAgICAgIGRvbSA9IGRvbS5uZXh0U2libGluZ1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcnJEaWZmKGFycjEsIGFycjIpIHtcbiAgcmV0dXJuIGFycjEuZmlsdGVyKGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIGFycjIuaW5kZXhPZihlbCkgPCAwXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGluaGVyaXQocGFyZW50KSB7XG4gIGZ1bmN0aW9uIENoaWxkKCkge31cbiAgQ2hpbGQucHJvdG90eXBlID0gcGFyZW50XG4gIHJldHVybiBuZXcgQ2hpbGQoKVxufVxuXG5cblxuLypcbiBWaXJ0dWFsIGRvbSBpcyBhbiBhcnJheSBvZiBjdXN0b20gdGFncyBvbiB0aGUgZG9jdW1lbnQuXG4gVXBkYXRlcyBhbmQgdW5tb3VudHMgcHJvcGFnYXRlIGRvd253YXJkcyBmcm9tIHBhcmVudCB0byBjaGlsZHJlbi5cbiovXG5cbnZhciB2aXJ0dWFsX2RvbSA9IFtdLFxuICAgIHRhZ19pbXBsID0ge31cblxuXG5mdW5jdGlvbiBnZXRUYWcoZG9tKSB7XG4gIHJldHVybiB0YWdfaW1wbFtkb20udGFnTmFtZS50b0xvd2VyQ2FzZSgpXVxufVxuXG5mdW5jdGlvbiBpbmplY3RTdHlsZShjc3MpIHtcbiAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gIG5vZGUuaW5uZXJIVE1MID0gY3NzXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobm9kZSlcbn1cblxuZnVuY3Rpb24gbW91bnRUbyhyb290LCB0YWdOYW1lLCBvcHRzKSB7XG4gIHZhciB0YWcgPSB0YWdfaW1wbFt0YWdOYW1lXVxuXG4gIGlmICh0YWcgJiYgcm9vdCkgdGFnID0gbmV3IFRhZyh0YWcsIHsgcm9vdDogcm9vdCwgb3B0czogb3B0cyB9KVxuXG4gIGlmICh0YWcgJiYgdGFnLm1vdW50KSB7XG4gICAgdGFnLm1vdW50KClcbiAgICB2aXJ0dWFsX2RvbS5wdXNoKHRhZylcbiAgICByZXR1cm4gdGFnLm9uKCd1bm1vdW50JywgZnVuY3Rpb24oKSB7XG4gICAgICB2aXJ0dWFsX2RvbS5zcGxpY2UodmlydHVhbF9kb20uaW5kZXhPZih0YWcpLCAxKVxuICAgIH0pXG4gIH1cblxufVxuXG5yaW90LnRhZyA9IGZ1bmN0aW9uKG5hbWUsIGh0bWwsIGNzcywgZm4pIHtcbiAgaWYgKHR5cGVvZiBjc3MgPT0gJ2Z1bmN0aW9uJykgZm4gPSBjc3NcbiAgZWxzZSBpZiAoY3NzKSBpbmplY3RTdHlsZShjc3MpXG4gIHRhZ19pbXBsW25hbWVdID0geyBuYW1lOiBuYW1lLCB0bXBsOiBodG1sLCBmbjogZm4gfVxufVxuXG5yaW90Lm1vdW50ID0gZnVuY3Rpb24oc2VsZWN0b3IsIHRhZ05hbWUsIG9wdHMpIHtcbiAgaWYgKHNlbGVjdG9yID09ICcqJykgc2VsZWN0b3IgPSBPYmplY3Qua2V5cyh0YWdfaW1wbCkuam9pbignLCAnKVxuICBpZiAodHlwZW9mIHRhZ05hbWUgPT0gJ29iamVjdCcpIHsgb3B0cyA9IHRhZ05hbWU7IHRhZ05hbWUgPSAwIH1cblxuICB2YXIgdGFncyA9IFtdXG5cbiAgZnVuY3Rpb24gcHVzaChyb290KSB7XG4gICAgdmFyIG5hbWUgPSB0YWdOYW1lIHx8IHJvb3QudGFnTmFtZS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICB0YWcgPSBtb3VudFRvKHJvb3QsIG5hbWUsIG9wdHMpXG5cbiAgICBpZiAodGFnKSB0YWdzLnB1c2godGFnKVxuICB9XG5cbiAgLy8gRE9NIG5vZGVcbiAgaWYgKHNlbGVjdG9yLnRhZ05hbWUpIHtcbiAgICBwdXNoKHNlbGVjdG9yKVxuICAgIHJldHVybiB0YWdzWzBdXG5cbiAgLy8gc2VsZWN0b3JcbiAgfSBlbHNlIHtcbiAgICBlYWNoKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCBwdXNoKVxuICAgIHJldHVybiB0YWdzXG4gIH1cblxufVxuXG4vLyB1cGRhdGUgZXZlcnl0aGluZ1xucmlvdC51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGVhY2godmlydHVhbF9kb20sIGZ1bmN0aW9uKHRhZykge1xuICAgIHRhZy51cGRhdGUoKVxuICB9KVxufVxuXG4vLyBAZGVwcmVjYXRlZFxucmlvdC5tb3VudFRvID0gcmlvdC5tb3VudFxuXG5cbiAgXG4gIC8vIHNoYXJlIG1ldGhvZHMgZm9yIG90aGVyIHJpb3QgcGFydHMsIGUuZy4gY29tcGlsZXJcbiAgcmlvdC51dGlsID0geyBicmFja2V0czogYnJhY2tldHMsIHRtcGw6IHRtcGwgfVxuXG4gIC8vIHN1cHBvcnQgQ29tbW9uSlNcbiAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JylcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJpb3RcblxuICAvLyBzdXBwb3J0IEFNRFxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gcmlvdCB9KVxuXG4gIC8vIHN1cHBvcnQgYnJvd3NlclxuICBlbHNlXG4gICAgdGhpcy5yaW90ID0gcmlvdFxuXG59KSgpO1xuIiwiLypcbiAqIFdoZW4gZmlyc3QgY3JlYXRlZCBhIFBvc3Qgb2JqZWN0IGlzIGp1c3QgYSBob2xkZXIgZm9yIFBvc3QgYXR0cmlidXRlc1xuICogd2l0aCBzb21lIGNvbnZlbmllbmNlIG1ldGhvZHMgZm9yIHVwZGF0aW5nIGF0dHJpYnV0ZXMsIHZhbGlkYXRpbmcsIGV0Yy5cbiAqXG4gKiBFWEFNUExFOlxuICpcbiAqICAgICB2YXIgUG9zdCA9IHJlcXVpcmUoJ2FwcC9wb3N0JylcbiAqXG4gKiAgICAgdmFyIHBvc3QgPSBuZXcgUG9zdCh7IHRpdGxlOiAnU29tZSB0aXRsZScgfSlcbiAqXG4gKiAgICAgaWYgKHBvc3QudmFsaWRhdGlvbigpLmlzVmFsaWQoKSkgeyBQb3N0LnBlcnNpc3QocG9zdCkgfVxuICpcbiAqIEluc3RlYWQgb2YgdXNpbmcgY2FsbGJhY2tzIG9yIHByb21pc2VzLCB0aGUgUG9zdCBmdW5jdGlvbiBpcyBvYnNlcnZhYmxlOlxuICpcbiAqICAgICBQb3N0Lm9uKCdwb3N0czpkaWQ6cGVyc2lzdCcsIGZ1bmN0aW9uKHBvc3QpIHtcbiAqICAgICAgIGNvbnNvbGUubG9nKCdwb3N0ICcgKyBwb3N0ICsgJyB3YXMgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQnKVxuICogICAgIH0pXG4gKlxuICovXG5cbnZhciBfID0ge1xuICBkZWZhdWx0cyA6IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvZGVmYXVsdHMnKSxcbiAgbWVyZ2UgICAgOiByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21lcmdlJyksXG4gIHBpY2sgICAgIDogcmVxdWlyZSgnbG9kYXNoL29iamVjdC9waWNrJyksXG4gIHJlamVjdCAgIDogcmVxdWlyZSgnbG9kYXNoL2NvbGxlY3Rpb24vcmVqZWN0Jylcbn1cblxudmFyXG4gIGZicmVmID0gbmV3IEZpcmViYXNlKCdodHRwczovL211c2lmYXZzLmZpcmViYXNlaW8uY29tJyksXG4gIHRpbWVhZ28gPSByZXF1aXJlKCcuLi9saWIvZnJvbW5vdycpLFxuICB5dCA9IHJlcXVpcmUoJy4uL2xpYi95b3V0dWJlJylcblxuZnVuY3Rpb24gUG9zdChvcHRzLCBrZXkpIHtcbiAgdGhpcy5zZXRhdHRyKF8uZGVmYXVsdHMoe30sIG9wdHMsIHtrZXk6IGtleX0sIFBvc3QuZGVmYXVsdHMpKVxufVxuXG5Qb3N0LmRlZmF1bHRzID0ge1xuICBkYXRlOiB1bmRlZmluZWQsXG4gIGRlc2M6ICcnLFxuICBlbWJlZDoge30sXG4gIGZhdmVyczoge30sXG4gIGtleTogbnVsbCxcbiAgc3RvcmVkOiBmYWxzZSxcbiAgdGl0bGU6ICcnLFxuICB1aWQ6IHVuZGVmaW5lZCxcbiAgdXNlck5hbWU6IHVuZGVmaW5lZFxufVxuXG4vKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEluc3RhbmNlIE1ldGhvZHNcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKi9cblxuUG9zdC5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgcmV0dXJuIHRoaXMua2V5ID09PSBvdGhlci5rZXlcbn1cblxuUG9zdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KF8ucGljayh0aGlzLmdldGF0dHIoKSwgWyd0aXRsZScsICdrZXknXSkpXG59XG5cbi8vIFJldHVybnMgb25seSBQb3N0ICpkYXRhKiBhdHRyaWJ1dGVzXG5Qb3N0LnByb3RvdHlwZS5nZXRhdHRyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBfLnBpY2sodGhpcywgT2JqZWN0LmtleXMoUG9zdC5kZWZhdWx0cykpXG59XG5cbi8vIFNldHMgYXR0cmlidXRlcyBhbmQgZGVyaXZlZC9jb21wdXRlZCBhdHRyaWJ1dGVzXG5Qb3N0LnByb3RvdHlwZS5zZXRhdHRyID0gZnVuY3Rpb24ob3B0cykge1xuICBfLm1lcmdlKHRoaXMsIG9wdHMpXG5cbiAgdmFyIHAgPSB0aGlzXG5cbiAgdGhpcy5zdG9yZWQgPSAoISFwLmtleSkgJiYgKHAua2V5ICE9ICduZXcnKVxuICB0aGlzLmRhdGUgPSBwLmRhdGUgPyBuZXcgRGF0ZShwLmRhdGUpIDogbmV3IERhdGUoKVxuXG4gIGlmIChwLmVtYmVkICYmICghcC5lbWJlZC50eXBlIHx8IHAuZW1iZWQudHlwZSA9PSAndW5rbm93bicpKSB7XG4gICAgLy8gVE9ETzogcGFyc2Ugb3RoZXIgc2VydmljZXMgKHNvdW5kY2xvdWQsIGJhbmRjYW1wLCBldGMuKVxuICAgIHRoaXMuZW1iZWQgPSB5dC5leHRyYWN0RW1iZWQocC5lbWJlZC51cmwpXG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyByZXR1cm5zIGFuIG9iamVjdCB3aXRoIHZhbGlkYXRpb24gcmVzdWx0c1xuUG9zdC5wcm90b3R5cGUudmFsaWRhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcCA9IHRoaXMsIHIgPSB7IGVycm9yczogW10sIGlzVmFsaWQ6IHRydWUgfVxuXG4gIGlmICghcC5kYXRlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHIuZXJyb3JzLmRhdGUgPSAnZGF0ZSBpcyBpbnZhbGlkJ1xuICAgIHIuaXNWYWxpZCA9IGZhbHNlXG4gIH1cblxuICBpZiAoIXAudGl0bGUgfHwgcC50aXRsZS5sZW5ndGggPT09IDApIHtcbiAgICByLmVycm9ycy50aXRsZSA9ICd0aXRsZSBjYW5cXCd0IGJlIGJsYW5rJ1xuICAgIHIuaXNWYWxpZCA9IGZhbHNlXG4gIH1cblxuICBpZiAoIXAuZW1iZWQgfHwgIXAuZW1iZWQudHlwZSB8fCBwLmVtYmVkLnR5cGUgPT0gJ3Vua25vd24nKSB7XG4gICAgci5lcnJvcnMudXJsID0gJ3RoZSBlbWJlZCB1cmwgaXMgaW52YWxpZCdcbiAgICByLmlzVmFsaWQgPSBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHJcbn1cblxuLy8gUmV0dXJucyBhIFN0cmluZyBmb3JtYXR0ZWQgZGF0ZS5cblBvc3QucHJvdG90eXBlLnRpbWVhZ28gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRpbWVhZ28odGhpcy5kYXRlKVxufVxuXG5Qb3N0LnByb3RvdHlwZS5mYXZvcml0ZWRCeSA9IGZ1bmN0aW9uKHVpZCkge1xuICByZXR1cm4gISF0aGlzLmZhdmVyc1t1aWRdXG59XG5cbi8vIEZpcmViYXNlIHJvb3Qgb2YgYWxsIHVzZXIgcG9zdHNcblBvc3QucHJvdG90eXBlLmZicm9vdHJlZiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZmJyZWYuY2hpbGQoJ3VzZXJfcG9zdHMvJyArIHRoaXMudWlkKVxufVxuXG4vLyBGaXJlYmFzZSByb290IG9mIHRoZSBzcGVjaWZpYyB1c2VyIHBvc3RcblBvc3QucHJvdG90eXBlLmZicG9zdHJlZiA9IGZ1bmN0aW9uKHBvc3RmaXgpIHtcbiAgcmV0dXJuIHRoaXMuZmJyb290cmVmKCkuY2hpbGQoJy8nICsgdGhpcy5rZXkgKyAocG9zdGZpeCA/ICcvJyArIHBvc3RmaXggOiAnJykpXG59XG5cbi8qXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogXCJTdGF0aWNcIiBNZXRob2RzXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICovXG5cbi8vIEV4dGVuZCB0aGUgUG9zdCBGdW5jdGlvbiAobm90IHRoZSBpbnN0YW5jZXMpIHdpdGggcHViL3N1YiBwcm9wZXJ0aWVzLlxucmVxdWlyZSgncmlvdCcpLm9ic2VydmFibGUoUG9zdClcblxuUG9zdC5kZXN0cm95ID0gZnVuY3Rpb24ocG9zdCkge1xuICBwb3N0LmZicG9zdHJlZigpLnJlbW92ZShmdW5jdGlvbihlcnJvcil7XG4gICAgaWYgKCFlcnJvcikge1xuICAgICAgcG9zdC5kZXN0cm95ZWQgPSB0cnVlXG4gICAgICBQb3N0LnRyaWdnZXIoJ3N0b3JlOnBvc3RzOmRpZDpkZXN0cm95JywgcG9zdClcbiAgICB9XG4gIH0pXG59XG5cblxudmFyIGxpc3RlbmVycyA9IHt9XG5cbi8vIFdoZW4gY2FsbGVkLCBzdG9yZTpwb3N0czpkaWQ6cmV0cmlldmUgZXZlbnRzIHdpbGwgYmUgdHJpZ2dlcmVkXG4vLyBhZnRlciBmaXJlYmFzZSBjaGlsZF9hZGRlZCBldmVudHMuXG5Qb3N0LnJldHJpZXZlID0gZnVuY3Rpb24gcmV0cmlldmUoY29sbGVjdGlvbikge1xuICBpZiAobGlzdGVuZXJzW2NvbGxlY3Rpb25dKSB7IHJldHVybiB9XG5cbiAgdmFyIHJlZiA9IGZicmVmLmNoaWxkKGNvbGxlY3Rpb24pLm9yZGVyQnlQcmlvcml0eSgpXG5cbiAgbGlzdGVuZXJzW2NvbGxlY3Rpb25dID0gcmVmLm9uKCdjaGlsZF9hZGRlZCcsIGZ1bmN0aW9uKHNuYXBzaG90KSB7XG4gICAgdmFyIHBvc3QgPSBuZXcgUG9zdChzbmFwc2hvdC52YWwoKSwgc25hcHNob3Qua2V5KCkpXG4gICAgUG9zdC50cmlnZ2VyKCdzdG9yZTpwb3N0czpkaWQ6cmV0cmlldmUnLCBjb2xsZWN0aW9uLCBwb3N0KVxuICB9KVxufVxuXG5Qb3N0LnN0b3BSZXRyaWV2ZSA9IGZ1bmN0aW9uKGNvbGxlY3Rpb24pIHtcbiAgaWYgKCFsaXN0ZW5lcnNbY29sbGVjdGlvbl0pIHsgcmV0dXJuIH1cblxuICBmYnJlZi5vZmYoJ2NoaWxkX2FkZGVkJywgbGlzdGVuZXJzW2NvbGxlY3Rpb25dKVxuICBkZWxldGUgbGlzdGVuZXJzW2NvbGxlY3Rpb25dXG59XG5cbi8qXG4gKiBSZXR1cm5zIGxhdGVzdCAxMCBpdGVtcyBmcm9tIG9uZSBvZiB0aGVzZSBjb2xsZWN0aW9uczpcbiAqIHBvc3RzXG4gKiBmYXZvcml0ZWRcbiAqIHVzZXJfZmF2b3JpdGVzL3VpZFxuICogdXNlcl9wb3N0cy91aWRcbiAqL1xuUG9zdC5sYXRlc3QgPSBmdW5jdGlvbihjb2xsZWN0aW9uKSB7XG4gIHZhciByID0gZmJyZWYuY2hpbGQoY29sbGVjdGlvbikub3JkZXJCeVByaW9yaXR5KCkubGltaXRUb0ZpcnN0KDEwKVxuXG4gIHIub25jZSgndmFsdWUnLCBmdW5jdGlvbihzbmFwc2hvdCkge1xuICAgIHZhciBkYXRhID0gc25hcHNob3QudmFsKClcblxuICAgIGlmICghZGF0YSkgeyByZXR1cm4gfSAvLyBub3RoaW5nIGF2YWlsYWJsZT9cblxuICAgIHZhciBsYXRlc3QgPSBPYmplY3Qua2V5cyhkYXRhKS5yZWR1Y2UoZnVuY3Rpb24oYWNjLCBrZXkpIHtcbiAgICAgIGFjYy5wdXNoKG5ldyBQb3N0KGRhdGFba2V5XSwga2V5KSlcbiAgICAgIHJldHVybiBhY2NcbiAgICB9LCBbXSkuc29ydChmdW5jdGlvbihwb3N0MSwgcG9zdDIpIHtcbiAgICAgIHJldHVybiBwb3N0Mi5kYXRlIC0gcG9zdDEuZGF0ZVxuICAgIH0pXG5cbiAgICBQb3N0LnRyaWdnZXIoJ3N0b3JlOnBvc3RzOmRpZDpsYXRlc3QnLCBjb2xsZWN0aW9uLCBsYXRlc3QpXG4gIH0pXG59XG5cbi8vIEluaXRpYWwgY3JlYXRpb24gb2YgYSBwb3N0LiBVc2UgdXBkYXRlIGluc3RlYWQgaWYgdGhlIHBvc3QgYWxyZWFkeSBleGlzdHMuXG5Qb3N0LnBlcnNpc3QgPSBmdW5jdGlvbiBwZXJzaXN0KHBvc3QpIHtcbiAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpXG4gIHZhciBhdHRycyA9IF8ubWVyZ2UocG9zdC5nZXRhdHRyKCksIHtkYXRlOiBkYXRlLnZhbHVlT2YoKSwgdWlkOiBwb3N0LnVpZH0pXG5cbiAgdmFyIHIgPSBwb3N0LmZicm9vdHJlZigpLnB1c2goYXR0cnMsIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBQb3N0LnRyaWdnZXIoJ3N0b3JlOnBvc3RzOmZhaWxlZDpwZXJzaXN0JywgcG9zdCwgZXJyb3IpXG4gICAgfSBlbHNlIHtcbiAgICAgIHBvc3Quc2V0YXR0cih7IGtleTogci5rZXkoKSwgZGF0ZTogZGF0ZX0pXG4gICAgICBQb3N0LnRyaWdnZXIoJ3N0b3JlOnBvc3RzOmRpZDpwZXJzaXN0JywgcG9zdClcbiAgICAgIHIuc2V0UHJpb3JpdHkoZGF0ZS52YWx1ZU9mKCkpXG4gICAgfVxuICB9KVxufVxuXG5Qb3N0LnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZShwb3N0KSB7XG4gIHBvc3QuZmJwb3N0cmVmKCkudXBkYXRlKHBvc3QuZ2V0YXR0cigpLCBmdW5jdGlvbihlcnJvcil7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICBQb3N0LnRyaWdnZXIoJ3N0b3JlOnBvc3RzOmZhaWxlZDp1cGRhdGUnLCBwb3N0LCBlcnJvcilcbiAgICB9IGVsc2Uge1xuICAgICAgUG9zdC50cmlnZ2VyKCdzdG9yZTpwb3N0czpkaWQ6dXBkYXRlJywgcG9zdClcbiAgICB9XG4gIH0pXG59XG5cblBvc3QudG9nZ2xlRmF2ID0gZnVuY3Rpb24ocG9zdCwgdWlkKSB7XG4gIHZhciBmYXZlcnMgPSBfLm1lcmdlKHt9LCBwb3N0LmZhdmVycykgLy8gXCJjbG9uZVwiXG5cbiAgaWYgKHBvc3QuZmF2b3JpdGVkQnkodWlkKSkgeyAvLyB0b2dnbGUuXG4gICAgZGVsZXRlIGZhdmVyc1t1aWRdXG4gIH0gZWxzZSB7XG4gICAgZmF2ZXJzW3VpZF0gPSB0cnVlXG4gIH1cblxuICBwb3N0LmZicG9zdHJlZignZmF2ZXJzJykudXBkYXRlKGZhdmVycywgZnVuY3Rpb24oZXJyb3Ipe1xuICAgIGlmIChlcnJvcikge1xuICAgICAgUG9zdC50cmlnZ2VyKCdzdG9yZTpwb3N0czpmYWlsZWQ6dG9nZ2xlZmF2JywgcG9zdCwgZXJyb3IpXG4gICAgfSBlbHNlIHtcbiAgICAgIHBvc3QuZmF2ZXJzID0gZmF2ZXJzXG5cbiAgICAgIC8vIHVwZGF0ZSB0aGUgcmVmcyBmb3IgdGhlIG93bmVyIG9mIHRoZSBwb3N0IChub3RlIHVzZSBvZiBwb3N0LnVpZCBpbnN0ZWFkXG4gICAgICAvLyBvZiBqdXN0IHVpZCBvZiB0aGUgdXNlciB0b2dnbGluZyB0aGUgZmF2KVxuICAgICAgdmFyXG4gICAgICAgIHVwc3RyZWYgPSBmYnJlZi5jaGlsZCgndXNlcl9wb3N0cy8nICsgcG9zdC51aWQgKyAnLycgKyBwb3N0LmtleSksXG4gICAgICAgIHVmYXZyZWYgPSBmYnJlZi5jaGlsZCgndXNlcl9mYXZvcml0ZXMvJyArIHBvc3QudWlkICsgJy8nICsgcG9zdC5rZXkpXG5cbiAgICAgIHVwc3RyZWYudXBkYXRlKHBvc3QuZ2V0YXR0cigpKVxuXG4gICAgICBpZiAocG9zdC5mYXZvcml0ZWRCeShwb3N0LnVpZCkpIHtcbiAgICAgICAgdWZhdnJlZi51cGRhdGUocG9zdC5nZXRhdHRyKCkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1ZmF2cmVmLnJlbW92ZSgpIC8vIG1heSBuZWVkIHRvIHJlbW92ZSBpZiBubyBsb25nZXIgZmF2ZWRcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRlIHRoZSBnZW5lcmFsIGxpc3Qgb2YgYWxsIGZhdm9yaXRlc1xuICAgICAgdmFyIGZhdnNyZWYgPSBmYnJlZi5jaGlsZCgnZmF2b3JpdGVkLycgKyBwb3N0LmtleSlcblxuICAgICAgaWYgKE9iamVjdC5rZXlzKHBvc3QuZmF2ZXJzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZhdnNyZWYudXBkYXRlKHBvc3QuZ2V0YXR0cigpKSAvLyBzb21lb25lIHN0aWxsIGxpa2VzIGl0IVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmF2c3JlZi5yZW1vdmUoKSAvLyBub2JvZHkgbGlrZXMgdGhpcyBhbnltb3JlLlxuICAgICAgfVxuXG4gICAgICAvLyB1cGRhdGUgYWxsIG90aGVyIGZhdmVycyAobWF5IHJldHVybiBlbXB0eSBhcnJheSlcbiAgICAgIG90aGVyVWlkcyA9IF8ucmVqZWN0KE9iamVjdC5rZXlzKGZhdmVycykuY29uY2F0KHVpZCksIGZ1bmN0aW9uKF91aWQpIHsgcmV0dXJuIF91aWQgPT0gcG9zdC51aWQgfSlcblxuICAgICAgb3RoZXJVaWRzLmZvckVhY2goZnVuY3Rpb24odWlkKXtcbiAgICAgICAgdmFyIG90aGVyZmF2ID0gZmJyZWYuY2hpbGQoJ3VzZXJfZmF2b3JpdGVzLycgKyB1aWQgKyAnLycgKyBwb3N0LmtleSlcblxuICAgICAgICBpZiAocG9zdC5mYXZvcml0ZWRCeSh1aWQpKSB7XG4gICAgICAgICAgb3RoZXJmYXYudXBkYXRlKHBvc3QuZ2V0YXR0cigpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG90aGVyZmF2LnJlbW92ZSgpXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIFBvc3QudHJpZ2dlcignc3RvcmU6cG9zdHM6ZGlkOnRvZ2dsZWZhdicsIHBvc3QsIHVpZClcbiAgICB9XG4gIH0pXG59XG5cbi8vIHVwZGF0ZSB0aGUgdmFyaW91cyBwb3N0IHJlZmVyZW5jZXMgKGxpa2UgbGF0ZXN0IHBvc3RzLCBmYXZvcml0ZWQsIGV0Yy4pXG5mdW5jdGlvbiB1cGRhdGVQb3N0UmVmZXJlbmNlcyhwb3N0KSB7XG4gIHZhclxuICAgIGYgPSBmYnJlZiwgdXNmLFxuICAgIHBzdCA9ICdwb3N0cy8nICsgcG9zdC5rZXksXG4gICAgZmF2ID0gJ2Zhdm9yaXRlZC8nICsgcG9zdC5rZXksXG4gICAgYXRyID0gXy5tZXJnZShwb3N0LmdldGF0dHIoKSwge2RhdGU6IHBvc3QuZGF0ZS52YWx1ZU9mKCl9KVxuICAgIGZhdlVpZHMgPSBPYmplY3Qua2V5cyhwb3N0LmZhdmVycylcblxuICBpZiAocG9zdC5kZXN0cm95ZWQpIHtcbiAgICBmLmNoaWxkKGZhdikucmVtb3ZlKClcbiAgICBmLmNoaWxkKHBzdCkucmVtb3ZlKClcbiAgICBmYXZVaWRzLmZvckVhY2goZnVuY3Rpb24odWlkKXtcbiAgICAgIGYuY2hpbGQoJ3VzZXJfZmF2b3JpdGVzLycgKyB1aWQgKyAnLycgKyBwb3N0LmtleSkucmVtb3ZlKClcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIGYuY2hpbGQocHN0KS5zZXQoYXRyKVxuICAgIC8vIGZhdiBhZGRpdGlvbiBpcyBoYW5kbGVkIGluIHRvZ2dsZUZhdlxuICB9XG59XG5cblBvc3Qub24oJ3N0b3JlOnBvc3RzOmRpZDpwZXJzaXN0JywgdXBkYXRlUG9zdFJlZmVyZW5jZXMpXG5Qb3N0Lm9uKCdzdG9yZTpwb3N0czpkaWQ6dXBkYXRlJywgdXBkYXRlUG9zdFJlZmVyZW5jZXMpXG5Qb3N0Lm9uKCdzdG9yZTpwb3N0czpkaWQ6ZGVzdHJveScsIHVwZGF0ZVBvc3RSZWZlcmVuY2VzKVxuUG9zdC5vbignc3RvcmU6cG9zdHM6ZGlkOnRvZ2dsZWZhdicsIHVwZGF0ZVBvc3RSZWZlcmVuY2VzKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RcbiIsIi8qXG4gKiBXaGVuIGZpcnN0IGNyZWF0ZWQgYSBVc2VyIG9iamVjdCBpcyBqdXN0IGEgaG9sZGVyIGZvciBVc2VyIGF0dHJpYnV0ZXNcbiAqIHdpdGggc29tZSBjb252ZW5pZW5jZSBtZXRob2RzIGZvciB1cGRhdGluZyBhdHRyaWJ1dGVzLCB2YWxpZGF0aW5nLCBldGMuXG4gKlxuICogVGhlIFVzZXIgZnVuY3Rpb24gaXMgYWxzbyBvYnNlcnZhYmxlLiBQdWJsaXNoaW5nIGFuZCBzdWJzY3JpYmluZ1xuICogdG8gVXNlciBpcyB0aGUgb25seSB3YXkgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgYWJzdHJhY3QgJ3VzZXJzIHN0b3JlJy5cbiAqXG4gKiBVc2VyLmN1cnJlbnQgaG9sZHMgYSByZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgdXNlciwgd2hpY2ggbWF5IG9yIG1heSBub3QgYmVcbiAqIGF1dGhlbnRpY2F0ZWQuXG4gKlxuICogRVhBTVBMRTpcbiAqXG4gKiB2YXIgVXNlciA9IHJlcXVpcmUoJ2FwcC91c2VyJylcbiAqXG4gKiB2YXIgY3VycmVudCA9IFVzZXIuY3VycmVudFxuICpcbiAqIE5PVEU6XG4gKlxuICogVWx0aW1hdGVseSB0aGUgbWFpbiBGaXJlYmFzZSBwYXRoIGZvciBwb3N0cyBpcyBidWlsdCBsaWtlIHRoaXM6XG4gKiB1c2Vycy91aWQgOiB7IC4uLnVzZXIgZGF0YS4uLiB9XG4gKi9cblxudmFyIF8gPSB7XG4gIGRlZmF1bHRzIDogcmVxdWlyZSgnbG9kYXNoL29iamVjdC9kZWZhdWx0cycpLFxuICBwaWNrICAgICA6IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvcGljaycpXG59XG5cbnZhciBmYnJlZiA9IG5ldyBGaXJlYmFzZSgnaHR0cHM6Ly9tdXNpZmF2cy5maXJlYmFzZWlvLmNvbScpXG5cbmZ1bmN0aW9uIFVzZXIob3B0cywgdWlkKSB7XG4gIF8uZGVmYXVsdHModGhpcywgb3B0cywgVXNlci5kZWZhdWx0cylcblxuICAvLyBpZiBjdXJyZW50IHVzZXIgd2FzIGluc3RhbnRpYXRlZCBtb3JlIHRoYW4gb25jZS5cbiAgaWYgKFVzZXIuY3VycmVudCAmJiBVc2VyLmN1cnJlbnQudWlkID09PSB1aWQpIHtcbiAgICBfLmRlZmF1bHRzKHRoaXMsIFVzZXIuY3VycmVudClcbiAgfVxufVxuXG5Vc2VyLmRlZmF1bHRzID0ge1xuICAnYXZhdGFyVXJsJyAgIDogJy9hc3NldHMvcHJvZmlsZS5wbmcnLFxuICAnZGVzY3JpcHRpb24nIDogJ011c2lGYXZzISB1c2VyJyxcbiAgJ2Rpc3BsYXlOYW1lJyA6ICd1c2VyJyxcbiAgJ2xvY2F0aW9uJyAgICA6ICdVbml2ZXJzZScsXG4gICdsb2dnZWQnICAgICAgOiBmYWxzZSxcbiAgJ3Byb3ZpZGVyJyAgICA6ICd1bmtub3duJyxcbiAgJ3VybCcgICAgICAgICA6ICdodHRwczovL211c2lmYXZzLmNvbSdcbn1cblxuLypcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBJbnN0YW5jZSBNZXRob2RzXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICovXG5cbi8vIFJldHVybnMgb25seSAqZGF0YSogYXR0cmlidXRlc1xuVXNlci5wcm90b3R5cGUuZ2V0YXR0ciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gXy5waWNrKHRoaXMsIE9iamVjdC5rZXlzKFVzZXIuZGVmYXVsdHMpKVxufVxuXG5Vc2VyLnByb3RvdHlwZS5sb2dvdXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hdXRoRGF0YSA9IG51bGxcbiAgdGhpcy5sb2dnZWQgPSBmYWxzZVxuICB0aGlzLnByb3ZpZGVyID0gJ3Vua25vd24nXG4gIHRoaXMudWlkID0gbnVsbFxufVxuXG4vLyB1cGRhdGUgZmIgZGF0YVxuVXNlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciB1c2VyID0gdGhpc1xuICBpZiAoIXVzZXIudWlkKSB7IHJldHVybiB9XG4gIGZicmVmLmNoaWxkKCd1c2VycycgKyAnLycgKyB1c2VyLnVpZCkuc2V0KHVzZXIuZ2V0YXR0cigpLCBmdW5jdGlvbihlcnJvcikge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgVXNlci50cmlnZ2VyKCdzdG9yZTp1c2VyczpmYWlsZWQ6dXBkYXRlJywgdXNlcilcbiAgICB9IGVsc2Uge1xuICAgICAgVXNlci50cmlnZ2VyKCdzdG9yZTp1c2VyczpkaWQ6dXBkYXRlJywgdXNlcilcbiAgICB9XG4gIH0pXG59XG5cblVzZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShfLnBpY2sodGhpcy5nZXRhdHRyKCksIFsnZGlzcGxheU5hbWUnLCAnbG9nZ2VkJ10pKVxufVxuXG4vKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIFwiU3RhdGljXCIgTWV0aG9kc1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqL1xuXG4vLyBFeHRlbmQgdGhlIFVzZXIgKmZ1bmN0aW9uKiAobm90IHRoZSBpbnN0YW5jZXMpIHdpdGggcHViL3N1YiBhdHRyaWJ1dGVzLlxucmVxdWlyZSgncmlvdCcpLm9ic2VydmFibGUoVXNlcilcblxuLy8gVXBkYXRlcyBhIHVzZXIgd2l0aCB0aGUgcHJvdmlkZWQgYXV0aCBkYXRhLlxuZnVuY3Rpb24gdXBkYXRlQXV0aChhdXRoRGF0YSkge1xuICBpZiAoIWF1dGhEYXRhKSB7IHJldHVybiB9XG5cbiAgdmFyIHAsIHUgPSBVc2VyLmN1cnJlbnRcblxuICB1LnVpZCA9IGF1dGhEYXRhLnVpZFxuICB1LmF1dGhEYXRhID0gYXV0aERhdGFcbiAgdS5wcm92aWRlciA9IGF1dGhEYXRhLnByb3ZpZGVyXG4gIHUubG9nZ2VkID0gdHJ1ZVxuXG4gIGlmIChhdXRoRGF0YS5wcm92aWRlciA9PSAndHdpdHRlcicpIHtcbiAgICB1LmRpc3BsYXlOYW1lID0gYXV0aERhdGEudHdpdHRlci5kaXNwbGF5TmFtZVxuXG4gICAgcCA9IGF1dGhEYXRhLnR3aXR0ZXIuY2FjaGVkVXNlclByb2ZpbGVcblxuICAgIGlmIChwKSB7XG4gICAgICAvLyBhcHBhcmVudGx5IHR3aXR0ZXIgZG9lc24ndCBzZXJ2ZSB0aGUgaW1hZ2UgdG8gdGhlICd3cm9uZycgcmVmZXJlciA6KFxuICAgICAgLy8gdS5hdmF0YXJVcmwgPSBwLnByb2ZpbGVfaW1hZ2VfdXJsX2h0dHBzXG4gICAgICB1LmRlc2NyaXB0aW9uID0gcC5kZXNjcmlwdGlvblxuICAgICAgdS5sb2NhdGlvbiA9IHAubG9jYXRpb25cbiAgICAgIHUudXJsID0gcC51cmxcbiAgICB9XG4gIH0gZWxzZSBpZiAoYXV0aERhdGEucHJvdmlkZXIgPT0gJ2dvb2dsZScpIHtcbiAgICB1LmRpc3BsYXlOYW1lID0gYXV0aERhdGEuZ29vZ2xlLmRpc3BsYXlOYW1lXG5cbiAgICBwID0gYXV0aERhdGEuZ29vZ2xlLmNhY2hlZFVzZXJQcm9maWxlXG5cbiAgICBpZiAocCkge1xuICAgICAgdS5hdmF0YXJVcmwgPSBwLnBpY3R1cmVcbiAgICAgIHUuZGVzY3JpcHRpb24gPSAnRysgVXNlcidcbiAgICAgIHUubG9jYXRpb24gPSAnUGxhbmV0IEVhcnRoJ1xuICAgICAgdS51cmwgPSBwLmxpbmtcbiAgICB9XG4gIH1cblxuICBfLmRlZmF1bHRzKHRoaXMsIHUuZGVmYXVsdHMpIC8vIGluIGNhc2Ugd2UgcGlja2VkIHVwIHNvbWUgbnVsbHNcblxuICB1LnVwZGF0ZSgpXG59XG5cblVzZXIubG9naW4gPSBmdW5jdGlvbihwcm92aWRlcikge1xuICBmYnJlZi5hdXRoV2l0aE9BdXRoUG9wdXAocHJvdmlkZXIsIGZ1bmN0aW9uKGVycm9yLCBhdXRoRGF0YSkge1xuICAgIGlmIChlcnJvciB8fCAhYXV0aERhdGEpIHtcbiAgICAgIFVzZXIudHJpZ2dlcignc3RvcmU6dXNlcnM6ZmFpbGVkOmxvZ2luJywgZXJyb3IgfHwge2NvZGU6ICd1bmtub3duJ30pXG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZUF1dGgoYXV0aERhdGEpXG4gICAgfVxuICB9KVxufVxuXG5Vc2VyLmxvZ291dCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoVXNlci5jdXJyZW50ICYmIFVzZXIuY3VycmVudC5sb2dnZWQpIHtcbiAgICBVc2VyLmN1cnJlbnQubG9nb3V0KClcbiAgICBmYnJlZi51bmF1dGgoKVxuICB9XG59XG5cblVzZXIubG9va3VwID0gZnVuY3Rpb24odWlkKSB7XG4gIGZicmVmLmNoaWxkKCd1c2VycycpLmNoaWxkKHVpZCkub25jZSgndmFsdWUnLCBmdW5jdGlvbihzbmFwc2hvdCl7XG4gICAgdmFyIGRhdGEgPSBzbmFwc2hvdC52YWwoKVxuICAgIGlmIChkYXRhKSB7XG4gICAgICBVc2VyLnRyaWdnZXIoJ3N0b3JlOnVzZXJzOmRpZDpsb29rdXAnLCB1aWQsIG5ldyBVc2VyKGRhdGEsIHVpZCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIFVzZXIudHJpZ2dlcignc3RvcmU6dXNlcnM6ZmFpbGVkOmxvb2t1cCcsIHVpZClcbiAgICB9XG4gIH0pXG59XG5cbi8vIGNyZWF0ZXMgdGhlIFVzZXIuY3VycmVudCBpbnN0YW5jZS5cblVzZXIuc2V0dXBDdXJyZW50ID0gZnVuY3Rpb24oKSB7XG4gIFVzZXIuY3VycmVudCA9IG5ldyBVc2VyKClcblxuICBmYnJlZi5vbkF1dGgoZnVuY3Rpb24oYXV0aERhdGEpIHtcbiAgICBpZiAoYXV0aERhdGEpIHtcbiAgICAgIHVwZGF0ZUF1dGgoYXV0aERhdGEpXG4gICAgICBVc2VyLnRyaWdnZXIoJ3N0b3JlOnVzZXJzOmRpZDpsb2dpbicsIFVzZXIuY3VycmVudCwgYXV0aERhdGEpXG4gICAgfSBlbHNlIHtcbiAgICAgIFVzZXIuY3VycmVudC5sb2dvdXQoKVxuICAgICAgVXNlci50cmlnZ2VyKCdzdG9yZTp1c2VyczpkaWQ6bG9nb3V0JywgVXNlci5jdXJyZW50KVxuICAgIH1cbiAgfSlcbiAgLy8gdXBkYXRlQXV0aChmYnJlZi5nZXRBdXRoKCkpIC8vIE5PVEU6IHJlbW92ZWQgdG8gYXZvaWQgZmIncyBzeW5jLiBhdXRoIGNoZWNrXG59XG5cbm1vZHVsZS5leHBvcnRzID0gVXNlclxuIiwidmFyIF8gPSB7XG4gIGlzRnVuY3Rpb24gOiByZXF1aXJlKCdsb2Rhc2gvbGFuZy9pc0Z1bmN0aW9uJylcbn1cblxuLypcbiAqIERlZmluZXMgYSBjb21tb24gQVBJIGFyb3VuZCBET00gbm9kZSBoYW5kbGluZy4gVGhlIEFQSSBpcyBpbnNwaXJlZCBieVxuICogY2VydGFpbiBsaWIgeW91IG1heSBoYXZlIGhlYXJkIGFib3V0Li4uIDpwXG4gKi9cbmZ1bmN0aW9uIERvbVdyYXAobm9kZSwgc2VsZWN0b3IpIHtcbiAgdGhpc1swXSA9IHRoaXMubm9kZSA9IG5vZGVcbiAgdGhpcy5pZCA9IG5vZGUuaWRcblxuICBpZiAoc2VsZWN0b3IpIHtcbiAgICB0aGlzLm5vZGUgPSBub2RlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gIH1cblxuICB0aGlzLmxpc3RlbmVycyA9IFtdIC8vIHNhdmUgZXZlbnQgbGlzdGVuZXJzIHNvIHdlIGNhbiB1bnJlZ2lzdGVyIGVhc2lseS5cbn1cblxuRG9tV3JhcC5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIG5ldyBEb21XcmFwKHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSlcbn1cblxuRG9tV3JhcC5wcm90b3R5cGUuaHRtbCA9IGZ1bmN0aW9uKGh0bWwpIHtcbiAgdGhpcy5ub2RlLmlubmVySFRNTCA9IGh0bWxcbiAgcmV0dXJuIHRoaXNcbn1cblxuRG9tV3JhcC5wcm90b3R5cGUucHJlcGVuZCA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgdGhpcy5ub2RlLmluc2VydEJlZm9yZShub2RlLCB0aGlzLm5vZGUuZmlyc3RDaGlsZClcbiAgcmV0dXJuIHRoaXNcbn1cblxuRG9tV3JhcC5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obm9kZSkge1xuICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQobm9kZSlcbiAgcmV0dXJuIHRoaXNcbn1cblxuRG9tV3JhcC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24obm9kZSkge1xuICB0aGlzLm5vZGUucmVtb3ZlQ2hpbGQobm9kZSlcbiAgcmV0dXJuIHRoaXNcbn1cblxuRG9tV3JhcC5wcm90b3R5cGUudGV4dCA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgdGhpcy5ub2RlLnRleHRDb250ZW50ID0gdGV4dFxuICByZXR1cm4gdGhpc1xufVxuXG5Eb21XcmFwLnByb3RvdHlwZS52YWwgPSBmdW5jdGlvbigpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHsgdGhpcy5ub2RlLnZhbHVlID0gYXJndW1lbnRzWzBdIH1cbiAgcmV0dXJuIHRoaXMubm9kZS52YWx1ZVxufVxuXG5Eb21XcmFwLnByb3RvdHlwZS5hZGRDbGFzcyA9IGZ1bmN0aW9uKGNsYXNzbmFtZSkge1xuICB0aGlzLm5vZGUuY2xhc3NMaXN0LmFkZChjbGFzc25hbWUpXG4gIHJldHVybiB0aGlzXG59XG5cbkRvbVdyYXAucHJvdG90eXBlLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24oY2xhc3NuYW1lKSB7XG4gIHRoaXMubm9kZS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzbmFtZSlcbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gUmV0dXJuIGZpcnN0IHBhcmVudCBlbGVtZW50IG1hdGNoaW5nIHNlbGVjdG9yXG5Eb21XcmFwLnByb3RvdHlwZS5wYXJlbnQgPSBmdW5jdGlvbihzZWxlY3Rvcikge1xuICB2YXIgdCA9IHRoaXMubm9kZS5wYXJlbnRFbGVtZW50XG4gIHdoaWxlICh0KSB7XG4gICAgaWYgKHQubWF0Y2hlcyhzZWxlY3RvcikpIHsgcmV0dXJuIG5ldyBEb21XcmFwKHQpIH1cbiAgICB0ID0gdC5wYXJlbnRFbGVtZW50XG4gIH1cbn1cblxuRG9tV3JhcC5wcm90b3R5cGUubWF0Y2hlcyA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiB0aGlzLm5vZGUubWF0Y2hlcyhzZWxlY3Rvcilcbn1cblxuRG9tV3JhcC5wcm90b3R5cGUuZGF0YSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgcmV0dXJuIHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIG5hbWUpXG59XG5cbi8qIFRoaXMgZXZlbnQgaGFuZGxlciBwcmV2ZW50cyB0aGUgZXZlbnQgZGVmYXVsdCBhY3Rpb25cbiAqIGFuZCByZXR1cm5zIGEgd3JhcHBlZCBldmVudCB0YXJnZXQgaW5zdGVhZCBpbiBhZGRpdGlvblxuICogdG8gdGhlIG9yaWdpbmFsIGV2ZW50LlxuICpcbiAqIG5vZGUub24oJ2V2ZW50JywgZnVuKVxuICogbm9kZS5vbignZXZlbnQnLCAnLmRlbGVnYXRlLXNlbGVjdG9yJywgZnVuKVxuICovXG5Eb21XcmFwLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKGV2ZW50bmFtZSwgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gIHZhciBmbiwgbiA9IHRoaXMubm9kZVxuXG4gIGlmIChfLmlzRnVuY3Rpb24oc2VsZWN0b3IpKSB7XG4gICAgY2FsbGJhY2sgPSBzZWxlY3RvclxuICAgIGZuID0gZnVuY3Rpb24oZXYpIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcbiAgICAgIGNhbGxiYWNrKG5ldyBEb21XcmFwKGV2LnRhcmdldCksIGV2KVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmbiA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB2YXIgbiA9IG5ldyBEb21XcmFwKGV2LnRhcmdldCksXG4gICAgICAgIHIgPSBuLm1hdGNoZXMoc2VsZWN0b3IpID8gbiA6IG4ucGFyZW50KHNlbGVjdG9yKVxuICAgICAgaWYgKHIpIHsgY2FsbGJhY2sociwgZXYpIH1cbiAgICB9XG4gIH1cblxuICBuLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRuYW1lLCBmbilcblxuICB0aGlzLmxpc3RlbmVycy5wdXNoKHtldmVudG5hbWU6IGV2ZW50bmFtZSwgZm46IGZufSlcblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBjYWxsIHdpdGhvdXQgcGFyYW1ldGVycyBmb3IgcmVtb3ZpbmcgYWxsIGxpc3RlbmVycy5cbkRvbVdyYXAucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKGV2ZW50bmFtZSwgY2FsbGJhY2spIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGRvbid0IHdvcnJ5IGFib3V0IHJlbW92aW5nIGZyb20gdGhpcy5saXN0ZW5lcnMsIHJlbW92aW5nIHR3aWNlIGlzXG4gICAgICAvLyBoYXJtbGVzcyBhbmQgdGhpcyBvYmplY3Qgc2hvdWxkIGJlIHNob3J0IGxpdmVkLlxuICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRuYW1lLCBjYWxsYmFjaylcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGRhdGEuZXZlbnRuYW1lLCBkYXRhLmZuKVxuICAgIH0sIHRoaXMpXG4gICAgdGhpcy5saXN0ZW5lcnMgPSBbXVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihub2RlLCBzZWxlY3Rvcikge1xuICByZXR1cm4gbmV3IERvbVdyYXAobm9kZSwgc2VsZWN0b3IpXG59XG4iLCIvKlxuICogQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS90eGNoZW4vcmlvdC1obi9ibG9iL2doLXBhZ2VzL3NyYy9maWx0ZXJzLmpzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGF0ZSkge1xuICB2YXIgYmV0d2VlbiA9IChEYXRlLm5vdygpIC0gZGF0ZSkgLyAxMDAwXG5cbiAgaWYgKGJldHdlZW4gPCAwKSB7XG4gICAgcmV0dXJuICdyZWNlbnRseScgLy8gT01HIGl0IGNvbWVzIGZvcm0gdGhlIGZ1dHVyZSEgOi1wXG5cbiAgfSBpZiAoYmV0d2VlbiA8IDM2MDApIHtcbiAgICByZXR1cm4gfn4oYmV0d2VlbiAvIDYwKSArICcgbWludXRlcyBhZ28nXG5cbiAgfSBlbHNlIGlmIChiZXR3ZWVuIDwgODY0MDApIHtcbiAgICByZXR1cm4gfn4oYmV0d2VlbiAvIDM2MDApICsgJyBob3VycyBhZ28nXG4gIH1cblxuICByZXR1cm4gfn4oYmV0d2VlbiAvIDg2NDAwKSArICcgZGF5cyBhZ28nXG59O1xuIiwidmFyIHVybHJlZ2V4ID0gL3lvdXR1YmUuY29tLitcXD92PShbYS16QS16MC05XFwtX10rKS9pXG5cbmV4cG9ydHMuZXh0cmFjdEVtYmVkID0gZnVuY3Rpb24odXJsKSB7XG4gIHZhciBtYXRjaCA9IHVybHJlZ2V4LmV4ZWModXJsKVxuXG4gIGlmIChtYXRjaCAmJiBtYXRjaC5sZW5ndGgpIHtcbiAgICByZXR1cm4ge3R5cGU6ICd5b3V0dWJlJywgdXJsOiB1cmwsIHZpZGVvSWQ6IG1hdGNoWzFdfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB7dHlwZTogJ3Vua25vd24nLCB1cmw6IHVybH1cbiAgfVxufVxuIiwicmVxdWlyZSgnLi9hcHAvdXNlcicpLnNldHVwQ3VycmVudCgpIC8vIENyZWF0ZSBpbnN0YW5jZSBvZiBjdXJyZW50IHVzZXIuXG5cbi8vIE1vZHVsZXMgZGlzcGxheWVkIGFsbCB0aGUgdGltZTpcbnZhclxuICBNZXNzYWdlID0gcmVxdWlyZSgnLi9tb2R1bGVzL21lc3NhZ2UvbWVzc2FnZScpLFxuICBOYXZpZ2F0aW9uID0gcmVxdWlyZSgnLi9tb2R1bGVzL25hdmlnYXRpb24vbmF2aWdhdGlvbicpLFxuICBNYWluID0gcmVxdWlyZSgnLi9tb2R1bGVzL21haW4vbWFpbicpXG5cbnZhclxuICBtYWluID0gbmV3IE1haW4oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FwcC1tYWluJykpLFxuICBtc2cgPSBuZXcgTWVzc2FnZShtYWluLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYXBwLW1lc3NhZ2UnKSksXG4gIG5hdiA9IG5ldyBOYXZpZ2F0aW9uKG1haW4sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhcHAtbmF2aWdhdGlvbicpKVxuXG52YXIgcmlvdCA9IHJlcXVpcmUoJ3Jpb3QnKVxuXG52YXIgcm91dGVyID0gbWFpbi5yb3V0ZXIuYmluZChtYWluKSAvLyByaW90IG1pc3NlcyB0aGUgY29udGV4dCBvdGhlcndpc2UuXG5cbnJpb3Qucm91dGUocm91dGVyKSAvLyBTZXR1cCBhIHJvdXRlciBoYW5kbGVyIChoYXNoY2hhbmdlIGV2ZW50KVxucmlvdC5yb3V0ZS5leGVjKHJvdXRlcikgLy8gQ2FsbCB0aGUgcm91dGVyIHcvbyB3YWl0aW5nIGZvciBhIGhhc2hjaGFuZ2UgKHN0YXJ0cyB0aGUgYXBwISlcbiIsInZhciBfID0ge2VzY2FwZTogcmVxdWlyZShcImxvZGFzaC5lc2NhcGVcIil9O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmope1xudmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLHByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XG53aXRoKG9ianx8e30pe1xuX19wKz0nPG1haW4gY2xhc3M9XCJtYWluIGFwcC1mcm9udFwiIHJvbGU9XCJtYWluXCI+PGltZyBjbGFzcz1cInJlc3BvbnNpdmUtd2lkdGhcIiBzcmM9XCIvYXNzZXRzL211c2ljLmpwZ1wiPjxkaXYgY2xhc3M9XCJmcm9udC1jb3B5XCI+PGgxPkEgbWljcm8gQmxvZyBmb3IgeW91ciBmYXZvcml0ZSBNdXNpYyE8L2gxPjxwPlNoYXJlIHlvdXIgZmF2b3JpdGUgbXVzaWMgYW5kIHZpZGVvcyB3aXRoIHlvdXIgZnJpZW5kcy48YnI+V2l0aCBNdXNpRmF2cyB5b3UgY2FuIGVtYmVkIGNvbnRlbnQgZnJvbSBZb3VUdWJlLCBTb3VuZENsb3VkLCBhbmQgbW9yZSwgaW4gYSBzaW5nbGUgcGxhY2UhPC9wPjxoMj5MYXRlc3QgUG9zdHM8L2gyPjx1bCBjbGFzcz1cInBvc3QtbGlzdCBsYXRlc3QtcG9zdHNcIj48L3VsPjxoMj5MYXRlc3QgRmF2b3JpdGVkPC9oMj48dWwgY2xhc3M9XCJwb3N0LWxpc3QgbGF0ZXN0LWZhdnNcIj48L3VsPjwvZGl2PjwvbWFpbj4nO1xufVxucmV0dXJuIF9fcDtcbn07XG4iLCJ2YXJcbiAgJCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9kb21XcmFwJyksXG4gIFBvc3QgPSByZXF1aXJlKCcuLi8uLi9hcHAvcG9zdCcpLFxuICBpdGVtc3RwbCA9IHJlcXVpcmUoJy4vcG9zdC1pdGVtcy5odG1sJyksXG4gIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9mcm9udC5odG1sJylcblxuZnVuY3Rpb24gRnJvbnQocGFyZW50LCBub2RlLCBvcHRpb25zKSB7XG4gIHRoaXMucGFyZW50ID0gcGFyZW50XG5cbiAgdmFyIGYgPSB0aGlzLCByID0gJChub2RlKS5odG1sKHRlbXBsYXRlKG9wdGlvbnMpKVxuXG4gIHRoaXMubm9kZXMgPSB7XG4gICAgcm9vdCAgICAgIDogcixcbiAgICBwb3N0cyAgICAgOiByLnNlbGVjdCgnLmxhdGVzdC1wb3N0cycpLFxuICAgIGZhdm9yaXRlZCA6IHIuc2VsZWN0KCcubGF0ZXN0LWZhdnMnKVxuICB9XG5cbiAgZi5oYW5kbGVQb3N0cyA9IGZ1bmN0aW9uKGNvbGxlY3Rpb24sIHBvc3RzKSB7XG4gICAgZi5ub2Rlc1tjb2xsZWN0aW9uXS5odG1sKGl0ZW1zdHBsKHsgcG9zdHM6IHBvc3RzIH0pKVxuICB9XG5cbiAgUG9zdC5vbignc3RvcmU6cG9zdHM6ZGlkOmxhdGVzdCcsIGYuaGFuZGxlUG9zdHMpXG5cbiAgUG9zdC5sYXRlc3QoJ3Bvc3RzJylcbiAgUG9zdC5sYXRlc3QoJ2Zhdm9yaXRlZCcpXG59XG5cbkZyb250LnByb3RvdHlwZS51bmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5ub2Rlcy5yb290Lmh0bWwoJycpXG4gIFBvc3Qub2ZmKCdzdG9yZTpwb3N0czpkaWQ6bGF0ZXN0JywgdGhpcy5oYW5kbGVQb3N0cylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGcm9udFxuIiwidmFyIF8gPSB7ZXNjYXBlOiByZXF1aXJlKFwibG9kYXNoLmVzY2FwZVwiKX07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iail7XG52YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4scHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcbndpdGgob2JqfHx7fSl7XG5fX3ArPScnO1xuIHBvc3RzLmZvckVhY2goZnVuY3Rpb24ocG9zdCkgeyBcbl9fcCs9JzxsaT48aSBjbGFzcz1cImZhIGZhLXBsYXlcIj48L2k+Jm5ic3A7JytcbigoX190PSggcG9zdC50aXRsZSApKT09bnVsbD8nJzpfX3QpK1xuJyBwb3N0ZWQgYnkmbmJzcDsgPGEgaHJlZj1cIiMnK1xuKChfX3Q9KCBwb3N0LnVpZCApKT09bnVsbD8nJzpfX3QpK1xuJy9wb3N0c1wiPicrXG4oKF9fdD0oIHBvc3QudXNlck5hbWUgKSk9PW51bGw/Jyc6X190KStcbicmbmJzcDs8aSBjbGFzcz1cImZhIGZhLWNoaWxkXCI+PC9pPjwvYT4gJm5ic3A7IDxzcGFuIGNsYXNzPVwidGltZWFnb1wiPignK1xuKChfX3Q9KCBwb3N0LnRpbWVhZ28oKSApKT09bnVsbD8nJzpfX3QpK1xuJyk8L3NwYW4+PC9saT4nO1xuIH0pIFxuX19wKz0nJztcbn1cbnJldHVybiBfX3A7XG59O1xuIiwidmFyIF8gPSB7ZXNjYXBlOiByZXF1aXJlKFwibG9kYXNoLmVzY2FwZVwiKX07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iail7XG52YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4scHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcbndpdGgob2JqfHx7fSl7XG5fX3ArPSc8bWFpbiBjbGFzcz1cIm1haW4gYXBwLWxvZ2luXCIgcm9sZT1cIm1haW5cIj48ZGl2IGNsYXNzPVwiZmlsbGVyXCI+PC9kaXY+PGRpdiBjbGFzcz1cImZyb250LWNvcHlcIj48aDE+TG9nIEluPC9oMT48cD5JbiBvcmRlciB0byBpbnRlcmFjdCB3aXRoIE11c2lGYXZzISB5b3VcXCdsbCBuZWVkIHRvIGxvZyBpbiBmaXJzdC48L3A+PHA+UGxlYXNlIHNlbGVjdCBvbmUgb2YgdGhlIHNlcnZpY2VzIGJlbG93IHRvIGxvZyBpbjo8L3A+PHVsIGNsYXNzPVwibG9naW4tbGlua3MgZmEtdWwgZmEtMnhcIj48bGk+PGkgY2xhc3M9XCJmYS1saSBmYSBmYS1nb29nbGUtcGx1cy1zcXVhcmVcIj48L2k+IDxhIGhyZWY9XCIjXCIgaWQ9XCJnb29nbGUtbG9naW5cIj5Hb29nbGU8L2E+PC9saT48bGk+PGkgY2xhc3M9XCJmYS1saSBmYSBmYS10d2l0dGVyLXNxdWFyZVwiPjwvaT4gPGEgaHJlZj1cIiNcIiBpZD1cInR3aXR0ZXItbG9naW5cIj5Ud2l0dGVyPC9hPjwvbGk+PC91bD48L2Rpdj48L21haW4+Jztcbn1cbnJldHVybiBfX3A7XG59O1xuIiwidmFyXG4gICQgPSByZXF1aXJlKCcuLi8uLi9saWIvZG9tV3JhcCcpLFxuICBVc2VyID0gcmVxdWlyZSgnLi4vLi4vYXBwL3VzZXInKSxcbiAgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2xvZ2luLmh0bWwnKVxuXG5mdW5jdGlvbiBMb2dpbihwYXJlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnRcblxuICB2YXIgbCA9IHRoaXMsIHIgPSAkKG5vZGUpLmh0bWwodGVtcGxhdGUob3B0aW9ucykpXG5cbiAgbC5ub2RlcyA9IHsgcm9vdDogciwgbGlzdDogci5zZWxlY3QoJy5sb2dpbi1saW5rcycpIH1cblxuICBsLmxvZ2luTGlzdGVuZXIgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LmlkID09ICd0d2l0dGVyLWxvZ2luJykge1xuICAgICAgVXNlci5sb2dpbigndHdpdHRlcicpXG5cbiAgICB9IGVsc2UgaWYgKHRhcmdldC5pZCA9PSAnZ29vZ2xlLWxvZ2luJykge1xuICAgICAgVXNlci5sb2dpbignZ29vZ2xlJylcblxuICAgIH0gZWxzZSB7XG4gICAgICBsLnBhcmVudC5tZXNzYWdlKCdTb3JyeSwgYXV0aGVudGljYXRpbmcgd2l0aCB0aGlzIHByb3ZpZGVyIGlzIG5vdCBhdmFpbGFibGUgeWV0LicpXG4gICAgfVxuICB9XG5cbiAgbC5ub2Rlcy5saXN0Lm9uKCdjbGljaycsIGwubG9naW5MaXN0ZW5lcilcbn1cblxuTG9naW4ucHJvdG90eXBlLnVubG9hZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm5vZGVzLmxpc3Qub2ZmKCdjbGljaycsIHRoaXMubG9naW5MaXN0ZW5lcilcbiAgdGhpcy5ub2Rlcy5yb290Lmh0bWwoJycpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTG9naW5cbiIsInZhclxuICBVc2VyID0gcmVxdWlyZSgnLi4vLi4vYXBwL3VzZXInKSxcbiAgcmlvdCA9IHJlcXVpcmUoJ3Jpb3QnKVxuXG5yZXF1aXJlKCcuLi9mcm9udC9mcm9udCcpXG5yZXF1aXJlKCcuLi9sb2dpbi9sb2dpbicpXG5yZXF1aXJlKCcuLi91c2VyL3VzZXInKVxuXG5mdW5jdGlvbiBNYWluKHJvb3ROb2RlKSB7XG4gIHJpb3Qub2JzZXJ2YWJsZSh0aGlzKSAvLyBtYWluIGNhbiBsaXN0ZW4gdG8gZXZlbnRzLlxuXG4gIHZhciBtID0gdGhpc1xuXG4gIG0ucm9vdE5vZGUgPSByb290Tm9kZVxuXG4gIG0ub24oJ21vZHVsZTp1c2VyOmZhaWxlZDpsb29rdXAnLCBmdW5jdGlvbigpe1xuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJycgLy8gXCJyZWRpcmVjdFwiIGhvbWUuXG4gICAgbS5tZXNzYWdlKCdTb3JyeSwgd2UgY291bGQgbm90IGZpbmQgdGhhdCB1c2VyLicpXG4gIH0pXG5cbiAgbS5vbignbW9kdWxlOm5hdmlnYXRpb246ZGlkOm5ld3Bvc3QnLCBmdW5jdGlvbih1c2VyKXtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2ggIT0gJyNtZS9wb3N0cycpIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJ21lL3Bvc3RzJ1xuICAgICAgbS5zaG93TmV3UG9zdCA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgbS5sYXN0bW9kLnNob3dOZXdQb3N0KClcbiAgICB9XG4gIH0pXG5cbiAgbS5vbignbW9kdWxlOnVzZXI6ZGlkOmxvb2t1cCcsIGZ1bmN0aW9uKHVpZCwgdXNlcikge1xuICAgIGlmIChtLnNob3dOZXdQb3N0KSB7XG4gICAgICBtLmxhc3Rtb2Quc2hvd05ld1Bvc3QoKVxuICAgICAgbS5zaG93TmV3UG9zdCA9IGZhbHNlXG4gICAgfVxuICB9KVxuXG4gIFVzZXIub24oJ3N0b3JlOnVzZXJzOmRpZDpsb2dpbicsIGZ1bmN0aW9uKHVzZXIpIHtcbiAgICB1c2VyLnVwZGF0ZSgpXG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnJyAvLyBcInJlZGlyZWN0XCIgaG9tZS5cbiAgICBtLm1lc3NhZ2UoJ1RoYW5rIHlvdSEgWW91IGhhdmUgYmVlbiBsb2dnZWQgaW4uJylcbiAgfSlcblxuICBVc2VyLm9uKCdzdG9yZTp1c2VyczpkaWQ6bG9nb3V0JywgZnVuY3Rpb24oKXtcbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcnIC8vIFwicmVkaXJlY3RcIiBob21lLlxuICAgIG0ubWVzc2FnZSgnWW91XFwndmUgYmVlbiBsb2dnZWQgb3V0LicpXG4gIH0pXG59XG5cbk1haW4ucHJvdG90eXBlLm1lc3NhZ2UgPSBmdW5jdGlvbih0ZXh0KSB7XG4gIHRoaXMudHJpZ2dlcignbW9kdWxlOm1lc3NhZ2U6ZG86bWVzc2FnZScsIHRleHQpXG59XG5cbk1haW4ucHJvdG90eXBlLmxvYWRtb2QgPSBmdW5jdGlvbihuYW1lLCBvcHRpb25zKSB7XG4gIHZhciBtID0gdGhpcywgQ3RvciA9IHJlcXVpcmUoJy4uLycgKyBuYW1lICsgJy8nICsgbmFtZSlcbiAgaWYgKG0ubGFzdG1vZCkgeyBtLmxhc3Rtb2QudW5sb2FkKCkgfVxuICBtLmxhc3Rtb2QgPSBuZXcgQ3RvcihtLCBtLnJvb3ROb2RlLCBvcHRpb25zKVxufVxuXG4vKlxuICogUGFyYW1ldGVycyB0byB0aGlzIGZ1bmN0aW9uIGNvbWUgZnJvbSB0aGUgcm91dGVyIChyaW90LnJvdXRlKSxcbiAqIHBhcnNlZCBmcm9tIHRoZSBsb2NhdGlvbiBoYXNoLlxuICovXG5NYWluLnByb3RvdHlwZS5yb3V0ZXIgPSBmdW5jdGlvbihfdWlkLCBhY3Rpb24sIHBvc3RpZCkge1xuICB0aGlzLnRyaWdnZXIoJ21vZHVsZTptYWluOmRpZDpyb3V0ZXInKVxuXG4gIHZhciBtID0gdGhpcywgdXNlciA9IFVzZXIuY3VycmVudFxuICB2YXIgdWlkID0gKF91aWQgPT0gJ21lJykgPyB1c2VyLnVpZCA6IF91aWRcblxuICBzd2l0Y2goYWN0aW9uKSB7XG4gIGNhc2UgJ3Bvc3RzJzpcbiAgY2FzZSAnZmF2b3JpdGVzJzpcblxuICAgIGlmIChfdWlkID09ICdtZScgJiYgIXVzZXIubG9nZ2VkKSB7XG4gICAgICBtLmxvYWRtb2QoJ2xvZ2luJylcbiAgICAgIG0ubWVzc2FnZSgnUGxlYXNlIGxvZ2luIHRvIGFjY2VzcyB5b3VyIHBvc3RzLicpXG5cbiAgICB9IGVsc2Uge1xuICAgICAgbS5sb2FkbW9kKCd1c2VyJywge3VpZDogdWlkLCBhY3Rpb246IGFjdGlvbn0pXG4gICAgfVxuXG4gIGJyZWFrXG4gIGNhc2UgJ2xvZ291dCc6XG5cbiAgICBpZiAodXNlci5sb2dnZWQpIHsgdXNlci5sb2dvdXQoKSB9XG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnJ1xuXG4gIGJyZWFrXG4gIGRlZmF1bHQ6XG4gICAgbS5sb2FkbW9kKCdmcm9udCcpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNYWluXG4iLCJ2YXIgXyA9IHtlc2NhcGU6IHJlcXVpcmUoXCJsb2Rhc2guZXNjYXBlXCIpfTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKXtcbnZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xud2l0aChvYmp8fHt9KXtcbl9fcCs9JzxzcGFuIGNsYXNzPVwiYXBwLW1lc3NhZ2UtdGV4dFwiPjwvc3Bhbj48ZGl2IGNsYXNzPVwiYXBwLW1lc3NhZ2UtZGlzbWlzc1wiPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJhcHAtbWVzc2FnZS1kaXNtaXNzXCI+RGlzbWlzczwvYT48L2Rpdj4nO1xufVxucmV0dXJuIF9fcDtcbn07XG4iLCJ2YXJcbiAgJCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9kb21XcmFwJyksXG4gIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9tZXNzYWdlLmh0bWwnKVxuXG5mdW5jdGlvbiBNZXNzYWdlKHBhcmVudCwgbm9kZSwgb3B0aW9ucykge1xuICB0aGlzLnBhcmVudCA9IHBhcmVudFxuXG4gIHZhciBtID0gdGhpcywgciA9ICQobm9kZSkuaHRtbCh0ZW1wbGF0ZShvcHRpb25zKSlcblxuICBtLm5vZGVzID0ge1xuICAgIHJvb3QgOiByLFxuICAgIHRleHQgOiByLnNlbGVjdCgnLmFwcC1tZXNzYWdlLXRleHQnKSxcbiAgICBkaXNtIDogci5zZWxlY3QoJy5hcHAtbWVzc2FnZS1kaXNtaXNzJylcbiAgfVxuXG4gIG0ubWFpbkRvTWVzc2FnZUxpc3RlbmVyID0gZnVuY3Rpb24odGV4dCl7XG4gICAgbS5zaG93KHRleHQpXG4gIH0uYmluZCh0aGlzKVxuXG4gIG0ucGFyZW50Lm9uKCdtb2R1bGU6bWVzc2FnZTpkbzptZXNzYWdlJywgbS5tYWluRG9NZXNzYWdlTGlzdGVuZXIpXG5cbiAgbS5ub2Rlcy5kaXNtLm9uKCdjbGljaycsIGZ1bmN0aW9uKHRhcmdldCkgeyBtLmRpc21pc3MoKSB9KVxufVxuXG5NZXNzYWdlLnByb3RvdHlwZS51bmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wYXJlbnQub2ZmKCdtb2R1bGU6bWFpbjpkbzptZXNzYWdlJywgdGhpcy5tYWluRG9NZXNzYWdlTGlzdGVuZXIpXG4gIHRoaXMubm9kZXMuZGlzbS5vZmYoKVxuICB0aGlzLm5vZGVzLnJvb3QuaHRtbCgnJylcbn1cblxuTWVzc2FnZS5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgdGhpcy5ub2Rlcy5yb290LnJlbW92ZUNsYXNzKCdhcHAtaGlkZGVuJylcbiAgdGhpcy5ub2Rlcy50ZXh0LnRleHQobWVzc2FnZSlcbn1cblxuTWVzc2FnZS5wcm90b3R5cGUuZGlzbWlzcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm5vZGVzLnJvb3QuYWRkQ2xhc3MoJ2FwcC1oaWRkZW4nKVxuICB0aGlzLm5vZGVzLnRleHQudGV4dCgnJylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNZXNzYWdlXG4iLCJ2YXIgXyA9IHtlc2NhcGU6IHJlcXVpcmUoXCJsb2Rhc2guZXNjYXBlXCIpfTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKXtcbnZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xud2l0aChvYmp8fHt9KXtcbl9fcCs9JzxuYXYgY2xhc3M9XCJuYXZpZ2F0aW9uXCI+PHVsIGNsYXNzPVwibmF2LWFjdGlvbnNcIiByb2xlPVwibmF2aWdhdGlvblwiPjxsaT48YSBpZD1cIm5hdi1uZXdwb3N0XCIgaHJlZj1cIiNcIj5OZXcgUG9zdDwvYT48L2xpPjxsaT48YSBocmVmPVwiI21lL3Bvc3RzXCI+TXkgUG9zdHM8L2E+PC9saT48bGk+PGEgaHJlZj1cIiNtZS9mYXZvcml0ZXNcIj5NeSBGYXZvcml0ZXM8L2E+PC9saT48bGk+PGEgaWQ9XCJuYXYtbG9nb3V0XCIgaHJlZj1cIiNtZS9sb2dvdXRcIj5Mb2cgT3V0PC9hPjwvbGk+PC91bD48L25hdj4nO1xufVxucmV0dXJuIF9fcDtcbn07XG4iLCJ2YXJcbiAgJCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9kb21XcmFwJyksXG4gIFVzZXIgPSByZXF1aXJlKCcuLi8uLi9hcHAvdXNlcicpLFxuICByaW90ID0gcmVxdWlyZSgncmlvdCcpLFxuICB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vbmF2aWdhdGlvbi5odG1sJylcblxuZnVuY3Rpb24gTmF2aWdhdGlvbihwYXJlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnRcblxuICB2YXIgbiA9IHRoaXMsIHIgPSAkKG5vZGUpLmh0bWwodGVtcGxhdGUob3B0aW9ucykpXG5cbiAgbi5ub2RlcyA9IHtcbiAgICByb290ICAgIDogcixcbiAgICBsb2dvdXQgIDogci5zZWxlY3QoJyNuYXYtbG9nb3V0JyksXG4gICAgbmV3cG9zdCA6IHIuc2VsZWN0KCcjbmF2LW5ld3Bvc3QnKVxuICB9XG5cbiAgbi51cGRhdGVMb2dvdXQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoVXNlci5jdXJyZW50LmxvZ2dlZCkgeyBuLnNob3dMb2dvdXQoKSB9IGVsc2UgeyBuLmhpZGVMb2dvdXQoKSB9XG4gIH1cblxuICBuLm5ld3Bvc3RMaXN0ZW5lciA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIG4ucGFyZW50LnRyaWdnZXIoJ21vZHVsZTpuYXZpZ2F0aW9uOmRpZDpuZXdwb3N0JylcbiAgfVxuXG4gIG4ucGFyZW50Lm9uKCdtb2R1bGU6bWFpbjpkaWQ6cm91dGVyJywgbi51cGRhdGVMb2dvdXQpXG4gIG4ubm9kZXMubmV3cG9zdC5vbignY2xpY2snLCBuLm5ld3Bvc3RMaXN0ZW5lcilcbn1cblxuTmF2aWdhdGlvbi5wcm90b3R5cGUudW5sb2FkID0gZnVuY3Rpb24oKSB7XG4gIHZhciBuID0gdGhpc1xuICBuLnBhcmVudC5vZmYoJ21vZHVsZTptYWluOmRpZDpyb3V0ZXInLCBuLnVwZGF0ZUxvZ291dClcbiAgbi5ub2Rlcy5uZXdwb3N0Lm9uKCdjbGljaycsIG4ubmV3cG9zdExpc3RlbmVyKVxuICBuLm5vZGVzLnJvb3QuaHRtbCgnJylcbn1cblxuTmF2aWdhdGlvbi5wcm90b3R5cGUuc2hvd0xvZ291dCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm5vZGVzLmxvZ291dC5yZW1vdmVDbGFzcygnYXBwLWhpZGRlbicpXG59XG5cbk5hdmlnYXRpb24ucHJvdG90eXBlLmhpZGVMb2dvdXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5ub2Rlcy5sb2dvdXQuYWRkQ2xhc3MoJ2FwcC1oaWRkZW4nKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE5hdmlnYXRpb25cbiIsInZhciBfID0ge2VzY2FwZTogcmVxdWlyZShcImxvZGFzaC5lc2NhcGVcIil9O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmope1xudmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLHByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XG53aXRoKG9ianx8e30pe1xuX19wKz0nPGgyPicrXG4oKF9fdD0oIHN0b3JlZCA/ICdFZGl0aW5nIFBvc3QnIDogJ05ldyBQb3N0JyApKT09bnVsbD8nJzpfX3QpK1xuJzwvaDI+PHA+UGxlYXNlIHByb3ZpZGUgdGhlIHJlc291cmNlIHVybCB0byBzaGFyZSwgYSB0aXRsZSBhbmQgYSBkZXNjcmlwdGlvbi48L3A+PGRpdiBjbGFzcz1cInBvc3QtZm9ybS1lbWJlZFwiPjxsYWJlbD5FbWJlZCBVcmwgKGUuZy4gWW91VHViZSBVcmwpPC9sYWJlbD48aW5wdXQgbmFtZT1cInVybFwiIHR5cGU9XCJ1cmxcIiBwbGFjZWhvbGRlcj1cImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9UDlKNXRZU2hOWThcIj48L2Rpdj48ZGl2IGNsYXNzPVwicG9zdC1mb3JtLWRhdGFcIj48aW5wdXQgbmFtZT1cInRpdGxlXCIgdGl0bGU9XCJQb3N0IFRpdGxlXCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlRpdGxlXCI+PHRleHRhcmVhIHRpdGxlPVwiUG9zdCBEZXNjcmlwdGlvblwiIHBsYWNlaG9sZGVyPVwiRGVzY3JpcHRpb25cIj48L3RleHRhcmVhPjwvZGl2PjxkaXYgY2xhc3M9XCJwb3N0LWFjdGlvbnNcIiBkYXRhLXBvc3Qta2V5PVwiJytcbigoX190PSggcG9zdEtleSApKT09bnVsbD8nJzpfX3QpK1xuJ1wiPjxhIGNsYXNzPVwidW5kb1wiIHRpdGxlPVwiVW5kb1wiIGhyZWY9XCIjXCI+PGkgY2xhc3M9XCJmYSBmYS10aW1lcy1jaXJjbGVcIj48L2k+Jm5ic3A7Q2FuY2VsPC9hPiA8YSBjbGFzcz1cInNhdmVcIiB0aXRsZT1cIlNhdmUgYW5kIFB1Ymxpc2hcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmEgZmEtc2F2ZVwiPjwvaT4mbmJzcDtTYXZlPC9hPiA8c3BhbiBjbGFzcz1cInBvc3QtZWRpdC1tZXNzYWdlXCI+PC9zcGFuPjwvZGl2Pic7XG59XG5yZXR1cm4gX19wO1xufTtcbiIsInZhciBfID0ge1xuICBtZXJnZSAgOiByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21lcmdlJyksXG4gIHZhbHVlcyA6IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvdmFsdWVzJylcbn1cblxudmFyXG4gICQgPSByZXF1aXJlKCcuLi8uLi9saWIvZG9tV3JhcCcpLFxuICBQb3N0ID0gcmVxdWlyZSgnLi4vLi4vYXBwL3Bvc3QnKSxcbiAgdGVtcGxhdGUgPSByZXF1aXJlKCcuL2Zvcm0uaHRtbCcpXG5cbmZ1bmN0aW9uIFBvc3RGb3JtKHBhcmVudCwgbm9kZSwgb3B0aW9ucykge1xuICB0aGlzLnBhcmVudCA9IHBhcmVudFxuXG4gIHRoaXMucG9zdCA9IG5ldyBQb3N0KG9wdGlvbnMucG9zdClcblxuICB2YXIgYXR0ciA9IF8ubWVyZ2UoeyBwb3N0S2V5OiB0aGlzLnBvc3Qua2V5IHx8ICduZXcnfSwgdGhpcy5wb3N0KSxcbiAgICAgIHIgPSAkKG5vZGUpLmh0bWwodGVtcGxhdGUoYXR0cikpLmFkZENsYXNzKCdhcHAtcG9zdC1mb3JtJylcblxuICB0aGlzLm5vZGVzID0ge1xuICAgIHJvb3Q6IHIsXG4gICAgZm9ybU1lc3NhZ2UgOiByLnNlbGVjdCgnLnBvc3QtZWRpdC1tZXNzYWdlJyksXG4gICAgaW5wdXRUaXRsZSAgOiByLnNlbGVjdCgnaW5wdXRbbmFtZT10aXRsZV0nKSxcbiAgICBpbnB1dFVybCAgICA6IHIuc2VsZWN0KCdpbnB1dFtuYW1lPXVybF0nKSxcbiAgICBpbnB1dERlc2MgICA6IHIuc2VsZWN0KCd0ZXh0YXJlYScpXG4gIH1cblxuICB0aGlzLnVwZGF0ZUZvcm0oKVxufVxuXG5Qb3N0Rm9ybS5wcm90b3R5cGUudW5sb2FkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMubm9kZXMucm9vdC5yZW1vdmVDbGFzcygnYXBwLXBvc3QtZm9ybScpLmh0bWwoJycpXG59XG5cblBvc3RGb3JtLnByb3RvdHlwZS51cGRhdGVGb3JtID0gZnVuY3Rpb24oKSB7XG4gIHZhciBuID0gdGhpcy5ub2RlcywgcCA9IHRoaXMucG9zdFxuICBuLmlucHV0VGl0bGUudmFsKHAudGl0bGUpXG4gIG4uaW5wdXRVcmwudmFsKHAuZW1iZWQudXJsIHx8ICcnKVxuICBuLmlucHV0RGVzYy52YWwocC5kZXNjKVxufVxuXG5Qb3N0Rm9ybS5wcm90b3R5cGUudXBkYXRlUG9zdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbiA9IHRoaXMubm9kZXNcbiAgdGhpcy5wb3N0LnNldGF0dHIoe1xuICAgIHRpdGxlOiBuLmlucHV0VGl0bGUudmFsKCksXG4gICAgZW1iZWQ6IHt1cmw6IG4uaW5wdXRVcmwudmFsKCkgfSxcbiAgICBkZXNjOiBuLmlucHV0RGVzYy52YWwoKVxuICB9KVxufVxuXG5Qb3N0Rm9ybS5wcm90b3R5cGUuaXNWYWxpZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzdWx0ID0gdGhpcy5wb3N0LnZhbGlkYXRpb24oKSwgbiA9IHRoaXMubm9kZXNcblxuICBuLmlucHV0VXJsLnJlbW92ZUNsYXNzKCdpbnZhbGlkJylcbiAgbi5pbnB1dFRpdGxlLnJlbW92ZUNsYXNzKCdpbnZhbGlkJylcblxuICBpZiAocmVzdWx0LmlzVmFsaWQpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9IGVsc2Uge1xuICAgIGlmIChyZXN1bHQuZXJyb3JzLnVybCkgeyBuLmlucHV0VXJsLmFkZENsYXNzKCdpbnZhbGlkJykgfVxuICAgIGlmIChyZXN1bHQuZXJyb3JzLnRpdGxlKSB7IG4uaW5wdXRUaXRsZS5hZGRDbGFzcygnaW52YWxpZCcpIH1cblxuICAgIHZhciBtc2cgPSBfLnZhbHVlcyhyZXN1bHQuZXJyb3JzKS5qb2luKCcsICcpXG4gICAgbi5mb3JtTWVzc2FnZS50ZXh0KCdTb3JyeSwgdGhlIHBvc3QgY2FuXFwndCBiZSBzYXZlZDogJyArIG1zZyArICcuJylcblxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUG9zdEZvcm1cbiIsInZhciBfID0ge2VzY2FwZTogcmVxdWlyZShcImxvZGFzaC5lc2NhcGVcIil9O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmope1xudmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLHByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XG53aXRoKG9ianx8e30pe1xuX19wKz0nPHAgY2xhc3M9XCJ0aW1lYWdvXCI+cG9zdGVkIGJ5Jm5ic3A7JytcbigoX190PSggdXNlck5hbWUgKSk9PW51bGw/Jyc6X190KStcbicmbmJzcDsnK1xuKChfX3Q9KCB0aW1lYWdvICkpPT1udWxsPycnOl9fdCkrXG4nPC9wPjxoMj48aSBjbGFzcz1cImZhIGZhLXBsYXlcIj48L2k+Jm5ic3A7JytcbigoX190PSggdGl0bGUgKSk9PW51bGw/Jyc6X190KStcbic8L2gyPjxkaXYgY2xhc3M9XCJwb3N0LXNob3ctZW1iZWRcIj48aWZyYW1lIHR5cGU9XCJ0ZXh0L2h0bWxcIiB3aWR0aD1cIjY0MFwiIGhlaWdodD1cIjI2MFwiIHNyYz1cImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLycrXG4oKF9fdD0oIGVtYmVkLnZpZGVvSWQgKSk9PW51bGw/Jyc6X190KStcbidcIiBmcmFtZWJvcmRlcj1cIjBcIj48L2lmcmFtZT48L2Rpdj48cCBjbGFzcz1cInBvc3Qtc2hvdy1kZXNjcmlwdGlvblwiPjxpIGNsYXNzPVwiZmEgZmEtY2hpbGQgZmEtMnhcIj48L2k+Jm5ic3A7JytcbigoX190PSggZGVzYyApKT09bnVsbD8nJzpfX3QpK1xuJzwvcD48ZGl2IGNsYXNzPVwicG9zdC1hY3Rpb25zXCIgZGF0YS1wb3N0LWtleT1cIicrXG4oKF9fdD0oIHBvc3RLZXkgKSk9PW51bGw/Jyc6X190KStcbidcIj48YSBjbGFzcz1cImZhdlwiIHRpdGxlPVwiRmF2b3JpdGVcIiBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmEgZmEtaGVhcnRcIj48L2k+Jm5ic3A7RmF2b3JpdGU8L2E+JztcbiBpZiAob3duZWQpIHsgXG5fX3ArPScgPGEgY2xhc3M9XCJlZGl0XCIgdGl0bGU9XCJFZGl0XCIgaHJlZj1cIiNcIj48aSBjbGFzcz1cImZhIGZhLWVkaXRcIj48L2k+Jm5ic3A7RWRpdDwvYT4gPGEgY2xhc3M9XCJyZW1vdmVcIiB0aXRsZT1cIlJlbW92ZVwiIGhyZWY9XCIjXCI+PGkgY2xhc3M9XCJmYSBmYS10cmFzaFwiPjwvaT4mbmJzcDtSZW1vdmU8L2E+JztcbiB9IFxuX19wKz0nPC9kaXY+Jztcbn1cbnJldHVybiBfX3A7XG59O1xuIiwidmFyXG4gICQgPSByZXF1aXJlKCcuLi8uLi9saWIvZG9tV3JhcCcpLFxuICB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vc2hvdy5odG1sJyksXG4gIFVzZXIgPSByZXF1aXJlKCcuLi8uLi9hcHAvdXNlcicpXG5cbnZhciBfID0ge1xuICBtZXJnZSA6IHJlcXVpcmUoJ2xvZGFzaC9vYmplY3QvbWVyZ2UnKVxufVxuXG5mdW5jdGlvbiBQb3N0U2hvdyhwYXJlbnQsIG5vZGUsIG9wdGlvbnMpIHtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnRcblxuICB2YXIgcCA9IHRoaXMucG9zdCA9IG9wdGlvbnMucG9zdCxcbiAgICBhdHRyID0gXy5tZXJnZShwLmdldGF0dHIoKSwge1xuICAgICAgcG9zdEtleTogcC5rZXkgfHwgJ25ldycsXG4gICAgICB0aW1lYWdvOiBwLnRpbWVhZ28oKSxcbiAgICAgIG93bmVkOiBwLnVpZCA9PSBVc2VyLmN1cnJlbnQudWlkXG4gICAgfSlcblxuICB2YXIgciA9ICQobm9kZSkuYWRkQ2xhc3MoJ2FwcC1wb3N0LXNob3cnKS5odG1sKHRlbXBsYXRlKGF0dHIpKVxuXG4gIHRoaXMubm9kZXMgPSB7XG4gICAgcm9vdDogcixcbiAgICBmYXY6IHIuc2VsZWN0KCcuZmF2JylcbiAgfVxuXG4gIHRoaXMudXBkYXRlRmF2KClcbn1cblxuUG9zdFNob3cucHJvdG90eXBlLnVwZGF0ZUZhdiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcCA9IHRoaXMucG9zdCwgZiA9IHRoaXMubm9kZXMuZmF2XG5cbiAgaWYgKHAuZmF2b3JpdGVkQnkoVXNlci5jdXJyZW50LnVpZCkpIHtcbiAgICBmLmFkZENsYXNzKCdwb3N0LWZhdm9yaXRlZCcpXG4gIH0gZWxzZSB7XG4gICAgZi5yZW1vdmVDbGFzcygncG9zdC1mYXZvcml0ZWQnKVxuICB9XG59XG5cblBvc3RTaG93LnByb3RvdHlwZS51bmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5ub2Rlcy5yb290LnJlbW92ZUNsYXNzKCdhcHAtcG9zdC1zaG93JykuaHRtbCgnJylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0U2hvd1xuIiwidmFyIF8gPSB7ZXNjYXBlOiByZXF1aXJlKFwibG9kYXNoLmVzY2FwZVwiKX07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iail7XG52YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4scHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcbndpdGgob2JqfHx7fSl7XG5fX3ArPSc8ZGl2IGNsYXNzPVwicHJvZmlsZS1pbmZvXCI+PHVsIGNsYXNzPVwiZmEtdWxcIj48bGk+PGkgY2xhc3M9XCJmYS1saSBmYSBmYS11c2VyXCI+PC9pPicrXG4oKF9fdD0odXNlci5kaXNwbGF5TmFtZSkpPT1udWxsPycnOl9fdCkrXG4nPC9saT48bGk+PGkgY2xhc3M9XCJmYS1saSBmYSBmYS1hc3Rlcmlza1wiPjwvaT4nK1xuKChfX3Q9KHVzZXIuZGVzY3JpcHRpb24pKT09bnVsbD8nJzpfX3QpK1xuJzwvbGk+PGxpPjxpIGNsYXNzPVwiZmEtbGkgZmEgZmEtbWFwLW1hcmtlclwiPjwvaT4nK1xuKChfX3Q9KHVzZXIubG9jYXRpb24pKT09bnVsbD8nJzpfX3QpK1xuJzwvbGk+JztcbiBpZiAodXNlci5wcm92aWRlciA9PSAndHdpdHRlcicpIHsgXG5fX3ArPSc8bGk+PGkgY2xhc3M9XCJmYS1saSBmYSBmYS10d2l0dGVyLXNxdWFyZVwiPjwvaT4gPGEgaHJlZj1cImh0dHBzOi8vdHdpdHRlci5jb20vJytcbigoX190PSh1c2VyLmRpc3BsYXlOYW1lKSk9PW51bGw/Jyc6X190KStcbidcIj5AJytcbigoX190PSh1c2VyLmRpc3BsYXlOYW1lKSk9PW51bGw/Jyc6X190KStcbic8L2E+PC9saT4nO1xuIH0gXG5fX3ArPScnO1xuIGlmICh1c2VyLnByb3ZpZGVyID09ICdnb29nbGUnKSB7IFxuX19wKz0nPGxpPjxpIGNsYXNzPVwiZmEtbGkgZmEgZmEtZ29vZ2xlLXBsdXNcIj48L2k+IDxhIGhyZWY9XCInK1xuKChfX3Q9KHVzZXIudXJsKSk9PW51bGw/Jyc6X190KStcbidcIj4nK1xuKChfX3Q9KHVzZXIuZGlzcGxheU5hbWUpKT09bnVsbD8nJzpfX3QpK1xuJzwvYT48YnI+PC9saT4nO1xuIH0gXG5fX3ArPSc8L3VsPjwvZGl2Pic7XG59XG5yZXR1cm4gX19wO1xufTtcbiIsInZhciBfID0ge2VzY2FwZTogcmVxdWlyZShcImxvZGFzaC5lc2NhcGVcIil9O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmope1xudmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLHByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XG53aXRoKG9ianx8e30pe1xuX19wKz0nPGFzaWRlIGNsYXNzPVwicHJvZmlsZVwiPjwvYXNpZGU+PG1haW4gY2xhc3M9XCJtYWluXCIgcm9sZT1cIm1haW5cIj48ZGl2IGNsYXNzPVwiYXBwLW5ldy1wb3N0XCI+PC9kaXY+PGRpdiBjbGFzcz1cImFwcC1wb3N0LXBsYWNlaG9sZGVyXCI+PGgxPkhleSEmbmJzcDs8aSBjbGFzcz1cImZhIGZhLWNoaWxkXCI+PC9pPiZuYnNwOzxpIGNsYXNzPVwiZmEgZmEtcGxheVwiPjwvaT48L2gxPjxwPlRoaXMgdXNlciBoYXMgbm90JytcbigoX190PSggKGFjdGlvbiA9PSAncG9zdHMnKSA/ICcgcG9zdGVkIGFueXRoaW5nICcgOiAnIGZhdm9yaXRlZCBhbnkgcG9zdCAnICkpPT1udWxsPycnOl9fdCkrXG4neWV0LiBQbGVhc2UgY2hlY2sgYmFjayBsYXRlciE8L3A+PC9kaXY+PGRpdiBjbGFzcz1cImFwcC1wb3N0c1wiPjwvZGl2PjwvbWFpbj4nO1xufVxucmV0dXJuIF9fcDtcbn07XG4iLCJ2YXJcbiAgJCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9kb21XcmFwJyksXG4gIFBvc3QgPSByZXF1aXJlKCcuLi8uLi9hcHAvcG9zdCcpLFxuICBVc2VyID0gcmVxdWlyZSgnLi4vLi4vYXBwL3VzZXInKSxcbiAgUG9zdEZvcm0gPSByZXF1aXJlKCcuLi9wb3N0L2Zvcm0nKSxcbiAgUG9zdFNob3cgPSByZXF1aXJlKCcuLi9wb3N0L3Nob3cnKSxcbiAgcHJvZnRwbCA9IHJlcXVpcmUoJy4vcHJvZmlsZS5odG1sJyksXG4gIHRlbXBsYXRlID0gcmVxdWlyZSgnLi91c2VyLmh0bWwnKVxuXG5mdW5jdGlvbiBVc2VyTW9kKHBhcmVudCwgbm9kZSwgb3B0aW9ucykge1xuICB0aGlzLnBhcmVudCA9IHBhcmVudFxuXG4gIHZhciB1ID0gdGhpc1xuXG4gIHUubW9kcyA9IHt9IC8vIHN0b3JlIFBvc3RTaG93IGFuZCBQb3N0Rm9ybSBtb2R1bGVzLlxuXG4gIHUuYWN0aW9uID0gb3B0aW9ucy5hY3Rpb25cbiAgdS51aWQgPSBvcHRpb25zLnVpZFxuICB1LmZpcmViYXNlcGF0aCA9ICd1c2VyXycgKyB1LmFjdGlvbiArICcvJyArIHUudWlkXG5cbiAgdmFyIHIgPSAkKG5vZGUpLmh0bWwodGVtcGxhdGUodSkpXG5cbiAgdS5ub2RlcyA9IHtcbiAgICByb290ICAgICAgOiByLFxuICAgIG5ld3Bvc3QgICA6IHIuc2VsZWN0KCcuYXBwLW5ldy1wb3N0JyksXG4gICAgcGxhY2Vob2xkIDogci5zZWxlY3QoJy5hcHAtcG9zdC1wbGFjZWhvbGRlcicpLFxuICAgIHBvc3RzICAgICA6IHIuc2VsZWN0KCcuYXBwLXBvc3RzJyksXG4gICAgcHJvZiAgICAgIDogci5zZWxlY3QoJy5wcm9maWxlJylcbiAgfVxuXG4gIHUudXNlckRpZExvb2t1cCA9IGZ1bmN0aW9uKHVpZCwgdXNlcikge1xuICAgIHUudXNlciA9IHVzZXJcbiAgICB1LnJlZHJhd1Byb2ZpbGUoKVxuICAgIFBvc3QucmV0cmlldmUodS5maXJlYmFzZXBhdGgpXG4gICAgdS5wYXJlbnQudHJpZ2dlcignbW9kdWxlOnVzZXI6ZGlkOmxvb2t1cCcsIHVpZCwgdXNlcilcbiAgfVxuXG4gIHUudXNlckZhaWxlZExvb2t1cCA9IGZ1bmN0aW9uICh1aWQpIHtcbiAgICB1LnBhcmVudC50cmlnZ2VyKCdtb2R1bGU6dXNlcjpmYWlsZWQ6bG9va3VwJywgdWlkKVxuICB9XG5cbiAgdS5wb3N0c0RpZFJldHJpZXZlID0gZnVuY3Rpb24oZmlyZWJhc2VwYXRoLCBwb3N0KXtcbiAgICB2YXIgbSA9IHUubW9kc1twb3N0LmtleV1cbiAgICBpZiAobSkgeyB1LnNob3dtb2QobSkgfSBlbHNlIHsgdS5hZGRQb3N0KHBvc3QpIH1cbiAgfVxuXG4gIHUucG9zdHNEaWRVcGRhdGUgPSBmdW5jdGlvbihwb3N0KXtcbiAgICB2YXIgbSA9IHUubW9kc1twb3N0LmtleV1cbiAgICBpZiAobSkgeyB1LnNob3dtb2QobSkgfVxuICB9XG5cbiAgdmFyIGFjdGlvbk1vZCA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIHZhciBrZXkgPSB0YXJnZXQucGFyZW50KCcucG9zdC1hY3Rpb25zJykuZGF0YSgncG9zdC1rZXknKVxuICAgIHJldHVybiB1Lm1vZHNba2V5XVxuICB9XG5cbiAgci5vbignY2xpY2snLCAnLmZhdicsIGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIHZhciBtb2QgPSBhY3Rpb25Nb2QodGFyZ2V0KVxuICAgIFBvc3QudG9nZ2xlRmF2KG1vZC5wb3N0LCBVc2VyLmN1cnJlbnQudWlkKVxuICB9KVxuXG4gIHIub24oJ2NsaWNrJywgJy5lZGl0JywgZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgdS5lZGl0UG9zdChhY3Rpb25Nb2QodGFyZ2V0KSlcbiAgfSlcblxuICByLm9uKCdjbGljaycsICcucmVtb3ZlJywgZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgdS5yZW1vdmVQb3N0KGFjdGlvbk1vZCh0YXJnZXQpKVxuICB9KVxuXG4gIHIub24oJ2NsaWNrJywgJy51bmRvJywgZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgdmFyIG1vZCA9IGFjdGlvbk1vZCh0YXJnZXQpXG4gICAgaWYgKG1vZC5wb3N0LnN0b3JlZCkge1xuICAgICAgdS5zaG93bW9kKG1vZClcbiAgICB9IGVsc2Uge1xuICAgICAgdS5oaWRlTmV3UG9zdCgpXG4gICAgfVxuICB9KVxuXG4gIHIub24oJ2NsaWNrJywgJy5zYXZlJywgZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgdmFyIG1vZCA9IGFjdGlvbk1vZCh0YXJnZXQpXG4gICAgbW9kLnVwZGF0ZVBvc3QoKVxuXG4gICAgaWYgKCFtb2QuaXNWYWxpZCgpKSB7XG4gICAgICAvLyBkbyBub3RoaW5nLCB0aGUgZm9ybSB3aWxsIHNob3cgYW4gZXJyb3IgbWVzc2FnZS5cbiAgICB9IGVsc2UgaWYgKG1vZC5wb3N0LnN0b3JlZCkge1xuICAgICAgUG9zdC51cGRhdGUobW9kLnBvc3QpXG4gICAgfSBlbHNlIHtcbiAgICAgIFBvc3QucGVyc2lzdChtb2QucG9zdClcbiAgICAgIHUuaGlkZU5ld1Bvc3QoKVxuICAgIH1cbiAgfSlcblxuICBVc2VyLm9uKCdzdG9yZTp1c2VyczpmYWlsZWQ6bG9va3VwJyAsIHUudXNlckZhaWxlZExvb2t1cClcbiAgVXNlci5vbignc3RvcmU6dXNlcnM6ZGlkOmxvb2t1cCcgICAgLCB1LnVzZXJEaWRMb29rdXApXG4gIFBvc3Qub24oJ3N0b3JlOnBvc3RzOmRpZDpyZXRyaWV2ZScgICwgdS5wb3N0c0RpZFJldHJpZXZlKVxuICBQb3N0Lm9uKCdzdG9yZTpwb3N0czpkaWQ6dXBkYXRlJyAgICAsIHUucG9zdHNEaWRVcGRhdGUpXG4gIFBvc3Qub24oJ3N0b3JlOnBvc3RzOmRpZDp0b2dnbGVmYXYnICwgdS5wb3N0c0RpZFVwZGF0ZSlcblxuICBVc2VyLmxvb2t1cCh1LnVpZClcbn1cblxuVXNlck1vZC5wcm90b3R5cGUudW5sb2FkID0gZnVuY3Rpb24oKSB7XG4gIHZhciB1ID0gdGhpc1xuXG4gIHUubm9kZXMucm9vdC5vZmYoKS5odG1sKCcnKSAvLyB1bnJlZ2lzdGVyIGFsbCBldmVudCBoYW5kbGVycy5cblxuICBVc2VyLm9mZignc3RvcmU6dXNlcnM6ZmFpbGVkOmxvb2t1cCcgLCB1LnVzZXJGYWlsZWRMb29rdXApXG4gIFVzZXIub2ZmKCdzdG9yZTp1c2VyczpkaWQ6bG9va3VwJyAgICAsIHUudXNlckRpZExvb2t1cClcbiAgUG9zdC5vZmYoJ3N0b3JlOnBvc3RzOmRpZDpyZXRyaWV2ZScgICwgdS5wb3N0c0RpZFJldHJpZXZlKVxuICBQb3N0Lm9mZignc3RvcmU6cG9zdHM6ZGlkOnVwZGF0ZScgICAgLCB1LnBvc3RzRGlkVXBkYXRlKVxuICBQb3N0Lm9mZignc3RvcmU6cG9zdHM6ZGlkOnRvZ2dsZWZhdicgLCB1LnBvc3RzRGlkVXBkYXRlKVxuXG4gIFBvc3Quc3RvcFJldHJpZXZlKHUuZmlyZWJhc2VwYXRoKVxufVxuXG5Vc2VyTW9kLnByb3RvdHlwZS51cGRhdGVQbGFjZWhvbGRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbW9ka2V5cyA9IE9iamVjdC5rZXlzKHRoaXMubW9kcyksIHAgPSB0aGlzLm5vZGVzLnBsYWNlaG9sZFxuXG4gIGlmIChtb2RrZXlzLmxlbmd0aCA+IDAgfHwgdGhpcy5tb2RzWyduZXcnXSkge1xuICAgIHAuYWRkQ2xhc3MoJ2FwcC1oaWRkZW4nKVxuICB9IGVsc2Uge1xuICAgIHAucmVtb3ZlQ2xhc3MoJ2FwcC1oaWRkZW4nKVxuICB9XG59XG5cblVzZXJNb2QucHJvdG90eXBlLnJlZHJhd1Byb2ZpbGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5ub2Rlcy5wcm9mLmh0bWwocHJvZnRwbCh0aGlzKSlcbn1cblxuVXNlck1vZC5wcm90b3R5cGUuaGlkZU5ld1Bvc3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHUgPSB0aGlzLCBtID0gdS5tb2RzLm5ldywgbiA9IHUubm9kZXMubmV3cG9zdFxuICBpZiAobSkge1xuICAgIG0udW5sb2FkKClcbiAgICBuLmh0bWwoJycpXG4gICAgZGVsZXRlIHUubW9kc1snbmV3J11cbiAgfVxuICB1LnVwZGF0ZVBsYWNlaG9sZGVyKClcbn1cblxuVXNlck1vZC5wcm90b3R5cGUuc2hvd05ld1Bvc3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHUgPSB0aGlzLCBlbCwgcG9zdFxuICBpZiAoIXUubW9kcy5uZXcpIHtcbiAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgcG9zdCA9IG5ldyBQb3N0KHt1aWQgOiB1LnVpZCwgdXNlck5hbWUgOiB1LnVzZXIuZGlzcGxheU5hbWV9KVxuICAgIHUubW9kc1snbmV3J10gPSBuZXcgUG9zdEZvcm0odSwgZWwsIHtwb3N0IDogcG9zdH0pXG4gICAgdS5ub2Rlcy5uZXdwb3N0LmFwcGVuZChlbClcbiAgfVxuICB1LnVwZGF0ZVBsYWNlaG9sZGVyKClcbn1cblxuVXNlck1vZC5wcm90b3R5cGUuZWRpdFBvc3QgPSBmdW5jdGlvbihtb2QpIHtcbiAgdmFyIHUgPSB0aGlzLCBlbCA9IG1vZC5ub2Rlcy5yb290WzBdXG4gIG1vZC51bmxvYWQoKVxuICB1Lm1vZHNbbW9kLnBvc3Qua2V5XSA9IG5ldyBQb3N0Rm9ybSh1LCBlbCwge3Bvc3QgOiBtb2QucG9zdH0pXG59XG5cblVzZXJNb2QucHJvdG90eXBlLmFkZFBvc3QgPSBmdW5jdGlvbihwb3N0KSB7XG4gIHZhciB1ID0gdGhpcywgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICBwbW9kID0gbmV3IFBvc3RTaG93KHUsIGVsLCB7cG9zdCA6IHBvc3R9KVxuICB1Lm1vZHNbcG9zdC5rZXldID0gcG1vZFxuICB1Lm5vZGVzLnBvc3RzLnByZXBlbmQocG1vZC5ub2Rlcy5yb290WzBdKVxuICB1LnVwZGF0ZVBsYWNlaG9sZGVyKClcbn1cblxuLy8gU2hvdyBhIHBvc3QgdGhhdCB3YXMgcHJldmlvdXNseSBiZWluZyBlZGl0ZWQsIG9yIHVwZGF0ZSBpdCBpZiB0aGUgZGF0YSBjaGFuZ2VkLlxuVXNlck1vZC5wcm90b3R5cGUuc2hvd21vZCA9IGZ1bmN0aW9uKG1vZCkge1xuICB2YXIgdSA9IHRoaXNcbiAgaWYgKG1vZCBpbnN0YW5jZW9mIFBvc3RGb3JtKSB7XG4gICAgbW9kLnVubG9hZCgpXG4gICAgdmFyIHBtb2QgPSBuZXcgUG9zdFNob3codSwgbW9kLm5vZGVzLnJvb3RbMF0sIHtwb3N0IDogbW9kLnBvc3R9KVxuICAgIHUubW9kc1ttb2QucG9zdC5rZXldID0gcG1vZFxuICB9IGVsc2Uge1xuICAgIG1vZC51cGRhdGVGYXYoKSAvLyB1cGRhdGUganVzdCBmYXYgZmxhZyBmb3Igbm93IChjb3VsZCBoYW5kbGUgbGl2ZSB1ZHBhdGVzIElURilcbiAgfVxufVxuXG5Vc2VyTW9kLnByb3RvdHlwZS5yZW1vdmVQb3N0ID0gZnVuY3Rpb24obW9kKSB7XG4gIHZhciB1ID0gdGhpc1xuICBtb2QudW5sb2FkKClcbiAgUG9zdC5kZXN0cm95KG1vZC5wb3N0KVxuICB1Lm5vZGVzLnBvc3RzLnJlbW92ZShtb2Qubm9kZXMucm9vdFswXSlcbiAgZGVsZXRlIHUubW9kc1ttb2QucG9zdC5rZXldXG4gIHUudXBkYXRlUGxhY2Vob2xkZXIoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJNb2RcbiJdfQ==

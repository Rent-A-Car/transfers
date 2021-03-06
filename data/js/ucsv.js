/*! ucsv v1.2.0 2014-04-09
 * Copyright 2014 Peter Johnson
 * Licensed MIT, GPL-3.0
 * https://github.com/uselesscode/ucsv
 * Edited by gornostay25
 */

/**
 * Namespace for CSV functions
 * @namespace
 */
const CSV = (function () {
  "use strict";
  var rxIsInt = /^\d+$/,
    rxIsFloat = /^\d*\.\d+$|^\d+\.\d*$/,
    // If a string has leading or trailing space,
    // contains a comma double quote or a newline
    // it needs to be quoted in CSV output
    rxNeedsQuoting = /^\s|\s$|,|"|\n/,
    trim = (function () {
      // Fx 3.1 has a native trim function, it's about 10x faster, use it if it exists
      if (String.prototype.trim) {
        return function (s) {
          return s.trim();
        };
      }
      return function (s) {
        return s.replace(/^\s*/, '').replace(/\s*$/, '');
      };
    }()),

    isNumber = function (o) {
      return Object.prototype.toString.apply(o) === '[object Number]';
    },

    isString = function (o) {
      return Object.prototype.toString.apply(o) === '[object String]';
    },

    chomp = function (s) {
      if (s.charAt(s.length - 1) !== "\n") {
        // Does not end with \n, just return string
        return s;
      }
      // Remove the \n
      return s.substring(0, s.length - 1);
    },

    prepField = function (field) {
      if (isString(field)) {
        // Escape any " with double " ("")
        field = field.replace(/"/g, '""');

        // If the field starts or ends with whitespace, contains " or , or a newline or
        // is a string representing a number, quote it.
        if (rxNeedsQuoting.test(field) || rxIsInt.test(field) || rxIsFloat.test(field)) {
          field = '"' + field + '"';
        // quote empty strings
        } else if (field === "") {
          field = '""';
        }
      } else if (isNumber(field)) {
        field = field.toString(10);
      } else if (field === null || field === undefined) {
        field = '';
      } else {
        field = field.toString();
      }
      return field;
    },

    CSV = {

      /**
        Converts a Comma Separated Values string into a multi-dimensional array.
        Each row in the CSV becomes an array.
        Empty fields are converted to nulls and non-quoted numbers are converted to integers or floats.

        @method csvToArray
        @return {Array} The CSV parsed as an array
        @param {String} s The string to convert
        @param {Object} [config] Object literal with extra configuration. For historical reasons setting config to `true` is the same as passing `{trim: true}`, but this usage is deprecated and will likely be removed in the next version.
        @param {Boolean} [config.trim=false] If set to True leading and trailing whitespace is stripped off of each non-quoted field as it is imported
        @for CSV
        @static
        @example
            var books,
              csv = 'JavaScript: The Good Parts,"Crockford, Douglas",2008\n' +
                'Object-Oriented JavaScript,"Stefanov, Stoyan",2008\n' +
                'Effective JavaScript,"Herman, David",2012\n';

            books = CSV.csvToArray(csv);

            // books now equals:
            // [
            //   ['JavaScript: The Good Parts', 'Crockford, Douglas', 2008],
            //   ['Object-Oriented JavaScript', 'Stefanov, Stoyan', 2008],
            //   ['Effective JavaScript', 'Herman, David', 2012]
            // ];
      */
      csvToArray: function (s, config) {
        // Get rid of any trailing \n
        s = chomp(s);

        if (config === true) {
          config = {
            trim: true
          };
        } else {
          config = config || {};
        }

        var cur = '', // The character we are currently processing.
          inQuote = false,
          fieldQuoted = false,
          field = '', // Buffer for building up the current field
          row = [],
          out = [],
          trimIt = config.trim === true ? true : false,
          i,
          processField = function (field) {
            var trimmedField = trim(field);
            if (fieldQuoted !== true) {
              // If field is empty set to null
              if (field === '') {
                field = null;
              // If the field was not quoted and we are trimming fields, trim it
              } else if (trimIt === true) {
                field = trimmedField;
              }

              // Convert unquoted numbers to numbers
              if (rxIsInt.test(trimmedField) || rxIsFloat.test(trimmedField)) {
                field = +trimmedField;
              }
            }
            return field;
          };

        for (i = 0; i < s.length; i += 1) {
          cur = s.charAt(i);

          // If we are at a EOF or EOR
          if (inQuote === false && (cur === ',' || cur === "\n")) {
            field = processField(field);
            // Add the current field to the current row
            row.push(field);
            // If this is EOR append row to output and flush row
            if (cur === "\n") {
              out.push(row);
              row = [];
            }
            // Flush the field buffer
            field = '';
            fieldQuoted = false;
          } else {
            // If it's not a ", add it to the field buffer
            if (cur !== '"') {
              field += cur;
            } else {
              if (!inQuote) {
                // We are not in a quote, start a quote
                inQuote = true;
                fieldQuoted = true;
              } else {
                // Next char is ", this is an escaped "
                if (s.charAt(i + 1) === '"') {
                  field += '"';
                  // Skip the next char
                  i += 1;
                } else {
                  // It's not escaping, so end quote
                  inQuote = false;
                }
              }
            }
          }
        }

        // Add the last field
        field = processField(field);
        row.push(field);
        out.push(row);

        return out;
      },
      /**
        Converts a Comma Separated Values string into an array of objects.
        Each row in the CSV becomes an object with properties named after each column.
        Empty fields are converted to nulls and non-quoted numbers are converted to integers or floats.

        @method csvToObject
        @since 1.2.0
        @return {Array} The CSV parsed as an array of objects
        @param {String} s The string containing CSV data to convert
        @param {Object} config Object literal with extra configuration
        @param {Array} [config.columns] An array containing the name of each column in the CSV data. If not
          provided, the first row of the CSV data is assumed to contain the column names.
        @param {Boolean} [config.trim] If true any field parsed from the CSV data will have leading and
                                       trailing whitespace trimmed
        @for CSV
        @static
        @example
            var books,
              csv = 'title,author,year\n' +
                'JavaScript: The Good Parts,"Crockford, Douglas",2008\n' +
                'Object-Oriented JavaScript,"Stefanov, Stoyan",2008\n' +
                'Effective JavaScript,"Herman, David",2012\n';

            books = CSV.csvToObject(csv);

            // books now equals:
            // [
            //   {
            //     title: 'JavaScript: The Good Parts',
            //     author: 'Crockford, Douglas',
            //     year: 2008
            //   },
            //   {
            //     title: 'Object-Oriented JavaScript',
            //     author: 'Stefanov, Stoyan',
            //     year: 2008
            //   },
            //   {
            //     title: 'Effective JavaScript',
            //     author: 'Herman, David',
            //     year: 2012
            //   }
            // ];
      */
      csvToObject: function (s, config) {
        config = config !== undefined ? config : {};
        var columns = config.columns,
            trimIt = !!config.trim,
            csvArray = this.csvToArray(s, trimIt);

        // if columns were not provided, assume they are
        // in the first row
        if (!columns) {
          columns = csvArray.shift();
        }

        return csvArray.map(function (row) {
          var obj = {},
            i = 0,
            len = columns.length;
          for (; i < len; i += 1) {
            obj[columns[i]] = row[i];
          }
          return obj;
        });
      }
    };
  // Add support for use as a CommonJS module.
  if (typeof exports === "object") {
    exports.csvToArray = CSV.csvToArray;
    exports.csvToObject = CSV.csvToObject;
  }

  return CSV;
}());
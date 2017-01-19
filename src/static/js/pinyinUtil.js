/**
 * Created by wang on 2017/1/19.
 */
/*eslint-disable */
/**
 * 汉字与拼音互转工具，根据导入的字典文件的不同支持不同
 * 对于多音字目前只是将所有可能的组合输出，准确识别多音字需要完善的词库，而词库文件往往比字库还要大，所以不太适合web环境。
 * @start 2016-09-26
 * @last 2016-09-29
 */

const pinyin_dict_notone = require('./pinyin_dict_notone');

window.pinyin_dict_notone = pinyin_dict_notone;


const pinyinUtil =
  {
    /**
     * 解析各种字典文件，所需的字典文件必须在本JS之前导入
     */
    dict: [],
    parseDict: function () {
      // 如果导入了 pinyin_dict_firstletter.js
      if (window.pinyin_dict_firstletter) {
        this.dict.firstletter = pinyin_dict_firstletter;
      }
      // 如果导入了 pinyin_dict_notone.js
      if (window.pinyin_dict_notone) {
        this.dict.notone = {};
        this.dict.py2hz = pinyin_dict_notone; // 拼音转汉字
        for (var i in pinyin_dict_notone) {
          var temp = pinyin_dict_notone[ i ];
          for (var j = 0, len = temp.length; j < len; j++) {
            this.dict.notone[ temp[ j ] ] = i; // 不考虑多音字
          }
        }
      }
      // 如果导入了 pinyin_dict_withtone.js
      if (window.pinyin_dict_withtone) {
        this.dict.withtone = {};
        var temp = pinyin_dict_withtone.split(',');
        for (var i = 0, len = temp.length; i < len; i++) {
          // 这段代码耗时28毫秒左右，对性能影响不大，所以一次性处理完毕
          this.dict.withtone[ String.fromCharCode(i + 19968) ] = temp[ i ]; // 这里先不进行split(' ')，因为一次性循环2万次split比较消耗性能
        }

        // 拼音 -> 汉字
        if (window.pinyin_dict_notone) {
          // 对于拼音转汉字，我们优先使用pinyin_dict_notone字典文件
          // 因为这个字典文件不包含生僻字，且已按照汉字使用频率排序
          this.dict.py2hz = pinyin_dict_notone; // 拼音转汉字
        }
        else {
          // 将字典文件解析成拼音->汉字的结构
          // 与先分割后逐个去掉声调相比，先一次性全部去掉声调然后再分割速度至少快了3倍，前者大约需要120毫秒，后者大约只需要30毫秒（Chrome下）
          var notone = pinyinUtil.removeTone(pinyin_dict_withtone).split(',');
          var py2hz = {}, py, hz;
          for (var i = 0, len = notone.length; i < len; i++) {
            hz = String.fromCharCode(i + 19968); // 汉字
            // = aaa[i];
            py = notone[ i ].split(' '); // 去掉了声调的拼音数组
            for (var j = 0; j < py.length; j++) {
              py2hz[ py[ j ] ] = (py2hz[ py[ j ] ] || '') + hz;
            }
          }
          this.dict.py2hz = py2hz;
        }
      }
    },
    /**
     * 根据汉字获取拼音，如果不是汉字直接返回原字符
     * @param chinese 要转换的汉字
     * @param splitter 分隔字符，默认用空格分隔
     * @param withtone 返回结果是否包含声调，默认是
     * @param polyphone 是否支持多音字，默认否
     */
    getPinyin: function (chinese, splitter, withtone, polyphone) {
      if (!chinese || /^ +$/g.test(chinese)) return '';
      splitter = splitter == undefined ? ' ' : splitter;
      withtone = withtone == undefined ? true : withtone;
      polyphone = polyphone == undefined ? false : polyphone;
      var result = [];
      if (this.dict.withtone) // 优先使用带声调的字典文件
      {
        for (var i = 0, len = chinese.length; i < len; i++) {
          var pinyin = this.dict.withtone[ chinese[ i ] ];
          if (pinyin) {
            if (!polyphone) pinyin = pinyin.replace(/ .*$/g, ''); // 如果不需要多音字
            if (!withtone) pinyin = this.removeTone(pinyin); // 如果不需要声调
          }
          result.push(pinyin || chinese[ i ]);
        }
      }
      else if (this.dict.notone) // 使用没有声调的字典文件
      {
        if (withtone) console.warn('pinyin_dict_notone 字典文件不支持声调！');
        if (polyphone) console.warn('pinyin_dict_notone 字典文件不支持多音字！');
        for (var i = 0, len = chinese.length; i < len; i++) {
          var temp = chinese.charAt(i);
          result.push(this.dict.notone[ temp ] || temp);
        }
      }
      else {
        throw '抱歉，未找到合适的拼音字典文件！';
      }
      if (!polyphone) return result.join(splitter);
      else {
        if (window.pinyin_dict_polyphone) return parsePolyphone(chinese, result, splitter, withtone);
        else return handlePolyphone(result, ' ', splitter);
      }
    },
    /**
     * 获取汉字的拼音首字母
     * @param str 汉字字符串，如果遇到非汉字则原样返回
     * @param polyphone 是否支持多音字，默认false，如果为true，会返回所有可能的组合数组
     */
    getFirstLetter: function (str, polyphone) {
      polyphone = polyphone == undefined ? false : polyphone;
      if (!str || /^ +$/g.test(str)) return '';
      if (this.dict.firstletter) // 使用首字母字典文件
      {
        var result = [];
        for (var i = 0; i < str.length; i++) {
          var unicode = str.charCodeAt(i);
          var ch = str.charAt(i);
          if (unicode >= 19968 && unicode <= 40869) {
            ch = this.dict.firstletter.all.charAt(unicode - 19968);
            if (polyphone) ch = this.dict.firstletter.polyphone[ unicode ] || ch;
          }
          result.push(ch);
        }
        if (!polyphone) return result.join(''); // 如果不用管多音字，直接将数组拼接成字符串
        else return handlePolyphone(result, '', ''); // 处理多音字，此时的result类似于：['D', 'ZC', 'F']
      }
      else {
        var py = this.getPinyin(str, ' ', false, polyphone);
        py = py instanceof Array ? py : [ py ];
        var result = [];
        for (var i = 0; i < py.length; i++) {
          result.push(py[ i ].replace(/(^| )(\w)\w*/g, function (m, $1, $2) {
            return $2.toUpperCase();
          }));
        }
        if (!polyphone) return result[ 0 ];
        else return simpleUnique(result);
      }
    },
    /**
     * 拼音转汉字，只支持单个汉字，返回所有匹配的汉字组合
     * @param pinyin 单个汉字的拼音，不能包含声调
     */
    getHanzi: function (pinyin) {
      if (!this.dict.py2hz) {
        throw '抱歉，未找到合适的拼音字典文件！';
      }
      return this.dict.py2hz[ pinyin ] || '';
    },
    /**
     * 去除拼音中的声调，比如将 xiǎo míng tóng xué 转换成 xiao ming tong xue
     * @param pinyin 需要转换的拼音
     */
    removeTone: function (pinyin) {
      var toneMap =
        {
          "ā": "a1",
          "á": "a2",
          "ǎ": "a3",
          "à": "a4",
          "ō": "o1",
          "ó": "o2",
          "ǒ": "o3",
          "ò": "o4",
          "ē": "e1",
          "é": "e2",
          "ě": "e3",
          "è": "e4",
          "ī": "i1",
          "í": "i2",
          "ǐ": "i3",
          "ì": "i4",
          "ū": "u1",
          "ú": "u2",
          "ǔ": "u3",
          "ù": "u4",
          "ü": "v0",
          "ǖ": "v1",
          "ǘ": "v2",
          "ǚ": "v3",
          "ǜ": "v4",
          "ń": "n2",
          "ň": "n3",
          "": "m2"
        };
      return pinyin.replace(/[āáǎàōóǒòēéěèīíǐìūúǔùüǖǘǚǜńň]/g, function (m) {
        return toneMap[ m ][ 0 ];
      });
    }
  };

pinyinUtil.parseDict();
window.pinyinUtil = pinyinUtil;

module.exports = pinyinUtil;


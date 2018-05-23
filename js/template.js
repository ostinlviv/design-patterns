var templateString = 'Hello, {{city}} {{age}}! #{{name}}';

var user1 = {id:1, name:'john', age:123, city:'kyiv'};
var user2 = {id:2, name:'alex', age:55, city:'lviv'};

var compile = function (template) {
    return function (obj) {
            var re = /{{(.+?)}}/g,
                reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,
                code = 'with(obj) { var r=[];\n',
                cursor = 0,
                result,
                match;
            var add = function(line, js) {
                js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                    (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
                return add;
            }
            while(match = re.exec(template)) {
                add(template.slice(cursor, match.index))(match[1], true);
                cursor = match.index + match[0].length;
            }
            add(template.substr(cursor, template.length - cursor));
            code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');
            try { result = new Function('obj', code).apply(obj, [obj]); }
            catch(err) { console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); }
            return result;
    }
};

var template = compile (templateString);
console.log(template(user1)); // => Hello, john!
console.log(template(user2)); // => Hello, alex!

var $user1 = document.querySelector('#user1');
var $user2 = document.querySelector('#user2');
$user1.innerHTML = template(user1);
$user2.innerHTML = template(user2);



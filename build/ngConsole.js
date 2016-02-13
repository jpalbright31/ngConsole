var dev=!1;app.directive("ngConsole",["$rootScope",function(e){return{restrict:"AE",transclude:!0,template:'<style>ng-console{position:relative;display:inline-block;width:100%;height:auto;padding:0px;margin:0px;} .console,.console *{left:0;box-sizing:border-box;margin:0}.console{position:relative;display:inline-block;float:left;width:100%;min-height:300px;padding:10px;top:0;background-color:rgba(0,0,0,.8);border:0;outline:0;overflow-x:hidden;overflow-y:scroll;transition:all .3s;z-index:50}.console.fixed{position:fixed;display:block;height:50%;top:-50%}.console.fixed.fullscreen{height:100%!important;top:-100%!important}.console.fixed.fullscreen.open,.console.fixed.open,.console.open{top:0!important}.console *{padding:0;top:0;color:#ccc;font-family:monospace;font-size:11px;line-height:16px;list-style:none;text-align:left}.console input::-webkit-calendar-picker-indicator{display:none}.console .command-list .prefix,.console .command-list input[type=text],.console .command-list p,.console .new-line .prefix,.console .new-line input[type=text],.console .new-line p{position:relative;display:block;float:left;width:100%;height:auto;padding:0;margin:0;bottom:0;color:#ccc;font-family:monospace;font-size:11px;line-height:16px;text-align:left;appearance:none;-moz-appearance:none;-webkit-appearance:none;background-color:transparent;border:none;outline:0}.console .command-list, .console .new-line{position: relative;display: block;float: left;width: 100%;}.console .new-line .prefix{width:auto}.console .new-line input[type=text]{width:100%;max-width:calc(100% - 130px);padding:0 5px}</style><form name="console" role="form" novalidate class="console" ng-class="{\'open\': open, \'fixed\': fixed, \'fullscreen\': fullscreen}" ng-submit="executeCommand()"><!-- Command list --><div class="command-list"></div><div class="new-line"><span class="prefix">{{ customPrefix }}</span><input type="text" name="command" ng-model="command" tab-index="1" autofocus autocomplete="off" /><datalist id="commands"><option ng-repeat="command in commands" value="{{ command.name }}"></datalist></div></form>',scope:{open:"=open",fixed:"=fixed",fullscreen:"=fullscreen",customHeight:"=customHeight",customPrefix:"=customPrefix",customCommands:"=customCommands"},link:function(e,n,o){function t(e,n,o,t){this.name=e,this.description="&nbsp;&nbsp;<span style='color: white;'>"+e+"</span>: "+n,this.params=o,this.exec=t}e.init=function(){if(e.customHeight&&!e.fullscreen&&(document.querySelector(".console").style.height=e.customHeight,e.fixed&&(document.querySelector(".console").style.top=-1*e.customHeight)),e.customPrefix||(e.customPrefix="ngConsole"),e.customPrefix+=">",e.commands={},e.commands.browser=new t("browser","Some actions related to the browser.",[{name:"info",description:"Show the the version of the browser you are using."}],function(e,n){n&&n.info&&e(navigator.userAgent)}),e.commands.clear=new t("clear","Clean command history.",!1,function(e,n){document.querySelector(".command-list").innerHTML=""}),e.commands.cls=new t("cls","Clean command history.",!1,e.commands.clear.exec),e.commands.console=new t("console","Some actions related to ngConsole",[{name:"bg",description:"Change the ngConsole's background."},{name:"info",description:"Display info about ngConsole."},{name:"reset",description:"Restore ngConsole's state to its initial state."}],function(e,n){n&&(n.bg&&(document.querySelector(".console").style.background=n.bg),n.info&&(e("<b><span style='color: white'>ngConsole v1.2.0</span></b>"),e("<b><span style='color: white'>Author</span></b>: ImperdibleSoft (<a href='http://www.imperdiblesoft.com' target='_blank'>http://www.imperdiblesoft.com</a>)")),n.reset&&(document.querySelector(".console").style.background="rgba(0, 0, 0, 0.8)"))}),e.commands.exit=new t("exit","Close the console.",!1,function(n,o){e.commands.clear.exec(),e.toggle()}),e.commands.help=new t("help","Show all available commands.",!1,function(n,o){var t="<p>Available commands: ";t+="<ul>";for(var i in e.commands){var l=e.commands[i];if(t+="<li>",t+=l.description,l.params){t+="<ul>";for(var a in l.params){var c=l.params[a];t+="<li>",t+="&nbsp;&nbsp;&nbsp;&nbsp;<span style='color: white'>--"+c.name+"</span>: "+c.description,t+="</li>"}t+="</ul>"}t+="</li>"}t+="</ul>",n(t)}),e.customCommands)for(var n in e.customCommands){var o=e.customCommands[n];e.commands[o.name]=new t(o.name,o.description,o.params,o.action)}},e.toggle=function(){e.open=!e.open,e.open===!0?(e.scrollBottom(),document.querySelector(".console .new-line input")&&document.querySelector(".console .new-line input").focus()):document.querySelector(".console .new-line input")&&(document.querySelector(".console .new-line input").blur(),e.cleanLn()),e.apply()},e.printLn=function(e){var n=document.querySelector(".console .command-list").innerHTML;document.querySelector(".console .command-list").innerHTML=n+"<p>"+e+"</p>"},e.cleanLn=function(){e.command=""},e.scrollBottom=function(){var e=document.querySelector(".console"),n=document.querySelector(".command-list").clientHeight+document.querySelector(".new-line").clientHeight;e.scrollTop=n},e.apply=function(){dev&&dev!==!0||e.$apply()},e.executeCommand=function(){var n=e.console.command.$modelValue?e.console.command.$modelValue:"";e.cleanLn(),e.printLn(e.customPrefix+" <span style='color: white;'>"+n+"</span>");var o=!1;for(var t in e.commands){var i=e.commands[t];if(n.indexOf(" --")>=0&&n.substr(0,n.indexOf(" --"))===i.name||n.indexOf(" --")<0&&n===i.name){if(o=!0,n.indexOf(" --")>=0){var l=n.split(" --"),a={};for(var c in l)if(0!=c){var s=l[c].split("="),r={name:s[0],value:s[1]&&""!=s[1]?s[1].replaceAll('"',""):!0};for(var m in i.params)r.name===i.params[m].name&&(a[r.name]=r.value)}i.exec(e.printLn,a)}else i.exec(e.printLn);break}}o||(""!=n&&n?e.printLn("'<b><span style='color: white;'>"+n+"</span></b>': command not found. Use 'help' for more info."):e.printLn("")),e.scrollBottom()},String.prototype.replaceAll=function(e,n){var o=this;return o.replace(new RegExp(e,"g"),n)},document.addEventListener("keyup",function(n){220==n.keyCode||"º"==n.key?(n.preventDefault(),e.toggle()):(27==n.keyCode||"Escape"==n.key)&&(n.preventDefault(),""!=e.command?e.cleanLn():1==e.fixed&&1==e.open&&e.toggle(),e.apply())}),e.init()}}}]);

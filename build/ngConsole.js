var dev=!1;app.directive("ngConsole",["$rootScope",function(e){return{restrict:"AE",transclude:!0,template:'<style>ng-console{position:relative;display:inline-block;width:100%;height:auto;padding:0px;margin:0px;} .console,.console *{left:0;box-sizing:border-box;margin:0}.console{position:relative;display:inline-block;float:left;width:100%;min-height:300px;padding:10px;top:0;background-color:rgba(0,0,0,.8);border:0;outline:0;overflow-x:hidden;overflow-y:scroll;transition:all .3s;z-index:50}.console.fixed{position:fixed;display:block;height:50%;top:-50%}.console.fixed.fullscreen{height:100%!important;top:-100%!important}.console.fixed.fullscreen.open,.console.fixed.open,.console.open{top:0!important}.console *{padding:0;top:0;color:#ccc;font-family:monospace;font-size:11px;line-height:16px;list-style:none;text-align:left}.console input::-webkit-calendar-picker-indicator{display:none}.console .command-list .prefix,.console .command-list input[type=text],.console .command-list p,.console .new-line .prefix,.console .new-line input[type=text],.console .new-line p{position:relative;display:block;float:left;width:100%;height:auto;padding:0;margin:0;bottom:0;color:#ccc;font-family:monospace;font-size:11px;line-height:16px;text-align:left;appearance:none;-moz-appearance:none;-webkit-appearance:none;background-color:transparent;border:none;outline:0}.console .command-list, .console .new-line{position: relative;display: block;float: left;width: 100%;}.console .new-line .prefix{width:auto}.console .new-line input[type=text]{width:100%;max-width:calc(100% - 130px);padding:0 5px}</style><form name="console" role="form" novalidate class="console" ng-class="{\'open\': open, \'fixed\': fixed, \'fullscreen\': fullscreen}" ng-submit="executeCommand()"><!-- Command list --><div class="command-list"></div><div class="new-line"><span class="prefix">{{ customPrefix }}</span><input type="text" name="command" ng-model="command" tab-index="1" autofocus autocomplete="off" /><datalist id="commands"><option ng-repeat="command in commands" value="{{ command.name }}"></datalist></div></form>',scope:{open:"=open",fixed:"=fixed",fullscreen:"=fullscreen",customHeight:"=customHeight",customPrefix:"=customPrefix",customCommands:"=customCommands"},link:function(e,n,o){function t(e,n,o){this.name=e,this.description="&nbsp;&nbsp;<span style='color: white;'>"+e+"</span>: "+n,this.exec=o}e.init=function(){if(e.customHeight&&!e.fullscreen&&(document.querySelector(".console").style.height=e.customHeight,e.fixed&&(document.querySelector(".console").style.top=-1*e.customHeight)),e.customPrefix||(e.customPrefix="ngConsole"),e.customPrefix+=">",e.commands={},e.commands.help=new t("help","Show all available commands.",function(){var n="<p>Available commands: ";n+="<ul>";for(var o in e.commands){var t=e.commands[o];n+="<li>"+t.description+"</li>"}n+="</ul>",e.printLn(n),e.scrollBottom()}),e.commands.clear=new t("clear","Clean command history.",function(){document.querySelector(".command-list").innerHTML=""}),e.commands.cls=new t("cls","Clean command history.",e.commands.clear.exec),e.commands.exit=new t("exit","Close the console.",function(){e.commands.clear.exec(),e.toggle()}),e.customCommands)for(var n in e.customCommands){var o=e.customCommands[n];e.commands[o.name]=new t(o.name,o.description,o.action)}},e.toggle=function(){e.open=!e.open,e.open===!0?(e.scrollBottom(),document.querySelector(".console .new-line input")&&document.querySelector(".console .new-line input").focus()):document.querySelector(".console .new-line input")&&(document.querySelector(".console .new-line input").blur(),e.cleanLn()),e.apply()},e.printLn=function(e){var n=document.querySelector(".console .command-list").innerHTML;document.querySelector(".console .command-list").innerHTML=n+"<p>"+e+"</p>"},e.cleanLn=function(){e.command=""},e.scrollBottom=function(){var e=document.querySelector(".console"),n=document.querySelector(".command-list").clientHeight+document.querySelector(".new-line").clientHeight;e.scrollTop=n},e.apply=function(){dev&&dev!==!0||e.$apply()},e.executeCommand=function(){var n=e.console.command.$modelValue?e.console.command.$modelValue:"";e.cleanLn(),e.printLn(e.customPrefix+" <span style='color: white;'>"+n+"</span>");var o=!1;for(var t in e.commands){var i=e.commands[t];if(n.indexOf(" ")>=0&&n.substr(0,n.indexOf(" "))===i.name||n.indexOf(" ")<0&&n===i.name){if(o=!0,n.indexOf(" ")>=0){var l=n.substr(n.indexOf(" ")+1);i.exec(e.printLn,l)}else i.exec(e.printLn);break}}o||(""!=n&&n?e.printLn("'<b><span style='color: white;'>"+n+"</span></b>': command not found. Use 'help' for more info."):e.printLn("")),e.scrollBottom()},document.addEventListener("keyup",function(n){220==n.keyCode||"º"==n.key?(n.preventDefault(),e.toggle()):(27==n.keyCode||"Escape"==n.key)&&(n.preventDefault(),""!=e.command?e.cleanLn():1==e.fixed&&1==e.open&&e.toggle(),e.apply())}),e.init()}}}]);

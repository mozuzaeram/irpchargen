/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import { stat } from 'original-fs';
import './index.css';
enum STATCODE {
	STR=0,
	AGL,
	VIT,
	INT,
	WIS,
	KNW,
	APP,
	CHM,
	SOC,
	AUR,
	PTY,
	WIL
};

const STATNAMES = [
"STR",
"AGL",
"VIT",
"INT",
"WIS",
"KNW",
"APP",
"CHM",
"SOC",
"AUR",
"PTY",
"WIL"];


class StatBlock{
	public stats: number[];
	constructor() {
		this.stats = new Array<number>();
		this.stats[STATCODE.STR]=20;
		this.stats[STATCODE.AGL]=20;
		this.stats[STATCODE.VIT]=20;
		this.stats[STATCODE.INT]=20;
		this.stats[STATCODE.WIS]=20;
		this.stats[STATCODE.KNW]=20;
		this.stats[STATCODE.APP]=20;
		this.stats[STATCODE.CHM]=20;
		this.stats[STATCODE.SOC]=20;
		this.stats[STATCODE.AUR]=20;
		this.stats[STATCODE.PTY]=20;
		this.stats[STATCODE.WIL]=20;
	}
	getCharSheetInfoRow(stat: STATCODE): Map<string,string> {

		let result = new Map<string,string>();
		function add(attr:string,val:any){
			result.set(attr,val.toString());
		}
		let rating = this.stats[stat];
		let save = Math.min(90,rating*5);
		result.set(STATNAMES[stat],rating.toString());
		result.set(STATNAMES[stat]+"_save",save.toString());
		switch(stat){
			case STATCODE.STR:{		
				add("Attack Modifier",3);
				add("Damage",3);
				add("Load Limit",3);
				add("Weapon Speed",3);
				return result;
			}
			case STATCODE.AGL:{
				add("Attack Modifier",3);
				add("Defensive Adj.",3);
				add("Initiative",3);
				add("Weapon Speed",3);
				return result;
			}
			case STATCODE.VIT:{
				add("Healing Rate",3);
				add("Poison Resistance",3);
				add("Disease Resistance",3);
				return result;
			}
			case STATCODE.INT:{
				add("Spoken",3);
				add("Written",3);
				add("Aura Control Adj.",3);
				add("Initiative",3);
				add("Ctrl. Res. Adj.",3);
				return result;
			}
			case STATCODE.WIS:{
				add("Piety Control Adj.",3);
				add("Illusion Resistance",3);
				add("Ctrl. Res. Adj.",3);
				return result;
			}
			case STATCODE.KNW:{
				add("Class Skills",3);
				add("Racial Skills",3);
				add("Social Skils",3);
				add("Memorization Points",3);
				return result;
			}
			case STATCODE.APP:{
				add("Morale Adjustment",3);
				add("Control Adjustment",3);
				return result;
			}
			case STATCODE.CHM:{
				add("Morale Adjustment",3);
				add("Control Adjustment",3);
				return result;
			}
			case STATCODE.SOC:{
				add("Morale Adjustment",3);
				add("Rank",3);
				return result;
			}
			case STATCODE.AUR:{
				add("Magic Resistance",3);
				return result;
			}
			case STATCODE.PTY:{
				add("Commune Chance",3);
				return result;
			}
			case STATCODE.WIL:{
				add("Control Resistance",3);
				add("Endure",3);
				return result;
			}
			default:{
				return null;
			}
		}
	}
}




console.log('???? This message is being logged by "renderer.js", included via webpack');
document.addEventListener('DOMContentLoaded',function(){
	let mystats = new StatBlock();
	populateStats(mystats);
});
function stripws(str: string): string {
	return str.replace(/\s/g,'').replace(/\./g,'')
}
const populateStats = (block: StatBlock) => {
	let main = document.querySelector('#stattable');
	let stat_table = document.createElement('table');
	
	let end_block = document.createElement('td');
	end_block.setAttribute("rowspan","3");
	end_block.innerHTML = "Endurance<br>23";

	let mental_block = document.createElement('td');
	mental_block.setAttribute("rowspan","3");
	mental_block.innerHTML = "Mental<br>23";

	let charm_block = document.createElement('td');
	charm_block.setAttribute("rowspan","3");
	charm_block.innerHTML = "Charm<br>23";

	let fortune_block = document.createElement('td');
	fortune_block.setAttribute("rowspan","3");
	fortune_block.innerHTML = "Fortune<br>23";

	stat_table.setAttribute("border","1");
	
	function addstats(from:STATCODE,to:STATCODE,groupblock:HTMLTableCellElement) {
		
		let statdata = block.getCharSheetInfoRow(from);
		let newrow = document.createElement('tr');
		newrow.appendChild(groupblock);
		statdata.forEach( (value,key) => {
			if(key.endsWith("_save") == false) {
				let newlabel = document.createElement('td');
				newlabel.innerHTML = key;
				newrow.appendChild(newlabel);
			}
			let newdata = document.createElement('td');
			newdata.setAttribute("id",stripws(key)+"_label");
			newdata.innerHTML = value;
			newrow.appendChild(newdata);
		});
		stat_table.appendChild(newrow);

		for (let index = from+1; index <= to; index++){
			let statdata = block.getCharSheetInfoRow(index);
			let newrow = document.createElement('tr');
			statdata.forEach( (value,key) => {
				if(key.endsWith("_save") == false) {
					let newlabel = document.createElement('td');
					newlabel.innerHTML = key;
					newrow.appendChild(newlabel);
				}
				let newdata = document.createElement('td');
				newdata.setAttribute("id",stripws(key)+"_label");
				newdata.innerHTML = value;
				newrow.appendChild(newdata);
			});
			stat_table.appendChild(newrow);
		}
	}

	addstats(STATCODE.STR,STATCODE.VIT,end_block);
	addstats(STATCODE.INT,STATCODE.KNW,mental_block);
	addstats(STATCODE.APP,STATCODE.SOC,charm_block);
	addstats(STATCODE.AUR,STATCODE.WIL,fortune_block);

	main.appendChild(stat_table);   
}
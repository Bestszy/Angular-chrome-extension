import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ColorPickerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  color = '#ffffff';

  ngOnInit(): void {
    chrome.storage.sync.get('color', ({color})=>{
      this.color=color;
    })
  }
  public sender(){
    console.log("aaa")
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, { greeting: "Hello from Popup" }, (response) => {
          console.log(response);
        });
    });
  }

  public updateColor(color: string) {
    chrome.storage.sync.set({ color });
  }


  public colorize() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id! },
        func: updateBackgroundColor,
        args: [this.color]
      });
    });
  }
}
const updateBackgroundColor = (color: string) => document.body.style.backgroundColor = color;
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blocks-layout',
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
})
export class BlocksLayout {}

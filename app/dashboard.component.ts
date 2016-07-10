import { Component }          from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';

// import { HeroService }        from './blog.service';

@Component({
  selector: 'blog-details',

  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css'],
  directives: [ROUTER_DIRECTIVES],
  // providers: [
  //   HeroService,
  // ]
})
export class DashboardComponent {
  about = 'Hi, I am Janna Safran and I am the author of this blog. I am a second year student at Dickinson College. Contact me at janna.safran@gmail.com if you have any questions.';
  
}
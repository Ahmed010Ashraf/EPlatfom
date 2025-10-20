import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { routes } from '../../app/app.routes';

@Component({
  selector: 'app-courses',
  imports: [RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses implements OnInit {

  constructor(private route:ActivatedRoute){}
CourseId : string = "";

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
      this.CourseId = params.get('id') || "";
    });
  }

   courses = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      description: 'Master front-end and back-end development with Angular, .NET, and modern tools.',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 2,
      title: 'Python for Data Science',
      description: 'Learn how to analyze data, visualize results, and apply machine learning techniques.',
      image: 'https://images.unsplash.com/photo-1581093588401-22d72b1e1b3a?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      description: 'Build stunning, user-centered interfaces and bring your creative ideas to life.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 4,
      title: 'Artificial Intelligence Basics',
      description: 'Explore AI fundamentals, neural networks, and the future of intelligent systems.',
      image: 'https://images.unsplash.com/photo-1581091012184-7b1cc2200ca3?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 5,
      title: 'Mobile App Development',
      description: 'Create cross-platform apps with Angular and Ionic for Android and iOS.',
      image: 'https://images.unsplash.com/photo-1591696331116-90b66c6f1a5e?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 6,
      title: 'Cybersecurity Essentials',
      description: 'Understand modern threats, ethical hacking, and how to protect digital systems.',
      image: 'https://images.unsplash.com/photo-1625314868143-20e93ce10c6b?auto=format&fit=crop&w=900&q=80'
    }
  ];
}

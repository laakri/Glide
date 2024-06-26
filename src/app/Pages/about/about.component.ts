import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
}

interface Milestone {
  year: number;
  achievement: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  teamMembers: TeamMember[] = [
    {
      name: 'Emma Johnson',
      position: 'Founder & CEO',
      bio: "Emma founded Glide with a vision to revolutionize online shopping. Her background in tech and fashion drives Glide's innovative approach.",
      imageUrl: 'https://i.pravatar.cc/300?img=1',
    },
    {
      name: 'Alex Chen',
      position: 'CTO',
      bio: 'Alex leads our tech team, ensuring Glide stays at the cutting edge of e-commerce technology and user experience.',
      imageUrl: 'https://i.pravatar.cc/300?img=2',
    },
    {
      name: 'Sophia Patel',
      position: 'Head of Design',
      bio: 'Sophia brings creativity and user-centric design to every aspect of Glide, from our website to our product curation.',
      imageUrl: 'https://i.pravatar.cc/300?img=3',
    },
    {
      name: 'Marcus Brown',
      position: 'Head of Customer Experience',
      bio: 'Marcus ensures that every customer interaction with Glide is smooth, enjoyable, and exceeds expectations.',
      imageUrl: 'https://i.pravatar.cc/300?img=4',
    },
  ];

  milestones: Milestone[] = [
    {
      year: 2020,
      achievement: 'Glide founded with a mission to reinvent online shopping',
    },
    {
      year: 2021,
      achievement: 'Launched mobile app and reached 100,000 users',
    },
    {
      year: 2022,
      achievement:
        'Expanded to international markets and introduced sustainable product lines',
    },
    {
      year: 2023,
      achievement:
        'Achieved carbon neutrality in operations and hit 1 million active users',
    },
    {
      year: 2024,
      achievement:
        'Opened first physical concept store and launched AI-powered personal shopping assistant',
    },
  ];

  values: string[] = [
    'Innovation',
    'Sustainability',
    'Customer-Centric',
    'Integrity',
    'Diversity & Inclusion',
  ];
}

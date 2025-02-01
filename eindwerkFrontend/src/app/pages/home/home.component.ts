import { Component, signal, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { PostPopupComponent } from '../../post-popup/post-popup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostPopupComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private databaseService: DatabaseService, private elementRef: ElementRef, private renderer: Renderer2) {}
 
  jobs = signal<any[]>([]);
  mainProgressBar = 0;
  isPostPopupVisible = false; 
  maxResults = 5;

  updateMainProgressBar(jobFee: number): void {
    if (this.mainProgressBar < 100) {
      const percentageToAdd = jobFee * 0.1;
      this.mainProgressBar += percentageToAdd;

      if (this.mainProgressBar >= 100) {
        this.mainProgressBar = 100;
        setTimeout(() => {
          this.popup(); 
        }, 1000); 
      }
    }
  }

  popup() {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'flex';
    }
    setTimeout(() => {
      this.mainProgressBar = 0;
    }, 3000);
  }

  hidePopup(): void {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'none';
      console.log('Popup verborgen');
    }
  }

 
  ngOnInit() {
    this.databaseService.GetProfile().then((jobs) => {
      console.log(jobs); 
      this.jobs.set(jobs); 
    });
  }

  showPostPopup(): void {
    console.log('Post popup openen'); 
    this.isPostPopupVisible = true; 
  }

  hidePostPopup(): void {
    console.log('Post popup sluiten');
    this.isPostPopupVisible = false;
  }

  handlePostCreated(newPost: any): void {
    console.log('Nieuwe post toegevoegd:', newPost); 
    this.jobs.update((jobs) => [newPost, ...jobs]);
    this.hidePostPopup(); 
  }
  searchPage(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const pageContent = this.elementRef.nativeElement.querySelectorAll('h1, p');
    const resultsList = this.elementRef.nativeElement.querySelector('#search-results');

    // Clear previous search results
    resultsList.innerHTML = '';

    if (!searchTerm) return;

    let resultCount = 0;

    pageContent.forEach((node: HTMLElement) => {
      const text = node.textContent || '';
      const isVisible = this.isElementVisible(node);

      if (isVisible && text.toLowerCase().includes(searchTerm) && resultCount < this.maxResults) {
        const resultItem = this.renderer.createElement('li');
        const resultText = this.renderer.createText(
          `${text.substring(0, 50)}`
        );
        this.renderer.appendChild(resultItem, resultText);

        this.renderer.listen(resultItem, 'click', () => {
          node.scrollIntoView({ behavior: 'smooth', block: 'center' });
          node.style.backgroundColor = '#d6d6d6';
          setTimeout(() => (node.style.backgroundColor = ''), 2000);
        });

        this.renderer.appendChild(resultsList, resultItem);
        resultCount++;
      }
    });
  }

  // Helper function to check if an element is visible
  private isElementVisible(element: HTMLElement): boolean {
    return element.offsetParent !== null; // Returns false if the element or its parent is hidden
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  mainProgress: number = 0;

  constructor() {
    this.fetchUserDataAndTasks();
  }

  usersHTML: any = "test";

  // Update progress bar
  updateMainProgressBar(increment: number): void {
    const mainProgressBar = document.querySelector('.main-progress-bar') as HTMLElement;
    this.mainProgress += increment;
    if (this.mainProgress > 100) this.mainProgress = 100;
    mainProgressBar.style.width = `${this.mainProgress}%`;

    if (this.mainProgress === 100) {
      this.showPopup();
    }
  }

  // Fetch random number from API
  async fetchRandomNumber(): Promise<number> {
    try {
      const response = await fetch('https://www.randomnumberapi.com/api/v1.0/random?min=50&max=150&count=1');
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error('Error fetching random number from API:', error);
      return Math.floor(Math.random() * (150 - 50 + 1)) + 50;
    }
  }

  async fetchUserDataAndTasks(): Promise<void> {
    try {
      const userResponse = await fetch('https://randomuser.me/api/?results=15&nat=nl');
      if (!userResponse.ok) {
        throw new Error(`API Error: ${userResponse.statusText}`);
      }
      const userData = await userResponse.json();
      const { results: users } = userData;
      let usersHTML = '';

      const randomNumbers = await Promise.all(users.map(() => this.fetchRandomNumber()));

      users.forEach((user: any, index: any) => {
        const { first, last } = user.name;
        const { login, picture } = user;
        const randomNumber = randomNumbers[index];
        const increment = randomNumber / 10;

        usersHTML += `
         <style>
         /* Container voor de voortgangsbalk */
.main-progress-bar-container {
    width: 100%;
    background: #e0e0e0;
    height: 55px;
    border-radius: 5px;
    margin-bottom: 20px;
    margin-top: -20px;
    align-items: center;
  }
  
  /* De werkelijke voortgangsbalk */
  .main-progress-bar {
    background: rgb(21, 4, 178);
    width: 0%;
    height: 100%;
    transition: width 0.3s ease;
    border-radius: 5px;
  }
  
  /* Styling voor de random nummer tekst */
  .random-number {
    font-size: 14px;
    color: gray;
    margin-top: 5px;
  }
  
  /* Styling voor de knop om de voortgang toe te voegen */
  .add-progress-btn {
    margin-top: 10px;
    background-color: #165aa2;
    color: white;
    border: none;
    padding: 10px 20px;
  }
  
  /* Hover-effect voor de knop */
  .add-progress-btn:hover {
    background-color: #0056b3;
  }
  
  /* Pop-up container */
  .popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    display: none;
  }
  
  .popup-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }
  
  .post-container {
    padding: 20px;
    background-color: #dfdfdf3f;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 1000px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    gap: 40px;

}


.profile-picture {
    border-radius: 20%;
}

.post-header {
    display: flex;
    align-items: center;
    gap: 10px;
}

.name {
    font-weight: bold;
    font-size: 20px; 
    color: #000000;    
}

.username {
    font-size: 16px;
    color: #515151; 
}

.zoekertje {
    font-size: 16px;
    color: #000000;
}
         
         </style>
          <div class="post-container">
            <div class="post-header">
              <img class="profile-picture" src="${picture.thumbnail}" alt="Profile Picture">
              <div class="user-details">
                <div class="name">${first} ${last}</div>
                <div class="username">@${login.username}</div>
              </div>
            </div>
            <div class="post-info">
              <div class="zoekertje">
                <p>Ik zoek een persoon om te helpen met een taak.</p>
              </div>
              <div class="post-locatie">
                <p><strong>Location:</strong> Genk</p>
              </div>
              <div class="random-number" id="random-number-${index}">
                Random number: ${randomNumber}
              </div>
            </div>
            <button class="add-progress-btn" data-increment="${increment}">Voeg taak toe</button>
          </div>
        `;
      });

      this.usersHTML = usersHTML;

      //document.getElementById('user-container')!.innerHTML = 'blabla';

      // Event listener for the buttons
      document.querySelectorAll('.add-progress-btn').forEach((button: Element) => {
        button.addEventListener('click', (event) => {
          const increment = parseFloat((event.target as HTMLElement).dataset['increment']!);  // Adjusted to use ['increment']
          this.updateMainProgressBar(increment);
        });
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      document.getElementById('user-container')!.innerHTML = `
        <p>Error</p>`;
    }
  }


  // Show the popup
  showPopup(): void {
    const popup = document.getElementById('popup') as HTMLElement;
    popup.style.display = 'flex';
  }

  // Close the popup
  closePopup(): void {
    const popup = document.getElementById('popup') as HTMLElement;
    popup.style.display = 'none';

    const mainProgressBar = document.querySelector('.main-progress-bar') as HTMLElement;
    this.mainProgress = 0;
    mainProgressBar.style.width = '0%';
  }
}

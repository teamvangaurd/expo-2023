export default class GameUtil {
    constructor() {
        this.words = ['MALWARE','PHISING','PASSWORD','DDOS','BRUTEFORCE','TROJAN','XSS','RCE','DNS','COOKIE','REDOS','BREACH','FIREWALL','MFA','VPN','PRIVACY','PORT','SOCIAL','BOTNET','LINUX','ROUTER','WORM','SPYWARE','CAPTCHA','BACKDOOR','CSRF','SPAM','ADWARE','HASH','DARKNET'];
        this.clue = [
            'What type of malicious software is designed to harm your computer?',
            'What\'s the term for tricking people into sharing sensitive info through fake emails or websites?',
            'What do you call a set of characters that grants access to a computer system or account?',
            'A type of cyber attack where a system is flooded with traffic to make it unavailable?',
            'A technique where attackers attempt to guess passwords by systematically trying all possible combinations?',
            'A type of malware that disguises itself as legitimate software but actually performs malicious actions and named after a mythological wooden horse?',
            'This type of attack involves injecting malicious code into a website?',
            'In this cyber threat scenario, attackers gain control and execute commands on a targeted system remotely?',
            'This system translates human-readable domain names into numerical IP addresses.',
            'Tiny data bits stored in your browser for tracking online activity and remembering you on websites, posing potential privacy risks',
            'This type of attack exploits inefficient regular expressions, causing a system to become unresponsive.',
            'An unauthorized access or intrusion that results in the compromise of sensitive data.',
            'This is a protective barrier between your computer network and the outside world. It monitors and controls incoming and outgoing network traffic?',
            'It often involves something you know (like a password) combined with something you have or something you are?',
            'This technology allows you to create a secure and encrypted connection over a public network, such as the internet.',
            'It involves the right to keep personal information and activities confidential?',
            'In networking, this is a numerical identifier for a specific process to which a message or data packet is sent?',
            'In the digital realm, it is frequently associated with online platforms where people connect, share, and communicate. If "Engineering" is added to it, it becomes an attack.',
            'The computers in this network, known as bots or zombies, are typically infected with malware without the owners\' knowledge?',
            'This is an open-source operating system kernel that serves as the foundation for various operating systems?',
            'Commonly used to share a single internet connection among multiple devices, it often includes features like wireless connectivity?',
            'This is a type of self-replicating malware that spreads across computer networks?',
            'This is a type of malicious software designed to gather information about a user or organization without their knowledge ends with "WARE"',
            'This is a security measure designed to distinguish between human and automated computer programs.',
            'It\'s a concealed entry intentionally created by developers for debugging or admin purposes, but can be exploited by attackers for unauthorized access—a secret pathway bypassing standard security measures?',
            'This acronym stands for a type of web security vulnerability that involves tricking a user\'s browser to perform an unwanted action on a trusted site?',
            'This term refers to unsolicited and often irrelevant or inappropriate messages sent over the internet, typically in large quantities?',
            'This is a type of software that displays advertisements on a user\'s computer, often without their consent?',
            'This term refers to the result of applying a specific algorithm or function to data, producing a fixed-size string of characters. It is commonly used in computer science and cryptography for data integrity verification and password storage?',
            'Activities on this network may include anonymous communication, illegal trading, and other clandestine operations?',
        ]        
        this.currentWordIndex = 0;
        this.attempts = 0;
        this.guessedLetters = [];
        this.wins = 0;
        this.losses = 0;
        this.clueLabel = this.$('clue');
        this.timerDuration = 120000;
        this.timeLeft = this.timerDuration;
    }

    $(id) {
        return document.getElementById(id);
    }

    getTimeLeft() {
        return this.timeLeft;
    }

    setTimeLeft(val) {
        return this.timeLeft = val;
    }
    
    onStart() {
        this.updateDisplay();
        // this.updateTimerDisplay();
        this.clueLabel.innerHTML = "<b>"+this.clue[this.currentWordIndex]+"</b>";
        const inputElement = this.$('input');
        inputElement.addEventListener('input', this.onGuess.bind(this));
    }

    onGuess(event) {
        const keyPressed = event.target.value.toUpperCase();
        if (this.isLetterOnly(keyPressed)) {
            if (this.guessedLetters.indexOf(keyPressed) === -1) {
                this.guessedLetters.push(keyPressed);
                this.attempts++;
                this.updateDisplay();
                if (this.isRoundLost()) {
                    this.losses++;
                    this.goToNextWord();
                } else if (this.isRoundWon()) {
                    this.wins++;
                    this.goToNextWord();
                }
            }
        }
        event.target.value = '';
    }
    
    getGameboardWord() {
        const word = this.currentWordLetters().map( (letter) => {
            if (this.guessedLetters.indexOf(letter) === -1) {
                return '&nbsp';
            } else {
                return letter;
            }
        });
        return word;
    }
    
    goToNextWord() {
        this.currentWordIndex++;
        this.clueLabel.innerText = this.clue[this.currentWordIndex];
        this.attempts = 0;
        this.guessedLetters = [];
        this.updateDisplay();
    }
    
    isRoundLost() {
        return (this.getGuessesAllowed() - this.attempts === 0);
    }
    
    isRoundWon() {
        return (this.getGameboardWord().indexOf('&nbsp') === -1);
    }

    isLetterOnly(character) {
        if (character.length !== 1) {
            return false;
        }
        const checker = /^[A-Z]+$/i.test(character);
        return checker;
    }

    updateDisplay() {
        this.$('guessed').innerHTML = this.guessedLetters.reduce(function (list, letter) {
            return (list + letter + ' ');
        }, '');
        this.showGameBoard();
        this.$('wins').innerHTML = this.wins;
        this.$('losses').innerHTML = this.losses;
        this.$('guesses_remaining').innerHTML = this.getGuessesAllowed() - this.attempts;
    }
    
    showGameBoard() {
        const container = this.$('game_board_container');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        this.getGameboardWord().forEach( (letter) => {
            const newDiv = document.createElement('div');
            newDiv.setAttribute('class', 'game_board_letter');
            newDiv.innerHTML = letter;
            if (letter !== '&nbsp') {
                newDiv.setAttribute('class', 'no_border');
            }
            container.appendChild(newDiv);
        });
    }
    
    currentWordLetters() {
        return (this.words[this.currentWordIndex].split(''));
    }

    getGuessesAllowed() {
        return 10;
    }
}
## **VERY OUTDATED - DO NOT TRUST!**

## **Ethan:** Here is how you add to the docs: [doccumentation for the doccumentation](https://react-styleguidist.js.org/docs/documenting)

### How to install Github and Clone the Repo

Download Github Desktop or use the command line if you have experience.

* Make sure that you have a github account and your account has been invited to be a collaborator in our repository. You must get a invite, log into your account at www.github.com
and accept that invite before continuing.
* Log into Github Desktop with an account that has accepted the invite.
* Type in your username and email and press continue.
* On the right you will see a repo called ASES Website
* Press the clone button.
* Choose a directory that is easy for you to remember. Desktop works well.
* Done! You now have a copy of the website code. Make sure to remember where the repo is located for the next step.

### How to install and setup Firebase CLI

Before you begin, make sure your google account has been invited to edit the backend. Once you have received an invite, go to the firebase console and log in with the account that has been invited. Now accept the invite.

**First install Node.JS**

* Once you have done so make sure npm was also with Node JS by typing the following in terminal:

`npm -v`

* This should give you the version number.

`npm install firebase-tools -g`

* This should give you a version deprecated message but give it a few minutes and the install should finish.

`firebase --version`

* If this gives you a version you can skip the next section:

If you get `“firebase: command not found”`

Open terminal and type:

`npm get prefix`
*  To get the path to your npm folder. Copy this directory and remember it for the next step. It should be something like `\Users/<user-name>/.npm-global/`

Cd to your home directory:
`cd ~`

Then make the following two files:

`touch .bash_profile  .zshrc`

* Now you will add the path npm path to each of these files.

`nano .bash_profile`

* Will open a text editor and paste the following line:
Use this format:

`export PATH=<Directory from previous step>/bin:$PATH`
(Without the <>)

* It should look something like:

Use this format:
export PATH=/Users/<your-user-name>/.npm-global/bin:$PATH

* Then type (Control + X) to exit and make sure to save.

* Repeat for the next file:

`nano .zshrc.`

* Restart your terminal. Quit and reopen, don’t just close the window.

Type:
`firebase --version`

### ‘firebase --version’ works

**Continue firebase setup**

Still in terminal, type:

`firebase login`

* This should prompt you to log in with your google account.

* Once you have logged in, Navigate to the directory where you cloned the github repo. Using commands like cd and ls.

* Once you are in the ASES Website directory run:

`firebase serve`

* Go to your favorite web browser and type in:

`http://localhost:5000`

**Now you are running a version of our site locally.**

Typing (control + C) in the terminal will stop the local site.

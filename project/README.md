
# Chat application - final project

This is our project of web ! Enjoy this webChat

## Usage

*how to start and use the application, run the tests, ...*

* Clone this repository, from your local machine:
  ```
  git clone https://github.com/Arlouys/Webtech.git webtech
  cd Webtech/project
  ```

* You can use Docker to run this app:
  ```
  docker-compose up -d
  ```

* Else, install [Go](https://golang.org/) and [Dex](https://dexidp.io/docs/getting-started/). For example, on Ubuntu, from your project root directory:   
  ```
  # Install Go
  apt install golang-go
  # Download Dex
  git clone https://github.com/dexidp/dex.git
  # Build Dex
  cd dex
  make
  make examples
  ```
  Note, the provided `.gitignore` file ignores the `dex` folder.
* Register your GitHub application, get the `clientID` and `clientSecret` from GitHub and report them to your Dex configuration. Modify the provided `./dex-config/config.yml` configuration to look like:
  ```yaml
  - type: github
    id: github
    name: GitHub
    config:
      clientID: xxxxxxxxxxxxxxxxxxxxxx
      clientSecret: xxxxxxxxxxxxxxxxxxxxxx
      redirectURI: http://127.0.0.1:5556/dex/callback
  ```
* Inside `./dex-config/config.yml`, the front-end application is already registered and CORS is activated. Now that Dex is built and configured, you can start the Dex server:
  ```yaml
  cd dex
  bin/dex serve dex-config/config.yaml
  ```
* Start the back-end
  ```bash
  cd back-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Optional, fill the database with initial data
  bin/init
  # Start the back-end
  bin/start
  ```
* Start the front-end
  ```bash
  cd front-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Start the front-end
  yarn start
  ```

## Author

👤 **Matthieu Sajot**

* Github: [@Cambelau](https://github.com/Cambelau)
* Email: matthieu.sajot@edu.ece.fr

👤 **Louis Artaud**

* Github: [@Arlouys](https://github.com/Arlouys)
* Email: louis.artaud@edu.ece.fr

## Tasks

Project management

* Naming convention   
  We use the classic naming conventions
* Project structure   
Here is the structure of our project repository:

```
front-end/
  public/
  src/
    channel/
    icons/
back-end/
  bin/
  db/
  lib/
  test/
dex-config/
  config.yaml
README.md
docker-compose.yaml
```
* Code quality   
  We use Atom beautify to check the quality of our code
* Design, UX   
  We change the color and the style of the chatbot. We also use popup and Mui
  Popup made thanks to :  https://react-popup.elazizi.com/react-modal
* Git and DevOps   
  We develop in the develop branch to keep master branch clean

Application development

* Welcome screens   
  The user arrive on a welcome where he can choose a name and fill a bio. This page appear only when he arrive.
* New channel creation   
  The channel creation can be made on the welcome page after the user complete his profile
* Channel membership and access   
  The creation of a channel give a channel owner and a list of members
* Ressource access control   
  You can add members to your channel
* Invite users to channels   
  Not done
* Message modification   
  Under each message, a user can modify the content thanks to a button modify
* Message removal   
  Under each message, a user can remove the content thanks to a button remove
* Account settings   
  The user can modify his profiles in the new Settings page
* Gravatar integration   
  By default, gravatar is integrated and will use the default avatar from the mail account.
* Avatar selection   
  When the user fill his profile, he can choose an avatar among 4 picture from Gravatar
* Personal custom avatar   
  Not done

## Bonus

This app can be run with Docker ! Use ```docker-compose up -d``` to test it

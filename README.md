# DAT257
Group 12's project in DAT257

# How start development environment

1. First make sure you have an up to date version of node.js for your system.
If not install here [Node.js](https://nodejs.org/)

2. Make sure you have a recent version of Maven installed for your system.
If not install here [Maven](https://maven.apache.org/install.html)

3. Now we want to start the backend, this we will do using the following commands:
```
//In the directory @/WallStreetWarriors/

$ mvn clean install


//In the directory @/WallStreetWarriors/target

$ java -jar WallStreetWarriors-0.0.1-SNAPSHOT.jar


//The above file name may vary depending on what snapshot is most recent

```

4. Now we want to start up the frontend, this we will do using the following commands:

```
//In the directory @/frontend/app/

$ npm install

//Incase of errors doing this try out

$ npm install --legacy-peer-deps


//In the same directory we now run the following command:

$ npm run dev

```

# GAMEBIT-PROJECT

## WHAT
The microservice (as a part the GAMEBIT project) that manage estimation projects.

## NEW THINGS
employed seneca-mesh!
employed rethinkdbdash (replacing vanilla rethinkdb api) 
employed dotenv, nconf
employed rethinkdb-init (replacing manual schema detection and creation)

## INSTALL
1. `npm install`
2. `typings install`
3. Install RethinkDB https://rethinkdb.com/docs/install/  
   In development environment, roll `$ rethinkdb --bind all` so that the rethinkdb administration (:8080) can be accessed remotely.  

## TODOs
 * ~~seneca-balance-client (added with mesh)~~ 
 * ~~seneca-mesh (added)~~ 
 * ~~rethinkdbdash (added)~~

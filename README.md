# Census Insights

### for front end: `npm start`

### for backend `npm run dev`

### Run these MySQL commands

Run the following commands on MySQL terminal one by one after ensuring that a connection to the database named censusinsights which is mentioned in the knexfile.js file is successful. The Database and it's tables will be created using the file in the "migrations" folder which is inside the "backend" folder.
IMPORTANT NOTE:

1. ORDER OF COMMANDS MATTER!!
2. ORDER OF TABLES ON WHICH COMMANDS ARE APPLIED ALSO MATTER TO MAINTAIN PRIMARY-FOREIGN KEY REFERENCES
3. WHEN COPYING COMMANDS ENSURE NO ADDITIONAL SPACES OR CHARACTERS ARE COPIED
4. WHEN COPYING SINGLE QUOTES OR DOUBLE QUOTES USED IN THE INSERT STATEMENTS, ENSURE THAT CHARACTER CORRUPTION OR SUBSTITUTION DOESN'T HAPPEN WITH THE SINGLE QUOTE CHARACTER i.e., ' OR THE DOBLE QUOTE CHARACTER i.e., " IN THE MYSQL TERMINAL

### Run commands in order

RUN THESE COMMANDS FROM 1 TO 21 IN ORDER (ONE AFTER ANOTHER AND NOT ALL IN ONE GO).THESE COMMANDS MODIFY COLUMNS, ADD COLUMNS OR ADD CONSTRAINTS TO EXISTING TABLES AND THEIR COLUMNS.

# operations on table named “geo”

1. CREATE INDEX idx_regionid ON geo (regionid);
2. CREATE INDEX idx_municipalid ON geo (municipalid);

# operations on table named “manager”

3. ALTER TABLE manager ADD COLUMN region_id INT NOT NULL;
4. ALTER TABLE manager ADD FOREIGN KEY fk_region_id(region_id) REFERENCES geo (regionid);

# operations on table named “fieldagent”

5. ALTER TABLE fieldagent MODIFY latitude decimal(8,6);
6. ALTER TABLE fieldagent MODIFY longitude decimal(8,6);
7. ALTER TABLE fieldagent ADD COLUMN municipal_id INT UNSIGNED NOT NULL;
8. ALTER TABLE fieldagent ADD COLUMN manager_id INT UNSIGNED NOT NULL;
9. ALTER TABLE fieldagent ADD FOREIGN KEY fk_municipal_id(municipal_id) REFERENCES geo(municipalid);
10. ALTER TABLE fieldagent ADD FOREIGN KEY fk_manager_id(manager_id) REFERENCES manager(managerid);

# operations on table named “assignments”

11. ALTER TABLE assignments MODIFY latitude decimal(8,6) NOT NULL;
12. ALTER TABLE assignments MODIFY longitude decimal(8,6) NOT NULL;
13. ALTER TABLE assignments MODIFY assignment_date VARCHAR(50) DEFAULT '2023-03-09' NULL;
14. ALTER TABLE assignments ALTER province SET DEFAULT 'Ontario';
15. ALTER TABLE assignments ADD COLUMN fieldagent_id INT UNSIGNED NOT NULL;
16. ALTER TABLE assignments ADD COLUMN imagepath VARCHAR(255) NULL;
17. ALTER TABLE assignments ADD FOREIGN KEY fk_fieldagent_id(fieldagent_id) REFERENCES fieldagent(fieldagentid);

# operations on table named “censusdata”

18. ALTER TABLE censusdata MODIFY age INT NULL;
19. ALTER TABLE censusdata MODIFY income float NULL;
20. ALTER TABLE censusdata ADD COLUMN assignment_id INT UNSIGNED NOT NULL;
21. ALTER TABLE censusdata ADD FOREIGN KEY fk_assignment_id(assignment_id) REFERENCES assignments(assignmentid);

### Insert data into tables(DO NOT RUN THESE WITHOUT SUCCESSFUL COMPLETION OF ABOVE COMMANDS)

AFTER RUNNING COMMANDS 1-21 FROM ABOVE, RUN THE FOLLOWING INSERT COMMANDS IN ORDER FROM 1 TO 5. NOTE: THE 3rd INSERT COMMAND HAS 2 PARTS- a and b

# 1.GEO table inserts

INSERT INTO geo(regionid,region_name,municipalid,municipality_name) VALUES (1,"York",1,"Markham"),(1,"York",2,"Richmond Hill"),(1,"York",3,"Vaughn"),(1,"York",4,"Aurora"),(1,"York",5,"Newmarket"),(2,"Niagra",6,"City of Niagara Falls"),(2,"Niagra",7,"Port Colborne"),(2,"Niagra",8,"St. Catherines"),(2,"Niagra",9,"Thorold"),(3,"Peel",10,"Brampton"),(3,"Peel",11,"Mississauga"),(3,"Peel",12,"Caledon");

# 2.MANAGER table inserts

INSERT INTO manager (managerid,managername,username,password,region_id) VALUES (111,"John Mcreid","jmcreid","abc123",1),(222,"Denise Schuman","dschuman","efg789",2);

# 3a.FIRST INSERT INTO FIELDAGENT

INSERT INTO fieldagent (fieldagentname,username,password,latitude,longitude,municipal_id,manager_id) VALUES ("Max Smith","msmith","sun4455",43.885130,-79.2746,1,111);

# 3b.SECOND INSERT STATEMENT INTO FIELDAGENT

INSERT INTO fieldagent (fieldagentname,username,password,municipal_id,manager_id) VALUES ("April Marco","amarco","moon1122",2,111),("Charles Dietrich","cdietrich","junjul333",3,111),("Shane Kurkoff","skurkoff","canada123",4,222),("Zelda Cesare","zcesare","america123",5,222),("Hamed Mazari","hmazari","london123",6,222),("Nate Burbank","nburbank","spain123",7,222);

# 4.ASSIGNMENTS table inserts

INSERT INTO assignments (street,city,postalcode,latitude,longitude,fieldagent_id) VALUES ("15 Brookbank Crt","Markham","L3P6K9",43.885130,-79.274630,1),("55 Shady Lane Cres","Markham","L3T3W6",43.825390,-79.409440,1),("238 Riverlands Ave","Markham","L6B0W2",43.887110,-79.227310,1),("79 Forest Run Blvd","Vaughn","L4K5J6",43.839550,-79.485920,3),("51 Hopewell St","Vaughn","L4H3Y2",43.827290,-79.650540,3),("87 Tomata Lane","Vaughn","L5T2U1",44.980000,-80.000000,3),("98 Conmara Lane","Vaughn","LH8U81",48.980000,-80.000000,3),("109 James Ave","Markham","L8G2G8",44.000000,-81.000000,1),("45 Newmonn","Markham","L2U3T9",45.000000,-80.000000,1),("14311 Bayview Ave","Aurora","L4G0K7",43.981860,-79.438430,4),("72 Weslock Cres","Aurora","L4G7Y9",44.007400,-79.436220,4),("543 Wellington St W","Aurora","L4G6J7",43.995630,-79.486090,4),("6978 Shannon Dr","Niagara Falls","L2H3N7",43.073100,-79.143720,6),("7133 Harriman St","Niagara Falls","L2J3S1",43.123210,-79.116780,6),("7755 Shagbark Ave","Niagara Falls","L2H3R9",43.063110,-79.144813,6);

# 5.CENSUSDATA table inserts

INSERT INTO censusdata (householdnumber,ethnicity,age,income,gender,occupation,assignment_id) VALUES (2,"Latin American",45,150000,"Male","Logistics",1),(2,"Latin American",43,120000,"Female","Engineering",1),(3,"Asian",25,60000,"Female","Food and Beverage",2),(3,"Asian",27,80000,"Female","Engineering",2),(3,"Asian",28,80000,"Male","Education",2),(5,"Caucasian",0,0,"Male","Other",4),(5,"Caucasian",2,0,"Male","Other",4),(5,"Caucasian",4,0,"Female","Other",4),(5,"Caucasian",43,150000,"Female","Legal",4),(5,"Caucasian",45,180000,"Male","Management",4),(1,"African",34,100000,"Female","Management",10),(1,"South Asian",23,40000,"Male","Research",11),(2,"Latin American",19,20000,"Male","Education",13),(2,"Caucasian",20,20000,"Male","Other",13),(1,"Caucasian",30,70000,"Male","Food and Beverage",14);

# Features

1. The app allows 2 types of users to login and they have different work flows. The 2 types of users are Manager and Fieldagent. The app's mySQL database has been seeded with data and the user logins for each type of user has been provided in a document on synapse comments and the .gitignore folder
2. Manger workflow:
   (a) Manager home leads links two 2 different pages using buttons.
   (i) One page that the manager can navigate to is the manager - fieldagent assignments page. This page allows the manager to assign his/her field agents census data collection assignments. [NOTE] To send a new assignment to the server click add row ->click edit on that row ->add data in the expected form->

   (ii) Another page the manager can navigate to from the manager home is the region population statistics page. This page gives some metrics for the manger's jurisdiction/region

3. Fieldagent workflow:
   (a)The Fieldagent home has a table which is list of the assignments of a fieldagent.Only those assignments without completed census data collection are visible.Clicking on an assignment row will lead to verification page
   (b)The verification page expects the fieldagent to upload a picture of the location he/she is at, once the photo has been upload, the image will be sent to the backend server. After verification, the user will be lead to that assignment's datacollection form
   (c) The data collection form allows the fieldagent to add rows for each memeber of the household. Clicking on submit will send the data to the backend server and the redirect the fieldagent to their home page

# Tech spec

1. MySQL DB
2. Knex connection
3. React for front end
4. Express for backend
5. HTML
6. scss

# Available data

The app has been seeded with data for few users. the users themselves are orgnaized such that there is a manager per region and each region has cities which have Fieldagents assigned for census data collection. The Manager is the one who is able to view population statistics for the region(which comprises of multiple cities).

Seeded can be found for:

1. Managers
   (a) jmcreid (username: jmcreid password abc123)
   (b) dschuman (username:dschuman password:efg789)
2. Fieldagents of Managers
   (i) Manager jmcreid's Fieldagents - msmith and cdietrich
   (a) msmith (username: msmith password: sun4455)
   (b) cdietrich (username: cdietrich password:junjul333)
   (ii) Manager dschuman's Fieldagents - skurkoff and hmazari
   (a) skurkoff (username: skurkoff password:canada123)
   (b) hmazari (username:hmazari password:london123 )

# Known bugs and workarounds

1. Using browser back button may cause error with data display as the data is tied to the user's login and going back may change the way the data is received
2. Use different browsers to try to get past the Fieldagent Verify page in case you are unable to upload the photo file. If you need to see the form associated with assignment, then change the URL to /fieldagent/*insert fieldagent id/form/*insert assignment id\*
3. While logged in as a manager and while trying to add a new row follow this method : click add row -> click edit -> add the new row information in the right format(same as previous rows) -> click save and refresh the browser page

# Census Insights

### for front end: `npm start`

### for backend `npm run dev`

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

# Known bugs and workarounds

1. Using browser back button may cause error with data display as the data is tied to the user's login and going back may change the way the data is received
2. Use different browsers to try to get past the Fieldagent Verify page in case you are unable to upload the photo file. If you need to see the form associated with assignment, then change the URL to /fieldagent/*insert fieldagent id/form/*insert assignment id\*
3. While logged in as a manager and while trying to add a new row follow this method : click add row -> click edit -> add the new row information in the right format(same as previous rows) -> click save and refresh the browser page

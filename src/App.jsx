import { useState } from "react";

import initialEmails from "./data/emails";
import Emails from "./components/Emails";
import LeftMenu from "./components/LeftMenu";

import "./styles/App.css";
import Header from "./components/Header";
import ShowEmail from "./components/ShowEmail";

const getReadEmails = (emails) => emails.filter((email) => !email.read);

const getStarredEmails = (emails) => emails.filter((email) => email.starred);

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState("inbox");
  const [selectedEmail, selectEmail] = useState(null)

  const unreadEmails = emails.filter((email) => !email.read);
  const starredEmails = emails.filter((email) => email.starred);

  const toggleStar = (targetEmail) => {
    const updatedEmails = (emails) =>
      emails.map((email) =>
        email.id === targetEmail.id
          ? { ...email, starred: !email.starred }
          : email
      );
    setEmails(updatedEmails);
  };

  const toggleRead = (targetEmail) => {
    const updatedEmails = (emails) =>
      emails.map((email) =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      );
    setEmails(updatedEmails);
  };

  let filteredEmails = emails;

  if (hideRead) filteredEmails = getReadEmails(filteredEmails);

  if (currentTab === "starred")
    filteredEmails = getStarredEmails(filteredEmails);

  return (
    <div className="app">
      <Header />

      <LeftMenu 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab}
        unreadEmails={unreadEmails} 
        starredEmails={starredEmails} 
        hideRead={hideRead} 
        setHideRead={setHideRead} />
        
      {selectedEmail ? (
        <ShowEmail 
          email={selectedEmail} 
          selectEmail={selectEmail}/>) : (
          <Emails
            filteredEmails={filteredEmails}
            toggleRead={toggleRead}
            toggleStar={toggleStar}
            selectEmail={selectEmail}
      />
      )}
    </div>
  );
}

export default App;

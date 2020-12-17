import { useState } from "react";

const Mailchimp = () => {
  const u = "32170d69a75ab717fb3221bc2";
  const id = "c4ed95428a";

  const [inputState, setInputState] = useState({});

  const [fields, setFields] = useState([
    {
      name: "FNAME",
      label: "First Name",
      type: "text",
      id: "MERGE1",
      required: true,
    },
    {
      name: "LNAME",
      label: "Last Name",
      type: "text",
      id: "MERGE2",
      required: true,
    },
    {
      name: "EMAIL",
      label: "Email Address",
      type: "email",
      id: "MERGE0",
      required: true,
    },
  ]);

  return (
    <div className="Mailchimp">
      <form
        action={`https://gmail.us7.list-manage.com/subscribe/post?u=${u}&amp;id=${id}`}
        method="POST"
        noValidate
      >
        <input type="hidden" name="u" value="eb05e4f830c2a04be30171b01" />
        <input type="hidden" name="id" value="8281a64779" />
        <div className="Mailchimp__fields">
          {fields.map((e) => {
            return (
              <div className="Mailchimp__fieldGroup" key={e.name}>
                <label className="Mailchimp__label" htmlFor={e.id}>
                  {e.label}
                </label>
                <input
                  {...e}
                  className="Mailchimp__input"
                  id={e.id}
                  type={e.type}
                  value={inputState[e.name]}
                  onChange={(e) => setInputState({ [e.name]: e.target.value })}
                />
              </div>
            );
          })}
        </div>
        <div className="Mailchimp__submitContainer">
          <input
            className="Mailchimp__submit"
            type="submit"
            value="Subscribe"
            name="subscribe"
          />
        </div>

        {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
        <div
          style={{ position: "absolute", left: "-5000px" }}
          aria-hidden="true"
          aria-label="Please leave the following three fields empty"
        >
          <label htmlFor="b_name">Name: </label>
          <input
            type="text"
            name="b_name"
            tabIndex="-1"
            value=""
            placeholder="Freddie"
            id="b_name"
          />

          <label htmlFor="b_email">Email: </label>
          <input
            type="email"
            name="b_email"
            tabIndex="-1"
            value=""
            placeholder="youremail@gmail.com"
            id="b_email"
          />

          <label htmlFor="b_comment">Comment: </label>
          <textarea
            name="b_comment"
            tabIndex="-1"
            placeholder="Please comment"
            id="b_comment"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default Mailchimp;

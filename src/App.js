import React, { useState } from 'react';

const IssueForm = ({ addIssue }) => {
  const [desc, setDesc] = useState('');
  const [sev, setSev] = useState('Low');
  const [assign, setAssign] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = new Date().valueOf();
    addIssue(desc, sev, assign, id);
    setDesc('');
    setAssign('');
  };

  return (
    <div>
      <div className="container mb-5 display-3 text-center">
        React Issue Tracker
      </div>
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="mx-auto"
          style={{ maxWidth: '500px' }}
        >
          <label htmlFor="description">Description</label>
          <input
            name="description"
            type="text"
            value={desc}
            placeholder="Issue Description"
            className="form-control mb-3"
            onChange={(e) => setDesc(e.target.value)}
          />
          <label htmlFor="severity">Severity</label>
          <select
            className="form-select mb-3"
            value={sev}
            onChange={(e) => setSev(e.target.value)}
            name="severity"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <label htmlFor="assigned">Assigned To</label>
          <input
            name="assigned"
            value={assign}
            type="text"
            placeholder="Insert assigned to"
            className="form-control mb-3"
            onChange={(e) => setAssign(e.target.value)}
          />
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>
    </div>
  );
};

const IssuesBoard = () => {
  const [issues, setIssues] = useState([]);

  const addIssue = (description, severity, assigned, id) => {
    setIssues([...issues, { description, severity, assigned, id }]);
  };

  const toggleIssue = (index) => {
    const newIssues = [...issues];
    newIssues[index].isClosed = !newIssues[index].isClosed;
    setIssues(newIssues);
  };

  const deleteIssue = (index) => {
    const newIssues = [...issues];
    newIssues.splice(index, 1);
    setIssues(newIssues);
  };

  return (
    <>
      <div>
        <IssueForm addIssue={addIssue} />
        {issues.map((issue, index) => (
          <div key={index} className="container">
            <div className="rounded bg-light p-4 my-3">
              Issue ID: {issue.id}
              <br />
              {issue.isClosed ? (
                <span className="badge bg-danger">Closed</span>
              ) : (
                <span className="badge bg-success">Open</span>
              )}
              <br />
              Description: {issue.description}
              <br />
              Severity: {issue.severity}
              <br />
              Assigned To: {issue.assigned}
              <div className="my-3">
                <button
                  onClick={() => deleteIssue(index)}
                  className="btn btn-danger me-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => toggleIssue(index)}
                  className="btn btn-success"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default IssuesBoard;

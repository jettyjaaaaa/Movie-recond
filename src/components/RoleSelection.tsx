// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const RoleSelection = () => {
//   const [role, setRole] = useState('FLOORSTAFF');
//   const navigate = useNavigate();

//   const handleSelect = () => {
//     navigate(`/home?role=${role}`);
//   };

//   return (
//     <div>
//       <h1>Select Role</h1>
//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         <option value="MANAGER">Manager</option>
//         <option value="TEAMLEADER">Team Leader</option>
//         <option value="FLOORSTAFF">Floor Staff</option>
//       </select>
//       <button onClick={handleSelect}>Proceed</button>
//     </div>
//   );
// };

// export default RoleSelection;

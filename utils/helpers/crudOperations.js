// const create = (req, res) => {
//   if (!req.body.name) {
//     const message = 'Department name cannot be empty';
//     return sendError(res, [], message);
//   }

//   Department.create(req.body.name, (err, data) => {
//     if (err) {
//       sendError(res, err);
//     } else {
//       const message = 'Department created successfully';
//       sendSuccess(res, data, message);
//     }
//   });
// };

// const get = (req, res) => {
//   Department.find((err, data) => {
//     if (err) {
//       sendError(res, err);
//     } else {
//       return sendSuccess(res, data);
//     }
//   });
// };

// const update = (req, res) => {
//   if (!req.body.name) {
//     const message = 'Department name cannot be empty';
//     return sendError(res, [], message);
//   }

//   Department.findByIdAndUpdate(
//     req.params.departmentId,
//     { name: req.body.name },
//     { new: true },
//     (err, data) => {
//       if (err) {
//         return sendError(res, err);
//       } else {
//         const message = 'Updated Department successfully';
//         return sendSuccess(res, data, message);
//       }
//     }
//   );
// };

// const deleteDepartment = (req, res) => {
//   Department.findByIdAndRemove(req.params.departmentId, (err, data) => {
//     if (err) {
//       return sendError(res, err);
//     } else {
//       const message = 'Department deleted successfully!';
//       return sendSuccess(res, [], message);
//     }
//   });
// };

// const create = (schema, value, model) => {
//   if (!value) {
//     const message = `${model} name cannot be empty`;
//     return sendError(res, [], message);
//   }

//   ${schema}.create(value, (err, data) => {
//     if (err) {
//       sendError(res, err);
//     } else {
//       const message = `${model} created successfully`;
//       sendSuccess(res, data, message);
//     }
//   });
// };

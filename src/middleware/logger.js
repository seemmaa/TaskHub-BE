// module.exports = (req, res, next) => {
//     console.log('📥 Request:');
//     console.log('Method:', req.method);
//     console.log('URL:', req.originalUrl);
//     console.log('Headers:', req.headers);
  
//     let bodyData = '';
//     req.on('data', chunk => {
//       bodyData += chunk.toString();
//     });
  
//     req.on('end', () => {
//       if (bodyData) {
//         try {
//           const parsed = JSON.parse(bodyData);
//           console.log('Body:', JSON.stringify(parsed, null, 2));
//         } catch (err) {
//           console.log('Body (non-JSON):', bodyData);
//         }
//       }
//       next();
//     });
//   };
  
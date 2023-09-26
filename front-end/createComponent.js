const fs = require('fs');
const _path = './src/components/';

const testContent = (componentName) => `// import React from 'react';
import { render, screen } from '@testing-library/react';
import ${componentName} from './${componentName}';

test('renders learn react link', () => {
  render(<${componentName} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
`;

const componentContent = (componentName) => `

import './${componentName}.scss';

function ${componentName}() {

  return (
    <h1>${componentName}</h1>
  );
}

export default ${componentName};
`;

function createComponent() {
  for(let i = 0 ; i < process.argv.length ; i++) {
    if (process.argv[i].indexOf('name=') >= 0) {
      let componentName = process.argv[i].split('=')[1];
      let path = _path+componentName;
      if (!fs.existsSync(path)){
        fs.mkdirSync(path);

        fs.writeFile(`${path}/${componentName}.scss`, '', function (err) {
          if (err) throw err;
          console.log('scss file was created successfully.');
        });
        fs.writeFile(`${path}/${componentName}.test.tsx`, testContent(componentName), function (err) {
          if (err) throw err;
          console.log('test file was created successfully.');
        });
        fs.writeFile(`${path}/${componentName}.tsx`, componentContent(componentName), function (err) {
          if (err) throw err;
          console.log('tsx file was created successfully.');
        });
      }    
    }
  }
}

createComponent();

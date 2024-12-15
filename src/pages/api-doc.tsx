import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import fs from 'fs';
import path from 'path';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });


function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'pages/api', // pages/api
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Next Swagger API',
        version: '1.0.0',
        description: 'This is a sample API created with Next.js and Swagger.',
      },
      servers: [
        {
          url: 'http://127.0.0.1:4010/',
          description: 'Local development server',
        },
      ],
      paths: {
        // テスト用のAPI
        '/api/hello': {
          get: {
            summary: 'Say Hello',
            description: 'Returns a simple hello message.',
            responses: {
              '200': {
                description: 'A successful response',
                content: {
                  'application/json': {
                    schema: {
                      type: 'string',
                      example: 'hello',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  // スキーマをJSONファイルとして出力
  const outputPath = path.join(process.cwd(), './src/mocks/openapi.json');
  fs.writeFileSync(outputPath, JSON.stringify(spec, null, 2), 'utf8');
  console.log(`✅ OpenAPI schema has been saved to ${outputPath}`);

  return {
    props: {
      spec,
    },
  };
};


export default ApiDoc;

        // '/api/users': {
        //   get: {
        //     summary: 'Get User List',
        //     description: 'Returns a list of user information.',
        //     responses: {
        //       '200': {
        //         description: 'A successful response containing user information.',
        //         content: {
        //           'application/json': {
        //             schema: {
        //               type: 'array',
        //               items: {
        //                 type: 'object',
        //                 properties: {
        //                   id: {
        //                     type: 'integer',
        //                     description: 'The unique ID of the user.',
        //                     example: 1,
        //                   },
        //                   name: {
        //                     type: 'string',
        //                     description: 'The name of the user.',
        //                     example: 'John Doe',
        //                   },
        //                   email: {
        //                     type: 'string',
        //                     description: 'The email of the user.',
        //                     example: 'johndoe@example.com',
        //                   },
        //                 },
        //               },
        //             },
        //           },
        //         },
        //       },
        //     },
        //   },
        // },
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';


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
          url: 'http://localhost:3000',
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

  return {
    props: {
      spec,
    },
  };
};


export default ApiDoc;

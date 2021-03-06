import { graphql } from '@octokit/graphql';

export default class Github {
  private point: typeof graphql;

  constructor() {
    this.point = graphql.defaults({
      headers: {
        // @ts-ignore
        authorization: `token ${GITHUB}`,
      },
    });
  }

  async getUserRepos(user: string, cursor?: string) {
    const {
      user: { repositories },
    } = await this.point(
      `
    query projects($user: String!, $cursor: String) {
      user(login: $user) {
        repositories(first: 10, privacy: PUBLIC, orderBy: {field: CREATED_AT, direction: DESC}, after: $cursor) {
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
          repositories: nodes {
            id
            diskUsage
            name
            description
            createdAt
            url
          }
        }
      }
    }
  `,
      {
        user,
        cursor,
      },
    );

    return repositories;
  }
}

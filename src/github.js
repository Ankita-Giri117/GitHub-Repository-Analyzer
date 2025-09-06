const token = import.meta.env.VITE_GITHUB_TOKEN;

async function fetchWithAuth(url) {
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
  return res.json();
}

export async function fetchRepo(owner, repo) {
  return fetchWithAuth(`https://api.github.com/repos/${owner}/${repo}`);
}

export async function fetchLanguages(owner, repo) {
  return fetchWithAuth(`https://api.github.com/repos/${owner}/${repo}/languages`);
}

export async function fetchCommits(owner, repo) {
  return fetchWithAuth(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`);
}


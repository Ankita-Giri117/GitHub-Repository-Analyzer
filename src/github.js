const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export async function fetchRepo(owner, repo) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch repo data");
  return await res.json();
}

export async function fetchLanguages(owner, repo) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch languages");
  return await res.json();
}

export async function fetchCommits(owner, repo) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch commits");
  return await res.json();
}


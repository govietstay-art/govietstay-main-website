GOVIETSTAY ADMIN OPERATIONS V1.3

WHY V1.3
- V1.2 used git stash -u. Windows could not delete an old installer directory, causing a retry prompt.
- V1.3 does not use git stash for deployment and does not require a clean working tree.

WHAT V1.3 DOES
1. Finds and verifies the GoVietStay repository.
2. If the failed V1.2 run created a safety stash, V1.3 restores tracked work when safe and restores missing untracked files without overwriting existing files. The safety stash is kept as backup.
3. Fetches origin/main.
4. Creates a completely isolated Git worktree under Windows TEMP.
5. Adds only 3 Operations files in that isolated worktree.
6. Runs npm ci and the full production build there.
7. Commits only those 3 files and pushes HEAD:main only after the build passes.
8. Removes the temporary worktree.

YOUR CURRENT KOREAN/TURKISH LOCAL FILES ARE NOT STASHED, DELETED, COMMITTED OR OVERWRITTEN BY THE V1.3 DEPLOYMENT PROCESS.

RUN:
CHAY-NANG-CAP-OPERATIONS-V1-3.bat

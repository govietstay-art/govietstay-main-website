GoVietStay Cruise Deploy V4 - CLEAN WORKTREE
================================================

THIS IS THE CLEAN DEPLOY METHOD.

It does NOT operate on the dirty working tree.

It:
1. Finds the previously created local cruise commit.
2. Fetches latest origin/main.
3. Creates a temporary CLEAN git worktree from origin/main.
4. Applies the cruise commit with --no-commit.
5. Restores tsconfig.json from origin/main.
6. Verifies that ONLY these two files are changed:
   app/en/cruise-port-shore-excursions/page.tsx
   app/ru/kruiznye-ekskursii-chan-may-tien-sa/page.tsx
7. Builds in the clean worktree.
8. Pushes HEAD:main without force.
9. Removes the temporary worktree.

It does NOT touch:
- HUONG-DAN.txt
- any uncommitted local working changes
- installer folders V1/V2/V3/V4/V5
- tsconfig.json on remote

RUN:
DEPLOY-CRUISE-V4-CLEAN.bat

SUCCESS:
PUSH SUCCESSFUL - VERCEL DEPLOY SHOULD START NOW

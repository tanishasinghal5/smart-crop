# Git Workflow: Feature Branch to Main

## 1. Go to main and update it
```
git checkout main
git pull
```

## 2. Create your new branch
```
git checkout -b my-feature-branch
```

## 3. Make your changes, then test them

## 4. Save your changes (commit)
```
git add .
git commit -m "describe what you changed"
```

## 5. Push the branch to GitHub
```
git push -u origin my-feature-branch
```

## 6. Merge into main
```
git checkout main
git merge my-feature-branch
git push
```

## 7. Pull main again
(to sync your local main with what just got merged)
```
git checkout main
git pull
```

## 8. Start your next task on a new branch
Don't reuse the old branch — create a new one with a new name for the next change:
```
git checkout -b my-next-feature-branch
```

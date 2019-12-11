# Git Guidline

    1.Branche
        1.1.Usage
        1.2.Example
    2.Commit
        2.1.Usage
        2.2.Exemple
        2.3.Combination

## 1.Branche

### 1.1.Usage
We have at least 2 branches:
 - master (production)
 - staging (development)

These two branches will be committed to continuous integration to test and deploy.
For each feature, a branch is required. The branch standard is

**[** feature,fix **]/[** back or front **]/{** name of the feature or fix **}**

Once finished, the branch is reviewed by at least one other devs thanks to a Pull Request (with base on dev). If approved, it will be necessary to rebuild the commit to make only one, before merging on dev thanks to the interface.

### 1.2.Example

I want to go to the login page of the front:
	I do a branch called 

> feature/front/login-page

I want to fix a bug in the IRC server:
	I do a branch called 

> fix/server/authentication

Command to create a branch and go there:
	

    git checkout -b {name}

Command for rebase in one commit:

    git rebase -i {id of the first commit of the branch}

Branches can be re-used (be careful to ensure that the dev merge is correct in the branch when re-using).
DO NOT merge with the git merge command except for branch reuse!

## 2.Commit

### 2.1.Usage

    {Project Shortcut}-{ID} [option] {description}

*Options:*
[+] Adding a file / feature
[-] Removing a file / feature
[~] Editing a file / feature
[!] Added a bug
[#] Merge
[^] Production start-up

### 2.2.Exemple
Split Map > SM
Trello task is #42 > 42

“SM-42 [+] login form”
“SM-42 [~] api login”
“SM-42 [-] unregister page”
“SM-42 [!] protocol”
“SM-42 [#] dev and master”
“SM-42 [^] version 0.0.1”

### 2.3.Combination
Messages can be combined with "<>"
Messages must always be sorted in order of change importance (the most important first)
If the message is longer than 72 characters, the description field must be used (double line break in the commit message)

    SC-42 [+] login form <> [-] unregister page

# Changelog

## [Released]

## [2.0.0alpha] - 2023-08-03

## Added
- Drag-and-Drop
- Updated Review View
- Draggable Participant list

## Changed
- Review description

## Fixed

## Removed
- old Result page

## [1.1.1] - 2023-08-03

## Added
- Pre-Import Modal to check the imported data
- Checks for creating participant. Can't create empty ones anymore
- Importing of 'simple' csv data now possible
- Overlapping timeslots will be flagged instantly
- Preview modals shows the data found in the imported file

## Changed
- Moved navbar items to the right

## Fixed
- Overlapping items in the slotList on certain screen ratios
- Overlapping items in 'settings'-button
- Active tab highlighted in navbar

## Removed
- Sample data in tables

## [1.0.0] - 2023-07-13

## Added
- OffCanvas for export options
- Router
- Result page
- Docs page
- Navbar
- Analytics for participant
- Date overlap checking when creating a new slot

## Changed
- Styling of export options
- Moved settings into modal
- Stored settings into context
- Moved import into  navbar
- Naming of some text changed

## Fixed
- Font issues
- Overlapping in participant list in certain screen ratios

## Removed
- Successful calculation modal

## [0.1.1] - 2023-05-01

## Added

- Landing page (main window)
- Display all slots rooms in main window
- Modal 'edit slots and rooms'
- Modal 'delete slot/room'
- show slot/room from store in frontend
- Modal 'edit participant'
- Display all participants in main window
- Modal 'add participant'
- Modal 'delete participant'
- Delete multiple participants simultaneously
- Central store for participants, slots and rooms
- Helper methods for store access
- Use the stored data in the frontend
- Static data inspection before the algorithm runs
- Combined the frontend with the algorithm
- Merge algorithm from technical mockup
- Modal 'successful calculation'
- A/B-Review
- create Room allocation plan from result
- create result mail for participants
- Load a RevOger-File
- Store a RevOger-File
- Parse Studentlist(csv)
- Changelog
- Bootstrap

## Changed
- Rooms: hasBeamer --> beamerNeeded
- Refactor main
- Refactor algorithm

## Fixed
- Fix font issues
- Change project template to PWA

## Removed
- test run with dummy data
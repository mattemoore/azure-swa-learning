<script>
    import {
      Collapse,
      Navbar,
      NavbarToggler,
      NavbarBrand,
      Nav,
      NavItem,
      NavLink,
      Dropdown,
      DropdownToggle,
      DropdownMenu,
      DropdownItem
    } from 'sveltestrap';
  
    let isOpen = false;
  
    function handleUpdate(event) {
      isOpen = event.detail.isOpen;
    }
  </script>
  
  <Navbar color="light" light expand="md">
    <NavbarBrand href="/">Bulk Social Media</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
      <Nav class="ms-auto" navbar>
        <NavItem>
          <NavLink href="/register">Sign Up</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/profile"><i class="bi bi-person-fill"></i>Profile</NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
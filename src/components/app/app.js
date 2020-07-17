import React, { Component } from "react";
import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import PostStatusFilter from "../post-status-filter/post-status-filter";
import PostList from "../post-list/post-list";
import PostAddForm from "../post-add-form/post-add-form";
import HighlightPost from "../post-highlight/post-highlight";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          label: "Учу React",
          important: true,
          like: false,
          completed: false,
          selected: false
        },
        {
          id: 2,
          label: "Выполненное нельзя отредактировать",
          important: true,
          like: false,
          completed: true,
          selected: false
        },
        {
          id: 3,
          label: "Читаю документацию",
          important: false,
          like: false,
          completed: false,
          selected: true
        },
        {
          id: 4,
          label: "Для редактирования нажмите на кнопку с карандашом",
          important: false,
          like: false,
          completed: false,
          selected: true
        },
        {
          id: 5,
          label: "Чтобы поставить лайк, кликните на текст",
          important: false,
          like: true,
          completed: false,
          selected: false
        }
      ],
      maxId: 6,
      term: "",
      filter: "all",
      highlightedAll: false
    };
  }

  deleteItem = async id => {
    await this.setState(({ data }) => ({
      data: data.filter(item => item.id !== id)
    }));
  };

  addItem = body => {
    this.setState(({ data, maxId }) => ({
      data: [
        ...data,
        {
          id: maxId,
          label: body,
          important: false,
          like: false,
          completed: false,
          selected: false
        }
      ],
      maxId: ++maxId
    }));
  };

  onToggleImportant = id => {
    this.toggleItemSome(id, "important");
  };

  onToggleLiked = id => {
    this.toggleItemSome(id, "like");
  };

  onToggleCompleted = id => {
    this.toggleItemSome(id, "completed");
  };

  onEdit = id => {
    this.toggleItemSome(id, "edit");
  };

  toggleItemSome = (id, some) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          item[some] = !item[some];
        }
        return item;
      })
    }));
  };

  searchPost = (items, term) => {
    if (!term) return items;
    return items.filter(item =>
      item.label.toLowerCase().includes(term.toLowerCase())
    );
  };

  onUpdateSearch = term => {
    this.setState({ term });
  };

  filterPost(items, filter) {
    if (filter === "like") items = items.filter(item => item.like);
    if (filter === "completed") items = items.filter(item => item.completed);
    return items;
  }

  onFilterSelect = filter => {
    this.setState({ filter });
  };

  onToggleHighlight = () => {
    this.setState(({ highlightedAll }) => ({
      highlightedAll: !highlightedAll
    }));
  };

  componentDidMount = () => {
    this.checkHighlight();
  };

  onToggleSelect = id => {
    this.toggleItemSome(id, "selected");
    this.checkHighlight();
  };

  checkHighlight = () => {
    const { data, highlightedAll } = this.state;
    const allPosts = data.length;
    const selectedPosts = data.filter(item => item.selected).length || 0;

    if (selectedPosts === allPosts && !highlightedAll) this.onToggleHighlight();
    if (selectedPosts !== allPosts && highlightedAll) this.onToggleHighlight();
    if (allPosts === 0) this.onToggleHighlight();
  };

  onToggleSelectAll = posts => {
    const oldData = this.state.data;
    const arrId = posts.map(item => item.id);
    const newData = oldData.map(item => {
      if (arrId.includes(item.id)) {
        item.selected = !this.state.highlightedAll;
      }
      return item;
    });

    this.setState({
      data: newData
    });
    this.onToggleHighlight();
  };

  removeSelectedPosts = posts => {
    posts.forEach(item => {
      if (item.selected) this.deleteItem(item.id);
    });
    this.checkHighlight();
  };

  render() {
    const { data, term, filter } = this.state;
    const liked = data.filter(item => item.like).length;
    const allPosts = data.length;
    const completed = data.filter(item => item.completed).length;
    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
    const selectedPosts = visiblePosts.filter(item => item.selected).length;
    const highlightedAll = selectedPosts === visiblePosts.length;

    return (
      <>
        {" "}
        <AppHeader liked={liked} allPosts={allPosts} completed={completed} />
        <div className="search-panel d-flex">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />

          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}
          />
        </div>
        <HighlightPost
          onToggleSelectAll={this.onToggleSelectAll}
          highlightedAll={highlightedAll}
          selectedPosts={selectedPosts}
          removeSelectedPosts={this.removeSelectedPosts}
          posts={visiblePosts}
        />
        <PostList
          posts={visiblePosts}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}
          onToggleCompleted={this.onToggleCompleted}
          onToggleSelect={this.onToggleSelect}
        />
        <PostAddForm onAdd={this.addItem} />
      </>
    );
  }
}

export default App;

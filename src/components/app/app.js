import React, { Component } from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          label: "Пшёл учить React",
          important: true,
          like: false,
          completed: false
        },
        {
          id: 2,
          label: "Учу React",
          important: true,
          like: false,
          completed: false
        },
        {
          id: 3,
          label: "Забываю React...",
          important: false,
          like: false,
          completed: false
        },
        {
          id: 4,
          label: "Снова учу React!",
          important: false,
          like: false,
          completed: false
        }
      ],
      maxId: 5,
      term: "",
      filter: "all"
    };
  }

  deleteItem = id => {
    this.setState(({ data }) => ({
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
          completed: false
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

  render() {
    const { data, term, filter } = this.state;
    const liked = data.filter(item => item.like).length;
    const allPosts = data.length;
    const completed = data.filter(item => item.completed).length;
    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

    return (
      <div>
        {" "}
        <AppHeader liked={liked} allPosts={allPosts} completed={completed} />
        <div className="search-panel d-flex">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />

          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}
          />
        </div>
        <PostList
          posts={visiblePosts}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}
          onToggleCompleted={this.onToggleCompleted}
        />
        <PostAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;

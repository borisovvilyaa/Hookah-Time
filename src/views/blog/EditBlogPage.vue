<template>
  <Layout>
    <div class="container-fluid p-4 min-vh-100 bg-light">
      <!-- Header -->
      <div class="card shadow-sm mb-4 border-light">
        <div class="card-body d-flex flex-wrap justify-content-between align-items-center">
          <h1 class="h4 mb-0 fw-bold">
            <span class="text-primary">Edit Blog</span>
          </h1>
          <div class="d-flex flex-wrap gap-2">
            <button class="btn btn-outline-secondary btn-sm" @click="goBack">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left me-1" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
              Back
            </button>
            <button class="btn btn-primary btn-sm" @click="saveBlog" :disabled="isLoading">
              <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save me-1" viewBox="0 0 16 16">
                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
              </svg>
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-1" role="status"></span>
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoadingBlog" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading blog data...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Error!</h4>
        <p>{{ error }}</p>
        <hr />
        <button class="btn btn-outline-danger" @click="goBack">Go Back</button>
      </div>

      <!-- Main Content -->
      <div v-else class="row">
        <!-- Left Column -->
        <div class="col-lg-8">
          <!-- Basic Information -->
          <div class="card shadow-sm mb-4 border-light">
            <div class="card-header bg-white">
              <h2 class="h5 mb-0 fw-bold">Basic Information</h2>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label for="title" class="form-label">Title <span class="text-danger">*</span></label>
                <input type="text" class="form-control" :class="{ 'is-invalid': !blogData.title.trim() && blogData.title !== '' }" id="title" v-model="blogData.title" placeholder="Enter blog title" required />
                <div v-if="!blogData.title.trim() && blogData.title !== ''" class="invalid-feedback">Title is required</div>
              </div>

              <div class="mb-3">
                <label for="slug" class="form-label">Slug <span class="text-danger">*</span></label>
                <input type="text" class="form-control" :class="{ 'is-invalid': !blogData.slug.trim() && blogData.slug !== '' }" id="slug" v-model="blogData.slug" placeholder="Enter URL slug" required />
                <div class="form-text">URL-friendly version of the title</div>
                <div v-if="!blogData.slug.trim() && blogData.slug !== ''" class="invalid-feedback">Slug is required</div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="publishDate" class="form-label">Publish Date <span class="text-danger">*</span></label>
                  <input type="date" class="form-control" :class="{ 'is-invalid': !blogData.Time }" id="publishDate" v-model="blogData.Time" required />
                  <div v-if="!blogData.Time" class="invalid-feedback">Publish date is required</div>
                </div>
                <div class="col-md-6">
                  <label for="readTime" class="form-label">Read Time <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" :class="{ 'is-invalid': !blogData.TimeReaded.trim() && blogData.TimeReaded !== '' }" id="readTime" v-model="blogData.TimeReaded" placeholder="e.g., 8 min" required />
                  <div v-if="!blogData.TimeReaded.trim() && blogData.TimeReaded !== ''" class="invalid-feedback">Read time is required</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Keywords -->
          <div class="card shadow-sm mb-4 border-light">
            <div class="card-header bg-white">
              <h2 class="h5 mb-0 fw-bold">Keywords</h2>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label for="keywords" class="form-label">Keywords (comma-separated)</label>
                <textarea class="form-control" id="keywords" v-model="keywordsText" rows="3" placeholder="Enter keywords separated by commas"></textarea>
                <div class="form-text">These keywords will help with SEO and search</div>
              </div>
              <div v-if="blogData.KeyWords && blogData.KeyWords.terms.length > 0" class="d-flex flex-wrap gap-2">
                <div v-for="(keyword, index) in blogData.KeyWords.terms" :key="index" class="badge bg-secondary">
                  {{ keyword }}
                </div>
              </div>
            </div>
          </div>

          <!-- Strapi-style Rich Text Editor -->
          <div class="card shadow-sm mb-4 border-light">
            <div class="card-header bg-white">
              <h2 class="h5 mb-0 fw-bold">Content</h2>
            </div>
            <div class="card-body p-0">
              <!-- Toolbar -->
              <div class="editor-toolbar border-bottom p-3 bg-light">
                <div class="d-flex flex-wrap gap-2 align-items-center">
                  <!-- Block Type Selector -->
                  <select class="form-select form-select-sm" v-model="currentBlockType" @change="changeBlockType" style="width: 140px;">
                    <option value="paragraph">Normal</option>
                    <option value="heading">Heading</option>
                    <option value="list">List</option>
                    <option value="quote">Quote</option>
                    <option value="code">Code</option>
                  </select>

                  <!-- Heading Level Selector -->
                  <select v-if="currentBlockType === 'heading'" class="form-select form-select-sm" v-model="currentHeadingLevel" style="width: 80px;">
                    <option value="1">H1</option>
                    <option value="2">H2</option>
                    <option value="3">H3</option>
                    <option value="4">H4</option>
                    <option value="5">H5</option>
                    <option value="6">H6</option>
                  </select>

                  <!-- List Type Selector -->
                  <select v-if="currentBlockType === 'list'" class="form-select form-select-sm" v-model="currentListFormat" style="width: 100px;">
                    <option value="unordered">Bullet</option>
                    <option value="ordered">Numbered</option>
                  </select>

                  <div class="vr"></div>

                  <!-- Text Formatting -->
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-secondary" :class="{ 'active': currentFormat.bold }" @click="execFormat('bold')" title="Bold">
                      <strong>B</strong>
                    </button>
                    <button class="btn btn-outline-secondary" :class="{ 'active': currentFormat.italic }" @click="execFormat('italic')" title="Italic">
                      <em>I</em>
                    </button>
                    <button class="btn btn-outline-secondary" :class="{ 'active': currentFormat.underline }" @click="execFormat('underline')" title="Underline">
                      <u>U</u>
                    </button>
                    <button class="btn btn-outline-secondary" :class="{ 'active': currentFormat.strikethrough }" @click="execFormat('strikethrough')" title="Strikethrough">
                      <s>S</s>
                    </button>
                    <button class="btn btn-outline-secondary" :class="{ 'active': currentFormat.code }" @click="execFormat('code')" title="Code">
                      &lt;/&gt;
                    </button>
                  </div>

                  <div class="vr"></div>

                  <!-- Link Button -->
                  <button class="btn btn-sm btn-outline-secondary" @click="createLink" title="Insert Link">Link</button>

                  <!-- Clear Formatting -->
                  <button class="btn btn-sm btn-outline-secondary" @click="clearFormatting" title="Clear Formatting">Clear</button>
                </div>
              </div>

              <!-- Editor Content -->
              <div
                ref="editor"
                class="editor-content p-4"
                style="min-height: 500px; outline: none;"
                contenteditable="true"
                @input="onEditorInput"
                @focus="onEditorFocus"
                @blur="onEditorBlur"
                @keydown="onKeyDown"
                @mouseup="updateToolbar"
              ></div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="col-lg-4">
          <!-- Featured Image -->
          <div class="card shadow-sm mb-4 border-light">
            <div class="card-header bg-white">
              <h2 class="h5 mb-0 fw-bold">Featured Image</h2>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label for="featuredImage" class="form-label">Upload Featured Image</label>
                <input type="file" class="form-control" id="featuredImage" accept="image/*" @change="handleImageUpload" />
                <div class="form-text">Main image for the blog post</div>
              </div>
              <div v-if="blogData.FeaturedImage" class="text-center">
                <img
                  :src="getImageUrl(blogData.FeaturedImage)"
                  :alt="blogData.title"
                  class="img-fluid rounded"
                  style="max-height: 200px;"
                  @error="handleImageError"
                />
                <button type="button" class="btn btn-sm btn-outline-danger mt-2" @click="removeFeaturedImage">
                  Remove Image
                </button>
              </div>
            </div>
          </div>

          <!-- Content Preview -->
          <div class="card shadow-sm mb-4 border-light">
            <div class="card-header bg-white">
              <h2 class="h5 mb-0 fw-bold">Content Preview</h2>
            </div>
            <div class="card-body">
              <div class="preview-content" style="max-height: 400px; overflow-y: auto;">
                <div v-if="contentBlocks.length > 0">
                  <div v-for="(block, index) in contentBlocks" :key="index" class="preview-block mb-3">
                    <!-- Heading Preview -->
                    <div v-if="block.type === 'heading'">
                      <component :is="`h${block.level}`" class="preview-heading">
                        <template v-for="(child, childIndex) in block.children" :key="childIndex">
                          <span v-if="isTextNode(child)" :style="getChildStyle(child)">
                            {{ child.text }}
                          </span>
                          <a
                            v-else-if="isLinkNode(child)"
                            :href="child.url"
                            target="_blank"
                            class="text-primary text-decoration-underline"
                            :style="getChildStyle(child.children[0])"
                          >
                            <span v-for="(textNode, i) in child.children" :key="i">
                              {{ textNode.text }}
                            </span>
                          </a>
                        </template>
                      </component>
                    </div>

                    <!-- Paragraph Preview -->
                    <div v-else-if="block.type === 'paragraph'">
                      <p class="preview-paragraph">
                        <template v-for="(child, childIndex) in block.children" :key="childIndex">
                          <span v-if="isTextNode(child)" :style="getChildStyle(child)">
                            {{ child.text }}
                          </span>
                          <a
                            v-else-if="isLinkNode(child)"
                            :href="child.url"
                            target="_blank"
                            class="text-primary text-decoration-underline"
                            :style="getChildStyle(child.children[0])"
                          >
                            <span v-for="(textNode, i) in child.children" :key="i">
                              {{ textNode.text }}
                            </span>
                          </a>
                        </template>
                      </p>
                    </div>

                    <!-- List Preview -->
<!-- List Preview -->
<div v-else-if="block.type === 'list'">
  <component :is="block.format === 'ordered' ? 'ol' : 'ul'" class="preview-list">
    <li v-for="(listItem, itemIndex) in block.children.filter(isListItemNode)" :key="itemIndex">
      <template v-for="(child, childIndex) in listItem.children" :key="childIndex">
        <span v-if="isTextNode(child)" :style="getChildStyle(child)">
          {{ child.text }}
        </span>
        <a
          v-else-if="isLinkNode(child)"
          :href="child.url"
          target="_blank"
          class="text-primary text-decoration-underline"
          :style="getChildStyle(child.children[0])"
        >
          <span v-for="(textNode, i) in child.children" :key="i">
            {{ textNode.text }}
          </span>
        </a>
      </template>
    </li>
  </component>
</div>
                    <!-- Quote Preview -->
                    <div v-else-if="block.type === 'quote'">
                      <blockquote class="preview-quote border-start border-3 ps-3 text-muted">
                        <template v-for="(child, childIndex) in block.children" :key="childIndex">
                          <span v-if="isTextNode(child)" :style="getChildStyle(child)">
                            {{ child.text }}
                          </span>
                          <a
                            v-else-if="isLinkNode(child)"
                            :href="child.url"
                            target="_blank"
                            class="text-primary text-decoration-underline"
                            :style="getChildStyle(child.children[0])"
                          >
                            <span v-for="(textNode, i) in child.children" :key="i">
                              {{ textNode.text }}
                            </span>
                          </a>
                        </template>
                      </blockquote>
                    </div>

                    <!-- Code Preview -->
                    <div v-else-if="block.type === 'code'">
                      <pre class="preview-code bg-dark text-light p-2 rounded"><code>
                        <template v-for="(child, childIndex) in block.children" :key="childIndex">
                          <span v-if="isTextNode(child)">
                            {{ child.text }}
                          </span>
                        </template>
                      </code></pre>
                    </div>
                  </div>
                </div>
                <div v-else class="text-muted text-center">
                  No content to preview
                </div>
              </div>
            </div>
          </div>

          <!-- Blog Summary -->
          <div v-if="blogData.title" class="card shadow-sm mb-4 border-light">
            <div class="card-header bg-white">
              <h2 class="h5 mb-0 fw-bold">Blog Summary</h2>
            </div>
            <div class="card-body">
              <div class="mb-2">
                <small class="text-muted">Title:</small>
                <div class="fw-medium">{{ blogData.title }}</div>
              </div>
              <div v-if="blogData.slug" class="mb-2">
                <small class="text-muted">Slug:</small>
                <div class="text-muted small">{{ blogData.slug }}</div>
              </div>
              <div v-if="blogData.Time" class="mb-2">
                <small class="text-muted">Publish Date:</small>
                <div>{{ formatDate(blogData.Time) }}</div>
              </div>
              <div v-if="blogData.TimeReaded" class="mb-2">
                <small class="text-muted">Read Time:</small>
                <div><span class="badge bg-info">{{ blogData.TimeReaded }}</span></div>
              </div>
              <div class="mb-2">
                <small class="text-muted">Content Blocks:</small>
                <div><span class="badge bg-secondary">{{ contentBlocks.length }}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Layout from '@/components/LayoutMain.vue'
import strapiService from '@/services/StrapiService'
import axios from 'axios'

interface Image {
  id: number
  name: string
  url: string
  formats?: Record<string, any>
  alternativeText?: string
  caption?: string
  width: number
  height: number
}

interface TextNode {
  text: string
  type: 'text'
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
}

interface LinkNode {
  type: 'link'
  url: string
  children: TextNode[]
}

interface ListItemNode {
  type: 'list-item'
  children: (TextNode | LinkNode)[]
}

type ChildNode = TextNode | LinkNode | ListItemNode

interface BlockNode {
  type: 'paragraph' | 'heading' | 'list' | 'quote' | 'code'
  level?: number
  format?: 'ordered' | 'unordered'
  children: ChildNode[]
}

interface Blog {
  documentId?: string
  title: string
  slug: string
  Time: string
  TimeReaded: string
  Content: BlockNode[]
  KeyWords: {
    terms: string[]
  }
  FeaturedImage?: Image
  createdAt: string
  updatedAt: string
}

export default defineComponent({
  name: 'EditBlogPage',
  components: { Layout },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const blogId = route.params.id as string
    const documentId = ref<string>('')
    const editor = ref<HTMLElement | null>(null)

    const blogData = ref<Blog>({
      title: '',
      slug: '',
      Time: '',
      TimeReaded: '',
      Content: [],
      KeyWords: { terms: [] },
      createdAt: '',
      updatedAt: '',
    })

    const contentBlocks = ref<BlockNode[]>([])
    const currentBlockType = ref<string>('paragraph')
    const currentHeadingLevel = ref<string>('2')
    const currentListFormat = ref<string>('unordered')
    const currentFormat = ref({
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false,
      code: false
    })

    const keywordsText = ref<string>('')
    const isLoadingBlog = ref<boolean>(true)
    const isLoading = ref<boolean>(false)
    const error = ref<string>('')

    // Type Guards
    const isTextNode = (node: ChildNode): node is TextNode => node.type === 'text'
    const isLinkNode = (node: ChildNode): node is LinkNode => node.type === 'link'
    const isListItemNode = (node: ChildNode): node is ListItemNode => node.type === 'list-item'

    watch(keywordsText, (newValue) => {
      if (newValue.trim()) {
        blogData.value.KeyWords.terms = newValue.split(',').map(k => k.trim()).filter(k => k.length > 0)
      } else {
        blogData.value.KeyWords.terms = []
      }
    })

    const execFormat = (command: string) => {
      if (!editor.value) return
      document.execCommand(command, false)
      updateToolbar()
      updateContentBlocks()
    }

    const createLink = () => {
      if (!editor.value) return
      const url = prompt('Enter URL:')
      if (url) {
        document.execCommand('createLink', false, url)
        updateContentBlocks()
      }
    }

    const clearFormatting = () => {
      if (!editor.value) return
      document.execCommand('removeFormat', false)
      document.execCommand('unlink', false)
      updateToolbar()
      updateContentBlocks()
    }

    const changeBlockType = () => {
      if (!editor.value) return
      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return

      const range = selection.getRangeAt(0)
      let blockElement = getBlockElement(range.startContainer)
      if (!blockElement) return

      const parent = blockElement.parentNode
      if (!parent) return

      switch (currentBlockType.value) {
        case 'heading': {
          const h = document.createElement(`H${currentHeadingLevel.value}`)
          h.innerHTML = blockElement.innerHTML
          parent.replaceChild(h, blockElement)
          break
        }
        case 'list': {
          const listTag = currentListFormat.value === 'ordered' ? 'OL' : 'UL'
          if (blockElement.tagName === 'P') {
            const list = document.createElement(listTag)
            const li = document.createElement('LI')
            li.innerHTML = blockElement.innerHTML
            list.appendChild(li)
            parent.replaceChild(list, blockElement)
          }
          break
        }
        case 'quote':
          if (blockElement.tagName === 'P') {
            blockElement.style.fontStyle = 'italic'
            blockElement.style.borderLeft = '3px solid #ccc'
            blockElement.style.paddingLeft = '10px'
          }
          break
        case 'code':
          if (blockElement.tagName === 'P') {
            const pre = document.createElement('PRE')
            const code = document.createElement('CODE')
            code.innerHTML = blockElement.innerHTML
            pre.appendChild(code)
            parent.replaceChild(pre, blockElement)
          }
          break
        default:
          if (blockElement.tagName !== 'P') {
            const p = document.createElement('P')
            p.innerHTML = blockElement.innerHTML
            parent.replaceChild(p, blockElement)
          }
      }
      updateContentBlocks()
    }

    const getBlockElement = (node: Node): HTMLElement | null => {
      let element: Node | null = node
      while (element && element.parentElement !== editor.value) {
        element = element.parentElement
      }
      return element as HTMLElement | null
    }

    const updateToolbar = () => {
      if (!editor.value) return
      currentFormat.value = {
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strikethrough: document.queryCommandState('strikethrough'),
        code: false
      }
    }

    const onEditorInput = () => updateContentBlocks()
    const onEditorFocus = () => updateToolbar()
    const onEditorBlur = () => {}
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        document.execCommand('insertParagraph', false)
        updateContentBlocks()
      }
    }

    const updateContentBlocks = () => {
      if (!editor.value) return
      const blocks: BlockNode[] = []
      const elements = editor.value.children

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement
        const block = convertElementToBlock(element)
        if (block) blocks.push(block)
      }
      contentBlocks.value = blocks
    }

    const convertElementToBlock = (element: HTMLElement): BlockNode | null => {
      const tagName = element.tagName.toLowerCase()

      if (tagName.match(/^h[1-6]$/)) {
        return {
          type: 'heading',
          level: parseInt(tagName[1]) as 1 | 2 | 3 | 4 | 5 | 6,
          children: extractChildren(element)
        }
      }

      if (tagName === 'ul' || tagName === 'ol') {
        const listItems: ListItemNode[] = []
        const liElements = element.querySelectorAll('li')
        liElements.forEach(li => {
          listItems.push({
            type: 'list-item',
            children: extractChildren(li) as (TextNode | LinkNode)[]
          })
        })
        return {
          type: 'list',
          format: tagName === 'ol' ? 'ordered' : 'unordered',
          children: listItems
        }
      }

      if (element.style.fontStyle === 'italic' || element.style.borderLeft) {
        return { type: 'quote', children: extractChildren(element) }
      }

      if (tagName === 'pre') {
        const codeElement = element.querySelector('code')
        return {
          type: 'code',
          children: codeElement ? extractChildren(codeElement) : extractChildren(element)
        }
      }

      return { type: 'paragraph', children: extractChildren(element) }
    }

    const extractChildren = (element: HTMLElement): ChildNode[] => {
      const children: ChildNode[] = []

      const traverse = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent?.trim()
          if (text) {
            children.push({ text, type: 'text' })
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement
          const tagName = el.tagName.toLowerCase()

          if (tagName === 'a') {
            const linkChildren = extractChildren(el).filter((c): c is TextNode => c.type === 'text')
            children.push({
              type: 'link',
              url: el.getAttribute('href') || '',
              children: linkChildren
            })
          } else if (tagName === 'code') {
            const textNodes = extractChildren(el).filter((c): c is TextNode => c.type === 'text')
            textNodes.forEach(n => { n.code = true })
            children.push(...textNodes)
          } else {
            const textNodes = extractChildren(el).filter((c): c is TextNode => c.type === 'text')
            textNodes.forEach(n => {
              if (tagName === 'strong' || tagName === 'b') n.bold = true
              if (tagName === 'em' || tagName === 'i') n.italic = true
              if (tagName === 'u') n.underline = true
              if (tagName === 's' || tagName === 'strike') n.strikethrough = true
            })
            children.push(...textNodes)
          }
        }
      }

      element.childNodes.forEach(traverse)
      return children.length > 0 ? children : [{ text: '', type: 'text' }]
    }

    const childrenToHtml = (children: ChildNode[]): string => {
      return children.map(child => {
        if (child.type === 'link') {
          return `<a href="${child.url}">${childrenToHtml(child.children)}</a>`
        }
        if (child.type === 'list-item') {
          return `<li>${childrenToHtml(child.children)}</li>`
        }

        let html = child.text || ''
        if (child.bold) html = `<strong>${html}</strong>`
        if (child.italic) html = `<em>${html}</em>`
        if (child.underline) html = `<u>${html}</u>`
        if (child.strikethrough) html = `<s>${html}</s>`
        if (child.code) html = `<code>${html}</code>`
        return html
      }).join('')
    }

    const blocksToHtml = (blocks: BlockNode[]): string => {
      return blocks.map(block => {
        switch (block.type) {
          case 'heading':
            return `<h${block.level}>${childrenToHtml(block.children)}</h${block.level}>`
          case 'list':
            const tag = block.format === 'ordered' ? 'ol' : 'ul'
            const items = block.children
              .filter((c): c is ListItemNode => c.type === 'list-item')
              .map(item => `<li>${childrenToHtml(item.children)}</li>`)
              .join('')
            return `<${tag}>${items}</${tag}>`
          case 'quote':
            return `<p style="font-style: italic; border-left: 3px solid #ccc; padding-left: 10px;">${childrenToHtml(block.children)}</p>`
          case 'code':
            return `<pre><code>${childrenToHtml(block.children)}</code></pre>`
          default:
            return `<p>${childrenToHtml(block.children)}</p>`
        }
      }).join('')
    }

    const getChildStyle = (child: ChildNode | TextNode): string => {
      const node = 'children' in child ? child.children[0] : child
      if (!isTextNode(node)) return ''
      const styles = []
      if (node.bold) styles.push('font-weight: bold')
      if (node.italic) styles.push('font-style: italic')
      if (node.underline) styles.push('text-decoration: underline')
      if (node.strikethrough) styles.push('text-decoration: line-through')
      if (node.code) styles.push('font-family: monospace; background: #f4f4f4; padding: 2px 4px; border-radius: 3px;')
      return styles.join('; ')
    }

    const fetchBlogData = async () => {
      isLoadingBlog.value = true
      error.value = ''
      try {
        const response: any = await strapiService.request('GET', `/content-manager/collection-types/api::blog.blog/${blogId}`)
        const data = response.data
        documentId.value = data.documentId || ''
        blogData.value = {
          title: data.title || '',
          slug: data.slug || '',
          Time: data.Time || '',
          TimeReaded: data.TimeReaded || '',
          Content: data.Content || [],
          KeyWords: data.KeyWords || { terms: [] },
          FeaturedImage: data.FeaturedImage,
          createdAt: data.createdAt || '',
          updatedAt: data.updatedAt || '',
        }

        contentBlocks.value = Array.isArray(blogData.value.Content) ? [...blogData.value.Content] : []
        if (blogData.value.KeyWords?.terms.length > 0) {
          keywordsText.value = blogData.value.KeyWords.terms.join(', ')
        }

        nextTick(() => {
          if (editor.value) {
            editor.value.innerHTML = contentBlocks.value.length > 0 ? blocksToHtml(contentBlocks.value) : '<p><br></p>'
          }
        })
      } catch (err: any) {
        error.value = err.message || 'Failed to load blog data'
      } finally {
        isLoadingBlog.value = false
      }
    }

    const getImageUrl = (image: Image | undefined): string => image?.url || 'https://via.placeholder.com/250x200'

    const handleImageUpload = async (event: Event) => {
      const input = event.target as HTMLInputElement
      const file = input.files?.[0]
      if (!file) return

      try {
        const formData = new FormData()
        formData.append('files', file)
        const baseUrl = strapiService.getBaseUrl()
        const uploadResponse = await axios.post(`${baseUrl}/upload`, formData, {
          headers: {
            Authorization: `Bearer ${strapiService.getToken()}`,
            'Content-Type': 'multipart/form-data',
          },
        })

        const uploadedFile: Image = uploadResponse.data[0]
        blogData.value.FeaturedImage = {
          id: uploadedFile.id,
          name: uploadedFile.name,
          url: uploadedFile.url,
          formats: uploadedFile.formats || {},
          alternativeText: uploadedFile.alternativeText || uploadedFile.name,
          caption: uploadedFile.caption || '',
          width: uploadedFile.width,
          height: uploadedFile.height,
        }
        input.value = ''
      } catch (err: any) {
        error.value = err.message || 'Failed to upload image'
      }
    }

    const removeFeaturedImage = async () => {
      if (!blogData.value.FeaturedImage?.id) return
      try {
        const baseUrl = strapiService.getBaseUrl()
        await axios.delete(`${baseUrl}/upload/files/${blogData.value.FeaturedImage.id}`, {
          headers: { Authorization: `Bearer ${strapiService.getToken()}` },
        })
        blogData.value.FeaturedImage = undefined
      } catch (err: any) {
        error.value = err.message || 'Failed to delete image'
      }
    }

    const handleImageError = () => {}
    const formatDate = (dateString: string): string => {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    const saveBlog = async () => {
      isLoading.value = true
      error.value = ''
      try {
        if (!blogData.value.title.trim()) throw new Error('Title is required')
        if (!blogData.value.slug.trim()) throw new Error('Slug is required')
        if (!blogData.value.Time) throw new Error('Publish date is required')
        if (!blogData.value.TimeReaded.trim()) throw new Error('Read time is required')

        const blocksToSave = contentBlocks.value.filter(block => {
          return block.children.some(child => {
            if (isTextNode(child)) return child.text?.trim()
            if (isLinkNode(child)) return child.children.some(c => c.text?.trim())
            if (isListItemNode(child)) return child.children.some(c => isTextNode(c) ? c.text?.trim() : true)
            return false
          })
        })

        const dataToSubmit = {
          title: blogData.value.title,
          slug: blogData.value.slug,
          Time: blogData.value.Time,
          TimeReaded: blogData.value.TimeReaded,
          Content: blocksToSave,
          KeyWords: blogData.value.KeyWords,
          FeaturedImage: blogData.value.FeaturedImage?.id || null,
        }

        await strapiService.request('PUT', `/content-manager/collection-types/api::blog.blog/${documentId.value}`, dataToSubmit)
        await strapiService.request('POST', `/content-manager/collection-types/api::blog.blog/${documentId.value}/actions/publish`)
        alert('Blog updated and published successfully!')
        goBack()
      } catch (err: any) {
        error.value = err.message || 'Failed to save blog'
      } finally {
        isLoading.value = false
      }
    }

    const goBack = () => router.push('/blogs')

    onMounted(fetchBlogData)

    return {
      blogData,
      contentBlocks,
      editor,
      currentBlockType,
      currentHeadingLevel,
      currentListFormat,
      currentFormat,
      keywordsText,
      isLoadingBlog,
      isLoading,
      error,
      execFormat,
      createLink,
      clearFormatting,
      changeBlockType,
      onEditorInput,
      onEditorFocus,
      onEditorBlur,
      onKeyDown,
      updateToolbar,
      getChildStyle,
      getImageUrl,
      handleImageUpload,
      removeFeaturedImage,
      handleImageError,
      formatDate,
      saveBlog,
      goBack,
      isTextNode,
      isLinkNode,
      isListItemNode,
    }
  },
})
</script>

<style scoped>
.form-control:focus,
.form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.is-invalid {
  border-color: #dc3545;
}

.is-invalid:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
}

.editor-toolbar {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.btn-group .btn.active {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: white;
}

.editor-content {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  min-height: 500px;
}

.editor-content:focus {
  outline: none;
}

.editor-content h1,
.editor-content h2,
.editor-content h3,
.editor-content h4,
.editor-content h5,
.editor-content h6 {
  margin: 1em 0 0.5em 0;
  font-weight: 600;
}

.editor-content h1 { font-size: 2em; }
.editor-content h2 { font-size: 1.5em; }
.editor-content h3 { font-size: 1.25em; }
.editor-content h4 { font-size: 1.1em; }
.editor-content h5 { font-size: 1em; }
.editor-content h6 { font-size: 0.9em; color: #6c757d; }

.editor-content p {
  margin: 0.5em 0;
}

.editor-content ul,
.editor-content ol {
  margin: 0.5em 0;
  padding-left: 2em;
}

.editor-content blockquote {
  border-left: 3px solid #ccc;
  margin: 1em 0;
  padding-left: 1em;
  font-style: italic;
  color: #6c757d;
}

.editor-content pre {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 1em;
  margin: 1em 0;
  overflow-x: auto;
}

.editor-content code {
  font-family: 'Courier New', monospace;
  background: #f8f9fa;
  padding: 2px 4px;
  border-radius: 3px;
}

/* Preview Styles */
.preview-content {
  font-size: 0.9rem;
  line-height: 1.5;
}

.preview-heading {
  margin: 0.5rem 0;
  font-weight: 600;
}

.preview-paragraph {
  margin: 0.25rem 0;
  line-height: 1.4;
}

.preview-list {
  margin: 0.25rem 0;
  padding-left: 1.5rem;
}

.preview-quote {
  margin: 0.5rem 0;
  padding-left: 1rem;
  font-style: italic;
}

.preview-code {
  margin: 0.5rem 0;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
}

.badge {
  font-size: 0.7em;
}
</style>

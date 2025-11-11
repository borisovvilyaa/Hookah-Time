<template>
  <Layout>
    <div class="container-fluid p-4 min-vh-100 bg-light">
      <!-- Header -->
      <div class="card shadow-sm mb-4 border-light">
        <div class="card-body d-flex flex-wrap justify-content-between align-items-center">
          <h1 class="h4 mb-0 fw-bold">
            <span class="text-primary">Add New Blog</span>
          </h1>
          <div class="d-flex flex-wrap gap-2">
            <button class="btn btn-outline-secondary btn-sm" @click="goBack">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left me-1" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
              Back
            </button>
            <button class="btn btn-outline-primary btn-sm" @click="saveDraft" :disabled="isLoading">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark me-1" viewBox="0 0 16 16">
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
              </svg>
              Save as Draft
            </button>
            <button class="btn btn-primary btn-sm" @click="saveAndPublish" :disabled="isLoading">
              <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle me-1" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
              </svg>
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-1" role="status"></span>
              Save & Publish
            </button>
          </div>
        </div>
      </div>

      <!-- Error Alert -->
      <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
        <h4 class="alert-heading">Error!</h4>
        <p>{{ error }}</p>
        <button type="button" class="btn-close" @click="error = ''"></button>
      </div>

      <!-- Success Alert -->
      <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
        {{ successMessage }}
        <button type="button" class="btn-close" @click="successMessage = ''"></button>
      </div>

      <div class="row">
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
                <input type="text" class="form-control" :class="{ 'is-invalid': !blogData.title.trim() && attempted }" id="title" v-model="blogData.title" placeholder="Enter blog title" @input="generateSlug" required />
                <div v-if="!blogData.title.trim() && attempted" class="invalid-feedback">Title is required</div>
              </div>

              <div class="mb-3">
                <label for="slug" class="form-label">Slug <span class="text-danger">*</span></label>
                <div class="input-group">
                  <input type="text" class="form-control" :class="{ 'is-invalid': !blogData.slug.trim() && attempted }" id="slug" v-model="blogData.slug" placeholder="Enter URL slug" required />
                  <button class="btn btn-outline-secondary" type="button" @click="generateSlug">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                    </svg>
                  </button>
                </div>
                <div v-if="!blogData.slug.trim() && attempted" class="invalid-feedback d-block">Slug is required</div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="publishDate" class="form-label">Publish Date <span class="text-danger">*</span></label>
                  <input type="date" class="form-control" :class="{ 'is-invalid': !blogData.Time && attempted }" id="publishDate" v-model="blogData.Time" required />
                  <div v-if="!blogData.Time && attempted" class="invalid-feedback">Publish date is required</div>
                </div>
                <div class="col-md-6">
                  <label for="readTime" class="form-label">Read Time <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" :class="{ 'is-invalid': !blogData.TimeReaded.trim() && attempted }" id="readTime" v-model="blogData.TimeReaded" placeholder="e.g., 8 min" required />
                  <div v-if="!blogData.TimeReaded.trim() && attempted" class="invalid-feedback">Read time is required</div>
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
              <div v-if="blogData.KeyWords.terms.length > 0" class="d-flex flex-wrap gap-2">
                <span v-for="(keyword, index) in blogData.KeyWords.terms" :key="index" class="badge bg-secondary d-flex align-items-center">
                  {{ keyword }}
                  <button type="button" class="btn-close btn-close-white ms-1" style="font-size: 0.7em;" @click="removeKeyword(index)"></button>
                </span>
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
                  <select class="form-select form-select-sm" v-model="currentBlockType" @change="changeBlockType" style="width: 140px;">
                    <option value="paragraph">Normal</option>
                    <option value="heading">Heading</option>
                    <option value="list">List</option>
                    <option value="quote">Quote</option>
                    <option value="code">Code</option>
                  </select>

                  <select v-if="currentBlockType === 'heading'" class="form-select form-select-sm" v-model="currentHeadingLevel" style="width: 80px;">
                    <option value="1">H1</option>
                    <option value="2">H2</option>
                    <option value="3">H3</option>
                    <option value="4">H4</option>
                    <option value="5">H5</option>
                    <option value="6">H6</option>
                  </select>

                  <select v-if="currentBlockType === 'list'" class="form-select form-select-sm" v-model="currentListFormat" style="width: 100px;">
                    <option value="unordered">Bullet</option>
                    <option value="ordered">Numbered</option>
                  </select>

                  <div class="vr"></div>

                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-secondary" :class="{ 'active': currentFormat.bold }" @click="execFormat('bold')" title="Bold"><strong>B</strong></button>
                    <button class="btn btn-outline-secondary" :class="{ 'active': currentFormat.italic }" @click="execFormat('italic')" title="Italic"><em>I</em></button>
                    <button class="btn btn-outline-secondary" :class="{ 'active': currentFormat.underline }" @click="execFormat('underline')" title="Underline"><u>U</u></button>
                    <button class="btn btn-outline-secondary" :class="{ 'active': currentFormat.strikethrough }" @click="execFormat('strikethrough')" title="Strikethrough"><s>S</s></button>
                    <button class="btn btn-outline-secondary" :class="{ 'active': currentFormat.code }" @click="execFormat('code')" title="Code">&lt;/&gt;</button>
                  </div>

                  <div class="vr"></div>

                  <button class="btn btn-sm btn-outline-secondary" @click="createLink" title="Insert Link">Link</button>
                  <button class="btn btn-sm btn-outline-secondary" @click="clearFormatting" title="Clear Formatting">Clear</button>
                </div>
              </div>

              <!-- Editor Content -->
              <div ref="editor" class="editor-content p-4" style="min-height: 500px; outline: none;" contenteditable="true" @input="onEditorInput" @focus="onEditorFocus" @blur="onEditorBlur" @keydown="onKeyDown" @mouseup="updateToolbar"></div>
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
                <img :src="getImageUrl(blogData.FeaturedImage)" :alt="blogData.title" class="img-fluid rounded" style="max-height: 200px;" @error="handleImageError" />
                <button type="button" class="btn btn-sm btn-outline-danger mt-2" @click="removeFeaturedImage">Remove Image</button>
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

                    <!-- Heading -->
                    <component v-if="block.type === 'heading'" :is="`h${block.level}`" class="preview-heading">
                      <template v-for="(child, childIndex) in block.children" :key="childIndex">
                        <span v-if="child.type === 'text'" :style="getChildStyle(child)">{{ child.text }}</span>
                        <a v-else-if="child.type === 'link'" :href="child.url" class="text-primary" :style="getChildStyle(child.children[0])" @click.prevent>{{ child.children[0].text }}</a>
                      </template>
                    </component>

                    <!-- Paragraph -->
                    <p v-else-if="block.type === 'paragraph'" class="preview-paragraph">
                      <template v-for="(child, childIndex) in block.children" :key="childIndex">
                        <span v-if="child.type === 'text'" :style="getChildStyle(child)">{{ child.text }}</span>
                        <a v-else-if="child.type === 'link'" :href="child.url" class="text-primary" :style="getChildStyle(child.children[0])" @click.prevent>{{ child.children[0].text }}</a>
                      </template>
                    </p>

                    <!-- List -->
                    <component v-else-if="block.type === 'list'" :is="block.format === 'ordered' ? 'ol' : 'ul'" class="preview-list">
                      <li v-for="(item, itemIndex) in block.children" :key="itemIndex">
                        <template v-for="(child, childIndex) in item.children" :key="childIndex">
                          <span v-if="child.type === 'text'" :style="getChildStyle(child)">{{ child.text }}</span>
                          <a v-else-if="child.type === 'link'" :href="child.url" class="text-primary" :style="getChildStyle(child.children[0])" @click.prevent>{{ child.children[0].text }}</a>
                        </template>
                      </li>
                    </component>

                    <!-- Quote -->
                    <blockquote v-else-if="block.type === 'quote'" class="preview-quote border-start border-3 ps-3 text-muted">
                      <template v-for="(child, childIndex) in block.children" :key="childIndex">
                        <span v-if="child.type === 'text'" :style="getChildStyle(child)">{{ child.text }}</span>
                        <a v-else-if="child.type === 'link'" :href="child.url" class="text-primary" :style="getChildStyle(child.children[0])" @click.prevent>{{ child.children[0].text }}</a>
                      </template>
                    </blockquote>

                    <!-- Code -->
                    <pre v-else-if="block.type === 'code'" class="preview-code bg-dark text-light p-2 rounded"><code>
                      <template v-for="(child, childIndex) in block.children" :key="childIndex">
                        <span v-if="child.type === 'text'">{{ child.text }}</span>
                      </template>
                    </code></pre>
                  </div>
                </div>
                <div v-else class="text-muted text-center">No content to preview</div>
              </div>
            </div>
          </div>

          <!-- Blog Summary -->
          <div class="card shadow-sm mb-4 border-light">
            <div class="card-header bg-white">
              <h2 class="h5 mb-0 fw-bold">Blog Summary</h2>
            </div>
            <div class="card-body">
              <div class="mb-2"><small class="text-muted">Title:</small><div class="fw-medium">{{ blogData.title || 'Not set' }}</div></div>
              <div class="mb-2"><small class="text-muted">Slug:</small><div class="text-muted small">{{ blogData.slug || 'Not set' }}</div></div>
              <div class="mb-2"><small class="text-muted">Publish Date:</small><div>{{ formatDate(blogData.Time) }}</div></div>
              <div class="mb-2"><small class="text-muted">Read Time:</small><div><span class="badge bg-info">{{ blogData.TimeReaded || 'Not set' }}</span></div></div>
              <div class="mb-2"><small class="text-muted">Content Blocks:</small><div><span class="badge bg-secondary">{{ contentBlocks.length }}</span></div></div>
              <div v-if="blogData.KeyWords.terms.length > 0" class="mb-2"><small class="text-muted">Keywords:</small><div><span class="badge bg-light text-dark">{{ blogData.KeyWords.terms.length }}</span></div></div>
              <div v-if="blogData.FeaturedImage"><small class="text-muted">Featured Image:</small><div class="text-success">Uploaded</div></div>
            </div>
          </div>

          <!-- Quick Tips -->
          <div class="card shadow-sm mb-4 border-light bg-light">
            <div class="card-header bg-white">
              <h2 class="h5 mb-0 fw-bold">Quick Tips</h2>
            </div>
            <div class="card-body">
              <ul class="small mb-0 ps-3">
                <li class="mb-2">Use headings to structure your content</li>
                <li class="mb-2">Add relevant keywords for better SEO</li>
                <li class="mb-2">Keep paragraphs short and readable</li>
                <li class="mb-2">Use a featured image (1200x630px recommended)</li>
                <li class="mb-2">Save as draft to continue later</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '@/components/LayoutMain.vue'
import strapiService from '@/services/StrapiService'
import axios from 'axios'

/* ──────────────────────── Types ──────────────────────── */
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

interface ParagraphNode {
  type: 'paragraph'
  children: (TextNode | LinkNode)[]
}

interface HeadingNode {
  type: 'heading'
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: (TextNode | LinkNode)[]
}

interface ListNode {
  type: 'list'
  format: 'ordered' | 'unordered'
  children: ListItemNode[]
}

interface QuoteNode {
  type: 'quote'
  children: (TextNode | LinkNode)[]
}

interface CodeNode {
  type: 'code'
  children: TextNode[]
}

type BlockNode = ParagraphNode | HeadingNode | ListNode | QuoteNode | CodeNode

interface Blog {
  title: string
  slug: string
  Time: string
  TimeReaded: string
  Content: BlockNode[]
  KeyWords: { terms: string[] }
  FeaturedImage?: Image
}

interface StrapiCreateResponse {
  data?: { documentId?: string; [key: string]: any }
  [key: string]: any
}

/* ──────────────────────── Component ──────────────────────── */
export default defineComponent({
  name: 'AddBlogPage',
  components: { Layout },

  setup() {
    const router = useRouter()
    const editor = ref<HTMLElement | null>(null)

    /* ────── Form data ────── */
    const blogData = ref<Blog>({
      title: '',
      slug: '',
      Time: new Date().toISOString().split('T')[0],
      TimeReaded: '',
      Content: [],
      KeyWords: { terms: [] },
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
      code: false,
    })

    const keywordsText = ref<string>('')
    const attempted = ref<boolean>(false)
    const isLoading = ref<boolean>(false)
    const error = ref<string>('')
    const successMessage = ref<string>('')

    /* ────── Watchers ────── */
    watch(keywordsText, (newVal) => {
      blogData.value.KeyWords.terms = newVal
        .split(',')
        .map((k) => k.trim())
        .filter((k) => k.length > 0)
    })

    /* ────── Editor helpers ────── */
    const execFormat = (command: string) => {
      document.execCommand(command, false)
      updateToolbar()
      updateContentBlocks()
    }

    const createLink = () => {
      const url = prompt('Enter URL:')
      if (url) {
        document.execCommand('createLink', false, url)
        updateContentBlocks()
      }
    }

    const clearFormatting = () => {
      document.execCommand('removeFormat', false)
      document.execCommand('unlink', false)
      updateToolbar()
      updateContentBlocks()
    }

    const changeBlockType = () => {
      const sel = window.getSelection()
      if (!sel || sel.rangeCount === 0) return
      const range = sel.getRangeAt(0)
      const blockEl = getBlockElement(range.startContainer)
      if (!blockEl) return

      switch (currentBlockType.value) {
        case 'heading':
          const h = document.createElement(`h${currentHeadingLevel.value}`)
          h.innerHTML = blockEl.innerHTML
          blockEl.parentNode?.replaceChild(h, blockEl)
          break
        case 'list':
          const listTag = currentListFormat.value === 'ordered' ? 'OL' : 'UL'
          if (blockEl.tagName === 'P') {
            const list = document.createElement(listTag)
            const li = document.createElement('LI')
            li.innerHTML = blockEl.innerHTML
            list.appendChild(li)
            blockEl.parentNode?.replaceChild(list, blockEl)
          }
          break
        case 'quote':
          if (blockEl.tagName === 'P') {
            blockEl.style.fontStyle = 'italic'
            blockEl.style.borderLeft = '3px solid #ccc'
            blockEl.style.paddingLeft = '10px'
          }
          break
        case 'code':
          if (blockEl.tagName === 'P') {
            const pre = document.createElement('PRE')
            const code = document.createElement('CODE')
            code.innerHTML = blockEl.innerHTML
            pre.appendChild(code)
            blockEl.parentNode?.replaceChild(pre, blockEl)
          }
          break
        default:
          if (blockEl.tagName !== 'P') {
            const p = document.createElement('P')
            p.innerHTML = blockEl.innerHTML
            blockEl.parentNode?.replaceChild(p, blockEl)
          }
      }
      updateContentBlocks()
    }

    const getBlockElement = (node: Node): HTMLElement | null => {
      let el: HTMLElement | null = node as HTMLElement
      while (el && el.parentElement !== editor.value) {
        el = el.parentElement
      }
      return el
    }

    const updateToolbar = () => {
      currentFormat.value = {
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strikethrough: document.queryCommandState('strikethrough'),
        code: false,
      }
    }

    const onEditorInput = () => updateContentBlocks()
    const onEditorFocus = () => updateToolbar()
    const onEditorBlur = () => {
      // Можно добавить логику при потере фокуса
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        document.execCommand('insertParagraph', false)
        updateContentBlocks()
      }
    }

    const updateContentBlocks = () => {
      if (!editor.value) return
      const blocks: BlockNode[] = []
      for (const el of Array.from(editor.value.children)) {
        const block = convertElementToBlock(el as HTMLElement)
        if (block) blocks.push(block)
      }
      contentBlocks.value = blocks
      blogData.value.Content = blocks
    }

    const convertElementToBlock = (el: HTMLElement): BlockNode | null => {
      const tag = el.tagName.toLowerCase()

      if (/^h[1-6]$/.test(tag)) {
        return {
          type: 'heading',
          level: parseInt(tag[1]) as any,
          children: extractChildren(el),
        }
      }

      if (tag === 'ul' || tag === 'ol') {
        const items: ListItemNode[] = []
        el.querySelectorAll('li').forEach((li) => {
          items.push({
            type: 'list-item',
            children: extractChildren(li as HTMLElement),
          })
        })
        return {
          type: 'list',
          format: tag === 'ol' ? 'ordered' : 'unordered',
          children: items,
        }
      }

      if (el.style.fontStyle === 'italic' || el.style.borderLeft) {
        return { type: 'quote', children: extractChildren(el) }
      }

      if (tag === 'pre') {
        const code = el.querySelector('code') || el
        return {
          type: 'code',
          children: extractChildren(code as HTMLElement).filter(
            (c): c is TextNode => c.type === 'text'
          ),
        }
      }

      return { type: 'paragraph', children: extractChildren(el) }
    }

    const extractChildren = (el: HTMLElement): (TextNode | LinkNode)[] => {
      const result: (TextNode | LinkNode)[] = []

      const walk = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
          result.push({ type: 'text', text: node.textContent.trim() })
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const e = node as HTMLElement
          const t = e.tagName.toLowerCase()

          if (t === 'a') {
            result.push({
              type: 'link',
              url: e.getAttribute('href') || '',
              children: extractChildren(e).filter((c): c is TextNode => c.type === 'text'),
            })
          } else if (t === 'code') {
            extractChildren(e).forEach((n) => {
              if (n.type === 'text') n.code = true
            })
            result.push(...extractChildren(e))
          } else {
            const children = extractChildren(e)
            children.forEach((n) => {
              if (n.type === 'text') {
                if (t === 'strong' || t === 'b') n.bold = true
                if (t === 'em' || t === 'i') n.italic = true
                if (t === 'u') n.underline = true
                if (t === 's' || t === 'strike') n.strikethrough = true
              }
            })
            result.push(...children)
          }
        }
      }

      el.childNodes.forEach(walk)
      return result.length ? result : [{ type: 'text', text: '' }]
    }

    const getChildStyle = (child: TextNode): string => {
      const s: string[] = []
      if (child.bold) s.push('font-weight: bold')
      if (child.italic) s.push('font-style: italic')
      if (child.underline) s.push('text-decoration: underline')
      if (child.strikethrough) s.push('text-decoration: line-through')
      if (child.code)
        s.push(
          'font-family: monospace; background: #f4f4f4; padding: 2px 4px; border-radius: 3px;'
        )
      return s.join('; ')
    }

    /* ────── Form helpers ────── */
    const generateSlug = () => {
      if (blogData.value.title.trim()) {
        blogData.value.slug = blogData.value.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      }
    }

    const removeKeyword = (idx: number) => {
      blogData.value.KeyWords.terms.splice(idx, 1)
      keywordsText.value = blogData.value.KeyWords.terms.join(', ')
    }

    /* ────── Image handling ────── */
    const getImageUrl = (img?: Image) =>
      img?.url || 'https://via.placeholder.com/250x200'

    const handleImageUpload = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      try {
        const fd = new FormData()
        fd.append('files', file)
        const base = strapiService.getBaseUrl()
        const resp = await axios.post(`${base}/upload`, fd, {
          headers: {
            Authorization: `Bearer ${strapiService.getToken()}`,
            'Content-Type': 'multipart/form-data',
          },
        })

        const uploaded: Image = resp.data[0]
        blogData.value.FeaturedImage = { ...uploaded }
        ;(e.target as HTMLInputElement).value = ''
        successMessage.value = 'Image uploaded!'
        setTimeout(() => (successMessage.value = ''), 3000)
      } catch (err: any) {
        error.value = err.message || 'Upload failed'
      }
    }

    const removeFeaturedImage = async () => {
      if (!confirm('Remove image?') || !blogData.value.FeaturedImage?.id) return
      try {
        await axios.delete(
          `${strapiService.getBaseUrl()}/upload/files/${blogData.value.FeaturedImage.id}`,
          { headers: { Authorization: `Bearer ${strapiService.getToken()}` } }
        )
        blogData.value.FeaturedImage = undefined
      } catch (err: any) {
        error.value = err.message || 'Delete failed'
      }
    }

    const handleImageError = (e: Event) => {
      console.error('Image load error', e)
      const img = e.target as HTMLImageElement
      img.src = 'https://via.placeholder.com/250x200?text=No+Image'
    }

    const formatDate = (d: string) =>
      d
        ? new Date(d).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : 'N/A'

    /* ────── Validation & Submit ────── */
    const validateForm = (): boolean => {
      attempted.value = true
      if (!blogData.value.title.trim()) return (error.value = 'Title required'), false
      if (!blogData.value.slug.trim()) return (error.value = 'Slug required'), false
      if (!blogData.value.Time) return (error.value = 'Date required'), false
      if (!blogData.value.TimeReaded.trim()) return (error.value = 'Read time required'), false
      return true
    }

    const saveDraft = async () => {
      if (!validateForm()) return
      isLoading.value = true
      try {
        await strapiService.request('POST', '/content-manager/collection-types/api::blog.blog', {
          title: blogData.value.title,
          slug: blogData.value.slug,
          Time: blogData.value.Time,
          TimeReaded: blogData.value.TimeReaded,
          Content: contentBlocks.value,
          KeyWords: blogData.value.KeyWords,
          FeaturedImage: blogData.value.FeaturedImage?.id ?? null,
        })
        successMessage.value = 'Saved as draft!'
        setTimeout(goBack, 1500)
      } catch (err: any) {
        error.value = err.message || 'Save failed'
      } finally {
        isLoading.value = false
      }
    }

    const saveAndPublish = async () => {
      if (!validateForm()) return
      isLoading.value = true
      try {
        const resp = (await strapiService.request(
          'POST',
          '/content-manager/collection-types/api::blog.blog',
          {
            title: blogData.value.title,
            slug: blogData.value.slug,
            Time: blogData.value.Time,
            TimeReaded: blogData.value.TimeReaded,
            Content: contentBlocks.value,
            KeyWords: blogData.value.KeyWords,
            FeaturedImage: blogData.value.FeaturedImage?.id ?? null,
          }
        )) as StrapiCreateResponse

        const docId = resp?.data?.documentId
        if (docId) {
          await strapiService.request(
            'POST',
            `/content-manager/collection-types/api::blog.blog/${docId}/actions/publish`,
            {}
          )
          successMessage.value = 'Published!'
        } else {
          successMessage.value = 'Created (publish manually)'
        }
        setTimeout(goBack, 2000)
      } catch (err: any) {
        error.value = err.message || 'Publish failed'
      } finally {
        isLoading.value = false
      }
    }

    const goBack = () => router.push('/blogs')

    /* ────── Lifecycle ────── */
    onMounted(() => {
      nextTick(() => {
        if (editor.value) editor.value.innerHTML = '<p><br></p>'
      })
    })

    /* ────── Return everything used in template ────── */
    return {
      // Data
      blogData,
      contentBlocks,
      editor,
      currentBlockType,
      currentHeadingLevel,
      currentListFormat,
      currentFormat,
      keywordsText,
      attempted,
      isLoading,
      error,
      successMessage,

      // Editor
      execFormat,
      createLink,
      clearFormatting,
      changeBlockType,
      onEditorInput,
      onEditorFocus,
      onEditorBlur,
      onKeyDown,
      updateToolbar,

      // Form
      generateSlug,
      removeKeyword,

      // Image
      getImageUrl,
      handleImageUpload,
      removeFeaturedImage,
      handleImageError,

      // Utils
      getChildStyle,
      formatDate,

      // Actions
      saveDraft,
      saveAndPublish,
      goBack,
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

.btn-close-white {
  filter: invert(1) grayscale(100%) brightness(200%);
}
</style>
